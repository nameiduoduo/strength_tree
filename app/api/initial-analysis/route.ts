import { NextRequest, NextResponse } from 'next/server';
import { GallupTalent, MBTIType, Analysis } from '@/types';
import { createInitialAnalysisPrompt } from '@/lib/prompts';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body: { talents: GallupTalent[]; mbti: MBTIType } = await request.json();

    const { talents, mbti } = body;

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

    // 从环境变量获取 API Key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误：缺少API密钥' },
        { status: 500 }
      );
    }

    // 生成提示词
    const prompt = createInitialAnalysisPrompt(talents, mbti);

    // 调用OpenRouter API
    const aiResponse = await callOpenRouter(prompt, apiKey);

    // 提取JSON数据
    const parsedData = extractJSON(aiResponse);

    // 验证响应格式
    if (!parsedData.talentsAnalysis || !parsedData.synergyAnalysis) {
      throw new Error('AI响应格式不正确');
    }

    const response: { analysis: Analysis } = {
      analysis: {
        talentsAnalysis: parsedData.talentsAnalysis as string,
        synergyAnalysis: parsedData.synergyAnalysis as string,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('初步分析API错误:', error);
    const errorMessage = error instanceof Error ? error.message : '分析失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
