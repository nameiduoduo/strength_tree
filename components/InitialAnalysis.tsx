'use client';

import { Analysis } from '@/types';
import { CATEGORY_COLORS } from '@/lib/constants';

interface InitialAnalysisProps {
  analysis: Analysis;
}

// 获取才干图标
function getTalentIcon(category: string): string {
  switch (category) {
    case '执行力': return '⚡';
    case '影响力': return '🎯';
    case '关系建立': return '💙';
    case '战略思维': return '🧠';
    default: return '✨';
  }
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

      {/* 每个才干的单独解读 */}
      <div className="space-y-4">
        {analysis.individualTalents.map((talentAnalysis, index) => {
          const colors = CATEGORY_COLORS[talentAnalysis.category];
          const icon = getTalentIcon(talentAnalysis.category);

          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${colors.gradient} rounded-xl p-5 border ${colors.border}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <h3 className={`text-lg font-bold ${colors.text}`}>
                  {talentAnalysis.talent}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {talentAnalysis.category}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {talentAnalysis.analysis}
              </p>
            </div>
          );
        })}
      </div>

      {/* 整体解读 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌟</span>
          <h3 className="text-xl font-bold text-gray-900">
            整体解读
          </h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {analysis.overallAnalysis}
        </p>
      </div>

      {/* MBTI分析 */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧠</span>
          <h3 className="text-xl font-bold text-gray-900">
            MBTI分析
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
