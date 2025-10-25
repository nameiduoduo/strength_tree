'use client';

import { MBTIType } from '@/types';
import { MBTI_TYPES } from '@/lib/constants';

interface MBTISelectorProps {
  selectedMBTI: MBTIType | null;
  onSelect: (mbti: MBTIType) => void;
}

export default function MBTISelector({ selectedMBTI, onSelect }: MBTISelectorProps) {
  const groups = [
    { name: '分析家', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
    { name: '外交家', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
    { name: '守护者', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
    { name: '探险家', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          选择你的MBTI类型
        </h2>
        <p className="text-sm text-gray-500">
          还不知道你的MBTI类型? 可以去
          <a
            href="https://www.16personalities.com/ch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mx-1"
          >
            16Personalities
          </a>
          进行测试
        </p>
      </div>

      {groups.map(group => (
        <div key={group.name} className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">{group.name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {group.types.map(type => {
              const mbtiInfo = MBTI_TYPES.find(m => m.type === type);
              if (!mbtiInfo) return null;

              const isSelected = selectedMBTI === type;

              return (
                <button
                  key={type}
                  onClick={() => onSelect(type as MBTIType)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      {mbtiInfo.type}
                    </span>
                    {isSelected && (
                      <span className="text-purple-600">✓</span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    {mbtiInfo.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {mbtiInfo.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mbtiInfo.traits.slice(0, 2).map(trait => (
                      <span
                        key={trait}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedMBTI && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            已选择:
          </h3>
          {(() => {
            const mbtiInfo = MBTI_TYPES.find(m => m.type === selectedMBTI);
            if (!mbtiInfo) return null;

            return (
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {mbtiInfo.type} - {mbtiInfo.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {mbtiInfo.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mbtiInfo.traits.map(trait => (
                      <span
                        key={trait}
                        className="text-xs px-2 py-1 bg-white text-gray-700 rounded-full border border-purple-200"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
