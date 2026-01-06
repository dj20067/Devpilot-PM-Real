import React, { useState, useRef, useEffect } from 'react';
import { OutboundContext } from '../types';

interface OutboundConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext: OutboundContext | null;
}

type ViewState = 'dialpad' | 'calling' | 'association';
type AssociationTab = 'session' | 'ticket';

interface AssociationItem {
  id: string;
  type: 'session' | 'ticket';
  title: string;
  subtitle: string;
  avatar?: string;
  tag?: string;
}

const OutboundConsole: React.FC<OutboundConsoleProps> = ({ isOpen, onClose, initialContext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // State for Context & Call Flow
  const [activeContext, setActiveContext] = useState<OutboundContext | null>(null);
  const [viewState, setViewState] = useState<ViewState>('dialpad');
  const [callDuration, setCallDuration] = useState(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [associationTab, setAssociationTab] = useState<AssociationTab>('session');
  const [selectedItem, setSelectedItem] = useState<AssociationItem | null>(null);

  const dragOffset = useRef({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const hasInitializedPosition = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Initialize position
  useEffect(() => {
    if (isOpen && !hasInitializedPosition.current) {
      const width = 300;
      const rightMargin = 330;
      const initialX = window.innerWidth - rightMargin - width;
      setPosition({ x: Math.max(20, initialX), y: 64 });
      hasInitializedPosition.current = true;
    }
  }, [isOpen]);

  // Sync context when opened
  useEffect(() => {
    if (isOpen) {
      setActiveContext(initialContext);
      setViewState('dialpad');
      setPhoneNumber('');
      setSearchQuery('');
      setAssociationTab('session');
      setSelectedItem(null);
    }
  }, [isOpen, initialContext]);

  // Handle Dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsDragging(true);
      e.preventDefault();
    }
  };

  // Call Logic
  const startCall = () => {
    if (!phoneNumber && !activeContext) return; // Basic validation
    // If we have a context but no phone number typed, we assume we are calling the context user (mock)
    if (!phoneNumber && activeContext) {
        setPhoneNumber('13588098641'); // Mock user phone
    }
    setViewState('calling');
    setCallDuration(0);
    timerRef.current = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Logic: If we have an active context, we assume auto-association and reset.
    // If context was cleared or missing, we go to association screen.
    if (activeContext) {
        // Mock Auto-associate
        setViewState('dialpad');
        setPhoneNumber('');
        // onClose(); // Optional: close on finish or stay open
    } else {
        setViewState('association');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNumberClick = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const clearContext = () => {
      setActiveContext(null);
  };

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setTimeout(() => setIsSearchFocused(false), 200);

  const handleSelectItem = (item: AssociationItem) => {
    setSelectedItem(item);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleTabChange = (tab: AssociationTab) => {
      setAssociationTab(tab);
      setSearchQuery('');
      setSelectedItem(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className="fixed z-50 w-[300px] bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200 flex flex-col"
    >
      
      {/* Top Drag Handle Bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-50 dark:border-slate-800 bg-white dark:bg-surface-dark select-none shrink-0 relative z-20 h-[56px]">
          {/* Header Content: Shows Context Capsule if active, otherwise shows Default Title */}
          {viewState === 'dialpad' && activeContext ? (
             <div className="flex-1 flex justify-center items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 max-w-[220px] shadow-sm">
                    <span className="material-icons-outlined text-sm">link</span>
                    <span className="truncate font-medium">{activeContext.userName} - {activeContext.recordTitle}</span>
                    <button 
                        onClick={clearContext}
                        className="ml-1 w-4 h-4 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-400 hover:text-blue-600 transition-colors shrink-0"
                    >
                        <span className="material-icons-outlined text-[10px]">close</span>
                    </button>
                </div>
             </div>
          ) : (
            <div className="flex-1 flex justify-center items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium translate-x-3">
               <span className="material-icons-outlined text-green-500 text-lg rotate-12">wifi_calling_3</span>
               <span className="text-sm">在线</span>
            </div>
          )}

          <div 
            onMouseDown={handleMouseDown}
            className="cursor-move text-slate-300 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-300 p-1 border border-slate-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-colors ml-2"
          >
             <span className="material-icons-outlined text-lg block">open_with</span> 
          </div>
      </div>

      {/* Main Content Area based on ViewState */}
      <div className="relative bg-white dark:bg-surface-dark flex-1 flex flex-col">
        
        {/* VIEW 1: Dialpad */}
        {viewState === 'dialpad' && (
            <>
                {/* Settings / Status Row */}
                <div className="px-6 pt-5 pb-2 bg-slate-50/30 dark:bg-slate-800/20">
                    <div className="flex justify-between items-center mb-2 mt-4">
                        <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 transition-colors">
                            <span className="text-sm font-medium">软电话</span>
                            <span className="material-icons-outlined text-slate-400 text-base">expand_more</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium">在线</span>
                            <span className="material-icons-outlined text-slate-400 text-base">expand_more</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 pl-0.5">
                        <span>本机号码：</span>
                        <span className="material-icons-outlined text-sm rotate-0">shuffle</span>
                        <span>随机</span>
                    </div>
                </div>

                {/* Input Display */}
                <div className="px-6 py-6 flex justify-center relative group">
                    <input
                        className="text-center text-xl tracking-wider text-slate-700 dark:text-slate-200 border-none bg-transparent focus:ring-0 w-full placeholder-slate-300 dark:placeholder-slate-600 outline-none"
                        placeholder="输入号码"
                        value={phoneNumber}
                        readOnly
                    />
                    {phoneNumber && (
                        <button 
                        onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                        >
                        <span className="material-icons-outlined">backspace</span>
                        </button>
                    )}
                </div>

                {/* Keypad */}
                <div className="px-8 pb-8">
                    <div className="grid grid-cols-3 gap-x-5 gap-y-4 mb-6">
                        {['1','2','3','4','5','6','7','8','9','*','0','#'].map((key) => (
                            <button 
                            key={key}
                            onClick={() => handleNumberClick(key)}
                            className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 active:scale-95 transition-all select-none"
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex justify-center">
                        <button 
                            onClick={startCall}
                            className="w-16 h-16 rounded-full bg-[#52c41a] hover:bg-[#49aa14] flex items-center justify-center text-white shadow-lg shadow-green-500/30 transition-all active:scale-95"
                        >
                            <span className="material-icons-outlined text-3xl">call</span>
                        </button>
                    </div>
                </div>
            </>
        )}

        {/* VIEW 2: In Calling */}
        {viewState === 'calling' && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-in fade-in duration-300">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 relative">
                     <span className="material-icons-outlined text-6xl text-slate-300 dark:text-slate-600">person</span>
                     <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-surface-dark">
                        <span className="material-icons-outlined text-white text-sm animate-pulse">mic</span>
                     </div>
                </div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-1">
                    {activeContext ? activeContext.userName : (phoneNumber || '未知号码')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                    正在通话中...
                </p>
                <div className="text-3xl font-mono text-slate-700 dark:text-slate-300 mb-12">
                    {formatDuration(callDuration)}
                </div>

                 {/* Context info during call */}
                 {activeContext && (
                    <div className="mb-8 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                         <span className="material-icons-outlined text-sm">link</span>
                         已关联：{activeContext.recordTitle}
                    </div>
                 )}

                <div className="flex gap-6">
                     <button className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span className="material-icons-outlined text-2xl">mic_off</span>
                     </button>
                     <button className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span className="material-icons-outlined text-2xl">dialpad</span>
                     </button>
                     <button 
                        onClick={endCall}
                        className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all active:scale-95"
                    >
                        <span className="material-icons-outlined text-3xl">call_end</span>
                    </button>
                </div>
            </div>
        )}

        {/* VIEW 3: Association (Post Call) */}
        {viewState === 'association' && (
            <div className="flex flex-col h-full min-h-[400px] animate-in slide-in-from-bottom-5 duration-300 p-6">
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                            <span className="material-icons-outlined text-sm">link_off</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-800 dark:text-slate-200">补录关联信息</h3>
                            <p className="text-[10px] text-slate-500">通话结束，请关联业务记录</p>
                        </div>
                    </div>

                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 shrink-0">
                        <button
                            onClick={() => handleTabChange('session')}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${associationTab === 'session' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-600'}`}
                        >
                            关联会话
                        </button>
                        <button
                            onClick={() => handleTabChange('ticket')}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${associationTab === 'ticket' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-600'}`}
                        >
                            关联工单
                        </button>
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col">
                        <div className="relative z-20">
                            <span className={`absolute left-3 top-3 material-icons-outlined text-lg transition-colors ${isSearchFocused ? 'text-blue-500' : 'text-slate-400'}`}>search</span>
                            <input 
                                type="text" 
                                placeholder={associationTab === 'session' ? "搜索客户姓名、手机号" : "搜索工单号、客户姓名"}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleSearchFocus}
                                onBlur={handleSearchBlur}
                                className={`w-full text-sm pl-9 pr-3 py-2.5 bg-white dark:bg-surface-dark border rounded transition-all ${isSearchFocused ? 'border-blue-500 ring-1 ring-blue-500 shadow-sm' : 'border-slate-300 dark:border-slate-600'}`}
                            />
                            {isSearchFocused && searchQuery && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 ring-1 ring-slate-200 dark:ring-slate-700 z-50">
                                    <div className="max-h-60 overflow-y-auto">
                                        {associationTab === 'session' && (
                                            <>
                                                <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-wider">匹配会话</div>
                                                <div className="p-1">
                                                    <div 
                                                        onClick={() => handleSelectItem({
                                                            id: 's1',
                                                            type: 'session',
                                                            title: '椰子 2026/01/04 10:35 触发的会话',
                                                            subtitle: '分叉科技 · 135****8641',
                                                            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKDkrE61pLTwag1YvLy-AW_j4ndGmGCBdqik_D_weaHy3zv_71TsHKRCdBqzR8iejk05OlJenesFiFk5EHSqroIedkhLbU0g1UwQiZT-QCIa5PCTuc1IthvqLH1Si7l0Tc3xrSX5uyXIoFtaXoYOS7R0wL66gEYe5d_d6ThmG71fkme0VegMjQ1dRvdl5kTUNGGqyqPi6fnxLI5aAAKHak-MNVYLbRI5mHwZq699xhMu4SxaLNQyTQqtF3oYBP3chi4Y0LN5XzHo',
                                                            tag: '企业'
                                                        })}
                                                        className="flex items-center gap-3 px-2 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded cursor-pointer group"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKKDkrE61pLTwag1YvLy-AW_j4ndGmGCBdqik_D_weaHy3zv_71TsHKRCdBqzR8iejk05OlJenesFiFk5EHSqroIedkhLbU0g1UwQiZT-QCIa5PCTuc1IthvqLH1Si7l0Tc3xrSX5uyXIoFtaXoYOS7R0wL66gEYe5d_d6ThmG71fkme0VegMjQ1dRvdl5kTUNGGqyqPi6fnxLI5aAAKHak-MNVYLbRI5mHwZq699xhMu4SxaLNQyTQqtF3oYBP3chi4Y0LN5XzHo" className="w-full h-full object-cover"/>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate" title="椰子 2026/01/04 10:35 触发的会话">
                                                                椰子 2026/01/04 10:35 触发的会话
                                                            </div>
                                                            <div className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                                                                 <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1 rounded text-slate-500">企业</span>
                                                                 <span>分叉科技 · 135****8641</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        
                                        {associationTab === 'ticket' && (
                                            <>
                                                <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-wider">相关工单</div>
                                                <div className="p-1">
                                                    <div 
                                                        onClick={() => handleSelectItem({
                                                            id: 't1',
                                                            type: 'ticket',
                                                            title: '工单 #T-20260101',
                                                            subtitle: '无法安装Studio，报错代码503'
                                                        })}
                                                        className="flex items-center gap-3 px-2 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded cursor-pointer group"
                                                    >
                                                        <div className="w-8 h-8 rounded bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                                                            <span className="material-icons-outlined text-base">confirmation_number</span>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                                                工单 #T-20260101
                                                            </div>
                                                            <div className="text-xs text-slate-400 truncate">无法安装Studio，报错代码503</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Empty/Loading State for dropdown */}
                            {isSearchFocused && !searchQuery && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 ring-1 ring-slate-200 dark:ring-slate-700 z-50">
                                    <div className="p-8 flex flex-col items-center justify-center text-slate-400 gap-2">
                                        <span className="material-icons-outlined text-3xl text-slate-300">search</span>
                                        <span className="text-xs">
                                            {associationTab === 'session' ? '输入关键词查找客户' : '输入关键词查找工单'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Item Display */}
                        {selectedItem && (
                            <div className="mt-3 relative group animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="absolute -top-2 left-3 bg-white dark:bg-surface-dark px-1 text-[10px] text-blue-500 font-medium z-10">
                                    已选择
                                </div>
                                <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3 relative overflow-hidden">
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${selectedItem.type === 'session' ? 'bg-slate-200' : 'bg-orange-100 text-orange-500'}`}>
                                        {selectedItem.type === 'session' ? (
                                             <img src={selectedItem.avatar} className="w-full h-full object-cover rounded-full"/>
                                        ) : (
                                            <span className="material-icons-outlined">confirmation_number</span>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                                            {selectedItem.title}
                                        </div>
                                        <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                                            {selectedItem.tag && <span className="px-1 bg-slate-100 dark:bg-slate-700 rounded text-[10px] text-slate-500">{selectedItem.tag}</span>}
                                            {selectedItem.subtitle}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setSelectedItem(null)}
                                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <span className="material-icons-outlined text-sm">close</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Recent Items (Hidden when searching or item selected) */}
                        {!isSearchFocused && !selectedItem && (
                            <div className="mt-2 text-xs text-slate-400">
                                {associationTab === 'session' ? '最近会话：' : '最近工单：'}
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {associationTab === 'session' ? (
                                        <button 
                                            onClick={() => handleSelectItem({
                                                id: 's1',
                                                type: 'session',
                                                title: '椰子 2026/01/04 10:35 触发的会话',
                                                subtitle: '分叉科技 · 135****8641',
                                                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKDkrE61pLTwag1YvLy-AW_j4ndGmGCBdqik_D_weaHy3zv_71TsHKRCdBqzR8iejk05OlJenesFiFk5EHSqroIedkhLbU0g1UwQiZT-QCIa5PCTuc1IthvqLH1Si7l0Tc3xrSX5uyXIoFtaXoYOS7R0wL66gEYe5d_d6ThmG71fkme0VegMjQ1dRvdl5kTUNGGqyqPi6fnxLI5aAAKHak-MNVYLbRI5mHwZq699xhMu4SxaLNQyTQqtF3oYBP3chi4Y0LN5XzHo',
                                                tag: '企业'
                                            })}
                                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 rounded border border-transparent hover:border-blue-200 transition-colors"
                                        >
                                            椰子 10:35 会话
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleSelectItem({
                                                id: 't1',
                                                type: 'ticket',
                                                title: '工单 #T-20260101',
                                                subtitle: '无法安装Studio，报错代码503'
                                            })}
                                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 rounded border border-transparent hover:border-blue-200 transition-colors"
                                        >
                                            工单 #T-20260101
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <button 
                        onClick={() => { setViewState('dialpad'); setPhoneNumber(''); setSelectedItem(null); }}
                        className="flex-1 py-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
                    >
                        暂不关联
                    </button>
                    <button 
                        onClick={() => { setViewState('dialpad'); setPhoneNumber(''); setSelectedItem(null); }}
                        className={`flex-1 py-2 rounded shadow-sm transition-colors text-sm font-medium ${selectedItem ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-500/50 text-white cursor-not-allowed'}`}
                    >
                        确认关联
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default OutboundConsole;