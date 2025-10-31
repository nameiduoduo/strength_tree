'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserProfile, Suggestion } from '@/types';
import { loadProfile, saveProfile, calculateProgress } from '@/lib/storage';
import DynamicGrowthTree from '@/components/DynamicGrowthTree';
import ShareCardModal from '@/components/ShareCardModal';

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
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

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

  const handleDeleteTask = (taskId: string) => {
    if (!profile || !suggestion) return;
    if (!confirm('确定要删除这个任务吗?')) return;

    const updatedProfile = { ...profile };
    const suggestionIndex = updatedProfile.suggestions.findIndex(s => s.id === suggestion.id);
    if (suggestionIndex === -1) return;

    // 从 userTasks 中删除任务
    const userTasks = updatedProfile.suggestions[suggestionIndex].userTasks || [];
    updatedProfile.suggestions[suggestionIndex].userTasks = userTasks.filter(t => t.id !== taskId);

    updatedProfile.progress = calculateProgress(updatedProfile);
    updatedProfile.updatedAt = new Date().toISOString();

    saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setSuggestion(updatedProfile.suggestions[suggestionIndex]);
  };

  const handleStartEdit = (taskId: string, currentContent: string) => {
    setEditingTaskId(taskId);
    setEditingContent(currentContent);
  };

  const handleSaveEdit = (taskId: string) => {
    if (!profile || !suggestion) return;
    if (editingContent.trim() === '') {
      setEditingTaskId(null);
      return;
    }

    const updatedProfile = { ...profile };
    const suggestionIndex = updatedProfile.suggestions.findIndex(s => s.id === suggestion.id);
    if (suggestionIndex === -1) return;

    // 在 userTasks 中查找并更新任务
    const userTasks = updatedProfile.suggestions[suggestionIndex].userTasks || [];
    const task = userTasks.find(t => t.id === taskId);
    if (!task) return;

    task.content = editingContent.trim();
    updatedProfile.updatedAt = new Date().toISOString();

    saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setSuggestion(updatedProfile.suggestions[suggestionIndex]);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleBackToGrowth = () => {
    router.push('/growth');
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
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
    <div className="min-h-screen pt-8 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-teal-50">
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

          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                专注成长 🎯
              </h1>
              <p className="text-gray-600">
                聚焦于这一个目标,制定具体行动计划
              </p>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 flex-shrink-0 ml-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              生成成长卡片
            </button>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* 建议标题 */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm"
                   style={{ backgroundColor: '#02BD7D' }}>
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
              <div className="ml-11 bg-green-50 rounded-lg p-4 border border-green-100">
                <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span>📋</span>
                  <span>参考要点</span>
                </h4>
                <ul className="space-y-2">
                  {aiTasks.map((task, idx) => (
                    <li key={task.id} className="flex items-start gap-2 text-sm text-green-900">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-medium">
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
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              <span>思考这些问题,帮助你制定具体行动</span>
            </h3>

            {questionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-green-200 rounded-full animate-spin"
                       style={{ borderTopColor: '#02BD7D' }}></div>
                  <p className="text-sm text-gray-600">AI 正在为你生成专属引导问题...</p>
                </div>
              </div>
            ) : questionsError ? (
              <div className="text-center py-4">
                <p className="text-red-600 text-sm mb-3">{questionsError}</p>
                <ul className="space-y-3">
                  {guidingQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
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
                    <span className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
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
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none"
                style={{ borderColor: '#02BD7D' }}
              />
              <button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="px-6 py-3 text-white rounded-lg hover:bg-[#01a86a] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
                style={{ backgroundColor: '#02BD7D' }}
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
                  <div
                    key={task.id}
                    className={`flex items-start gap-3 p-4 rounded-lg transition-all ${
                      task.completed
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="mt-1 w-5 h-5 border-gray-300 rounded focus:ring-2 cursor-pointer flex-shrink-0"
                      style={{
                        accentColor: '#222226',
                        '--tw-ring-color': '#222226'
                      } as React.CSSProperties}
                      disabled={editingTaskId === task.id}
                    />

                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit(task.id);
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: '#02BD7D' }}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-1 ${
                          task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.content}
                      </span>
                    )}

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {task.completed && editingTaskId !== task.id && (
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <span>✓</span>
                          <span className="text-sm">已完成</span>
                        </span>
                      )}

                      {editingTaskId === task.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(task.id)}
                            className="text-green-600 hover:text-green-700 transition-colors p-1"
                            title="保存"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                            title="取消"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(task.id, task.content)}
                            className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                            title="编辑"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-gray-500 hover:text-red-600 transition-colors p-1"
                            title="删除"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
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
            <p className="text-green-700 mb-6">
              你的成长之树已经茁壮成长,继续保持这份动力!
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                生成我的成长卡片
              </button>
              <button
                onClick={handleBackToGrowth}
                className="px-6 py-3 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium border-2 border-gray-200 transition-all"
              >
                查看其他建议
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 分享卡片弹窗 */}
      {profile && (
        <ShareCardModal
          profile={profile}
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
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
