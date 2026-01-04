import React from 'react';
import { ChatSession } from '../types';

interface ChatListProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ sessions, activeSessionId, onSelectSession }) => {
  return (
    <div class="w-72 bg-slate-50/50 dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col shrink-0">
      <div class="flex items-center justify-between px-2 h-12 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <button class="flex-1 text-center h-full relative text-red-500 font-medium">
          会话中 (1)
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>
        </button>
        <button class="flex-1 text-center h-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          排队中 (0)
        </button>
        <button class="flex-1 text-center h-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          已结束
        </button>
      </div>
      <div class="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div 
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            class={`p-3 border-l-4 cursor-pointer transition-colors ${
              activeSessionId === session.id
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div class="flex justify-between items-start mb-1">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
                  <img alt="Avatar" class="w-full h-full object-cover" src={session.user.avatar} />
                  <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div class="min-w-0">
                  <div class="font-medium text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    {session.user.name}
                    <span class="material-icons-outlined text-green-600 text-sm">palm_tree</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 truncate w-32">{session.lastMessage}</div>
                </div>
              </div>
              <span class="text-xs text-slate-400">{session.lastMessageTime}</span>
            </div>
            <div class="flex gap-2 mt-2 ml-12">
              {session.hasCertificate && (
                <span class="text-[10px] px-1 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800 rounded">有证书</span>
              )}
               {session.user.tier && (
                <span class="text-[10px] px-1 py-0.5 bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded">{session.user.tier}</span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;