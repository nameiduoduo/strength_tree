'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GallupTalent, GallupCategory } from '@/types';
import TalentSelector from '@/components/TalentSelector';
import CategorySelector from '@/components/CategorySelector';
import TalentChatAnalysis from '@/components/TalentChatAnalysis';
import GoalSetting from '@/components/GoalSetting';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [talents, setTalents] = useState<GallupTalent[]>([]);
  const [categories, setCategories] = useState<GallupCategory[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canProceedStep1 = talents.length === 34;
  const canProceedStep2 = categories.length === 4;

  // 步骤3完成后：保存对话历史,进入步骤4
  const handleChatComplete = (history: Message[]) => {
    setChatHistory(history);
    setStep(4);
  };

  // 步骤4完成后：生成最终建议并跳转
  const handleGoalSubmit = async (goal: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/final-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talents, categories, chatHistory, goal }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成建议失败');
      }

      const data = await response.json();

      // 创建用户档案并保存
      const profile = {
        id: `profile-${Date.now()}`,
        talents,
        categories,
        analysis: data.analysis,
        suggestions: data.suggestions,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 保存到localStorage
      localStorage.setItem('gallup-profile', JSON.stringify(profile));

      // 跳转到成长树页面
      router.push('/growth');
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            如何发挥你的优势？从此处开始 🌱
          </h1>
          <p className="text-lg text-gray-600">
            {step <= 2 && '按顺序选择你的34项才干和4个维度'}
            {step === 3 && '分享你的经历，深入了解你的才干是如何帮你取得成功的，这是你和其他人截然不同的原因。'}
            {step === 4 && '设定改变目标,获取针对性建议'}
          </p>
        </div>

        {/* 进度指示器 */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={step >= s ? { backgroundColor: '#02BD7D' } : undefined}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s ? '' : 'bg-gray-200'
                    }`}
                    style={step > s ? { backgroundColor: '#02BD7D' } : undefined}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 主内容区 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {step === 1 && (
            <TalentSelector
              selectedTalents={talents}
              onSelect={setTalents}
            />
          )}

          {step === 2 && (
            <CategorySelector
              selectedCategories={categories}
              onSelect={setCategories}
            />
          )}

          {step === 3 && (
            <TalentChatAnalysis
              talents={talents}
              categories={categories}
              onComplete={handleChatComplete}
            />
          )}

          {step === 4 && (
            <GoalSetting
              onSubmit={handleGoalSubmit}
              loading={loading}
            />
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        {step <= 2 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1 || loading}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="px-8 py-3 text-white rounded-lg font-medium hover:bg-[#1a1a1e] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#222226' }}
              >
                下一步
              </button>
            )}

            {step === 2 && (
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="px-8 py-3 text-white rounded-lg font-medium hover:bg-[#1a1a1e] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#222226' }}
              >
                开始对话分析
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
