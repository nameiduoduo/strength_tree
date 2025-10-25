'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GallupTalent, MBTIType, ScenarioType, Analysis } from '@/types';
import TalentSelector from '@/components/TalentSelector';
import MBTISelector from '@/components/MBTISelector';
import ScenarioSelector from '@/components/ScenarioSelector';
import InitialAnalysis from '@/components/InitialAnalysis';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [talents, setTalents] = useState<GallupTalent[]>([]);
  const [mbti, setMBTI] = useState<MBTIType | null>(null);
  const [initialAnalysis, setInitialAnalysis] = useState<Analysis | null>(null);
  const [scenario, setScenario] = useState<ScenarioType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canProceedStep1 = talents.length === 5;
  const canProceedStep2 = mbti !== null;
  const canProceedStep3 = initialAnalysis !== null;
  const canProceedStep4 = scenario !== null;

  // 步骤2完成后：生成初步解读
  const handleStep2Complete = async () => {
    if (!mbti) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/initial-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talents, mbti }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '分析失败');
      }

      const data = await response.json();
      setInitialAnalysis(data.analysis);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 步骤4完成后：生成场景建议
  const handleFinalSubmit = async () => {
    if (!canProceedStep4 || !mbti || !scenario || !initialAnalysis) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/scenario-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talents, mbti, scenario, initialAnalysis }),
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
        mbti,
        analysis: initialAnalysis,
        scenario,
        suggestions: data.suggestions,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 保存到localStorage
      localStorage.setItem('gallup-mbti-profile', JSON.stringify(profile));

      // 跳转到成长树页面
      router.push('/growth');
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            发现你的独特优势 🌱
          </h1>
          <p className="text-lg text-gray-600">
            结合盖洛普优势和MBTI性格,AI为你打造专属成长路径
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
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
            <MBTISelector
              selectedMBTI={mbti}
              onSelect={setMBTI}
            />
          )}

          {step === 3 && initialAnalysis && (
            <InitialAnalysis analysis={initialAnalysis} />
          )}

          {step === 4 && (
            <ScenarioSelector
              selectedScenario={scenario}
              onSelect={setScenario}
            />
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* 底部按钮 */}
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
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一步
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleStep2Complete}
              disabled={!canProceedStep2 || loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  AI正在分析中...
                </>
              ) : (
                '生成解读'
              )}
            </button>
          )}

          {step === 3 && (
            <button
              onClick={() => setStep(4)}
              disabled={!canProceedStep3}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              选择场景
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleFinalSubmit}
              disabled={!canProceedStep4 || loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  AI正在生成建议...
                </>
              ) : (
                '生成行动建议'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
