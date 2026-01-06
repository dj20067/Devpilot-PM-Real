import React, { useEffect, useRef } from 'react';
import { User, Message, UserRole } from '../types';

interface ChatWindowProps {
  user: User;
  messages: Message[];
  userRole?: UserRole;
  sessionStatus?: 'active' | 'queued' | 'ended';
  onConnect?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages, userRole = 'official', sessionStatus = 'active', onConnect }) => {
  // Show connect button whenever status is queued, regardless of role
  const showConnectButton = sessionStatus === 'queued';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (msg: Message) => {
      // System notices
      if (msg.type === 'notice') {
        return (
          <div key={msg.id} className="w-full flex justify-center my-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-blue-100 dark:border-blue-900/30 max-w-[90%]" dangerouslySetInnerHTML={{__html: msg.content}}></div>
          </div>
        );
      }
      
      // System end message
      if (msg.type === 'system_end') {
        return (
           <div key={msg.id} className="w-full flex justify-center my-6 animate-in zoom-in duration-500">
               <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-xs text-slate-600 dark:text-slate-300 max-w-[85%] border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div dangerouslySetInnerHTML={{__html: msg.content}}></div>
                  <div className="text-right mt-1 text-slate-400">系统自动结束</div>
               </div>
           </div>
        );
      }

      // Normal messages
      const isMe = msg.senderId === 'me';
      const showHeader = !msg.content.includes("进入会话");
      
      // Separator "Entered Session"
      if (!showHeader) {
          return (
             <div key={msg.id} className="w-full text-center text-xs text-slate-400 my-4 flex items-center justify-center gap-2 animate-in fade-in duration-700">
                 <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
                 <span>{msg.content}</span>
                 <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
             </div>
          );
      }

      return (
        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 w-full group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {/* Sender Info */}
            <div className={`flex items-center gap-2 text-xs text-slate-400 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="font-medium opacity-90">{msg.senderName}</span>
                <span className="opacity-60 text-[10px] scale-90">{msg.timestamp.split(' ').pop()}</span>
            </div>

            {/* Bubble Container */}
            <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* Status Indicators (Only for Me) */}
                {isMe && (
                    <div className="flex flex-col justify-end h-full pb-0.5 shrink-0 min-w-[30px] items-end">
                         {msg.status === 'sending' && (
                             <span className="material-icons-outlined text-[14px] text-blue-500/80 animate-spin opacity-80" title="发送中...">sync</span>
                         )}
                         {msg.status === 'failed' && (
                             <span className="material-icons-outlined text-[16px] text-red-500 cursor-pointer hover:text-red-600 animate-in zoom-in duration-300" title="发送失败，点击重试">error</span>
                         )}
                         {(!msg.status || msg.status === 'sent') && (
                             <div className="flex items-center gap-0.5 animate-in fade-in duration-500">
                                 <span className={`text-[10px] ${msg.readStatus === 'read' ? 'text-blue-500 font-medium' : 'text-slate-400'}`}>
                                     {msg.readStatus === 'read' ? '已读' : '已发送'}
                                 </span>
                                 {msg.readStatus === 'read' && <span className="material-icons-outlined text-[12px] text-blue-500 animate-in zoom-in duration-300">done_all</span>}
                             </div>
                         )}
                    </div>
                )}

                {/* Bubble */}
                <div className={`
                    relative px-4 py-2.5 text-sm shadow-sm break-words
                    ${isMe 
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm selection:bg-blue-400' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 selection:bg-blue-100 dark:selection:bg-blue-900'
                    }
                `}>
                    {msg.content}
                </div>
            </div>
        </div>
      );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark min-w-0 relative">
      {/* Header */}
      <div className="h-14 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex justify-between items-center px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <span className="material-icons-outlined">person</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
              {user.name}
              {user.type?.includes('VIP') && <span className="material-icons-outlined text-yellow-500 text-sm">stars</span>}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal border border-slate-200 dark:border-slate-700">
                  {user.tenantType || '个人'}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
                <span className="truncate max-w-[150px]">{user.company || '未认证公司'}</span>
                {sessionStatus === 'queued' && (
                    <span className="text-[10px] bg-red-50 text-red-500 px-1.5 rounded-full border border-red-100 flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        排队中
                    </span>
                )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-colors">
                <span className="material-icons-outlined">search</span>
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-colors">
                <span className="material-icons-outlined">more_vert</span>
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-[#0f172a]">
        
        {/* History Dividers Mock */}
         <div className="flex items-center justify-center gap-3 py-4 opacity-50">
            <div className="h-px bg-slate-300 dark:bg-slate-700 w-12"></div>
            <span className="text-xs text-slate-400">查看历史消息</span>
            <div className="h-px bg-slate-300 dark:bg-slate-700 w-12"></div>
        </div>
        {!showConnectButton && (
             <div className="text-center text-xs text-slate-400 my-4 flex items-center justify-center gap-2 animate-in fade-in duration-500 delay-300">
                 <span className="material-icons-outlined text-[14px]">event_available</span>
                 <span>01-04 10:35:36 工程师子鱼进入会话</span>
             </div>
        )}

        {messages.map(renderMessageContent)}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area or Connect Action */}
      <div className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark shrink-0 z-20">
        {showConnectButton ? (
             <div className="p-6 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 gap-4 min-h-[160px]">
                <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <span className="material-icons-outlined text-blue-500">info</span>
                    <span>当前为排队会话，需接入后才能进行回复</span>
                </div>
                <button 
                    onClick={onConnect}
                    className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2 hover:-translate-y-0.5 animate-in zoom-in duration-300 delay-100"
                >
                    <span>立即接入</span>
                    <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
             </div>
        ) : (
            <div className="p-4 flex flex-col gap-2">
                {/* Toolbar */}
                <div className="flex items-center gap-4 px-2 text-slate-400">
                    <button className="hover:text-blue-500 transition-colors" title="常用语"><span className="material-icons-outlined text-xl">description</span></button>
                    <button className="hover:text-amber-500 transition-colors" title="表情"><span className="material-icons-outlined text-xl">sentiment_satisfied_alt</span></button>
                    <button className="hover:text-green-500 transition-colors" title="图片"><span className="material-icons-outlined text-xl">image</span></button>
                    <button className="hover:text-purple-500 transition-colors" title="文件"><span className="material-icons-outlined text-xl">folder_open</span></button>
                    <div className="flex-1"></div>
                    <button className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="历史"><span className="material-icons-outlined text-xl">history</span></button>
                </div>
                
                {/* Text Area */}
                <div className="relative">
                    <textarea 
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-100 dark:focus:border-blue-900 rounded-lg p-3 resize-none focus:ring-0 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-colors min-h-[80px]" 
                        placeholder="请输入消息，Enter 发送，Ctrl+Enter 换行..." 
                        rows={3}
                    ></textarea>
                </div>

                <div className="flex justify-between items-center px-1">
                    <span className="text-xs text-slate-300 dark:text-slate-600 pl-1">支持 Markdown 语法</span>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-300 dark:text-slate-600">0/500</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-1">
                            <span>发送</span>
                            <span className="material-icons-outlined text-xs">send</span>
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;