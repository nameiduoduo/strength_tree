import { NextRequest, NextResponse } from 'next/server';
import { GallupTalent, MBTIType, ScenarioType, Suggestion, Analysis } from '@/types';
import { createScenarioSuggestionsPrompt } from '@/lib/prompts';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body: {
      talents: GallupTalent[];
      mbti: MBTIType;
      scenario: ScenarioType;
      initialAnalysis: Analysis;
    } = await request.json();

    const { talents, mbti, scenario, initialAnalysis } = body;

    // 验证输入
    if (!talents || talents.length !== 5) {
      return NextResponse.json(
        { error: '请选择5项盖洛普才干' },
        { status: 400 }
      );
    }

    if (!mbti) {
      return NextResponse.json(
        { error: '请选择MBTI类型' },
        { status: 400 }
      );
    }

    if (!scenario) {
      return NextResponse.json(
        { error: '请选择关注场景' },
        { status: 400 }
      );
    }

    if (!initialAnalysis) {
      return NextResponse.json(
        { error: '缺少初步分析结果' },
        { status: 400 }
      );
    }

    // 从环境变量获取 API Key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误：缺少API密钥' },
        { status: 500 }
      );
    }

    // 生成提示词
    const prompt = createScenarioSuggestionsPrompt(talents, mbti, scenario, initialAnalysis);

    // 调用OpenRouter API
    const aiResponse = await callOpenRouter(prompt, apiKey);

    // 提取JSON数据
    const parsedData = extractJSON(aiResponse);

    // 验证响应格式
    if (!parsedData.suggestions) {
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

    const response: { suggestions: Suggestion[] } = {
      suggestions,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('场景建议API错误:', error);
    const errorMessage = error instanceof Error ? error.message : '生成建议失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
