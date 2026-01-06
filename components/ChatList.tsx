import React, { useState, useMemo } from 'react';
import { ChatSession } from '../types';

interface ChatListProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
}

type TabType = 'active' | 'queued' | 'ended';

const ChatList: React.FC<ChatListProps> = ({ sessions, activeSessionId, onSelectSession }) => {
  const [activeTab, setActiveTab] = useState<TabType>('active');

  // Calculate counts
  const counts = useMemo(() => {
    return {
      active: sessions.filter(s => s.status === 'active').length,
      queued: sessions.filter(s => s.status === 'queued').length,
      ended: sessions.filter(s => s.status === 'ended').length,
    };
  }, [sessions]);

  // Filter sessions based on active tab
  const displayedSessions = useMemo(() => {
    return sessions.filter(s => s.status === activeTab);
  }, [sessions, activeTab]);

  return (
    <div className="w-72 bg-slate-50/50 dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col shrink-0">
      <div className="flex items-center justify-between px-2 h-12 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 text-center h-full relative text-xs font-medium transition-colors ${
            activeTab === 'active' ? 'text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          会话中 ({counts.active})
          {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('queued')}
          className={`flex-1 text-center h-full relative text-xs font-medium transition-colors ${
            activeTab === 'queued' ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          排队中 ({counts.queued})
          {activeTab === 'queued' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>}
        </button>
        <button 
          onClick={() => setActiveTab('ended')}
          className={`flex-1 text-center h-full relative text-xs font-medium transition-colors ${
            activeTab === 'ended' ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          已结束 ({counts.ended})
          {activeTab === 'ended' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-500"></span>}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {displayedSessions.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-slate-400">
               <span className="material-icons-outlined text-4xl mb-2 opacity-50">inbox</span>
               <span className="text-xs">暂无{activeTab === 'active' ? '进行中' : activeTab === 'queued' ? '排队中' : '已结束'}会话</span>
           </div>
        ) : (
          displayedSessions.map((session) => (
            <div 
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`p-3 border-l-4 cursor-pointer transition-colors ${
                activeSessionId === session.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300 shrink-0">
                    <img alt="Avatar" className="w-full h-full object-cover" src={session.user.avatar} />
                    {session.status === 'active' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                    {session.status === 'queued' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 border-2 border-white rounded-full animate-pulse"></span>}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-slate-800 dark:text-slate-100 flex items-center gap-1">
                      {session.user.name}
                      {session.status === 'queued' && <span className="text-[10px] bg-red-100 text-red-500 px-1 rounded">等待中</span>}
                      {session.user.tenantType === 'VIP' && <span className="material-icons-outlined text-yellow-500 text-sm">stars</span>}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate w-32">{session.lastMessage}</div>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{session.lastMessageTime}</span>
              </div>
              <div className="flex gap-2 mt-2 ml-12">
                {session.hasCertificate && (
                  <span className="text-[10px] px-1 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800 rounded">有证书</span>
                )}
                 {session.user.tier && (
                  <span className="text-[10px] px-1 py-0.5 bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded">{session.user.tier}</span>
                 )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;