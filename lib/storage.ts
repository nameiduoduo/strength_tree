import { UserProfile } from '@/types';

const STORAGE_KEY = 'gallup-profile';

// 保存用户档案到LocalStorage
export function saveProfile(profile: UserProfile): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  } catch (error) {
    console.error('保存档案失败:', error);
  }
}

// 从LocalStorage读取用户档案
export function loadProfile(): UserProfile | null {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const profile = JSON.parse(data) as UserProfile;
        // 数据迁移:为旧数据添加 isAIGenerated 标记
        return migrateProfile(profile);
      }
    }
  } catch (error) {
    console.error('读取档案失败:', error);
  }
  return null;
}

// 数据迁移:分离 AI 任务和用户任务
function migrateProfile(profile: UserProfile): UserProfile {
  let needsSave = false;

  // 遍历所有建议
  profile.suggestions.forEach(suggestion => {
    // 如果没有 referencePoints 字段,添加空数组
    if (!suggestion.referencePoints) {
      suggestion.referencePoints = [];
      needsSave = true;
    }

    // 如果没有 userTasks 字段,创建并迁移数据
    if (!suggestion.userTasks) {
      suggestion.userTasks = [];

      // 将旧数据中标记为用户任务的移到 userTasks
      const userTasksToMove = suggestion.tasks.filter(t => t.isAIGenerated === false);
      const aiTasks = suggestion.tasks.filter(t => t.isAIGenerated !== false);

      if (userTasksToMove.length > 0) {
        suggestion.userTasks = userTasksToMove;
        suggestion.tasks = aiTasks;
        needsSave = true;
      }
    }

    // 清理旧的 isAIGenerated 标记
    suggestion.tasks.forEach(task => {
      if ('isAIGenerated' in task) {
        delete task.isAIGenerated;
        needsSave = true;
      }
    });

    if (suggestion.userTasks) {
      suggestion.userTasks.forEach(task => {
        if ('isAIGenerated' in task) {
          delete task.isAIGenerated;
          needsSave = true;
        }
      });
    }
  });

  // 如果数据被修改,保存回 localStorage
  if (needsSave) {
    saveProfile(profile);
  }

  return profile;
}

// 清除用户档案
export function clearProfile(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('清除档案失败:', error);
  }
}

// 更新档案中的特定字段
export function updateProfile(updates: Partial<UserProfile>): void {
  const current = loadProfile();
  if (current) {
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveProfile(updated);
  }
}

// 计算完成进度
export function calculateProgress(profile: UserProfile): number {
  if (!profile.suggestions || profile.suggestions.length === 0) {
    return 0;
  }

  let totalTasks = 0;
  let completedTasks = 0;

  profile.suggestions.forEach(suggestion => {
    suggestion.tasks.forEach(task => {
      totalTasks++;
      if (task.completed) {
        completedTasks++;
      }
    });
  });

  if (totalTasks === 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}
