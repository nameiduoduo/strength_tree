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
        return JSON.parse(data) as UserProfile;
      }
    }
  } catch (error) {
    console.error('读取档案失败:', error);
  }
  return null;
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
