import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  userRole?: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole = 'official' }) => {
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

  // Filter for developer (pilot) role
  const visibleMenuItems = userRole === 'developer'
    ? menuItems.filter(item => ['首页', '实时会话', '会话记录', '工单列表'].includes(item.label))
    : menuItems;

  const visibleBottomItems = userRole === 'developer'
    ? bottomItems.filter(item => ['个人中心'].includes(item.label))
    : bottomItems;

  return (
    <nav className="w-56 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col shrink-0 overflow-y-auto">
      <div className="py-2">
        {visibleMenuItems.map((item, index) => (
          <a 
            key={index}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              item.active 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-r-2 border-red-500' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-icons-outlined text-lg">{item.icon}</span>
            <span className={item.active ? 'font-medium' : ''}>{item.label}</span>
          </a>
        ))}

        <div className="mt-2">
          {visibleBottomItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {!item.noArrow && <span className="material-icons-outlined text-sm">expand_more</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto px-4 py-3 border-t border-border-light dark:border-border-dark">
        <span className="material-icons-outlined text-lg text-slate-400">notes</span>
      </div>
    </nav>
  );
};

export default Sidebar;