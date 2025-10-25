'use client';

import { useState, useRef, useEffect } from 'react';
import { GallupTalent, GallupCategory } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TalentChatAnalysisProps {
  talents: GallupTalent[];
  categories: GallupCategory[];
  onComplete: (chatHistory: Message[]) => void;
}

export default function TalentChatAnalysis({ talents, categories, onComplete }: TalentChatAnalysisProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好!我是你的盖洛普才干教练。\n\n接下来,我会通过了解你的真实经历来帮助你更好地认识自己的才干。请分享一些你的故事:\n\n- 你曾经完成过什么让自己感到特别有成就感的事情?\n- 在工作或生活中,什么类型的任务让你感到特别顺手?\n- 别人经常在哪些方面寻求你的帮助?\n\n请随意分享,我会根据你的经历来分析可能体现的才干特质。'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          talents,
          categories,
          chatHistory: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('分析失败');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('发送消息失败:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        content: '抱歉,分析时出现了问题,请稍后再试。'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* 对话历史 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="分享你的经历..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed self-end"
          >
            发送
          </button>
        </div>

        <button
          onClick={() => onComplete(messages)}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          解读完成,进入下一步
        </button>
      </div>
    </div>
  );
}
