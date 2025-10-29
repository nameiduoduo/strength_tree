# 顺流而生 - 盖洛普优势成长平台 🌱

一个基于 AI 的个人成长平台，结合盖洛普 34 项优势才干理论，通过对话式深度分析，为用户提供个性化的成长建议和行动计划。

**核心理念**：发现天赋 → 顺应天性 → 自然成长

## ✨ 核心功能

- **完整工作流程** - 4 步引导式流程，从才干识别到目标设定
- **34 项才干排序** - 你的盖洛普报告 34 项才干排序
- **4 维度排序** - 执行力、影响力、关系建立、战略思维
- **AI 对话式分析** - 与 AI 教练多轮对话，深度挖掘你的才干特质
- **个性化成长建议** - 基于才干组合和个人目标，生成 5-7 条定制建议
- **引导式行动计划** - AI 生成引导问题，帮助你制定具体可执行的任务
- **专注模式** - 聚焦单个建议的深度工作空间
- **成长树可视化** - 实时反馈任务完成进度（种子→发芽→幼苗→小树→大树）
- **本地数据存储** - 基于 LocalStorage，隐私优先

## 🚀 快速开始

### 1. 克隆项目并安装依赖

```bash
git clone <repository-url>
cd strength_tree
npm install
```

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# OpenRouter API 密钥（必需）
OPENROUTER_API_KEY=sk-or-v1-xxxxx
```

**获取 API 密钥**：
1. 访问 [OpenRouter](https://openrouter.ai/keys)
2. 注册账号并充值（使用 DeepSeek 付费模型，需要充值才能使用）
3. 创建 API 密钥

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📖 使用指南

### 完整用户旅程

```
首页 (/)
  ↓ 点击"立即开始"
启动流程 (/start)
  ├─ 步骤 1: 才干排序
  ├─ 步骤 2: 维度优先级
  ├─ 步骤 3: 对话分析
  └─ 步骤 4: 目标设定
  ↓
成长建议总览 (/growth)
  ↓ 选择建议进入
专注模式 (/focus)
  └─ 完成任务，成长可视化
