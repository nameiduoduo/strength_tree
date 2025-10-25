'use client';

import { GallupCategory } from '@/types';

interface CategorySelectorProps {
  selectedCategories: GallupCategory[];
  onSelect: (categories: GallupCategory[]) => void;
}

const categories: { name: GallupCategory; description: string; color: string; bg: string; border: string }[] = [
  {
    name: '战略思维',
    description: '善于接收和分析信息,制定更优决策',
    color: '#499167',
    bg: 'bg-[#499167]',
    border: 'border-[#499167]'
  },
  {
    name: '关系建立',
    description: '能将团队凝聚在一起,打造更强大的整体',
    color: '#376fb2',
    bg: 'bg-[#376fb2]',
    border: 'border-[#376fb2]'
  },
  {
    name: '影响力',
    description: '帮助团队勇于发声,确保被外界听到',
    color: '#cf773c',
    bg: 'bg-[#cf773c]',
    border: 'border-[#cf773c]'
  },
  {
    name: '执行力',
    description: '把想法变为现实,让事情完成',
    color: '#70347F',
    bg: 'bg-[#70347F]',
    border: 'border-[#70347F]'
  }
];

export default function CategorySelector({ selectedCategories, onSelect }: CategorySelectorProps) {
  const handleToggle = (category: GallupCategory) => {
    const isSelected = selectedCategories.includes(category);

    if (isSelected) {
      // 取消选择
      onSelect(selectedCategories.filter(c => c !== category));
    } else {
      // 选择(最多4个)
      if (selectedCategories.length < 4) {
        onSelect([...selectedCategories, category]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          选择你的4个维度优先级
        </h2>
        <span className="text-sm text-gray-500">
          已选择 {selectedCategories.length}/4
        </span>
      </div>

      <p className="text-sm text-gray-600">
        请按照对你最重要的顺序,依次选择4个盖洛普维度。这将帮助我们更好地理解你的优势分布。
      </p>

      {/* 维度列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.name);
          const selectionIndex = selectedCategories.indexOf(category.name);

          return (
            <button
              key={category.name}
              onClick={() => handleToggle(category.name)}
              disabled={!isSelected && selectedCategories.length >= 4}
              className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? `${category.border} bg-white shadow-lg`
                  : selectedCategories.length >= 4
                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <span className={`absolute top-4 right-4 w-8 h-8 ${category.bg} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                  {selectionIndex + 1}
                </span>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${category.bg} rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                  {category.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 已选择的维度显示 */}
      {selectedCategories.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            你的维度优先级:
          </h3>
          <div className="space-y-2">
            {selectedCategories.map((categoryName, index) => {
              const category = categories.find(c => c.name === categoryName)!;
              return (
                <div
                  key={categoryName}
                  className={`flex items-center gap-3 px-4 py-3 bg-white rounded-lg border ${category.border}`}
                >
                  <span className={`text-sm font-bold ${category.bg} text-white w-6 h-6 rounded-full flex items-center justify-center`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 font-medium text-gray-900">{categoryName}</span>
                  <button
                    onClick={() => handleToggle(categoryName)}
                    className="text-gray-400 hover:text-red-500 text-xl"
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
