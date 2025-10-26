'use client';

import { useRouter } from 'next/navigation';
import { Suggestion } from '@/types';

interface TaskChecklistProps {
  suggestions: Suggestion[];
  onTaskToggle: (suggestionId: string, taskId: string) => void;
}

export default function TaskChecklist({ suggestions, onTaskToggle }: TaskChecklistProps) {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">你的行动建议</h2>

      <div className="space-y-6">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={suggestion.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              {/* 建议标题 */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {suggestion.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 ml-11">
                  {suggestion.description}
                </p>
              </div>

              {/* 任务列表 */}
              <div className="space-y-3 ml-11">
                {suggestion.tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <span className="flex-shrink-0 w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-sm text-gray-900">
                      {task.content}
                    </span>
                  </div>
                ))}
              </div>

              {/* 专注按钮 */}
              <div className="mt-4 ml-11">
                <button
                  onClick={() => router.push(`/focus?id=${suggestion.id}`)}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium hover:bg-[#01a86a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#02BD7D' }}
                >
                  <span>🎯</span>
                  <span>专注于这组建议</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
