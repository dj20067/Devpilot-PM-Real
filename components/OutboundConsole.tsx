import React, { useState, useRef, useEffect } from 'react';
import { OutboundContext } from '../types';

interface OutboundConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext: OutboundContext | null;
}

type ViewState = 'dialpad' | 'calling' | 'association';

const OutboundConsole: React.FC<OutboundConsoleProps> = ({ isOpen, onClose, initialContext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // State for Context & Call Flow
  const [activeContext, setActiveContext] = useState<OutboundContext | null>(null);
  const [viewState, setViewState] = useState<ViewState>('dialpad');
  const [callDuration, setCallDuration] = useState(0);

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

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      class="fixed z-50 w-[300px] bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200 flex flex-col"
    >
      
      {/* Top Drag Handle Bar */}
      <div class="flex justify-between items-center px-4 py-3 border-b border-slate-50 dark:border-slate-800 bg-white dark:bg-surface-dark select-none shrink-0 relative z-20 h-[56px]">
          {/* Header Content: Shows Context Capsule if active, otherwise shows Default Title */}
          {viewState === 'dialpad' && activeContext ? (
             <div class="flex-1 flex justify-center items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 max-w-[220px] shadow-sm">
                    <span class="material-icons-outlined text-sm">link</span>
                    <span class="truncate font-medium">关联中: {activeContext.userName} - {activeContext.recordTitle}</span>
                    <button 
                        onClick={clearContext}
                        class="ml-1 w-4 h-4 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-400 hover:text-blue-600 transition-colors shrink-0"
                    >
                        <span class="material-icons-outlined text-[10px]">close</span>
                    </button>
                </div>
             </div>
          ) : (
            <div class="flex-1 flex justify-center items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium translate-x-3">
               <span class="material-icons-outlined text-green-500 text-lg rotate-12">wifi_calling_3</span>
               <span class="text-sm">在线</span>
            </div>
          )}

          <div 
            onMouseDown={handleMouseDown}
            class="cursor-move text-slate-300 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-300 p-1 border border-slate-200 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-colors ml-2"
          >
             <span class="material-icons-outlined text-lg block">open_with</span> 
          </div>
      </div>

      {/* Main Content Area based on ViewState */}
      <div class="relative bg-white dark:bg-surface-dark flex-1 flex flex-col">
        
        {/* VIEW 1: Dialpad */}
        {viewState === 'dialpad' && (
            <>
                {/* Settings / Status Row */}
                <div class="px-6 pt-5 pb-2 bg-slate-50/30 dark:bg-slate-800/20">
                    <div class="flex justify-between items-center mb-2 mt-4">
                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 transition-colors">
                            <span class="text-sm font-medium">软电话</span>
                            <span class="material-icons-outlined text-slate-400 text-base">expand_more</span>
                        </div>
                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 transition-colors">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <span class="text-sm font-medium">在线</span>
                            <span class="material-icons-outlined text-slate-400 text-base">expand_more</span>
                        </div>
                    </div>
                    <div class="text-xs text-slate-400 flex items-center gap-1 pl-0.5">
                        <span>本机号码：</span>
                        <span class="material-icons-outlined text-sm rotate-0">shuffle</span>
                        <span>随机</span>
                    </div>
                </div>

                {/* Input Display */}
                <div class="px-6 py-6 flex justify-center relative group">
                    <input
                        className="text-center text-xl tracking-wider text-slate-700 dark:text-slate-200 border-none bg-transparent focus:ring-0 w-full placeholder-slate-300 dark:placeholder-slate-600 outline-none"
                        placeholder="输入号码"
                        value={phoneNumber}
                        readOnly
                    />
                    {phoneNumber && (
                        <button 
                        onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                        >
                        <span class="material-icons-outlined">backspace</span>
                        </button>
                    )}
                </div>

                {/* Keypad */}
                <div class="px-8 pb-8">
                    <div class="grid grid-cols-3 gap-x-5 gap-y-4 mb-6">
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
                    
                    <div class="flex justify-center">
                        <button 
                            onClick={startCall}
                            class="w-16 h-16 rounded-full bg-[#52c41a] hover:bg-[#49aa14] flex items-center justify-center text-white shadow-lg shadow-green-500/30 transition-all active:scale-95"
                        >
                            <span class="material-icons-outlined text-3xl">call</span>
                        </button>
                    </div>
                </div>
            </>
        )}

        {/* VIEW 2: In Calling */}
        {viewState === 'calling' && (
            <div class="flex flex-col items-center justify-center h-full min-h-[400px] animate-in fade-in duration-300">
                <div class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 relative">
                     <span class="material-icons-outlined text-6xl text-slate-300 dark:text-slate-600">person</span>
                     <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-surface-dark">
                        <span class="material-icons-outlined text-white text-sm animate-pulse">mic</span>
                     </div>
                </div>
                <h3 class="text-xl font-medium text-slate-800 dark:text-slate-200 mb-1">
                    {activeContext ? activeContext.userName : (phoneNumber || '未知号码')}
                </h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mb-8">
                    正在通话中...
                </p>
                <div class="text-3xl font-mono text-slate-700 dark:text-slate-300 mb-12">
                    {formatDuration(callDuration)}
                </div>

                 {/* Context info during call */}
                 {activeContext && (
                    <div class="mb-8 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                         <span class="material-icons-outlined text-sm">link</span>
                         已关联：{activeContext.recordTitle}
                    </div>
                 )}

                <div class="flex gap-6">
                     <button class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span class="material-icons-outlined text-2xl">mic_off</span>
                     </button>
                     <button class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <span class="material-icons-outlined text-2xl">dialpad</span>
                     </button>
                     <button 
                        onClick={endCall}
                        class="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all active:scale-95"
                    >
                        <span class="material-icons-outlined text-3xl">call_end</span>
                    </button>
                </div>
            </div>
        )}

        {/* VIEW 3: Association (Post Call) */}
        {viewState === 'association' && (
            <div class="flex flex-col h-full min-h-[400px] animate-in slide-in-from-bottom-5 duration-300 p-6">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-6">
                        <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                            <span class="material-icons-outlined">link_off</span>
                        </div>
                        <div>
                            <h3 class="font-medium text-slate-800 dark:text-slate-200">补录关联信息</h3>
                            <p class="text-xs text-slate-500">本次通话未关联到具体记录</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-slate-500 mb-1">通话对象</label>
                            <input 
                                type="text" 
                                value={phoneNumber}
                                disabled
                                class="w-full text-sm px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-medium text-slate-500 mb-1">关联客户/工单</label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-icons-outlined text-slate-400 text-lg">search</span>
                                <input 
                                    type="text" 
                                    placeholder="搜索客户姓名、手机号或工单号"
                                    class="w-full text-sm pl-9 pr-3 py-2 bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div class="mt-2 text-xs text-slate-400">
                                最近会话：
                                <div class="mt-1 flex flex-wrap gap-2">
                                    <button class="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 rounded border border-transparent hover:border-blue-200 transition-colors">
                                        椰子 - 会话 #s1
                                    </button>
                                     <button class="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 rounded border border-transparent hover:border-blue-200 transition-colors">
                                        工单 #T-20260101
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-auto flex gap-3">
                    <button 
                        onClick={() => { setViewState('dialpad'); setPhoneNumber(''); }}
                        class="flex-1 py-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
                    >
                        暂不关联
                    </button>
                    <button 
                        onClick={() => { setViewState('dialpad'); setPhoneNumber(''); }}
                        class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-sm transition-colors text-sm font-medium"
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