```

### 步骤 1: 才干排序 📊

**对全部 34 项盖洛普才干进行优先级排序**

- 点击才干卡片按顺序选择（1-34）
- 可按 4 个维度筛选查看：
  - 🟣 **执行力** - 将想法变为现实的能力
  - 🟠 **影响力** - 影响和说服他人的能力
  - 🔵 **关系建立** - 建立和维护人际关系的能力
  - 🟢 **战略思维** - 分析信息和制定策略的能力
- 实时显示已选择数量（X/34）

### 步骤 2: 四大维度 🎯

**选择 4 个维度的排序**

- 根据你的盖洛普报告四大维度
- 依次选择 1st → 2nd → 3rd → 4th
- 这将影响 AI 分析的侧重点

### 步骤 3: 对话分析 💬

**与 AI 教练进行多轮深度对话**

- AI 会询问你关于才干的具体体现
- 分享你的真实经历和感受
- AI 会分析你的回答，识别才干特质
- 多轮对话让分析更深入、更个性化

### 步骤 4: 目标设定 🎯

**输入你想要改变的目标**

- 可以是职业发展、人际关系、个人成长等
- 目标越具体，AI 建议越精准
- 示例："提升团队领导能力"、"建立更好的工作关系"

### 成长建议总览页 (/growth) 📋

查看完整的分析报告：

**用户档案**
- 你的才干排序
- 四大维度排序
- 设定的目标

**AI 深度分析**（可展开/折叠）
- **整体分析**（500-800 字）- 综合解读你的才干组合特征
- **维度协同分析**（400-600 字）- 分析 4 个维度如何协同工作

**个性化建议列表**
- 5-7 条针对性成长建议
- 每条建议包含：
  - 建议标题
  - 详细描述
  - AI 参考要点
  - 可执行任务

### 专注模式 (/focus) 🔍

**聚焦单个建议的深度工作空间**

**左侧：信息面板**
- 建议描述
- AI 参考要点
- AI 生成的引导问题（3-5 个）

**右侧：行动面板**
- **成长树可视化** - 实时显示完成进度
  - 0-20%: 🌾 种子
  - 21-40%: 🌱 发芽
  - 41-60%: 🌿 幼苗
  - 61-80%: 🌳 小树
  - 81-100%: 🌲 大树
- **任务管理**
  - 添加自定义任务
  - 编辑任务内容
  - 标记完成状态
  - 删除任务
- **进度统计** - X/Y 已完成

**引导问题示例**：
```
1. 这周你可以在哪个场景中尝试运用这个才干？
2. 你需要准备什么资源来开始行动？
3. 如何衡量这个行动的效果？
```

### 数据持久化 💾

- 所有数据自动保存在浏览器 LocalStorage
- 刷新页面不会丢失进度
- 可随时返回继续完成任务
- 点击"重新开始"清除档案

## 🏗️ 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **前端框架** | Next.js | 15.3.2 | App Router + React Server Components |
| **运行时** | React | 19.0.0 | 最新稳定版 |
| **语言** | TypeScript | ^5 | 类型安全 |
| **样式** | Tailwind CSS | ^4 | 实用优先的 CSS 框架 |
| **动画** | Framer Motion | ^12.23.24 | 流畅的过渡动画 |
| **Lottie** | lottie-react | ^2.4.1 | 树木生长动画 |
| **HTTP 客户端** | Axios | ^1.12.2 | API 请求 |
| **状态管理** | Zustand | ^5.0.8 | 轻量级状态管理 |
| **AI 服务** | OpenRouter | - | DeepSeek Chat 模型 |
| **数据存储** | LocalStorage | - | 本地数据持久化 |

## 📂 项目结构

```
strength_tree/
├── app/                           # Next.js 15 App Router
│   ├── page.tsx                   # 首页 - 营销落地页
│   ├── start/                     # 4 步骤启动流程
│   │   └── page.tsx               # 才干排序 → 维度 → 对话 → 目标
│   ├── growth/                    # 成长建议总览页
│   │   └── page.tsx               # 显示分析结果和建议列表
│   ├── focus/                     # 专注模式页面
│   │   └── page.tsx               # 单个建议的深度工作空间
│   ├── api/                       # 后端 API 路由
│   │   ├── analyze/route.ts       # 基础分析 API（已弃用）
│   │   ├── chat-analysis/route.ts # 对话式分析 API
│   │   ├── final-suggestions/route.ts  # 最终建议生成 API
│   │   └── generate-questions/route.ts # 引导问题生成 API
│   ├── layout.tsx                 # 全局布局 + Header
│   ├── not-found.tsx              # 404 页面
│   └── globals.css                # 全局样式 + Tailwind
│
├── components/                    # React 组件库
│   ├── Header.tsx                 # 全局导航栏
│   ├── WelcomeTree.tsx            # 首页 Hero 区域动画树
│   ├── TalentSelector.tsx         # 34 项才干选择器
│   ├── CategorySelector.tsx       # 4 维度优先级选择器
│   ├── TalentChatAnalysis.tsx     # 对话式深度分析组件
│   ├── GoalSetting.tsx            # 目标设定表单
│   ├── TaskChecklist.tsx          # 任务清单管理
│   ├── DynamicGrowthTree.tsx      # 动态成长树可视化
│   ├── SimpleTree.tsx             # 简单树形动画
│   ├── GrowthTree.tsx             # 复杂树形动画
│   └── ProgressSlider.tsx         # 进度条组件
│
├── lib/                           # 工具函数和配置
│   ├── constants.ts               # 34 项才干数据 + 4 维度定义
│   ├── openrouter.ts              # OpenRouter API 客户端
│   └── storage.ts                 # LocalStorage 持久化逻辑
│
├── types/                         # TypeScript 类型定义
│   └── index.ts                   # 全部接口和类型
│
├── public/                        # 静态资源
│   └── logo.png                   # 应用 Logo
│
└── 配置文件
    ├── package.json               # 依赖管理
    ├── next.config.ts             # Next.js 配置
    ├── tsconfig.json              # TypeScript 配置
    ├── tailwind.config.js         # Tailwind CSS 配置
    └── postcss.config.mjs         # PostCSS 配置
