import { NextRequest, NextResponse } from 'next/server';
import { AnalysisRequest, AnalysisResponse, Suggestion } from '@/types';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();

    const { talents, categories } = body;

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

    // 生成提示词
    const prompt = `你是一位专业的盖洛普优势教练。用户已经按照重要性顺序选择了他们的34项盖洛普才干,以及4个维度的优先级。

用户的才干排序(从最重要到相对较弱):
${talents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

用户的维度优先级:
${categories.map((c, i) => `${i + 1}. ${c}`).join('\n')}

请提供:
1. **整体分析** (overallAnalysis): 基于用户的34项才干排序,分析其优势特点、行为模式、思维方式等(400-600字)
2. **维度协同分析** (categoryAnalysis): 分析4个维度的优先级对用户的影响,以及如何平衡和发展这些维度(300-500字)
3. **行动建议** (suggestions): 提供5-7条具体的发展建议,每条建议包含:
   - title: 建议标题
   - description: 建议详细说明
   - tasks: 2-3个可执行的具体任务(字符串数组)

请以JSON格式返回,格式如下:
{
  "overallAnalysis": "整体分析内容...",
  "categoryAnalysis": "维度协同分析内容...",
  "suggestions": [
    {
      "title": "建议标题",
      "description": "建议说明",
      "tasks": ["任务1", "任务2", "任务3"]
    }
  ]
}`;

    // 从环境变量获取API密钥
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误: 缺少API密钥' },
        { status: 500 }
      );
    }

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
      tasks: string[];
    }

    // 使用唯一时间戳避免重复key
    const baseTimestamp = Date.now();
    const suggestions: Suggestion[] = (parsedData.suggestions as ParsedSuggestion[]).map((sug, index) => ({
      id: `suggestion-${baseTimestamp}-${index}`,
      title: sug.title,
      description: sug.description,
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
    console.error('API错误:', error);
    const errorMessage = error instanceof Error ? error.message : '分析失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
