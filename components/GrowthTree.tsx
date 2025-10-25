'use client';

import { motion } from 'framer-motion';
import { TreeStage } from '@/types';

interface GrowthTreeProps {
  progress: number; // 0-100
}

function getTreeStage(progress: number): TreeStage {
  if (progress === 0) return 'seed';
  if (progress <= 20) return 'seed';
  if (progress <= 40) return 'sprout';
  if (progress <= 60) return 'seedling';
  if (progress <= 80) return 'tree';
  return 'grown-tree';
}

export default function GrowthTree({ progress }: GrowthTreeProps) {
  const stage = getTreeStage(progress);

  const stageInfo = {
    seed: { name: '种子', emoji: '🌰', color: '#8B4513', description: '开始你的成长之旅' },
    sprout: { name: '发芽', emoji: '🌱', color: '#90EE90', description: '新的开始正在萌芽' },
    seedling: { name: '幼苗', emoji: '🌿', color: '#3CB371', description: '稳步成长中' },
    tree: { name: '小树', emoji: '🌳', color: '#228B22', description: '茁壮成长' },
    'grown-tree': { name: '大树', emoji: '🌲', color: '#006400', description: '枝繁叶茂!' },
  };

  const info = stageInfo[stage];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl">
      {/* 进度显示 */}
      <div className="mb-6 text-center">
        <div className="text-sm font-semibold text-gray-600 mb-2">
          成长进度
        </div>
        <div className="text-4xl font-bold text-gray-900">
          {progress}%
        </div>
      </div>

      {/* 树的动画 */}
      <motion.div
        key={stage}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center mb-6"
      >
        <div className="text-9xl mb-4" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
          {info.emoji}
        </div>
        <div className="text-2xl font-bold mb-2" style={{ color: info.color }}>
          {info.name}
        </div>
        <div className="text-sm text-gray-600">
          {info.description}
        </div>
      </motion.div>

      {/* 进度条 */}
      <div className="w-full max-w-md">
        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          />
        </div>

        {/* 阶段标记 */}
        <div className="relative flex justify-between mt-2 text-xs text-gray-500">
          {[0, 20, 40, 60, 80, 100].map((mark) => (
            <div
              key={mark}
              className={`text-center ${progress >= mark ? 'font-bold text-green-600' : ''}`}
            >
              {mark}%
            </div>
          ))}
        </div>
      </div>

      {/* 激励文案 */}
      <motion.div
        key={progress}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        {progress < 20 && (
          <p className="text-sm text-gray-600">
            万事开头难,加油!每完成一个小任务,种子就会生长
          </p>
        )}
        {progress >= 20 && progress < 40 && (
          <p className="text-sm text-gray-600">
            太棒了!你的种子开始发芽了,继续保持
          </p>
        )}
        {progress >= 40 && progress < 60 && (
          <p className="text-sm text-gray-600">
            做得很好!幼苗正在茁壮成长
          </p>
        )}
        {progress >= 60 && progress < 80 && (
          <p className="text-sm text-gray-600">
            非常棒!小树已经长出来了,再接再厉
          </p>
        )}
        {progress >= 80 && progress < 100 && (
          <p className="text-sm text-gray-600">
            快要完成了!大树即将枝繁叶茂
          </p>
        )}
        {progress === 100 && (
          <p className="text-sm font-semibold text-green-600">
            恭喜你!你已经完成了所有任务,收获满满!🎉
          </p>
        )}
      </motion.div>
    </div>
  );
}
