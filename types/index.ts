// 盖洛普才干类型
export type GallupTalent =
  | '成就' | '行动' | '适应' | '分析' | '统筹'
  | '信仰' | '统率' | '沟通' | '竞争' | '关联'
  | '思维' | '审慎' | '伯乐' | '纪律' | '体谅'
  | '公平' | '专注' | '前瞻' | '和谐' | '理念'
  | '包容' | '个别' | '搜集' | '回顾' | '学习'
  | '完美' | '积极' | '交往' | '责任' | '排难'
  | '自信' | '追求' | '战略' | '取悦';

// MBTI类型
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// 场景类型
export type ScenarioType = '关系' | '工作' | '副业';

// 任务接口
export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

// 建议接口
export interface Suggestion {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

// AI解读接口
export interface Analysis {
  talentsAnalysis: string;  // 才干解读
  synergyAnalysis: string;  // 协同分析
}

// 用户档案接口
export interface UserProfile {
  id: string;
  talents: GallupTalent[];      // 5项才干
  mbti: MBTIType;               // MBTI类型
  analysis: Analysis | null;    // AI解读
  scenario: ScenarioType | null; // 选择的场景
  suggestions: Suggestion[];    // 建议列表
  progress: number;             // 完成进度 0-100
  createdAt: string;
  updatedAt: string;
}

// 生长树阶段
export type TreeStage = 'seed' | 'sprout' | 'seedling' | 'tree' | 'grown-tree';

// 生长树状态
export interface TreeState {
  stage: TreeStage;
  progress: number; // 0-100
}

// API请求接口
export interface AnalysisRequest {
  talents: GallupTalent[];
  mbti: MBTIType;
  scenario: ScenarioType;
}

// API响应接口
export interface AnalysisResponse {
  analysis: Analysis;
  suggestions: Suggestion[];
}
