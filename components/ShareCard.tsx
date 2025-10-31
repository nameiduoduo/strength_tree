'use client';

import { TalentLabel, GallupCategory } from '@/types';

interface ShareCardProps {
  talentLabel: TalentLabel;
  primaryCategory: GallupCategory;
}

export default function ShareCard({ talentLabel, primaryCategory }: ShareCardProps) {
  // 根据主导维度获取渐变背景
  const getGradientBackground = () => {
    switch (primaryCategory) {
      case '战略思维':
        return 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50';
      case '执行力':
        return 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100';
      case '影响力':
        return 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100';
      case '关系建立':
        return 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100';
      default:
        return 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50';
    }
  };

  // 根据主导维度获取强调色
  const getAccentColor = () => {
    switch (primaryCategory) {
      case '战略思维':
        return '#10b981'; // emerald-500
      case '执行力':
        return '#8b5cf6'; // violet-500
      case '影响力':
        return '#f59e0b'; // amber-500
      case '关系建立':
        return '#3b82f6'; // blue-500
      default:
        return '#10b981';
    }
  };

  const accentColor = getAccentColor();

  return (
    <div
      id="share-card"
      className={`relative ${getGradientBackground()} rounded-3xl shadow-2xl overflow-hidden`}
      style={{
        width: '1080px',
        minHeight: '1350px',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}
    >
      {/* 装饰性背景图案 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
             style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
             style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }} />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 px-20 py-24">
        {/* 头部 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-2 tracking-wide">
            我的盖洛普优势画像
          </h1>
        </div>

        {/* 标签卡片 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-12">
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="text-6xl">🏆</div>
            <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
              {talentLabel.label}
            </h2>
          </div>
          <p className="text-2xl text-gray-500 text-center leading-loose px-8 font-normal">
            {talentLabel.description}
          </p>
        </div>

        {/* 分隔线 */}
        <div className="flex items-center justify-center my-14">
          <div className="h-0.5 flex-1 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.25 }} />
          <div className="mx-8 text-4xl" style={{ color: accentColor }}>✦</div>
          <div className="h-0.5 flex-1 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.25 }} />
        </div>

        {/* 才干组合分析 */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-gray-800 text-center mb-14 tracking-wide">
            你的才干组合画像
          </h3>

          <div className="space-y-10">
            {talentLabel.talentCombinations.map((combination, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 shadow-xl"
              >
                <div className="flex items-start gap-8">
                  {/* Emoji */}
                  <div className="text-7xl flex-shrink-0 mt-1">
                    {combination.emoji}
                  </div>

                  <div className="flex-1 pt-2">
                    {/* 才干名称 */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      {combination.talents.map((talent, idx) => (
                        <span key={idx} className="flex items-center">
                          <span className="text-3xl font-bold tracking-wide" style={{ color: accentColor }}>
                            {talent}
                          </span>
                          {idx < combination.talents.length - 1 && (
                            <span className="text-3xl text-gray-300 mx-3">×</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* 分析文本 */}
                    <p className="text-2xl text-gray-500 leading-loose font-normal">
                      {combination.analysis}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部 Slogan */}
        <div className="text-center mt-20">
          <div className="inline-block px-12 py-5 rounded-full bg-white/80 backdrop-blur-sm shadow-xl">
            <p className="text-2xl text-gray-600 font-normal tracking-wide">
              “顺流而生，让优势顺着天性流动。”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
