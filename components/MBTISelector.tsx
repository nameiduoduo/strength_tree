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

  // MBTI类型颜色映射
  const typeColors: Record<string, { bg: string; border: string; text: string; hover: string; lightBg: string; checkmark: string }> = {
    'INTJ': { bg: 'bg-[#825F94]', border: 'border-[#825F94]', text: 'text-[#825F94]', hover: 'hover:border-[#9b7aab]', lightBg: 'bg-[#825F94]/10', checkmark: 'text-[#825F94]' },
    'INTP': { bg: 'bg-[#825F94]', border: 'border-[#825F94]', text: 'text-[#825F94]', hover: 'hover:border-[#9b7aab]', lightBg: 'bg-[#825F94]/10', checkmark: 'text-[#825F94]' },
    'ENTJ': { bg: 'bg-[#825F94]', border: 'border-[#825F94]', text: 'text-[#825F94]', hover: 'hover:border-[#9b7aab]', lightBg: 'bg-[#825F94]/10', checkmark: 'text-[#825F94]' },
    'ENTP': { bg: 'bg-[#825F94]', border: 'border-[#825F94]', text: 'text-[#825F94]', hover: 'hover:border-[#9b7aab]', lightBg: 'bg-[#825F94]/10', checkmark: 'text-[#825F94]' },
    'INFJ': { bg: 'bg-[#329D6E]', border: 'border-[#329D6E]', text: 'text-[#329D6E]', hover: 'hover:border-[#4db588]', lightBg: 'bg-[#329D6E]/10', checkmark: 'text-[#329D6E]' },
    'INFP': { bg: 'bg-[#329D6E]', border: 'border-[#329D6E]', text: 'text-[#329D6E]', hover: 'hover:border-[#4db588]', lightBg: 'bg-[#329D6E]/10', checkmark: 'text-[#329D6E]' },
    'ENFJ': { bg: 'bg-[#329D6E]', border: 'border-[#329D6E]', text: 'text-[#329D6E]', hover: 'hover:border-[#4db588]', lightBg: 'bg-[#329D6E]/10', checkmark: 'text-[#329D6E]' },
    'ENFP': { bg: 'bg-[#329D6E]', border: 'border-[#329D6E]', text: 'text-[#329D6E]', hover: 'hover:border-[#4db588]', lightBg: 'bg-[#329D6E]/10', checkmark: 'text-[#329D6E]' },
    'ISTJ': { bg: 'bg-[#3D91AB]', border: 'border-[#3D91AB]', text: 'text-[#3D91AB]', hover: 'hover:border-[#5fa9c0]', lightBg: 'bg-[#3D91AB]/10', checkmark: 'text-[#3D91AB]' },
    'ISFJ': { bg: 'bg-[#3D91AB]', border: 'border-[#3D91AB]', text: 'text-[#3D91AB]', hover: 'hover:border-[#5fa9c0]', lightBg: 'bg-[#3D91AB]/10', checkmark: 'text-[#3D91AB]' },
    'ESTJ': { bg: 'bg-[#3D91AB]', border: 'border-[#3D91AB]', text: 'text-[#3D91AB]', hover: 'hover:border-[#5fa9c0]', lightBg: 'bg-[#3D91AB]/10', checkmark: 'text-[#3D91AB]' },
    'ESFJ': { bg: 'bg-[#3D91AB]', border: 'border-[#3D91AB]', text: 'text-[#3D91AB]', hover: 'hover:border-[#5fa9c0]', lightBg: 'bg-[#3D91AB]/10', checkmark: 'text-[#3D91AB]' },
    'ISTP': { bg: 'bg-[#DCAA3A]', border: 'border-[#DCAA3A]', text: 'text-[#DCAA3A]', hover: 'hover:border-[#e4bc61]', lightBg: 'bg-[#DCAA3A]/10', checkmark: 'text-[#DCAA3A]' },
    'ISFP': { bg: 'bg-[#DCAA3A]', border: 'border-[#DCAA3A]', text: 'text-[#DCAA3A]', hover: 'hover:border-[#e4bc61]', lightBg: 'bg-[#DCAA3A]/10', checkmark: 'text-[#DCAA3A]' },
    'ESTP': { bg: 'bg-[#DCAA3A]', border: 'border-[#DCAA3A]', text: 'text-[#DCAA3A]', hover: 'hover:border-[#e4bc61]', lightBg: 'bg-[#DCAA3A]/10', checkmark: 'text-[#DCAA3A]' },
    'ESFP': { bg: 'bg-[#DCAA3A]', border: 'border-[#DCAA3A]', text: 'text-[#DCAA3A]', hover: 'hover:border-[#e4bc61]', lightBg: 'bg-[#DCAA3A]/10', checkmark: 'text-[#DCAA3A]' },
  };

  // 获取MBTI类型颜色
  const getTypeColor = (type: string) => {
    return typeColors[type] || typeColors['INTJ']; // 默认使用紫色
  };

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
              const colors = getTypeColor(type);

              return (
                <button
                  key={type}
                  onClick={() => onSelect(type as MBTIType)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? `${colors.border} ${colors.lightBg} shadow-lg`
                      : `border-gray-200 bg-white ${colors.hover} hover:shadow-md`
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      {mbtiInfo.type}
                    </span>
                    {isSelected && (
                      <span className={colors.checkmark}>✓</span>
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
        <div className={`mt-6 p-4 ${getTypeColor(selectedMBTI).lightBg} rounded-lg`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            已选择:
          </h3>
          {(() => {
            const mbtiInfo = MBTI_TYPES.find(m => m.type === selectedMBTI);
            if (!mbtiInfo) return null;
            const colors = getTypeColor(selectedMBTI);

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
                        className={`text-xs px-2 py-1 bg-white text-gray-700 rounded-full border ${colors.border}`}
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
