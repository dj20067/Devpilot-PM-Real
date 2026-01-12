import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import RightPanel from './components/RightPanel';
import OutboundConsole from './components/OutboundConsole';
import ServiceConfirmationModal from './components/ServiceConfirmationModal';
import { User, ChatSession, Message, RightPanelTab, OutboundContext, UserRole } from './types';

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

// Queued Users Mock
const queuedUsers: User[] = [
    {
        id: 'u2',
        name: '苦瓜',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        company: '杭州某电商',
        email: 'kg@ds.com',
        phone: '13812345678',
        type: '个人账号',
        tier: '1星',
        tenantType: '个人'
    },
    {
        id: 'u3',
        name: '西瓜',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        company: '上海科技',
        email: 'xg@sh.com',
        phone: '13987654321',
        type: '企业账号',
        tier: 'VIP',
        tenantType: 'VIP组织'
    }
];

const initialSessions: ChatSession[] = [
  {
    id: 's1',
    user: currentUser,
    lastMessage: '我：✨🌴 椰子，您好！我是高级工...',
    lastMessageTime: '10:35',
    status: 'active',
    hasCertificate: true,
  },
  {
      id: 'q1',
      user: queuedUsers[0],
      lastMessage: '请问如何使用Excel批量抓取数据？',
      lastMessageTime: '10:45',
      status: 'queued',
      hasCertificate: false
  },
  {
      id: 'q2',
      user: queuedUsers[1],
      lastMessage: '流程运行报错：找不到目标元素...',
      lastMessageTime: '10:48',
      status: 'queued',
      hasCertificate: true
  }
];

const initialMessages: Message[] = [
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
  const [sessions, setSessions] = useState<ChatSession[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string>('s1');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeRightTab, setActiveRightTab] = useState<RightPanelTab>(RightPanelTab.ACTIONS);
  const [isOutboundOpen, setIsOutboundOpen] = useState<boolean>(false);
  const [outboundContext, setOutboundContext] = useState<OutboundContext | null>(null);
  
  // Role & Service Modal State
  const [userRole, setUserRole] = useState<UserRole>('developer');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);

  // Derived current session and user
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const displayUser = activeSession.user;

  // Auto-switch tab if role changes to developer and current tab is restricted
  useEffect(() => {
    if (userRole === 'developer') {
        const allowedTabs = [RightPanelTab.ACTIONS, RightPanelTab.HISTORY];
        if (!allowedTabs.includes(activeRightTab)) {
            setActiveRightTab(RightPanelTab.ACTIONS);
        }
    }
  }, [userRole, activeRightTab]);

  const handleOpenOutbound = () => {
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

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  // Helper to move session to top and update status/time
  const promoteSessionToTop = (sessionId: string, newStatus: 'active' | 'queued' | 'ended', lastMessageContent?: string) => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setSessions(prev => {
          const targetIndex = prev.findIndex(s => s.id === sessionId);
          if (targetIndex === -1) return prev;
          
          const targetSession = { ...prev[targetIndex] };
          targetSession.status = newStatus;
          targetSession.lastMessageTime = timeStr;
          if (lastMessageContent) {
              targetSession.lastMessage = lastMessageContent;
          }

          const otherSessions = prev.filter(s => s.id !== sessionId);
          // Return new array with target at the beginning (top)
          return [targetSession, ...otherSessions];
      });
  };

  const handleConnectTrigger = () => {
    if (userRole === 'developer') {
        // If developer, require confirmation
        setPendingSessionId(activeSessionId);
        setIsServiceModalOpen(true);
    } else {
        // If official, connect immediately and move to top
        promoteSessionToTop(activeSessionId, 'active');
    }
  };

  const handleConfirmService = () => {
      if (pendingSessionId) {
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          // Update session to active and move to top of list
          promoteSessionToTop(pendingSessionId, 'active', '[系统通知] 已作为社区飞行员接入');
          
          // Push developer-specific guidance messages
          const guidanceMessages: Message[] = [
            {
              id: `sys_guide_${Date.now()}_1`,
              senderId: 'system',
              senderName: '系统助手',
              type: 'notice',
              timestamp: timeStr,
              content: `
                <div class="flex items-center gap-2 mb-1">
                   <span class="material-icons-outlined text-blue-500 text-sm">flight_takeoff</span>
                   <span class="font-bold text-slate-700 dark:text-slate-200">已作为「社区飞行员」接入会话</span>
                </div>
                <div class="text-slate-500 dark:text-slate-400 pl-6">
                   当前身份仅支持提供建议，无法直接操作用户账号。服务过程中请注意保护用户隐私。
                </div>
              `
            },
            {
               id: `sys_guide_${Date.now()}_2`,
               senderId: 'system',
               senderName: '系统助手',
               type: 'notice',
               timestamp: timeStr,
               content: `
                <div class="flex items-center gap-2 mb-1">
                   <span class="material-icons-outlined text-orange-500 text-sm">tips_and_updates</span>
                   <span class="font-bold text-slate-700 dark:text-slate-200">服务小贴士</span>
                </div>
                <ul class="list-disc list-inside text-slate-500 dark:text-slate-400 pl-1 space-y-1">
                   <li>提供的代码片段请务必提示用户先在测试环境运行</li>
                   <li>如遇技术难题，可建议用户提交工单转交官方</li>
                </ul>
               ` 
            }
          ];
          setMessages(prev => [...prev, ...guidanceMessages]);
          
          setPendingSessionId(null);
          setIsServiceModalOpen(false);
      }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header 
        onOpenOutbound={handleOpenOutbound} 
        userRole={userRole}
        onRoleChange={setUserRole}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar userRole={userRole} />
        <ChatList 
          sessions={sessions} 
          activeSessionId={activeSessionId} 
          onSelectSession={handleSelectSession} 
        />
        <ChatWindow 
          user={displayUser} 
          messages={messages}
          userRole={userRole}
          sessionStatus={activeSession.status}
          onConnect={handleConnectTrigger}
        />
        
        {/* Expand button mock - right side of chat window */}
        <div className="w-4 flex items-center justify-center bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
          <span className="material-icons-outlined text-xs text-slate-400">chevron_right</span>
        </div>

        <RightPanel 
          user={displayUser} 
          activeTab={activeRightTab} 
          onTabChange={setActiveRightTab} 
          userRole={userRole}
          onOpenOutbound={handleOpenOutbound}
        />

        {/* Floating Components */}
        <OutboundConsole 
          isOpen={isOutboundOpen} 
          onClose={() => setIsOutboundOpen(false)} 
          initialContext={outboundContext}
        />

        <ServiceConfirmationModal 
            isOpen={isServiceModalOpen}
            onClose={() => setIsServiceModalOpen(false)}
            onConfirm={handleConfirmService}
        />
      </div>
    </div>
  );
};

export default App;