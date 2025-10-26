'use client'

import WelcomeTree from '@/components/WelcomeTree'
import { motion } from 'framer-motion'

export default function Home() {
  const successStories = [
    {
      id: 1,
      emoji: '💼',
      title: '职场晋升困惑者',
      painPoint: '工作3年,感觉陷入瓶颈,不知道该往哪个方向发展',
      changes: [
        '通过34项才干排序,发现"战略"和"思维"才干排名前5',
        'AI分析建议往产品规划、业务分析方向发展',
        '3个月后成功转岗为产品经理,发挥天然优势'
      ],
      quote: '终于明白为什么我做执行总觉得累,原来我天生适合做规划!',
      color: 'from-blue-50 to-blue-100',
      accentColor: 'text-blue-600'
    },
    {
      id: 2,
      emoji: '💕',
      title: '人际关系敏感者',
      painPoint: '总觉得自己情商低,在人际关系中很吃力',
      changes: [
        '才干测试显示"个别"和"体谅"排前3,但"和谐"排25位',
        'AI解读:擅长1对1深度交流,不适合大型社交场合',
        '调整社交策略:减少无效聚会,专注维护深度关系'
      ],
      quote: '原来不是我不会社交,只是用错了方式。现在轻松多了。',
      color: 'from-pink-50 to-pink-100',
      accentColor: 'text-pink-600'
    },
    {
      id: 3,
      emoji: '🚀',
      title: '副业探索迷茫者',
      painPoint: '想做副业赚钱,但不知道做什么,试了好几个都失败',
      changes: [
        '才干组合显示:"搜集"+"学习"+"沟通"排名靠前',
        'AI建议:做知识付费内容创作,整理学习笔记并分享',
        '2个月启动知识星球,月收入突破5000元'
      ],
      quote: '跟着天性走,副业不再是硬扛,而是享受过程。',
      color: 'from-orange-50 to-orange-100',
      accentColor: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - WelcomeTree */}
      <WelcomeTree />

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white scroll-mt-16">
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

          {/* 案例卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${story.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow`}
              >
                {/* 头部 */}
                <div className="mb-6">
                  <div className="text-5xl mb-4">{story.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {story.title}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {story.painPoint}
                  </p>
                </div>

                {/* 改变要点 */}
                <div className="mb-6 space-y-3">
                  {story.changes.map((change, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold text-lg mt-0.5">✓</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{change}</p>
                    </div>
                  ))}
                </div>

                {/* 用户引用 */}
                <div className="pt-6 border-t border-gray-300">
                  <div className="flex items-start gap-2">
                    <span className={`${story.accentColor} text-2xl`}>"</span>
                    <p className={`${story.accentColor} font-semibold italic text-sm`}>
                      {story.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 数据统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { percentage: '85%', description: '找到更适合的职业方向' },
              { percentage: '73%', description: '平均任务完成进度' },
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
    </div>
  )
}
