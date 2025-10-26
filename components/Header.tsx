'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
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
  )
}
