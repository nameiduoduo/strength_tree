import { NextRequest, NextResponse } from 'next/server';
import { GallupTalent, GallupCategory, AnalysisResponse, Suggestion } from '@/types';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FinalSuggestionsRequest {
  talents: GallupTalent[];
  categories: GallupCategory[];
  chatHistory: Message[];
  goal: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FinalSuggestionsRequest = await request.json();
    const { talents, categories, chatHistory, goal } = body;

    // 验证输入
    if (!talents || talents.length !== 34) {
      return NextResponse.json(
        { error: '请选择全部34项盖洛普才干' },
        { status: 400 }
      );
    }

    if (!categories || categories.length !== 4) {
      return NextResponse.json(
        { error: '请选择全部4个维度' },
        { status: 400 }
      );
    }

    if (!goal || !goal.trim()) {
      return NextResponse.json(
        { error: '请输入你的改变目标' },
        { status: 400 }
      );
    }

    // 从环境变量获取API密钥
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误: 缺少API密钥' },
        { status: 500 }
      );
    }

    // 生成提示词
    const prompt = `你是一位专业的盖洛普才干教练。基于以下信息,请提供全面的分析和针对性建议:

# 用户的才干排序(从最重要到相对较弱):
${talents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

# 用户的维度优先级:
${categories.map((c, i) => `${i + 1}. ${c}`).join('\n')}

# 对话历史:
${chatHistory.map(msg => `${msg.role === 'user' ? '用户' : '教练'}: ${msg.content}`).join('\n\n')}

# 用户的改变目标:
${goal}

请提供:

1. **整体分析** (overallAnalysis):
   - 基于用户的34项才干排序,结合对话中展现的才干特质,深入分析用户的优势特点、行为模式、思维方式
   - 字数要求: 500-800字

2. **维度协同分析** (categoryAnalysis):
   - 分析4个维度的优先级如何影响用户
   - 结合对话中的实际案例,说明各维度如何在用户身上体现
   - 字数要求: 400-600字

3. **针对性建议** (suggestions):
   - 基于用户的改变目标"${goal}",提供5-7条具体可执行的建议
   - 每条建议必须:
     * 与用户的才干排序和实际经历紧密结合
     * 包含具体的行动任务(2-3个)
     * 考虑用户的维度特点

建议格式:
- title: 建议标题(8-15字)
- description: 建议说明(80-120字)
- referencePoints: 参考要点数组(3-5个要点,每个10-20字,用于生成引导问题)
- tasks: 具体任务数组(每个任务20-40字)

请以JSON格式返回:
{
  "overallAnalysis": "整体分析内容...",
  "categoryAnalysis": "维度协同分析内容...",
  "suggestions": [
    {
      "title": "建议标题",
      "description": "建议说明",
      "referencePoints": ["要点1", "要点2", "要点3"],
      "tasks": ["任务1", "任务2", "任务3"]
    }
  ]
}`;

    // 调用OpenRouter API
    const aiResponse = await callOpenRouter(prompt, apiKey);

    // 提取JSON数据
    const parsedData = extractJSON(aiResponse);

    // 验证响应格式
    if (!parsedData.overallAnalysis || !parsedData.categoryAnalysis || !parsedData.suggestions) {
      throw new Error('AI响应格式不正确');
    }

    // 为每个建议的任务生成ID
    interface ParsedSuggestion {
      title: string;
      description: string;
      referencePoints: string[];
      tasks: string[];
    }

    // 使用唯一时间戳避免重复key
    const baseTimestamp = Date.now();
    const suggestions: Suggestion[] = (parsedData.suggestions as ParsedSuggestion[]).map((sug, index) => ({
      id: `suggestion-${baseTimestamp}-${index}`,
      title: sug.title,
      description: sug.description,
      referencePoints: sug.referencePoints || [],
      tasks: (sug.tasks || []).map((task: string, taskIndex: number) => ({
        id: `task-${baseTimestamp}-${index}-${taskIndex}`,
        content: task,
        completed: false,
      })),
    }));

    const response: AnalysisResponse = {
      analysis: {
        overallAnalysis: parsedData.overallAnalysis as string,
        categoryAnalysis: parsedData.categoryAnalysis as string,
      },
      suggestions,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('最终建议API错误:', error);
    const errorMessage = error instanceof Error ? error.message : '生成建议失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
