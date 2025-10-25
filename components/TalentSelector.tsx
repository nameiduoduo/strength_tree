'use client';

import { useState } from 'react';
import { GallupTalent } from '@/types';
import { GALLUP_TALENTS } from '@/lib/constants';

interface TalentSelectorProps {
  selectedTalents: GallupTalent[];
  onSelect: (talents: GallupTalent[]) => void;
}

export default function TalentSelector({ selectedTalents, onSelect }: TalentSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', '执行力', '影响力', '关系建立', '战略思维'];

  // 维度颜色映射
  const categoryColors: Record<string, { bg: string; border: string; text: string; hover: string; lightBg: string }> = {
    '全部': {
      bg: 'bg-black',
      border: 'border-black',
      text: 'text-black',
      hover: 'hover:border-gray-700',
      lightBg: 'bg-gray-50'
    },
    '执行力': {
      bg: 'bg-[#70347F]',
      border: 'border-[#70347F]',
      text: 'text-[#70347F]',
      hover: 'hover:border-[#8d4fa0]',
      lightBg: 'bg-[#70347F]/10'
    },
    '影响力': {
      bg: 'bg-[#cf773c]',
      border: 'border-[#cf773c]',
      text: 'text-[#cf773c]',
      hover: 'hover:border-[#e09560]',
      lightBg: 'bg-[#cf773c]/10'
    },
    '关系建立': {
      bg: 'bg-[#376fb2]',
      border: 'border-[#376fb2]',
      text: 'text-[#376fb2]',
      hover: 'hover:border-[#5a8cc5]',
      lightBg: 'bg-[#376fb2]/10'
    },
    '战略思维': {
      bg: 'bg-[#499167]',
      border: 'border-[#499167]',
      text: 'text-[#499167]',
      hover: 'hover:border-[#65a882]',
      lightBg: 'bg-[#499167]/10'
    }
  };

  const filteredTalents = selectedCategory === '全部'
    ? GALLUP_TALENTS
    : GALLUP_TALENTS.filter(t => t.category === selectedCategory);

  const handleToggle = (talent: GallupTalent) => {
    const isSelected = selectedTalents.includes(talent);

    if (isSelected) {
      // 取消选择
      onSelect(selectedTalents.filter(t => t !== talent));
    } else {
      // 选择(最多34个)
      if (selectedTalents.length < 34) {
        onSelect([...selectedTalents, talent]);
      }
    }
  };

  // 获取才干对应的维度颜色
  const getTalentColor = (talentName: GallupTalent) => {
    const talent = GALLUP_TALENTS.find(t => t.name === talentName);
    return talent ? categoryColors[talent.category] : categoryColors['全部'];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          选择你的34项盖洛普才干
        </h2>
        <span className="text-sm text-gray-500">
          已选择 {selectedTalents.length}/34
        </span>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const colors = categoryColors[category];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? `${colors.bg} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 才干列表 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredTalents.map(talent => {
          const isSelected = selectedTalents.includes(talent.name);
          const selectionIndex = selectedTalents.indexOf(talent.name);
          const talentColors = categoryColors[talent.category];

          return (
            <button
              key={talent.name}
              onClick={() => handleToggle(talent.name)}
              disabled={!isSelected && selectedTalents.length >= 34}
              className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? `${talentColors.border} ${talentColors.lightBg}`
                  : selectedTalents.length >= 34
                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  : `border-gray-200 bg-white ${talentColors.hover} hover:shadow-md`
              }`}
              title={talent.description}
            >
              {isSelected && (
                <span className={`absolute top-2 right-2 w-6 h-6 ${talentColors.bg} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                  {selectionIndex + 1}
                </span>
              )}
              <div className="font-semibold text-gray-900">{talent.name}</div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                {talent.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* 已选择的才干显示 */}
      {selectedTalents.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            已选择的才干:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedTalents.map((talent, index) => {
              const talentColor = getTalentColor(talent);
              return (
                <div
                  key={talent}
                  className={`flex items-center gap-2 px-3 py-1 bg-white rounded-full border ${talentColor.border}`}
                >
                  <span className={`text-xs font-bold ${talentColor.text}`}>{index + 1}</span>
                  <span className="text-sm text-gray-900">{talent}</span>
                  <button
                    onClick={() => handleToggle(talent)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
