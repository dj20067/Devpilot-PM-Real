import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: 'home', label: '首页', active: false },
    { icon: 'support_agent', label: '实时会话', active: true },
    { icon: 'inbox', label: '公有池', active: false },
    { icon: 'history', label: '会话记录', active: false },
    { icon: 'assignment', label: '工单列表', active: false },
    { icon: 'smart_toy', label: '智能监控', active: false },
    { icon: 'analytics', label: '历史数据', active: false },
  ];

  const bottomItems = [
    { icon: 'account_tree', label: '服务流程' },
    { icon: 'manage_accounts', label: '账号管理' },
    { icon: 'map', label: '区域数据' },
    { icon: 'settings', label: '系统管理' },
    { icon: 'person', label: '个人中心', noArrow: true },
  ];

  return (
    <nav class="w-56 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col shrink-0 overflow-y-auto">
      <div class="py-2">
        {menuItems.map((item, index) => (
          <a 
            key={index}
            href="#"
            class={`flex items-center gap-3 px-4 py-3 transition-colors ${
              item.active 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-r-2 border-red-500' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span class="material-icons-outlined text-lg">{item.icon}</span>
            <span class={item.active ? 'font-medium' : ''}>{item.label}</span>
          </a>
        ))}

        <div class="mt-2">
          {bottomItems.map((item, index) => (
            <div 
              key={index}
              class="flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <span class="material-icons-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {!item.noArrow && <span class="material-icons-outlined text-sm">expand_more</span>}
            </div>
          ))}
        </div>
      </div>
      <div class="mt-auto px-4 py-3 border-t border-border-light dark:border-border-dark">
        <span class="material-icons-outlined text-lg text-slate-400">notes</span>
      </div>
    </nav>
  );
};

export default Sidebar;
