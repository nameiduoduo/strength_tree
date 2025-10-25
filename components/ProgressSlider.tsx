'use client';

interface ProgressSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ProgressSlider({ value, onChange }: ProgressSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  // 根据进度值计算颜色
  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'from-gray-100 to-gray-200';
    if (progress <= 25) return 'from-blue-100 to-blue-200';
    if (progress <= 50) return 'from-blue-200 to-blue-300';
    if (progress <= 75) return 'from-blue-300 to-blue-400';
    if (progress < 100) return 'from-blue-400 to-blue-500';
    return 'from-green-400 to-green-500';
  };

  // 根据进度值获取文字颜色
  const getTextColor = (progress: number) => {
    if (progress === 0) return 'text-gray-600';
    if (progress < 100) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          设置你的目标完成度
        </label>
        <span className={`text-3xl font-bold ${getTextColor(value)} transition-colors duration-300`}>
          {value}%
        </span>
      </div>

      {/* 渐变色块容器 */}
      <div
        className={`relative rounded-2xl p-8 bg-gradient-to-r ${getProgressColor(value)} transition-all duration-500 ease-out shadow-lg`}
      >
        {/* 滑块输入 */}
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={value}
          onChange={handleChange}
          className="w-full h-3 bg-white/30 rounded-full appearance-none cursor-pointer backdrop-blur-sm
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-6
                     [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-webkit-slider-thumb]:shadow-xl
                     [&::-webkit-slider-thumb]:hover:scale-125
                     [&::-webkit-slider-thumb]:active:cursor-grabbing
                     [&::-webkit-slider-thumb]:active:scale-110
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:duration-200
                     [&::-moz-range-thumb]:w-6
                     [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:cursor-grab
                     [&::-moz-range-thumb]:shadow-xl
                     [&::-moz-range-thumb]:hover:scale-125
                     [&::-moz-range-thumb]:active:cursor-grabbing
                     [&::-moz-range-thumb]:active:scale-110
                     [&::-moz-range-thumb]:transition-transform
                     [&::-moz-range-thumb]:duration-200"
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
