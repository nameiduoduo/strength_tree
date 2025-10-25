'use client';

import { Analysis } from '@/types';

interface InitialAnalysisProps {
  analysis: Analysis;
}

export default function InitialAnalysis({ analysis }: InitialAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          你的个性化解读 ✨
        </h2>
        <p className="text-sm text-gray-600">
          AI已经为你分析了才干组合和性格特点
        </p>
      </div>

      {/* 才干组合解读 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h3 className="text-xl font-bold text-gray-900">
            才干组合解读
          </h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {analysis.talentsAnalysis}
        </p>
      </div>

      {/* MBTI协同分析 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧠</span>
          <h3 className="text-xl font-bold text-gray-900">
            MBTI协同分析
          </h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {analysis.synergyAnalysis}
        </p>
      </div>

      {/* 提示文字 */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-500">
          接下来，请选择你想要深入探索的场景，获取专属行动建议
        </p>
      </div>
    </div>
  );
}
