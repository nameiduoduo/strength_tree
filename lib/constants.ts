import { GallupTalent } from '@/types';

// 才干维度类型
export type TalentCategory = '执行力' | '影响力' | '关系建立' | '战略思维';

// 才干维度颜色配置
export const CATEGORY_COLORS: Record<TalentCategory, {
  bg: string;
  border: string;
  text: string;
  gradient: string;
}> = {
  '执行力': {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    gradient: 'from-purple-50 to-purple-100',
  },
  '影响力': {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    gradient: 'from-orange-50 to-orange-100',
  },
  '关系建立': {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    gradient: 'from-blue-50 to-blue-100',
  },
  '战略思维': {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    gradient: 'from-green-50 to-green-100',
  },
};

// 盖洛普34项才干数据
export interface TalentInfo {
  name: GallupTalent;
  description: string;
  category: TalentCategory;
}

export const GALLUP_TALENTS: TalentInfo[] = [
  // 执行力主题
  { name: '成就', description: '持续工作到底,追求高产出和成果', category: '执行力' },
  { name: '统筹', description: '擅长组织资源和安排流程', category: '执行力' },
  { name: '专注', description: '设定目标并专注实现', category: '执行力' },
  { name: '责任', description: '对承诺负责,言出必行', category: '执行力' },
  { name: '排难', description: '擅长解决问题和应对挑战', category: '执行力' },
  { name: '纪律', description: '喜欢秩序、结构和可预测性', category: '执行力' },
  { name: '信仰', description: '拥有坚定不移的核心价值观', category: '执行力' },
  { name: '审慎', description: '谨慎决策,识别风险和障碍', category: '执行力' },
  { name: '公平', description: '追求平等和公正', category: '执行力' },

  // 影响力主题
  { name: '统率', description: '承担领导责任,引导方向', category: '影响力' },
  { name: '竞争', description: '以他人为标杆,追求第一', category: '影响力' },
  { name: '沟通', description: '擅长表达想法和故事', category: '影响力' },
  { name: '行动', description: '快速行动,边做边学,不拖延', category: '影响力' },
  { name: '取悦', description: '赢得他人认可和关注', category: '影响力' },
  { name: '自信', description: '对自己的能力充满信心', category: '影响力' },
  { name: '完美', description: '追求卓越和高质量', category: '影响力' },
  { name: '追求', description: '积极追求新的可能性', category: '影响力' },

  // 关系建立主题
  { name: '适应', description: '灵活应对变化,活在当下', category: '关系建立' },
  { name: '体谅', description: '感知他人情绪和需求', category: '关系建立' },
  { name: '包容', description: '接纳不同观点和背景', category: '关系建立' },
  { name: '个别', description: '关注个体独特性', category: '关系建立' },
  { name: '和谐', description: '寻求共识,避免冲突', category: '关系建立' },
  { name: '伯乐', description: '看到他人潜力,帮助成长', category: '关系建立' },
  { name: '积极', description: '传播热情和正能量', category: '关系建立' },
  { name: '交往', description: '擅长建立新关系', category: '关系建立' },
  { name: '关联', description: '相信万物相连,重视人际纽带', category: '关系建立' },

  // 战略思维主题
  { name: '搜集', description: '收集和整理信息', category: '战略思维' },
  { name: '学习', description: '热爱学习新知识', category: '战略思维' },
  { name: '前瞻', description: '看到未来可能性和愿景', category: '战略思维' },
  { name: '思维', description: '喜欢思考和智力活动', category: '战略思维' },
  { name: '回顾', description: '从过去中学习,珍视历史', category: '战略思维' },
  { name: '战略', description: '看到多条路径,选择最优方案', category: '战略思维' },
  { name: '分析', description: '寻找原因和证据,深入分析', category: '战略思维' },
  { name: '理念', description: '被新想法和概念吸引', category: '战略思维' },
];
