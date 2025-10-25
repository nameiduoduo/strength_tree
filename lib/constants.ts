import { GallupTalent, MBTIType } from '@/types';

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

// MBTI类型数据
export interface MBTIInfo {
  type: MBTIType;
  name: string;
  description: string;
  traits: string[];
}

export const MBTI_TYPES: MBTIInfo[] = [
  // 分析家
  { type: 'INTJ', name: '建筑师', description: '富有想象力和战略性的思考者', traits: ['独立', '战略', '理性', '创新'] },
  { type: 'INTP', name: '逻辑学家', description: '具有创造力的发明家', traits: ['好奇', '分析', '灵活', '理论'] },
  { type: 'ENTJ', name: '指挥官', description: '大胆、富有想象力的领导者', traits: ['果断', '领导', '高效', '自信'] },
  { type: 'ENTP', name: '辩论家', description: '聪明好奇的思想家', traits: ['创新', '辩论', '适应', '聪慧'] },

  // 外交家
  { type: 'INFJ', name: '提倡者', description: '安静而神秘的理想主义者', traits: ['洞察', '理想', '坚定', '富同情心'] },
  { type: 'INFP', name: '调停者', description: '诗意而善良的利他主义者', traits: ['理想', '忠诚', '开放', '灵活'] },
  { type: 'ENFJ', name: '主人公', description: '富有魅力且鼓舞人心的领导者', traits: ['善于激励', '同理心', '组织', '热情'] },
  { type: 'ENFP', name: '竞选者', description: '热情、有创造力的社交家', traits: ['热情', '创造', '外向', '灵活'] },

  // 守护者
  { type: 'ISTJ', name: '物流师', description: '实际而注重事实的个人', traits: ['可靠', '实际', '有条理', '忠诚'] },
  { type: 'ISFJ', name: '守卫者', description: '非常专注且温暖的守护者', traits: ['保护', '细致', '负责', '传统'] },
  { type: 'ESTJ', name: '总经理', description: '出色的管理者和组织者', traits: ['有组织', '实际', '直接', '传统'] },
  { type: 'ESFJ', name: '执政官', description: '极有同情心和受欢迎的人', traits: ['合作', '热心', '有组织', '忠诚'] },

  // 探险家
  { type: 'ISTP', name: '鉴赏家', description: '大胆而实际的实验家', traits: ['灵活', '实际', '独立', '好奇'] },
  { type: 'ISFP', name: '探险家', description: '灵活而富有魅力的艺术家', traits: ['敏感', '友好', '艺术', '灵活'] },
  { type: 'ESTP', name: '企业家', description: '聪明、精力充沛的冒险家', traits: ['行动', '适应', '务实', '社交'] },
  { type: 'ESFP', name: '表演者', description: '自然而兴奋的娱乐者', traits: ['外向', '友好', '接受', '自发'] },
];

// 场景类型
export const SCENARIOS = [
  { value: '关系', label: '关系', icon: '💕', description: '改善人际关系、亲密关系、家庭关系' },
  { value: '工作', label: '职业发展', icon: '💼', description: '提升职场表现、团队协作、职业发展' },
  { value: '副业', label: '副业', icon: '🚀', description: '开启新项目、发展兴趣、创造收入' },
] as const;
