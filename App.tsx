import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import RightPanel from './components/RightPanel';
import OutboundConsole from './components/OutboundConsole';
import { User, ChatSession, Message, RightPanelTab, OutboundContext } from './types';

// Mock Data
const currentUser: User = {
  id: 'u1',
  name: '椰子',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKDkrE61pLTwag1YvLy-AW_j4ndGmGCBdqik_D_weaHy3zv_71TsHKRCdBqzR8iejk05OlJenesFiFk5EHSqroIedkhLbU0g1UwQiZT-QCIa5PCTuc1IthvqLH1Si7l0Tc3xrSX5uyXIoFtaXoYOS7R0wL66gEYe5d_d6ThmG71fkme0VegMjQ1dRvdl5kTUNGGqyqPi6fnxLI5aAAKHak-MNVYLbRI5mHwZq699xhMu4SxaLNQyTQqtF3oYBP3chi4Y0LN5XzHo',
  company: '分叉科技',
  email: 'sy@fckj',
  phone: '13588098641',
  type: '企业高级账号',
  tier: '0星',
  tenantType: '未签约组织',
};

const sessions: ChatSession[] = [
  {
    id: 's1',
    user: currentUser,
    lastMessage: '我：✨🌴 椰子，您好！我是高级工...',
    lastMessageTime: '10:35',
    status: 'active',
    hasCertificate: true,
  }
];

const messages: Message[] = [
  {
    id: 'm1',
    senderId: 'system',
    senderName: 'System',
    type: 'notice',
    timestamp: '10:00',
    content: `
      <div class="font-bold mb-2 flex items-center gap-1"><span class="text-amber-500">📢</span> [公告通知] 元旦放假</div>
      <p class="mb-1"><span class="font-bold">📆 2026年01月01日（周四）元旦放假</span></p>
      <p class="mb-2"><span class="font-bold text-red-500">📆 2025年12月31日、2026年01月02-03日</span> 元旦假期保留紧急通道，值班时间：9:00-12:00；13:30-18:00。</p>
      <p class="flex gap-1 items-start">
        <span class="text-red-500 material-icons-outlined text-sm">pin_drop</span>
        <span>假期期间，遇到常规问题可以<a href="#" class="text-blue-500 underline">创建工单</a>，官方工程师将于1月4日复工后第一时间为您解决。</span>
      </p>
      <p class="mt-2 text-slate-500">2026，让重复归于机器，让创造回归于你。愿新的一年，影刀助你解放双手，在省下的时间里，去探寻更有温度的世界。启迪心灵，成就自我，新年快乐！</p>
      <div class="text-right mt-1 text-slate-400">已读</div>
    `
  },
  {
    id: 'm2',
    senderId: 'me',
    senderName: '子鱼',
    type: 'text',
    timestamp: '12/31/2025, 4:13:51 PM',
    content: '✨🌴 椰子，您好！我是高级工程师子鱼。关于您的RPA问题，我需要和您进一步沟通，方便现在聊聊吗？',
    readStatus: 'unread'
  },
   {
    id: 'm3',
    senderId: 'u1',
    senderName: '刀刀机器人',
    type: 'text',
    timestamp: '12/31/2025, 4:19:00 PM',
    content: '哈哈，刀刀我又来啦～ 本次会话将自动结束。如需继续，请回复我们的RPA工程师🌟',
    readStatus: 'unread'
  },
  {
    id: 'm4',
    senderId: 'system',
    senderName: 'System',
    type: 'system_end',
    timestamp: '',
    content: `
      <p class="font-medium mb-2">本次会话已结束，感谢你与影刀同行</p>
      <p class="mb-1">学习RPA就像栽种魔法树苗🌱——</p>
      <p class="mb-2">今日埋下逻辑的种子，明天就能收到自动化的星辰！</p>
      <p class="text-slate-500">记住：<span class="font-bold text-slate-700 dark:text-slate-200">所有大师都曾是新手，而你已在改变世界的路上 🚀</span></p>
    `
  }
];

const App: React.FC = () => {
  const [activeSessionId, setActiveSessionId] = useState<string>('s1');
  const [activeRightTab, setActiveRightTab] = useState<RightPanelTab>(RightPanelTab.CUSTOMER_INFO);
  const [isOutboundOpen, setIsOutboundOpen] = useState<boolean>(false);
  const [outboundContext, setOutboundContext] = useState<OutboundContext | null>(null);

  const handleOpenOutbound = () => {
    // Determine context based on the current view. 
    // Currently, we are viewing 's1', so we mock the context of that session.
    const activeSession = sessions.find(s => s.id === activeSessionId);
    
    if (activeSession) {
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${yy}/${mm}/${dd} ${hh}:${min}`;

      setOutboundContext({
        userId: activeSession.user.id,
        userName: activeSession.user.name,
        recordType: 'session',
        recordId: activeSession.id,
        recordTitle: `会话：${timeStr}`
      });
    } else {
      setOutboundContext(null);
    }
    
    setIsOutboundOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header onOpenOutbound={handleOpenOutbound} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <ChatList 
          sessions={sessions} 
          activeSessionId={activeSessionId} 
          onSelectSession={setActiveSessionId} 
        />
        <ChatWindow 
          user={currentUser} 
          messages={messages} 
        />
        
        {/* Expand button mock - right side of chat window */}
        <div className="w-4 flex items-center justify-center bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
          <span className="material-icons-outlined text-xs text-slate-400">chevron_right</span>
        </div>

        <RightPanel 
          user={currentUser} 
          activeTab={activeRightTab} 
          onTabChange={setActiveRightTab} 
        />

        {/* Floating Components */}
        <OutboundConsole 
          isOpen={isOutboundOpen} 
          onClose={() => setIsOutboundOpen(false)} 
          initialContext={outboundContext}
        />
      </div>
    </div>
  );
};

export default App;