'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserProfile, Suggestion } from '@/types';
import { loadProfile, saveProfile, calculateProgress } from '@/lib/storage';
import DynamicGrowthTree from '@/components/DynamicGrowthTree';

function FocusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const suggestionId = searchParams.get('id');

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [guidingQuestions, setGuidingQuestions] = useState<string[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = loadProfile();
    if (!savedProfile || !suggestionId) {
      router.push('/growth');
      return;
    }

    const foundSuggestion = savedProfile.suggestions.find(s => s.id === suggestionId);
    if (!foundSuggestion) {
      router.push('/growth');
      return;
    }

    setProfile(savedProfile);
    setSuggestion(foundSuggestion);
    setLoading(false);

    // 加载引导问题
    loadGuidingQuestions(foundSuggestion);
  }, [suggestionId, router]);

  const loadGuidingQuestions = async (sug: Suggestion) => {
    setQuestionsLoading(true);
    setQuestionsError(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sug.title,
          description: sug.description,
          referencePoints: sug.referencePoints || []
        })
      });

      if (!response.ok) {
        throw new Error('生成引导问题失败');
      }

      const data = await response.json();
      setGuidingQuestions(data.questions || []);
    } catch (error) {
      console.error('加载引导问题失败:', error);
      setQuestionsError('加载引导问题失败,请刷新重试');
      // 使用备用问题
      setGuidingQuestions([
        '具体要做什么?把目标拆解成可执行的小步骤',
        '什么时候开始?为每个步骤设定明确的时间节点',
        '如何确保完成?设置提醒或找人一起监督'
      ]);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim() || !profile || !suggestion) return;

    const updatedProfile = { ...profile };
    const suggestionIndex = updatedProfile.suggestions.findIndex(s => s.id === suggestion.id);

    if (suggestionIndex === -1) return;

    // 添加新任务到 userTasks 数组
    const newTaskObj = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: newTask.trim(),
      completed: false
    };

    // 确保 userTasks 数组存在
    if (!updatedProfile.suggestions[suggestionIndex].userTasks) {
      updatedProfile.suggestions[suggestionIndex].userTasks = [];
    }

    updatedProfile.suggestions[suggestionIndex].userTasks!.push(newTaskObj);
    updatedProfile.progress = calculateProgress(updatedProfile);
    updatedProfile.updatedAt = new Date().toISOString();

    // 保存并更新状态
    saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setSuggestion(updatedProfile.suggestions[suggestionIndex]);
    setNewTask('');
  };

  const handleTaskToggle = (taskId: string) => {
    if (!profile || !suggestion) return;

    const updatedProfile = { ...profile };
    const suggestionIndex = updatedProfile.suggestions.findIndex(s => s.id === suggestion.id);

    if (suggestionIndex === -1) return;

    // 在 userTasks 中查找任务
    const userTasks = updatedProfile.suggestions[suggestionIndex].userTasks || [];
    const task = userTasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    updatedProfile.progress = calculateProgress(updatedProfile);
    updatedProfile.updatedAt = new Date().toISOString();

    saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setSuggestion(updatedProfile.suggestions[suggestionIndex]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleBackToGrowth = () => {
    router.push('/growth');
  };

  if (loading || !suggestion || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </div>
    );
  }

  // AI 任务显示在参考要点,用户任务显示在任务清单
  const aiTasks = suggestion.tasks; // AI 生成的参考任务
  const userTasks = suggestion.userTasks || []; // 用户添加的行动任务
  const completedCount = userTasks.filter(t => t.completed).length;
  const totalCount = userTasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <button
            onClick={handleBackToGrowth}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <span>←</span>
            <span>返回所有建议</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            专注成长 🎯
          </h1>
          <p className="text-gray-600">
            聚焦于这一个目标,制定具体行动计划
          </p>
        </div>

        {/* 主要内容 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* 建议标题 */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {profile.suggestions.findIndex(s => s.id === suggestion.id) + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {suggestion.title}
              </h2>
            </div>
            <p className="text-gray-600 ml-11 mb-4">
              {suggestion.description}
            </p>

            {/* 参考要点 - 显示 AI 生成的任务作为参考 */}
            {aiTasks.length > 0 && (
              <div className="ml-11 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <span>📋</span>
                  <span>参考要点</span>
                </h4>
                <ul className="space-y-2">
                  {aiTasks.map((task, idx) => (
                    <li key={task.id} className="flex items-start gap-2 text-sm text-indigo-900">
                      <span className="flex-shrink-0 w-5 h-5 bg-indigo-200 text-indigo-800 rounded-full flex items-center justify-center text-xs font-medium">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{task.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 引导问题 */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              <span>思考这些问题,帮助你制定具体行动</span>
            </h3>

            {questionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">AI 正在为你生成专属引导问题...</p>
                </div>
              </div>
            ) : questionsError ? (
              <div className="text-center py-4">
                <p className="text-red-600 text-sm mb-3">{questionsError}</p>
                <ul className="space-y-3">
                  {guidingQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-0.5">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="space-y-3">
                {guidingQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{question}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 添加任务区域 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              添加你的行动计划
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入一个具体的行动计划,按回车添加..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
              >
                添加
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              💡 提示:每个任务应该是具体、可执行的小步骤,例如"周一晚上8点和张三聊最近看的电影"
            </p>
          </div>

          {/* 用户任务列表 */}
          {userTasks.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                你的任务清单 ({completedCount}/{totalCount})
              </h3>
              <div className="space-y-3">
                {userTasks.map((task) => (
                  <label
                    key={task.id}
                    className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                    />
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {task.content}
                    </span>
                    {task.completed && (
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span>✓</span>
                        <span className="text-sm">已完成</span>
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {userTasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-4">📝</div>
              <p>还没有添加任务,开始制定你的行动计划吧!</p>
            </div>
          )}
        </div>

        {/* 成长树展示 - 只在有用户任务时显示 */}
        {userTasks.length > 0 && (
          <div className="mt-8">
            <DynamicGrowthTree progress={progress} />
          </div>
        )}

        {/* 完成提示 */}
        {progress === 100 && userTasks.length > 0 && (
          <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              恭喜你完成了这个目标!
            </h3>
            <p className="text-green-700 mb-4">
              你的成长之树已经茁壮成长,继续保持这份动力!
            </p>
            <button
              onClick={handleBackToGrowth}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              查看其他建议
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FocusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </div>
    }>
      <FocusContent />
    </Suspense>
  );
}
