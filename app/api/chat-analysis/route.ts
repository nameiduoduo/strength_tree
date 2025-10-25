import { NextRequest, NextResponse } from 'next/server';
import { GallupTalent, GallupCategory } from '@/types';
import { callOpenRouter } from '@/lib/openrouter';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAnalysisRequest {
  talents: GallupTalent[];
  categories: GallupCategory[];
  chatHistory: Message[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatAnalysisRequest = await request.json();
    const { talents, categories, chatHistory } = body;

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

    if (!chatHistory || chatHistory.length === 0) {
      return NextResponse.json(
        { error: '对话历史不能为空' },
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

    // 构建系统提示词
    const systemPrompt = `你是一位专业的盖洛普才干教练。用户已经选择了34项才干的排序和4个维度的优先级:

用户的才干排序(从最重要到相对较弱):
${talents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

用户的维度优先级:
${categories.map((c, i) => `${i + 1}. ${c}`).join('\n')}

你的任务是:
1. 倾听用户分享的经历和故事
2. 根据用户的描述,分析可能体现了哪些才干特质
3. 将分析结果与用户的才干排序对比,给出洞察
4. 引导用户继续分享更多相关经历

注意事项:
- 回复要简洁、有洞察力(100-200字)
- 明确指出用户的经历体现了哪些才干
- 鼓励用户继续分享更多案例
- 保持温暖、专业的教练风格`;

    // 构建完整的对话消息
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }))
    ];

    // 调用 OpenRouter API
    const conversationPrompt = messages.map(m =>
      `${m.role === 'system' ? '[系统]' : m.role === 'user' ? '[用户]' : '[助手]'} ${m.content}`
    ).join('\n\n');

    const aiResponse = await callOpenRouter(conversationPrompt, apiKey);

    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('对话分析API错误:', error);
    const errorMessage = error instanceof Error ? error.message : '分析失败,请稍后重试';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
