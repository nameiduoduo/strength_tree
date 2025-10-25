'use client';

interface DynamicGrowthTreeProps {
  progress: number; // 0-100
}

export default function DynamicGrowthTree({ progress }: DynamicGrowthTreeProps) {
  // 根据进度确定阶段
  const getStage = () => {
    if (progress === 0) return 'empty';
    if (progress <= 20) return 'seed';
    if (progress <= 40) return 'sprout';
    if (progress <= 60) return 'seedling';
    if (progress <= 80) return 'tree';
    return 'grown-tree';
  };

  const stage = getStage();

  // 阶段对应的emoji和名称
  const stageInfo = {
    empty: { emoji: '🌾', name: '准备开始', color: 'text-gray-400' },
    seed: { emoji: '🌾', name: '种子', color: 'text-amber-600' },
    sprout: { emoji: '🌱', name: '发芽', color: 'text-green-500' },
    seedling: { emoji: '🌿', name: '幼苗', color: 'text-green-600' },
    tree: { emoji: '🌳', name: '小树', color: 'text-green-700' },
    'grown-tree': { emoji: '🌲', name: '大树', color: 'text-green-800' }
  };

  const currentStage = stageInfo[stage as keyof typeof stageInfo];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
      {/* 成长阶段 */}
      <div className="mb-6 text-center">
        <div className={`text-8xl mb-4 ${currentStage.color} transition-all duration-500`}>
          {currentStage.emoji}
        </div>
        <h3 className={`text-2xl font-bold ${currentStage.color}`}>
          {currentStage.name}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {progress === 0 && '设定你的目标进度,开始成长之旅'}
          {progress > 0 && progress < 100 && '继续努力,你的成长之树正在茁壮成长'}
          {progress === 100 && '恭喜!你已经完成了这个目标 🎉'}
        </p>
      </div>

      {/* 进度显示 */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">成长进度</span>
          <span className="text-2xl font-bold text-green-600">{progress}%</span>
        </div>

        {/* 进度条 */}
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 阶段标记 */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={progress >= 0 ? 'text-green-600 font-medium' : ''}>0%</span>
          <span className={progress >= 20 ? 'text-green-600 font-medium' : ''}>20%</span>
          <span className={progress >= 40 ? 'text-green-600 font-medium' : ''}>40%</span>
          <span className={progress >= 60 ? 'text-green-600 font-medium' : ''}>60%</span>
          <span className={progress >= 80 ? 'text-green-600 font-medium' : ''}>80%</span>
          <span className={progress >= 100 ? 'text-green-600 font-medium' : ''}>100%</span>
        </div>
      </div>

      {/* 鼓励语 */}
      {progress > 0 && progress < 100 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 italic">
            {progress <= 20 && '"每一粒种子都蕴含着无限可能"'}
            {progress > 20 && progress <= 40 && '"破土而出的那一刻,是勇气的见证"'}
            {progress > 40 && progress <= 60 && '"向阳而生,不惧风雨"'}
            {progress > 60 && progress <= 80 && '"枝繁叶茂,根深蒂固"'}
            {progress > 80 && progress < 100 && '"即将成为参天大树"'}
          </p>
        </div>
      )}
    </div>
  );
}
