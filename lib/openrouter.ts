import axios from 'axios';
import https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// 如果 DeepSeek 被限流，自动切换到备用模型
const MODEL = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat';

// 备用模型列表（当主模型失败时尝试）
const FALLBACK_MODELS = [
  'deepseek/deepseek-chat', // 付费模型,稳定可靠
  'deepseek/deepseek-chat-v3.1:free', // 免费模型,可能限流
  'mistralai/mistral-small-3.1-24b-instruct:free',
];

// 从环境变量读取代理配置（可选）
const PROXY_URL = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;

// 创建 axios 实例
const axiosInstance = axios.create({
  httpsAgent: PROXY_URL
    ? new HttpsProxyAgent(PROXY_URL)
    : new https.Agent({
        rejectUnauthorized: true,
        keepAlive: true,
        keepAliveMsecs: 60000,
      }),
  timeout: 120000, // 增加到120秒
});

// 输出配置信息（仅开发环境）
if (process.env.NODE_ENV === 'development') {
  console.log('OpenRouter 配置:');
  console.log('- 模型:', MODEL);
  console.log('- 代理:', PROXY_URL || '无');
  console.log('- API Key:', process.env.OPENROUTER_API_KEY ? '已配置' : '未配置');
}

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

// 调用OpenRouter API（带重试和模型回退机制）
export async function callOpenRouter(
  prompt: string,
  apiKey: string,
  maxRetries = 2
): Promise<string> {
  let lastError: Error | null = null;
  const modelsToTry = [MODEL, ...FALLBACK_MODELS.filter(m => m !== MODEL)];

  // 先尝试主模型，如果失败再尝试备用模型
  for (const currentModel of modelsToTry) {
    console.log(`\n🔧 尝试使用模型: ${currentModel}`);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`\n========== API 调用尝试 ${attempt}/${maxRetries} ==========`);
        console.log('请求配置:');
        console.log('- 当前模型:', currentModel);
        console.log('- API Key:', apiKey ? `${apiKey.substring(0, 15)}...` : '未提供');
        console.log('- 代理:', PROXY_URL || '无');
        console.log('- 提示词长度:', prompt.length, '字符');

        const requestData = {
          model: currentModel,
          messages: [
            {
              role: 'user',
              content: prompt,
            }
          ],
          temperature: 0.7,
        };

        console.log('发送请求到:', OPENROUTER_API_URL);
        const response = await axiosInstance.post<OpenRouterResponse>(
          OPENROUTER_API_URL,
          requestData,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://gallup-product.com',
              'X-Title': 'Gallup MBTI Growth Advisor',
            },
          }
        );

        console.log('✅ OpenRouter API 调用成功');
        console.log('- 使用模型:', currentModel);
        console.log('- 响应ID:', response.data.id);
        console.log('- 内容长度:', response.data.choices[0]?.message?.content?.length || 0, '字符');
        console.log('='.repeat(60));
        return response.data.choices[0]?.message?.content || '';
      } catch (error) {
        lastError = error as Error;
        console.error(`\n❌ OpenRouter API 调用失败 (尝试 ${attempt}/${maxRetries}):`);

        if (axios.isAxiosError(error)) {
          console.error('错误类型: Axios错误');
          console.error('状态码:', error.response?.status);
          console.error('错误信息:', error.response?.data);
          console.error('错误代码:', error.code);
        } else {
          console.error('错误类型: 未知错误');
          console.error('错误信息:', error);
        }

        if (axios.isAxiosError(error)) {
          // 处理 429 错误（速率限制）
          if (error.response?.status === 429) {
            const errorMessage = error.response?.data?.error?.message || '';
            const isUpstreamLimit = errorMessage.includes('rate-limited upstream');

            if (isUpstreamLimit) {
              // 上游模型被限制，尝试下一个备用模型
              console.log(`⚠️ 模型 ${currentModel} 被上游限制，尝试备用模型...`);
              break; // 跳出重试循环，尝试下一个模型
            }

            // 个人配额限制，等待后重试
            const retryAfter = error.response.headers['retry-after'];
            const baseWaitTime = retryAfter ? parseInt(retryAfter) * 1000 : 10000; // 默认10秒
            const waitTime = baseWaitTime * attempt;

            if (attempt < maxRetries) {
              console.log(`触发速率限制 (429)，${waitTime / 1000}秒后重试...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }
          }

          // 处理其他 HTTP 错误（4xx, 5xx）
          if (error.response) {
            const errorMessage = error.response.data?.error?.message || error.message;
            const statusCode = error.response.status;

            // 对于 4xx 错误（除了 429），不重试
            if (statusCode >= 400 && statusCode < 500 && statusCode !== 429) {
              throw new Error(`API请求失败 (${statusCode}): ${errorMessage}`);
            }

            // 对于 5xx 错误，可以重试
            if (statusCode >= 500 && attempt < maxRetries) {
              const waitTime = 3000 * attempt; // 3秒、6秒
              console.log(`服务器错误 (${statusCode})，${waitTime / 1000}秒后重试...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }

            throw new Error(`API请求失败 (${statusCode}): ${errorMessage}`);
          }

          // 处理网络错误（ECONNRESET, ETIMEDOUT 等）
          if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            if (attempt < maxRetries) {
              // 增加等待时间，避免立即重试
              const waitTime = 5000 * attempt; // 5秒、10秒
              console.log(`网络错误 (${error.code})，${waitTime / 1000}秒后重试...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }
          }
        }

        // 如果是最后一次尝试当前模型，继续尝试下一个模型
        if (attempt === maxRetries) {
          console.log(`❌ 模型 ${currentModel} 所有尝试均失败`);
          break;
        }
      }
    }
  }

  // 所有模型都失败了
  throw new Error(
    `AI分析请求失败，已尝试 ${modelsToTry.length} 个模型。` +
    `最后错误: ${lastError?.message || '未知错误'}。` +
    `建议：1) 在 .env.local 中设置 OPENROUTER_MODEL=deepseek/deepseek-chat 使用付费模型 2) 充值少量余额（$5即可用很久）`
  );
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
