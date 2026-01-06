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
                <span className="text-[9px] opacity-70 scale-90 origin-left border border-gray-500 px-1 rounded mt-0.5">
                    {userRole === 'official' ? '官方工程师' : '热心开发者'}
                </span>
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