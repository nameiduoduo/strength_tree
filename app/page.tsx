'use client'

import WelcomeTree from '@/components/WelcomeTree'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  const router = useRouter()

  const handleStartClick = () => {
    router.push('/start')
  }

  const successStories = [
    {
      id: 1,
      emoji: '💼',
      title: '职场晋升困惑者',
      painPoint: '工作3年，感觉陷入瓶颈，不知道该往哪个方向发展',
      changes: [
        '通过34项才干排序，发现"战略"和"思维"才干排名前5',
        'AI分析建议往产品规划、业务分析方向发展',
        '3个月后成功转岗为产品经理，发挥天然优势'
      ],
      quote: '终于明白为什么我做执行总觉得累，原来我天生适合做规划！'
    },
    {
      id: 2,
      emoji: '💕',
      title: '人际关系敏感者',
      painPoint: '总觉得自己情商低，在人际关系中很吃力',
      changes: [
        '才干测试显示"个别"和"体谅"排前3，但"和谐"排25位',
        'AI解读：擅长1对1深度交流，不适合大型社交场合',
        '调整社交策略：减少无效聚会，专注维护深度关系'
      ],
      quote: '原来不是我不会社交，只是用错了方式，现在轻松多了。'
    },
    {
      id: 3,
      emoji: '🚀',
      title: '副业探索迷茫者',
      painPoint: '想做副业赚钱，但不知道做什么，试了好几个都失败',
      changes: [
        '才干组合显示："搜集"+"学习"+"沟通"排名靠前',
        'AI建议：做知识付费内容创作，整理学习笔记并分享',
        '2个月启动知识星球，月收入突破5000元'
      ],
      quote: '跟着天性走，副业不再是硬扛，而是享受过程。'
    },
    {
      id: 4,
      emoji: '🎨',
      title: '创意工作倦怠者',
      painPoint: '做设计5年，越来越没灵感，怀疑自己是不是不适合这行',
      changes: [
        '才干显示"完美"+"理念"排名靠前，但"适应"很低',
        'AI建议：从快节奏执行转向创意策划和品牌方向',
        '现在做品牌顾问，每个项目都能深度投入创作'
      ],
      quote: '不是我没灵感，是我需要更多时间去打磨作品。'
    },
    {
      id: 5,
      emoji: '📚',
      title: '职业转型焦虑者',
      painPoint: '30岁想转行，但不知道自己除了现在的工作还能做什么',
      changes: [
        '才干组合："统筹"+"责任"+"纪律"排名前列',
        'AI分析：适合项目管理、运营类岗位',
        '成功转型为项目经理，收入和成就感双提升'
      ],
      quote: '年龄不是限制，找对方向才是关键。'
    },
    {
      id: 6,
      emoji: '🌟',
      title: '自我认知模糊者',
      painPoint: '一直在模仿别人的成功路径，但总感觉不对劲',
      changes: [
        '才干测试显示独特的"伯乐"+"个别"组合',
        'AI建议：发挥识人长处，往HR、教练方向发展',
        '开始做职业咨询，帮助他人的同时找到自我价值'
      ],
      quote: '停止模仿，做自己，反而走得更顺。'
    }
  ]

  // 将案例分成两组
  const firstRowStories = successStories.slice(0, 3)
  const secondRowStories = successStories.slice(3, 6)

  const features = [
    {
      icon: '🎯',
      title: '精准定位天赋',
      description: '基于盖洛普34项才干理论，科学识别你的独特优势组合'
    },
    {
      icon: '🤖',
      title: 'AI 深度解读',
      description: '结合你的才干排序和真实经历，生成个性化成长建议'
    },
    {
      icon: '📊',
      title: '可视化进度',
      description: '通过成长树动画，见证每一步的改变和进步'
    },
    {
      icon: '💡',
      title: '场景化建议',
      description: '针对职场、人际、副业等具体场景，提供可执行的行动计划'
    },
    {
      icon: '🔄',
      title: '持续迭代优化',
      description: '随着你的成长，不断调整和优化成长路径'
    },
    {
      icon: '🔒',
      title: '数据隐私保护',
      description: '所有数据本地存储，完全掌控你的个人信息'
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: '认识你的天赋',
      description: '按照你的盖洛普报告的排序，从第一个才干开始点击，确定你的才干排序。',
      icon: '🌱'
    },
    {
      step: '02',
      title: '确定优势维度',
      description: '选择你的四大维度排序',
      icon: '🎯'
    },
    {
      step: '03',
      title: 'AI 优势解读',
      description: '分享你的真实经历，AI 会帮你解析才干是如何促进你的成功的',
      icon: '💬'
    },
    {
      step: '04',
      title: '如何发挥优势',
      description: '轻松定制匹配你的优势发展计划，促进行动',
      icon: '🚀'
    }
  ]

  const faqs = [
    {
      question: '这个工具适合谁使用?',
      answer: '适合所有希望更了解自己、发挥天赋优势的人。特别是职场新人、转型者、创业者,以及希望改善人际关系的朋友。',
      hasLink: false
    },
    {
      question: '需要提前做盖洛普测评吗?',
      answer: '是的,需要先完成盖洛普34项优势测评。我们的系统会让你选择自己的34项才干排序,这需要基于你的盖洛普测评报告。如果你还没有做过测评，请先阅读这篇测评指南：',
      linkText: '盖洛普测评&解读流程及注意事项详解',
      linkUrl: 'https://mp.weixin.qq.com/s/yyZ-WKi1JS-koi9yVy32NQ',
      afterLinkText: '，了解测评流程和注意事项后再进行测评。',
      hasLink: true
    },
    {
      question: '数据安全吗?',
      answer: '完全安全。所有数据都存储在你的浏览器本地(LocalStorage),我们不会收集或上传任何个人信息。',
      hasLink: false
    },
    {
      question: 'AI 分析需要付费吗?',
      answer: '完全免费!我们使用高质量的付费 AI 模型为你提供深度分析,但这部分费用由我们承担,你无需支付任何费用即可享受专业的 AI 成长建议。',
      hasLink: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - WelcomeTree */}
      <WelcomeTree />

      {/* Features Section */}
      <section className="py-20 px-8" style={{ backgroundColor: '#DCF0EA' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              为什么选择顺流而生?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              结合盖洛普优势理论与 AI 技术,为你打造专属成长路径
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              如何开始你的成长之旅?
            </h2>
            <p className="text-xl text-gray-600">
              只需 4 步,开启个性化成长路径
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="text-6xl font-bold text-emerald-100 mb-4">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-emerald-300 text-3xl">→</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={handleStartClick}
              className="px-12 py-5 bg-emerald-500 text-white text-lg rounded-full font-bold hover:bg-emerald-600 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              立即开始优势发展之旅 🌱
            </button>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 px-8 scroll-mt-16" style={{ backgroundColor: '#DCF0EA' }}>
        <div className="max-w-7xl mx-auto">
          {/* 标题区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              优势案例
            </h2>
            <p className="text-xl text-gray-600">
              已帮助 5,000+ 用户找到成长方向
            </p>
          </motion.div>

          {/* 双向滚动轮播 */}
          <div className="space-y-4">
            {/* 第一排 - 向左滚动 */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: [0, -920]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* 复制三遍实现无缝循环 */}
                {[...firstRowStories, ...firstRowStories, ...firstRowStories].map((story, index) => (
                  <div
                    key={`row1-${index}`}
                    className="min-w-[280px] md:min-w-[300px] flex-shrink-0"
                  >
                    <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded-xl p-4 shadow-md h-full flex flex-col justify-between border border-gray-100`}>
                      {/* 头部 */}
                      <div className="mb-3">
                        <div className="text-3xl mb-2">{story.emoji}</div>
                        <h3 className="text-base font-bold text-gray-900 mb-1.5">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {story.painPoint}
                        </p>
                      </div>

                      {/* 改变要点 */}
                      <div className="mb-3 space-y-1.5">
                        {story.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold text-sm mt-0.5">✓</span>
                            <p className="text-gray-600 text-xs leading-relaxed">{change}</p>
                          </div>
                        ))}
                      </div>

                      {/* 用户引用 */}
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-700 font-medium italic text-xs">
                          "{story.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* 第二排 - 向右滚动 */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: [-920, 0]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* 复制三遍实现无缝循环 */}
                {[...secondRowStories, ...secondRowStories, ...secondRowStories].map((story, index) => (
                  <div
                    key={`row2-${index}`}
                    className="min-w-[280px] md:min-w-[300px] flex-shrink-0"
                  >
                    <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded-xl p-4 shadow-md h-full flex flex-col justify-between border border-gray-100`}>
                      {/* 头部 */}
                      <div className="mb-3">
                        <div className="text-3xl mb-2">{story.emoji}</div>
                        <h3 className="text-base font-bold text-gray-900 mb-1.5">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {story.painPoint}
                        </p>
                      </div>

                      {/* 改变要点 */}
                      <div className="mb-3 space-y-1.5">
                        {story.changes.map((change, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold text-sm mt-0.5">✓</span>
                            <p className="text-gray-600 text-xs leading-relaxed">{change}</p>
                          </div>
                        ))}
                      </div>

                      {/* 用户引用 */}
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-700 font-medium italic text-xs">
                          "{story.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 数据统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto"
          >
            {[
              { percentage: '85%', description: '找到更适合的职业方向' },
              { percentage: '92%', description: '表示"更了解自己了"' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-emerald-600 mb-2">
                  {stat.percentage}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.description}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8" style={{ backgroundColor: '#DCF0EA' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
            <p className="text-xl text-gray-600">
              关于顺流而生,你可能想了解的
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {faq.hasLink ? (
                    <p>
                      {faq.answer}
                      <a
                        href={faq.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 font-semibold hover:text-emerald-700 underline"
                      >
                        {faq.linkText}
                      </a>
                      {faq.afterLinkText}
                    </p>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              准备好发现真实的自己了吗?
            </h2>
            <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
              不追赶别人的节奏，只顺着自己的天性生长<br/>
              让优势自然流动，看见属于你的成长路径
            </p>
            <button
              onClick={handleStartClick}
              className="px-12 py-5 bg-white text-emerald-600 text-lg rounded-full font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-2xl"
            >
              开始你的优势发展之旅 🌱
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="顺流而生 Logo"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-white">顺流而生</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                基于盖洛普优势理论与 AI 技术,<br/>
                帮助你发现天赋,顺应天性,自然成长。
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">功能介绍</a></li>
                <li><a href="#success-stories" className="hover:text-emerald-400 transition-colors">优势案例</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">资源</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">使用指南</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 顺流而生. 用 ❤️ 和 AI 构建</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
