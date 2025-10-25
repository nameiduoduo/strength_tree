'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserProfile, Suggestion } from '@/types';
import { loadProfile } from '@/lib/storage';
import DynamicGrowthTree from '@/components/DynamicGrowthTree';
import ProgressSlider from '@/components/ProgressSlider';

function FocusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const suggestionId = searchParams.get('id');

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [focusProgress, setFocusProgress] = useState(0);
  const [loading, setLoading] = useState(true);

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

    // 从localStorage读取该建议的专注进度
    const savedFocusProgress = localStorage.getItem(`focus-progress-${suggestionId}`);
    if (savedFocusProgress) {
      setFocusProgress(Number(savedFocusProgress));
    }

    setLoading(false);
  }, [suggestionId, router]);

  const handleProgressChange = (newProgress: number) => {
    setFocusProgress(newProgress);
    // 保存到localStorage
    if (suggestionId) {
      localStorage.setItem(`focus-progress-${suggestionId}`, String(newProgress));
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <button
            onClick={handleBackToGrowth}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <span>←</span>
            <span>返回成长树</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            专注成长 🎯
          </h1>
          <p className="text-gray-600">
            聚焦于这一个目标,持续追踪你的进展
          </p>
        </div>

        {/* 建议卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {profile.suggestions.findIndex(s => s.id === suggestion.id) + 1}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {suggestion.title}
              </h2>
              <p className="text-gray-700 mb-6">
                {suggestion.description}
              </p>

              {/* 任务列表 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  具体任务:
                </h3>
                {suggestion.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="flex-shrink-0 text-gray-500">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{task.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 成长树展示 */}
        <div className="mb-8">
          <DynamicGrowthTree progress={focusProgress} />
        </div>

        {/* 进度滑块 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ProgressSlider
            value={focusProgress}
            onChange={handleProgressChange}
          />
        </div>

        {/* 完成提示 */}
        {focusProgress === 100 && (
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
