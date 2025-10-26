'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/types';
import { loadProfile, saveProfile, calculateProgress } from '@/lib/storage';
import TaskChecklist from '@/components/TaskChecklist';

export default function GrowthPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    // 加载用户档案
    const savedProfile = loadProfile();
    if (!savedProfile) {
      // 如果没有档案,跳转到首页
      router.push('/');
      return;
    }
    setProfile(savedProfile);
    setLoading(false);
  }, [router]);

  const handleTaskToggle = (suggestionId: string, taskId: string) => {
    if (!profile) return;

    const updatedProfile = { ...profile };
    const suggestion = updatedProfile.suggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    const task = suggestion.tasks.find(t => t.id === taskId);
    if (!task) return;

    // 切换任务状态
    task.completed = !task.completed;

    // 重新计算进度
    updatedProfile.progress = calculateProgress(updatedProfile);
    updatedProfile.updatedAt = new Date().toISOString();

    // 保存并更新状态
    saveProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  const handleReset = () => {
    if (confirm('确定要重新开始吗?这将清除当前所有数据。')) {
      localStorage.removeItem('gallup-profile');
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen pt-8 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              你的行动建议 🌱
            </h1>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              重新开始
            </button>
          </div>

          {/* 用户信息 */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">维度优先级:</span>
                <div className="flex gap-2">
                  {profile.categories.map((cat, i) => {
                    const categoryColors: Record<string, { bg: string; text: string }> = {
                      '执行力': { bg: '#70347F', text: '#ffffff' },
                      '影响力': { bg: '#cf773c', text: '#ffffff' },
                      '关系建立': { bg: '#376fb2', text: '#ffffff' },
                      '战略思维': { bg: '#499167', text: '#ffffff' }
                    };
                    const colors = categoryColors[cat] || { bg: '#94a3b8', text: '#ffffff' };
                    return (
                      <span
                        key={cat}
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                      >
                        {i + 1}. {cat}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">才干排序(前10):</span>
                <span className="text-xs text-gray-700">
                  {profile.talents.slice(0, 10).join('、')}...
                </span>
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="ml-auto text-sm text-blue-600 hover:underline"
                >
                  {showAnalysis ? '隐藏详情' : '查看详情'}
                </button>
              </div>
            </div>
          </div>

          {/* AI解读(可折叠) */}
          {showAnalysis && profile.analysis && (
            <div className="bg-white rounded-lg shadow p-6 mb-4 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">完整才干排序</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {profile.talents.map((talent, i) => (
                    <div key={talent} className="text-sm">
                      <span className="text-gray-500">{i + 1}.</span>{' '}
                      <span className="text-gray-900">{talent}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">整体分析</h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.analysis.overallAnalysis}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">维度协同分析</h3>
                <p className="text-gray-700 whitespace-pre-line">{profile.analysis.categoryAnalysis}</p>
              </div>
            </div>
          )}
        </div>

        {/* 建议列表 */}
        <div>
          <TaskChecklist
            suggestions={profile.suggestions}
            onTaskToggle={handleTaskToggle}
          />
        </div>
      </div>
    </div>
  );
}
