import React from 'react';
import { User, Message } from '../types';

interface ChatWindowProps {
  user: User;
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark min-w-0 relative">
      {/* Header */}
      <div className="h-14 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex justify-between items-center px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden text-center">
            <span className="material-icons-outlined text-slate-400 mt-1">person</span>
          </div>
          <div>
            <div className="flex items-center gap-1 font-medium dark:text-slate-200">
              {user.name}
              <span className="material-icons-outlined text-green-600 text-sm">palm_tree</span>
            </div>
            <div className="text-xs text-slate-500">{user.company}</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => {
          if (msg.type === 'notice') {
            return (
              <div key={msg.id} className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-blue-100 dark:border-blue-900/30" dangerouslySetInnerHTML={{__html: msg.content}}></div>
            );
          }
           if (msg.type === 'system_end') {
            return (
               <div key={msg.id} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-xs text-slate-600 dark:text-slate-300 max-w-[85%] mx-auto border border-slate-200 dark:border-slate-700">
                  <div dangerouslySetInnerHTML={{__html: msg.content}}></div>
                  <div className="text-right mt-1 text-slate-400">未读</div>
               </div>
            )
           }
          
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 w-full`}>
               {/* Separator if needed, logic simplified for mock */}
               {msg.content.includes("进入会话") && (
                 <div className="w-full text-center text-xs text-slate-400 my-2">{msg.content}</div>
               )}

               {!msg.content.includes("进入会话") && (
                 <>
                  <div className={`flex items-end gap-1 ${isMe ? 'mr-auto justify-end w-full' : 'ml-auto'} text-xs text-slate-400`}>
                    {msg.senderName} {msg.timestamp}
                  </div>
                  <div className={`${isMe ? 'bg-white dark:bg-slate-700 mr-auto rounded-tl-none border-slate-200 dark:border-slate-600' : 'bg-blue-50 dark:bg-blue-900/30 ml-auto rounded-tr-none border-blue-100 dark:border-blue-800'} p-3 rounded-2xl  text-slate-700 dark:text-slate-200 max-w-[80%] border shadow-sm`}>
                    {msg.content}
                  </div>
                  <div className={`${isMe ? 'mr-auto' : 'ml-auto'} text-xs text-slate-400`}>
                    {msg.readStatus === 'read' ? '已读' : '未读'}
                  </div>
                 </>
               )}
            </div>
          );
        })}
        
        {/* History Dividers Mock */}
         <div className="flex items-center justify-center gap-2 mt-8">
            <div className="h-px bg-slate-200 dark:bg-slate-700 w-16"></div>
            <span className="text-xs text-slate-400">以上为历史消息</span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 w-16"></div>
        </div>
        <div className="text-center text-xs text-slate-400">01-04 10:35:36 工程师子鱼进入会话</div>
      </div>

      {/* Input Area */}
      <div className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-4 shrink-0">
        <div className="mb-2">
          <textarea 
            className="w-full bg-transparent border-none resize-none focus:ring-0 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400" 
            placeholder="请输入您的消息..." 
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-slate-400">
            <button className="hover:text-slate-600 dark:hover:text-slate-200"><span className="material-icons-outlined text-xl">description</span></button>
            <button className="hover:text-slate-600 dark:hover:text-slate-200"><span className="material-icons-outlined text-xl">sentiment_satisfied_alt</span></button>
            <button className="hover:text-slate-600 dark:hover:text-slate-200"><span className="material-icons-outlined text-xl">image</span></button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">0/500</span>
            <button className="hover:text-slate-600 dark:hover:text-slate-200"><span className="material-icons-outlined text-lg">open_in_full</span></button>
            <button className="text-blue-500 hover:text-blue-600"><span className="material-icons-outlined transform rotate-90">send</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;