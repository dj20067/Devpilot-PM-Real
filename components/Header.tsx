import React from 'react';

interface HeaderProps {
  onOpenOutbound: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenOutbound }) => {
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
        <div className="flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-slate-500 overflow-hidden">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGGBEywwAu6mkbGghq6BY0LSDWunMM0Dfy2pcuzd99FlQtyWq-0EwHt7EiRQGJCIffA0XEJ2aKn8BigLouaupvsTsclAZsY8izVP74nowjmsGr5iKcEQ16uwyBUij5OjowgE0l8SCQsgusVmC-S-dEuQgHwgoQ1BRM4rOLuH7TsM7kSYa9CK29sP7WUWQXnYDnkr4f2xsvgoqw6sLxFpsmYdVN5X8tynpmfajIZzo0pekCbHa1SvH6hNb_XyDhQ9jMAQ3AUjy5g18"
            />
          </div>
          <span className="text-xs">子鱼</span>
          <span className="material-icons-outlined text-xs">arrow_drop_down</span>
        </div>
      </div>
    </header>
  );
};

export default Header;