```

## 🔧 核心 API 说明

### API 路由架构

项目使用 4 个 API 端点来完成完整的分析流程：

#### 1. POST `/api/chat-analysis`

**用途**：对话式分析，用于步骤 3 的多轮对话

**请求体**：
```typescript
{
  talents: GallupTalent[],      // 用户的 34 项才干排序
  categories: GallupCategory[], // 4 维度优先级
  chatHistory: Array<{          // 对话历史
    role: "user" | "assistant",
    content: string
  }>
}
```

**响应**：
```typescript
{
  response: string  // AI 教练的回复（100-200 字）
}
```

#### 2. POST `/api/final-suggestions`

**用途**：生成最终的深度分析和建议列表

**请求体**：
```typescript
{
  talents: GallupTalent[],
  categories: GallupCategory[],
  chatHistory: Array<...>,
  goal: string  // 用户的改变目标
}
```

**响应**：
```typescript
{
  analysis: {
    overallAnalysis: string,    // 整体分析（500-800 字）
    categoryAnalysis: string    // 维度分析（400-600 字）
  },
  suggestions: Array<{
    title: string,              // 建议标题
    description: string,        // 详细描述
    referencePoints: string[],  // AI 参考要点
    tasks: Array<{              // AI 参考任务
      content: string,
      completed: false
    }>
  }>
}
```

#### 3. POST `/api/generate-questions`

**用途**：为特定建议生成引导问题

**请求体**：
```typescript
{
  title: string,              // 建议标题
  description: string,        // 建议描述
  referencePoints: string[]   // 参考要点
}
```

**响应**：
```typescript
{
  questions: string[]  // 3-5 个引导问题
}
```

### 错误处理

所有 API 都包含：
- **429 错误处理** - 速率限制时返回友好提示
- **网络错误重试** - 自动重试最多 2 次
- **超时控制** - 120 秒超时限制
- **代理支持** - 自动使用环境变量中的代理配置

### 自定义 AI 行为

如需调整 AI 分析的风格和深度，可以编辑各个 API 路由中的系统提示词：

- `app/api/chat-analysis/route.ts` - 对话教练的性格和风格
- `app/api/final-suggestions/route.ts` - 分析的深度和建议数量
- `app/api/generate-questions/route.ts` - 引导问题的类型和难度

### 数据存储架构

#### LocalStorage 键值设计

```typescript
// 主键：存储完整的用户档案
"userProfile": {
  id: string,
  talents: [...],
  categories: [...],
  analysis: {...},
  suggestions: [...],
  progress: number,
  createdAt: string,
  updatedAt: string
}
```

#### 数据迁移逻辑

`lib/storage.ts` 包含自动数据迁移功能：
- 检测旧版本数据结构
- 自动升级到新版本
- 保持向后兼容性

#### 扩展至云端存储

如需实现云端同步：

1. **安装云数据库**（推荐 Supabase）
```bash
npm install @supabase/supabase-js
```

2. **修改 `lib/storage.ts`**
```typescript
// 将 localStorage API 替换为 Supabase API
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

export const saveProfile = async (profile: UserProfile) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
  return data
}
```

3. **添加用户认证**
```typescript
// app/api/auth 目录添加认证路由
// 使用 Supabase Auth 或 NextAuth.js
```

## 🎨 设计系统

### 颜色规范

```css
/* 维度颜色 */
--executing: #70347F      /* 执行力 - 紫色 */
--influencing: #cf773c    /* 影响力 - 橙色 */
--relationship: #376fb2   /* 关系建立 - 蓝色 */
--strategic: #499167      /* 战略思维 - 绿色 */

/* 品牌色 */
--brand-primary: #02BD7D  /* 主绿色 */
--brand-dark: #12A16B     /* 深绿色 */
```

### 成长树阶段

| 进度 | 阶段 | 图标 | 文案 |
|------|------|------|------|
| 0-20% | seed | 🌾 | 种子 - 开始你的成长之旅 |
| 21-40% | sprout | 🌱 | 发芽 - 新的开始正在萌芽 |
| 41-60% | seedling | 🌿 | 幼苗 - 稳步成长中 |
| 61-80% | tree | 🌳 | 小树 - 茁壮成长 |
| 81-100% | grown-tree | 🌲 | 大树 - 枝繁叶茂！|

## 📝 开发路线图

### 已完成 ✅

- [x] 34 项才干完整排序系统
- [x] 4 维度排序
- [x] 对话式 AI 深度分析
- [x] 个性化建议生成
- [x] 专注模式工作空间
- [x] 引导问题生成
- [x] 成长树可视化
- [x] 任务管理系统
- [x] 本地数据持久化
- [x] 营销落地页
- [x] 响应式设计

## 💡 项目亮点

### 1. 完整的成长闭环

不仅是测评工具，更是行动系统：
- 自我认知 → 深度分析 → 个性化建议 → 具体行动 → 进度追踪

### 2. 对话式交互体验

突破传统表单式测评：
- AI 教练多轮对话
- 深度挖掘个人特质
- 更自然、更个性化

### 3. 可视化成长反馈

即时的正向激励：
- 成长树实时变化
- 清晰的进度展示
- 增强用户参与感

### 4. 隐私优先设计

用户数据完全掌控：
- 本地存储，无需注册
- 可随时导出数据
- 易于扩展至云端

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 开发流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 组件使用函数式编写
- 添加必要的类型注释

## 🙏 致谢

**技术框架**
- [Next.js](https://nextjs.org) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion) - 动画库
- [OpenRouter](https://openrouter.ai) - AI 模型路由服务

---

**用 ❤️ 和 AI 构建 | Built with Love and AI**

让每个人顺应天性，自然成长 🌱
