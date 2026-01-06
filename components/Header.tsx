import React, { useState } from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenOutbound: () => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenOutbound, userRole, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-12 bg-[#20293a] flex items-center justify-between px-4 shrink-0 shadow-md z-20">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          <span className="material-icons-outlined text-sm">support_agent</span>
        </div>
        <h1 className="text-white font-medium text-sm tracking-wide">在线工程师系统</h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenOutbound}
          className="bg-[#a3e635] hover:bg-[#84cc16] text-slate-900 px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors"
        >
          外呼发起(空闲:28)
        </button>
        <div className="flex items-center text-gray-300 gap-1 cursor-pointer hover:text-white">
          <span className="material-icons-outlined text-base">highlight_off</span>
          <span className="text-xs">离线</span>
          <span className="material-icons-outlined text-xs">arrow_drop_down</span>
        </div>
        <div className="text-gray-300 hover:text-white cursor-pointer relative">
          <span className="material-icons-outlined text-lg">volume_up</span>
        </div>
        <div className="text-gray-300 hover:text-white cursor-pointer relative">
          <span className="material-icons-outlined text-lg">notifications</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">33</span>
        </div>
        
        {/* User Profile & Role Switcher */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer select-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 rounded-full bg-slate-500 overflow-hidden">
              <img 
                alt="User Avatar" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGGBEywwAu6mkbGghq6BY0LSDWunMM0Dfy2pcuzd99FlQtyWq-0EwHt7EiRQGJCIffA0XEJ2aKn8BigLouaupvsTsclAZsY8izVP74nowjmsGr5iKcEQ16uwyBUij5OjowgE0l8SCQsgusVmC-S-dEuQgHwgoQ1BRM4rOLuH7TsM7kSYa9CK29sP7WUWQXnYDnkr4f2xsvgoqw6sLxFpsmYdVN5X8tynpmfajIZzo0pekCbHa1SvH6hNb_XyDhQ9jMAQ3AUjy5g18"
              />
            </div>
            <div className="flex flex-col items-start leading-none -space-y-0.5">
                <span className="text-xs">子鱼</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[9px] opacity-70 scale-90 origin-left border border-gray-500 px-1 rounded">
                      {userRole === 'official' ? '官方工程师' : '热心开发者'}
                  </span>
                  
                  {userRole === 'developer' && (
                    <div className="relative group" onClick={(e) => e.stopPropagation()}>
                        <div className="scale-90 origin-left text-[9px] bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/40 px-1.5 rounded cursor-help flex items-center gap-0.5 hover:bg-amber-500/30 transition-colors">
                            <span className="material-icons-outlined text-[8px]">military_tech</span>
                            <span>Lv.3</span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute top-full right-0 pt-3 w-64 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60] cursor-default">
                              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 border-b border-amber-100 dark:border-amber-900/30 flex justify-between items-center">
                                    <div>
                                        <div className="text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1">
                                            <span>Lv.3 高级开发者</span>
                                        </div>
                                        <div className="text-[10px] text-amber-500/80 mt-0.5">当前收益系数: <span className="font-bold">1.5x</span></div>
                                    </div>
                                    <span className="material-icons-outlined text-amber-400 text-2xl opacity-50">military_tech</span>
                                </div>
                                
                                {/* Content */}
                                <div className="p-3 space-y-3 text-left">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                                            <span className="material-icons-outlined text-[10px] text-blue-500">info</span>
                                            晋升评估维度
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-1">
                                                <span className="material-icons-outlined text-sm text-indigo-400">confirmation_number</span>
                                                <span className="text-[10px] text-slate-600 dark:text-slate-300">工单与会话量</span>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-1">
                                                <span className="material-icons-outlined text-sm text-blue-400">timer</span>
                                                <span className="text-[10px] text-slate-600 dark:text-slate-300">服务时长</span>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-1">
                                                <span className="material-icons-outlined text-sm text-pink-400">thumb_up</span>
                                                <span className="text-[10px] text-slate-600 dark:text-slate-300">用户满意度</span>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-1">
                                                <span className="material-icons-outlined text-sm text-green-400">history</span>
                                                <span className="text-[10px] text-slate-600 dark:text-slate-300">在线活跃时长</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                                            <span className="material-icons-outlined text-[10px] text-slate-400">help_outline</span>
                                            说明
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                            当前等级由运营团队根据以上维度综合评估。保持活跃与高质量服务有助于快速晋升。
                                        </p>
                                    </div>
                                </div>
                              </div>
                        </div>
                    </div>
                  )}
                </div>
            </div>
            <span className="material-icons-outlined text-xs">arrow_drop_down</span>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 font-medium">切换角色</div>
                    <button 
                        onClick={() => { onRoleChange('official'); setIsMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between ${userRole === 'official' ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        <span>官方工程师</span>
                        {userRole === 'official' && <span className="material-icons-outlined text-sm">check</span>}
                    </button>
                     <button 
                        onClick={() => { onRoleChange('developer'); setIsMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between ${userRole === 'developer' ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        <span>热心开发者</span>
                        {userRole === 'developer' && <span className="material-icons-outlined text-sm">check</span>}
                    </button>
                    <div className="border-t border-slate-100 dark:border-slate-700 mt-1"></div>
                    <button className="w-full text-left px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                        <span className="material-icons-outlined text-sm">logout</span>
                        退出登录
                    </button>
                </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;