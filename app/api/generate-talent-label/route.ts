import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouter, extractJSON } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const { talents, categories } = await request.json();

    if (!talents || !Array.isArray(talents) || talents.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的才干列表' },
        { status: 400 }
      );
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的维度列表' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '服务器配置错误: 缺少API密钥' },
        { status: 500 }
      );
    }

    const topFive = talents.slice(0, 5);
    const categoryOrder = categories.join(' > ');

    const prompt = `你是一位专业的盖洛普优势分析师。

用户的才干排序(前5项): ${topFive.join('、')}
用户的维度排序: ${categoryOrder}

请完成以下任务:

1. 生成一个才干组合标签(6-10个汉字,正面有力,易于记忆)
2. 标签的一句话描述(30-40字,概括整体特质)
3. 从前5项才干中,找出3组有化学反应的才干组合,分析它们组合后的协同效应

才干组合要求:
- 每组包含2-3个才干
- 每组分析要展现才干之间的"协同效应"或"化学反应"
- 分析要具体生动,40-50字,使用第二人称"你"
- 为每组选择一个合适的emoji(如✨📚🎯🌟💡🔥🎨🚀等)

示例格式:
{
  "label": "乐观进取的知识实践者",
  "description": "你天生热爱学习成长,善于将知识转化为成果,并用积极的态度影响他人。",
  "talentCombinations": [
    {
      "talents": ["积极", "取悦"],
      "emoji": "✨",
      "analysis": "你天生乐观向上,并且能将这份正能量感染身边的人,让他们也感到快乐和被重视。"
    },
    {
      "talents": ["学习", "搜集"],
      "emoji": "📚",
      "analysis": "你热爱吸收新知识,像海绵一样收集各种信息,享受持续成长的过程。"
    },
    {
      "talents": ["成就", "学习"],
      "emoji": "🎯",
      "analysis": "你不只是学习,更要将所学转化为实际成果,每一个完成的目标都是你成长的里程碑。"
    }
  ]
}

现在请为用户生成才干画像,必须以JSON格式返回,不要包含任何其他文本。`;

    const content = await callOpenRouter(prompt, apiKey);

    if (!content) {
      throw new Error('AI 返回内容为空');
    }

    const result = extractJSON(content);

    // 验证返回数据结构
    if (!result.label || !result.description || !result.talentCombinations) {
      throw new Error('AI 返回数据格式不正确');
    }

    if (!Array.isArray(result.talentCombinations) || result.talentCombinations.length === 0) {
      throw new Error('AI 未返回才干组合分析');
    }

    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('生成才干标签失败:', error);

    // 返回友好的错误信息
    const errorMessage = error instanceof Error ? error.message : '生成失败';

    return NextResponse.json(
      {
        error: '生成才干画像时出错',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
