import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, referencePoints } = body;

    // 验证输入
    if (!title || !description) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 生成提示词
    const referencePointsText = referencePoints && referencePoints.length > 0
      ? `\n\n参考要点:\n${referencePoints.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}`
      : '';

    const prompt = `你是一位专业的行为改变教练,擅长将抽象目标转化为具体可执行的行动计划。

用户想要改善的目标:
标题: ${title}
说明: ${description}${referencePointsText}

请针对这个目标,生成3-5个具体的引导问题,帮助用户思考并制定可落地的微习惯行动计划。

要求:
1. 问题要具体、有针对性,不要太宽泛
2. 问题应该引导用户思考"谁、什么、何时、何地、如何"等具体细节
3. 问题要符合微习惯理念,鼓励用户拆解成小而具体的步骤
4. 问题要有实践性,能够直接转化为可执行的任务

示例(仅供参考格式,不要照搬):
- 如果目标是"主动创造对话机会",问题可以是:
  * "你准备和谁对话?列出3-5个具体的人名"
  * "你想分享什么话题?准备至少3个有趣的话题"
  * "什么时候开始?设定每天或每周的固定时间和地点"

请以JSON格式返回,格式如下:
{
  "questions": [
    "问题1",
    "问题2",
    "问题3"
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
    if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
      throw new Error('AI响应格式不正确');
    }

    return NextResponse.json({
      questions: parsedData.questions as string[]
    });
  } catch (error) {
    console.error('生成引导问题失败:', error);
    const errorMessage = error instanceof Error ? error.message : '生成失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
