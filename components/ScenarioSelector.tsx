'use client';

import { ScenarioType } from '@/types';
import { SCENARIOS } from '@/lib/constants';

interface ScenarioSelectorProps {
  selectedScenario: ScenarioType | null;
  onSelect: (scenario: ScenarioType) => void;
}

export default function ScenarioSelector({ selectedScenario, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
       今天你想先从哪里开始发展你的优势？
      </h2>
      <p className="text-sm text-gray-500">
        AI将根据你选择的场景，提供针对性的成长建议
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SCENARIOS.map(scenario => {
          const isSelected = selectedScenario === scenario.value;

          return (
            <button
              key={scenario.value}
              onClick={() => onSelect(scenario.value as ScenarioType)}
              className={`p-6 rounded-xl border-2 text-center transition-all ${
                isSelected
                  ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-3">{scenario.icon}</div>
              <div className="text-lg font-bold text-gray-900 mb-2">
                {scenario.label}
              </div>
              <div className="text-sm text-gray-600">
                {scenario.description}
              </div>
              {isSelected && (
                <div className="mt-3 text-green-600 font-semibold">
                  ✓ 已选择
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
