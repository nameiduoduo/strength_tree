'use client'

import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = () => {
    router.push('/')
  }

  const handleSuccessStoriesClick = () => {
    // 如果在首页,直接滚动到优势案例区域
    if (pathname === '/') {
      const element = document.getElementById('success-stories')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // 如果不在首页,先跳转到首页,然后滚动
      router.push('/#success-stories')
    }
  }

  return (
    <nav className="backdrop-blur-sm border-b px-4 py-2" style={{ backgroundColor: 'rgba(220, 240, 234, 0.8)', borderBottomColor: 'rgba(16, 185, 129, 0.15)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="顺流而生 Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-lg font-medium text-gray-800">顺流而生</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 text-gray-600"
        >
          <button className="hover:text-emerald-600 transition-colors">登录</button>
          <button className="px-4 py-2 hover:text-emerald-600 transition-colors">注册</button>
          <button
            onClick={handleSuccessStoriesClick}
            className="hover:text-emerald-600 transition-colors"
          >
            优势案例
          </button>
        </motion.div>
      </div>
    </nav>
  )
}
