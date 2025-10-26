'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import SimpleTree from './SimpleTree'

export default function WelcomeTree() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/start')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* 顶部导航 */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              流
            </div>
            <span className="text-lg font-medium text-gray-800">顺流而生</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 text-gray-600"
          >
            <button className="hover:text-emerald-600 transition-colors">关于</button>
            <button className="hover:text-emerald-600 transition-colors">成长旅程</button>
            <button className="px-4 py-2 hover:text-emerald-600 transition-colors">登录</button>
          </motion.div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* 左侧文字内容 */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Flow Within · 自然成长系统
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              不追赶，只生长。
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              让优势顺着天性流动。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={handleStart}
                className="px-8 py-4 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                开始种下你的第一颗种子 🌱
              </button>

              <button
                className="px-8 py-4 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-2"
              >
                先看看怎么生长 →
              </button>
            </motion.div>
          </div>

          {/* 右侧树图案 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <SimpleTree />
            </div>
          </motion.div>

        </div>
      </div>

      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: 10, top: 20, duration: 4, delay: 0 },
          { left: 25, top: 15, duration: 3.5, delay: 0.5 },
          { left: 45, top: 30, duration: 4.5, delay: 1 },
          { left: 60, top: 10, duration: 3.8, delay: 0.3 },
          { left: 75, top: 25, duration: 4.2, delay: 0.8 },
          { left: 15, top: 60, duration: 3.6, delay: 1.2 },
          { left: 35, top: 70, duration: 4.3, delay: 0.6 },
          { left: 55, top: 55, duration: 3.9, delay: 1.5 },
          { left: 70, top: 65, duration: 4.1, delay: 0.4 },
          { left: 85, top: 75, duration: 3.7, delay: 1.8 },
          { left: 20, top: 85, duration: 4.4, delay: 0.7 },
          { left: 50, top: 90, duration: 3.3, delay: 1.1 },
          { left: 80, top: 40, duration: 4.6, delay: 0.9 },
          { left: 30, top: 50, duration: 3.4, delay: 1.4 },
          { left: 65, top: 80, duration: 4.7, delay: 0.2 },
          { left: 40, top: 45, duration: 3.2, delay: 1.6 },
          { left: 90, top: 35, duration: 4.8, delay: 0.1 },
          { left: 5, top: 55, duration: 3.1, delay: 1.7 },
          { left: 95, top: 15, duration: 4.9, delay: 0.5 },
          { left: 50, top: 5, duration: 5, delay: 1.3 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full opacity-20"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
