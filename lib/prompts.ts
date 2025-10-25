import { GallupTalent, MBTIType, ScenarioType } from '@/types';

// AI解读提示词模板
export function createAnalysisPrompt(
  talents: GallupTalent[],
  mbti: MBTIType,
  scenario: ScenarioType
): string {
  return `你是一位资深的职业发展教练和盖洛普认证优势教练,同时精通MBTI性格理论。

用户信息:
- 盖洛普优势才干: ${talents.join('、')}
- MBTI类型: ${mbti}
- 关注场景: ${scenario}

请提供专业、深入且实用的分析和建议:

## 任务1: 才干组合解读
请深入分析这5项才干的组合特点:
- 它们如何相互协同发挥作用?
- 这个组合的核心优势是什么?
- 可能存在的盲点或需要注意的地方?

要求: 300-400字,语言专业但易懂,突出实际应用场景

## 任务2: MBTI与才干协同分析
请分析${mbti}类型与这些才干的协同效应:
- MBTI的认知偏好如何影响才干的表达?
- 这种组合在人际互动中的特点?
- 如何利用性格特点放大才干优势?

要求: 200-300字,连接理论与实践

## 任务3: ${scenario}场景的具体建议
针对${scenario}场景,请提供5-7条具体可执行的建议。

每条建议必须包含:
1. 建议标题 (8-15字,直接有力)
2. 建议描述 (50-80字,说明为什么这个建议有效)
3. 具体行动任务 (2-3个可执行的任务,每个15-30字)

建议要求:
- 基于用户的才干和MBTI特点定制
- 可立即开始实践
- 难度递进,从简单到复杂
- 具有可衡量的成果

请以JSON格式返回结果:

\`\`\`json
{
  "talentsAnalysis": "才干组合解读内容...",
  "synergyAnalysis": "MBTI与才干协同分析内容...",
  "suggestions": [
    {
      "title": "建议标题",
      "description": "建议描述",
      "tasks": [
        "具体任务1",
        "具体任务2",
        "具体任务3"
      ]
    }
  ]
}
\`\`\`

注意:
1. 确保返回的是有效的JSON格式
2. 所有文本使用简体中文
3. 建议要具体、可行、有启发性
4. 任务要清晰、可执行、可衡量`;
}
