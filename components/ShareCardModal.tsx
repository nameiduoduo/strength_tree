'use client';

import { useState, useEffect } from 'react';
import { UserProfile, TalentLabel } from '@/types';
import { saveProfile } from '@/lib/storage';
import ShareCard from './ShareCard';
import { toPng } from 'html-to-image';

interface ShareCardModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (updatedProfile: UserProfile) => void;
}

export default function ShareCardModal({
  profile,
  isOpen,
  onClose,
  onProfileUpdate
}: ShareCardModalProps) {
  const [talentLabel, setTalentLabel] = useState<TalentLabel | null>(profile.talentLabel || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 生成才干标签
  const generateTalentLabel = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-talent-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          talents: profile.talents,
          categories: profile.categories
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成失败');
      }

      const data = await response.json();

      const newLabel: TalentLabel = {
        label: data.label,
        description: data.description,
        talentCombinations: data.talentCombinations,
        generatedAt: new Date().toISOString()
      };

      setTalentLabel(newLabel);

      // 保存到 profile
      const updatedProfile: UserProfile = {
        ...profile,
        talentLabel: newLabel,
        updatedAt: new Date().toISOString()
      };

      saveProfile(updatedProfile);
      onProfileUpdate(updatedProfile);

    } catch (err) {
      console.error('生成才干标签失败:', err);
      setError(err instanceof Error ? err.message : '生成失败,请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 首次打开时,如果没有标签,自动生成
  useEffect(() => {
    if (isOpen && !talentLabel && !isGenerating && !error) {
      generateTalentLabel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 下载卡片为图片
  const handleDownload = async () => {
    if (!talentLabel) return;

    setIsDownloading(true);

    try {
      const cardElement = document.getElementById('share-card');
      if (!cardElement) {
        throw new Error('未找到卡片元素');
      }

      // 转换为 PNG
      const dataUrl = await toPng(cardElement, {
        width: 1080,
        height: cardElement.scrollHeight,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });

      // 触发下载
      const link = document.createElement('a');
      link.download = `我的盖洛普优势画像_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

    } catch (err) {
      console.error('下载失败:', err);
      alert('下载失败,请重试');
    } finally {
      setIsDownloading(false);
    }
  };

  // 重新生成
  const handleRegenerate = () => {
    if (confirm('确定要重新生成才干标签吗?')) {
      generateTalentLabel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="关闭"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 内容区域 */}
        <div className="overflow-y-auto max-h-[90vh] p-8">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin mb-6"
                   style={{ borderTopColor: '#10b981' }} />
              <p className="text-xl text-gray-700 mb-2">AI 正在为你生成专属画像...</p>
              <p className="text-sm text-gray-500">这可能需要10-20秒,请耐心等待</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-6">😞</div>
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={() => generateTalentLabel()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                重试
              </button>
            </div>
          )}

          {!isGenerating && !error && talentLabel && (
            <>
              {/* 操作按钮 - 移到顶部 */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      下载中...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      保存到相册
                    </span>
                  )}
                </button>

                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    重新生成
                  </span>
                </button>
              </div>

              {/* 提示文本 */}
              <p className="text-center text-sm text-gray-500 mb-6">
                💡 提示:下载后可分享到朋友圈、微博等社交平台
              </p>

              {/* 卡片预览 */}
              <div className="flex justify-center overflow-x-auto">
                <div className="transform scale-[0.4] sm:scale-[0.45] md:scale-50 origin-top mx-auto">
                  <ShareCard
                    talentLabel={talentLabel}
                    primaryCategory={profile.categories[0]}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
