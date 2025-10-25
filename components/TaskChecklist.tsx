'use client';

import { Suggestion } from '@/types';

interface TaskChecklistProps {
  suggestions: Suggestion[];
  onTaskToggle: (suggestionId: string, taskId: string) => void;
}

export default function TaskChecklist({ suggestions, onTaskToggle }: TaskChecklistProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">你的成长建议</h2>

      <div className="space-y-6">
        {suggestions.map((suggestion, index) => {
          const completedCount = suggestion.tasks.filter(t => t.completed).length;
          const totalCount = suggestion.tasks.length;
          const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

          return (
            <div
              key={suggestion.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
            >
              {/* 建议标题和进度 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
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
                <div className="text-right ml-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {completedCount}/{totalCount}
                  </div>
                  <div className="text-xs text-gray-400">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>

              {/* 进度条 */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* 任务列表 */}
              <div className="space-y-3 ml-11">
                {suggestion.tasks.map((task) => (
                  <label
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onTaskToggle(suggestion.id, task.id)}
                      className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        task.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {task.content}
                    </span>
                    {task.completed && (
                      <span className="text-green-600 text-sm font-medium">
                        ✓ 已完成
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
