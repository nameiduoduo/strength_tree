# 盖洛普优势 + MBTI 成长树系统 🌱

一个基于 AI 的个性化成长建议系统,结合盖洛普优势才干和 MBTI 性格类型,为用户提供定制化的成长路径。

## ✨ 功能特点

- **盖洛普才干测评** - 支持从 34 项才干中选择你的前 5 项优势
- **MBTI 性格分析** - 16 种性格类型完整支持
- **AI 深度解读** - 使用 OpenRouter 免费模型生成个性化分析
- **场景化建议** - 针对关系、工作、副业三大场景提供具体建议
- **成长树可视化** - 通过完成任务看着种子长成大树
- **数据持久化** - LocalStorage 本地保存,可随时查看进度

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 获取 API 密钥

1. 访问 [OpenRouter](https://openrouter.ai/keys)
2. 免费注册账号
3. 创建 API 密钥 (格式: sk-or-...)
4. 在使用时输入该密钥

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用

### 构建生产版本

```bash
npm run build
npm start
```

## 📖 使用指南

### 1. 选择盖洛普才干 (步骤 1)

在首页选择你的 5 项盖洛普优势才干:
- 可按照四大类别筛选:执行力、影响力、关系建立、战略思维
- 选中的才干会标记序号
- 必须选择恰好 5 项才能继续

### 2. 选择 MBTI 类型 (步骤 2)

选择你的 16 型人格类型:
- 分为四大组别:分析家、外交家、守护者、探险家
- 还不知道你的类型?可以点击链接去测试
- 只能选择一个类型

### 3. 选择关注场景并输入 API 密钥 (步骤 3)

选择你最关注的成长方向:
- **关系** 💕 - 改善人际关系、亲密关系、家庭关系
- **工作** 💼 - 提升职场表现、团队协作、职业发展
- **副业** 🚀 - 开启新项目、发展兴趣、创造收入

输入你的 OpenRouter API 密钥后点击"开始分析"

### 4. 查看成长树页面

AI 分析完成后,你将看到:

**生长树动画** - 根据任务完成度显示不同阶段:
- 0-20%: 🌰 种子 - 开始你的成长之旅
- 21-40%: 🌱 发芽 - 新的开始正在萌芽
- 41-60%: 🌿 幼苗 - 稳步成长中
- 61-80%: 🌳 小树 - 茁壮成长
- 81-100%: 🌲 大树 - 枝繁叶茂!

**AI 深度解读**:
- 才干组合分析 (300-400字)
- MBTI 与才干协同效应 (200-300字)

**成长建议**:
- 5-7 条针对性建议
- 每条建议包含 2-3 个可执行任务
- 实时进度跟踪

### 5. 完成任务,见证成长

勾选完成的任务,看着你的种子逐渐长成参天大树! 🎉

## 🏗️ 技术栈

- **框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **AI 服务**: OpenRouter API (google/gemini-2.0-flash-lite)
- **数据存储**: LocalStorage (可扩展至云端数据库)

## 📂 项目结构

```
gallup-product/
├── app/                      # Next.js App Router
│   ├── page.tsx              # 首页 - 输入表单
│   ├── growth/               # 成长树页面
│   ├── api/analyze/          # AI 分析 API
│   └── layout.tsx            # 根布局
├── components/               # React 组件
│   ├── TalentSelector.tsx    # 才干选择器
│   ├── MBTISelector.tsx      # MBTI 选择器
│   ├── ScenarioSelector.tsx  # 场景选择器
│   ├── GrowthTree.tsx        # 生长树动画
│   └── TaskChecklist.tsx     # 任务清单
├── lib/                      # 工具函数
│   ├── constants.ts          # 常量数据
│   ├── prompts.ts            # AI 提示词
│   ├── storage.ts            # 本地存储
│   └── openrouter.ts         # API 客户端
└── types/                    # TypeScript 类型
    └── index.ts
```

## 🔧 高级配置

### 修改 AI 模型

编辑 `lib/openrouter.ts`:

```typescript
const FREE_MODEL = 'google/gemini-2.0-flash-lite';
// 可更换为其他免费模型或付费模型
```

### 自定义提示词

编辑 `lib/prompts.ts` 中的 `createAnalysisPrompt` 函数

### 数据存储迁移

当前使用 LocalStorage,如需云端同步:
1. 安装 Supabase 或 Firebase
2. 修改 `lib/storage.ts` 中的存储逻辑
3. 添加用户认证功能

## 📝 开发计划

- [ ] 用户账号系统
- [ ] 云端数据同步
- [ ] 社交分享功能
- [ ] 成长日记功能
- [ ] 数据可视化图表
- [ ] 多语言支持 (英文、繁中)
- [ ] 移动 App 版本

## 🙏 致谢

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [OpenRouter](https://openrouter.ai)
- [盖洛普优势理论](https://www.gallup.com/cliftonstrengths)
- [16Personalities](https://www.16personalities.com)

---

用 ❤️ 和 AI 构建
