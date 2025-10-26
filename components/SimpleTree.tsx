'use client'

import { motion } from 'framer-motion'

export default function SimpleTree() {
  return (
    <div className="relative w-full h-full flex items-end justify-center">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full"
        style={{ maxWidth: '400px', maxHeight: '500px' }}
      >
        {/* 树干 */}
        <motion.rect
          x="190"
          y="300"
          width="20"
          height="200"
          fill="#2d5a3d"
          rx="10"
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* 树枝 - 简化为几何形状 */}
        <motion.line
          x1="200"
          y1="380"
          x2="140"
          y2="340"
          stroke="#2d5a3d"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        <motion.line
          x1="200"
          y1="380"
          x2="260"
          y2="340"
          stroke="#2d5a3d"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* 叶子 - 简单的圆形 */}
        {[
          { cx: 120, cy: 320, r: 40, delay: 0.8 },
          { cx: 170, cy: 280, r: 45, delay: 0.9 },
          { cx: 230, cy: 280, r: 45, delay: 1.0 },
          { cx: 280, cy: 320, r: 40, delay: 1.1 },
          { cx: 200, cy: 240, r: 50, delay: 1.2 },
        ].map((leaf, i) => (
          <motion.circle
            key={i}
            cx={leaf.cx}
            cy={leaf.cy}
            r={leaf.r}
            fill="#4ade80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: leaf.delay }}
          />
        ))}

        {/* 装饰圆点 */}
        {[
          { cx: 110, cy: 240, delay: 1.4 },
          { cx: 290, cy: 240, delay: 1.5 },
          { cx: 200, cy: 200, delay: 1.6 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="8"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: dot.delay }}
          />
        ))}
      </svg>
    </div>
  )
}
