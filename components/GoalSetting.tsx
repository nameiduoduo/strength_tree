'use client';

import { useState } from 'react';

interface GoalSettingProps {
  onSubmit: (goal: string) => void;
  loading: boolean;
}

export default function GoalSetting({ onSubmit, loading }: GoalSettingProps) {
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    if (!goal.trim() || loading) return;
    onSubmit(goal.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {!loading ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              设定你的改变目标 🎯
            </h2>
            <p className="text-gray-600">
              基于刚才的对话和你的才干分析，请告诉我：接下来你想在哪方面做出改变或是想实现什么愿望？
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          💡 <strong>提示:</strong> 你可以分享具体的目标,比如:
        </p>
        <ul className="mt-2 text-sm text-gray-600 space-y-1 ml-6 list-disc">
          <li>想要提升某项工作技能</li>
          <li>希望改善人际关系</li>
          <li>想要开启一个新项目</li>
          <li>希望更好地发挥自己的优势</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          你的改变目标
        </label>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请详细描述你想要做出的改变..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none resize-none"
          style={{ borderColor: '#02BD7D' }}
          rows={6}
          disabled={loading}
        />
      </div>

          <button
            onClick={handleSubmit}
            disabled={!goal.trim() || loading}
            className="w-full px-6 py-4 text-white rounded-lg hover:bg-[#01a86a] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: '#02BD7D' }}
          >
            生成针对性建议
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-transparent rounded-full animate-spin"
                 style={{ borderTopColor: '#02BD7D', borderRightColor: '#02BD7D', borderBottomColor: '#02BD7D' }}></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              AI 正在为你生成专属建议...
            </h3>
            <p className="text-gray-600">
              基于你的才干和目标,精心定制成长方案
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>这可能需要几秒钟</span>
          </div>
        </div>
      )}
    </div>
  );
}
