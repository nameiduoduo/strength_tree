'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import treeAnimation from '../public/animations/tree-elegant.json'

export default function WelcomeTree() {
  const router = useRouter()
  const [showPrompt, setShowPrompt] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    // 动画播放完成后显示提示文字
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 300) // 0.3秒后显示提示

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    router.push('/start')
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden relative cursor-pointer"
      onClick={handleClick}
    >
      {/* 背景装饰光晕 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="absolute top-16 md:top-20 text-center z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight mb-4">
          优势成长树
        </h1>
        <p className="text-white/60 text-base md:text-xl">
          发现你的独特才干,培育你的成长之路
        </p>
      </motion.div>

      {/* Lottie 树生长动画 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={treeAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: 'auto' }}
        />
      </motion.div>

      {/* 提示文字 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showPrompt ? 1 : 0, y: showPrompt ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-16 md:bottom-20 text-center z-10 px-4"
      >
        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-white/80 text-base md:text-lg font-light tracking-wider"
        >
          点击任意位置,开始你的成长之旅 ✨
        </motion.p>
      </motion.div>

      {/* 装饰元素 - 漂浮的小星星 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}
