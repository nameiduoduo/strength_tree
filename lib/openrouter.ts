import ky from 'ky';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// 使用免费模型
const FREE_MODEL = 'google/gemini-2.0-flash-lite';

export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

// 调用OpenRouter API
export async function callOpenRouter(
  prompt: string,
  apiKey: string
): Promise<string> {
  try {
    const response = await ky.post(OPENROUTER_API_URL, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://gallup-product.com',
        'X-Title': '盖洛普+MBTI成长建议',
      },
      json: {
        model: FREE_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          }
        ],
        temperature: 0.7,
      } as OpenRouterRequest,
      timeout: 60000, // 60秒超时
    }).json<OpenRouterResponse>();

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenRouter API 调用失败:', error);
    throw new Error('AI分析请求失败,请稍后重试');
  }
}

// 从AI响应中提取JSON
export function extractJSON(text: string): Record<string, unknown> {
  // 尝试提取```json```代码块
  const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    try {
      return JSON.parse(jsonBlockMatch[1]);
    } catch (e) {
      console.error('JSON解析失败', e);
    }
  }

  // 尝试直接解析整个文本
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('JSON解析失败', e);
  }

  // 尝试查找第一个{到最后一个}
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('JSON解析失败', e);
    }
  }

  throw new Error('无法从AI响应中提取有效的JSON数据');
}
