'use client';

interface ProgressSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ProgressSlider({ value, onChange }: ProgressSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          设置你的目标完成度
        </label>
        <span className="text-3xl font-bold text-blue-600">{value}%</span>
      </div>

      <div className="relative">
        {/* 滑块 */}
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={value}
          onChange={handleChange}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-6
                     [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:bg-blue-600
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:hover:bg-blue-700
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-moz-range-thumb]:w-6
                     [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:bg-blue-600
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:shadow-lg
                     [&::-moz-range-thumb]:hover:bg-blue-700
                     [&::-moz-range-thumb]:transition-all"
        />

        {/* 进度条背景 */}
        <div
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg pointer-events-none transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>

      {/* 快捷按钮 */}
      <div className="flex gap-2 flex-wrap">
        {[0, 25, 50, 75, 100].map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              value === preset
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>

      {/* 提示文本 */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>小提示:</strong></p>
        <ul className="ml-4 space-y-1">
          <li>• 0%: 还没有开始</li>
          <li>• 25%: 已经迈出第一步</li>
          <li>• 50%: 完成了一半</li>
          <li>• 75%: 接近完成</li>
          <li>• 100%: 完全达成目标 🎉</li>
        </ul>
      </div>
    </div>
  );
}
