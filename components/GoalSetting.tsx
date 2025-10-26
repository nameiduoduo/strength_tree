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
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          设定你的改变目标 🎯
        </h2>
        <p className="text-gray-600">
          基于刚才的对话和你的才干分析,请告诉我:接下来你想要在哪方面做出改变?
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
          disabled={loading}
        />
        <p className="mt-2 text-xs text-gray-500">
          提示: 按 Cmd+Enter 快速提交
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!goal.trim() || loading}
        className="w-full px-6 py-4 text-white rounded-lg hover:bg-[#01a86a] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-2"
        style={{ backgroundColor: loading ? undefined : '#02BD7D' }}
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
            AI正在生成针对性建议...
          </>
        ) : (
          '生成针对性建议'
        )}
      </button>
    </div>
  );
}
