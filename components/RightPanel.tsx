import React from 'react';
import { User, RightPanelTab } from '../types';

interface RightPanelProps {
  user: User;
  activeTab: RightPanelTab;
  onTabChange: (tab: RightPanelTab) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ user, activeTab, onTabChange }) => {
  const tabs = [
    { id: RightPanelTab.ACTIONS, label: '会话操作' },
    { id: RightPanelTab.CUSTOMER_INFO, label: '客户信息' },
    { id: RightPanelTab.HISTORY, label: '服务历史' },
    { id: RightPanelTab.MORE_INFO, label: '更多信息' },
  ];

  return (
    <aside class="w-80 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex flex-col shrink-0 overflow-y-auto">
      {/* Tab Header */}
      <div class="flex items-center justify-between px-2 h-12 border-b border-border-light dark:border-border-dark">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            class={`flex-1 text-center h-full relative text-xs transition-colors ${
              activeTab === tab.id
                ? 'text-blue-500 font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div class="flex-1 custom-scrollbar">
        {activeTab === RightPanelTab.CUSTOMER_INFO && <CustomerInfoContent user={user} />}
        {activeTab === RightPanelTab.ACTIONS && <ActionsContent />}
        {activeTab === RightPanelTab.HISTORY && <HistoryContent />}
        {activeTab === RightPanelTab.MORE_INFO && <MoreInfoContent />}
      </div>
    </aside>
  );
};

const CustomerInfoContent: React.FC<{ user: User }> = ({ user }) => (
  <div class="p-6">
    <div class="flex flex-col items-center mb-8">
      <div class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-3 relative overflow-hidden border-2 border-white dark:border-slate-600 shadow-md">
        <img alt="Large Avatar" class="w-full h-full object-cover p-1" src={user.avatar} />
        <div class="absolute bottom-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
      </div>
      <h3 class="text-base font-medium flex items-center gap-1 dark:text-slate-200">
        {user.name}
        <span class="material-icons-outlined text-green-600 text-sm">palm_tree</span>
      </h3>
      <p class="text-xs text-slate-500">{user.company}</p>
    </div>

    <div class="mb-6">
      <h4 class="font-medium text-sm mb-3 dark:text-slate-300">基本信息</h4>
      <div class="space-y-3 text-xs">
        <div class="flex justify-between">
          <span class="text-slate-500 dark:text-slate-400">租户类型</span>
          <span class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{user.tenantType}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500 dark:text-slate-400">用户账号</span>
          <span class="text-slate-700 dark:text-slate-300">{user.email}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-500 dark:text-slate-400">用户类型</span>
          <span class="bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">{user.type}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-500 dark:text-slate-400">客户分层</span>
          <span class="bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded border border-yellow-100 dark:border-yellow-800">{user.tier}</span>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <h4 class="font-medium text-sm mb-2 dark:text-slate-300">客户标签</h4>
      <div class="relative">
        <input class="w-full text-xs border border-border-light dark:border-border-dark rounded bg-transparent px-3 py-2 dark:text-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="请选择客户标签" type="text" />
      </div>
    </div>

    <div class="mb-6 relative">
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-medium text-sm dark:text-slate-300">备注</h4>
        <span class="material-icons-outlined text-pink-300 text-lg">translate</span>
      </div>
      <textarea class="w-full text-xs border border-border-light dark:border-border-dark rounded bg-transparent px-3 py-2 dark:text-slate-300 h-24 resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="请输入客户备注信息"></textarea>
      <div class="absolute bottom-2 right-2 cursor-pointer opacity-50 hover:opacity-100">
        <span class="material-icons-outlined text-slate-400 text-xs">edit</span>
      </div>
    </div>

    <div class="mb-6">
      <h4 class="font-medium text-sm mb-3 dark:text-slate-300">联系信息</h4>
      <div class="space-y-2 text-xs">
        <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span class="material-icons-outlined text-slate-400 text-sm">call</span>
          {user.phone}
        </div>
        <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span class="material-icons-outlined text-slate-400 text-sm">email</span>
          {user.email?.replace('sy@', 'ye.zi@yingdao.com')} {/* Just mocking the detail email */}
        </div>
      </div>
    </div>
  </div>
);

const ActionsContent: React.FC = () => (
  <div class="p-6">
    <div class="space-y-3 mb-6">
      <button class="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity text-sm font-medium">
        <span class="material-icons-outlined text-base">assignment</span>
        <span>服务小计</span>
      </button>
      <button class="w-full bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 py-2 rounded border border-border-light dark:border-border-dark flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
        <span class="material-icons-outlined text-base text-gray-400">compare_arrows</span>
        <span>转接会话</span>
      </button>
      <button class="w-full bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 py-2 rounded border border-border-light dark:border-border-dark flex items-center justify-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
        <span class="material-icons-outlined text-base text-gray-400">description</span>
        <span>新增工单</span>
      </button>
      <button class="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors text-sm font-medium">
        <span class="material-icons-outlined text-base">highlight_off</span>
        <span>结束会话</span>
      </button>
    </div>
    
    <div class="border-t border-border-light dark:border-border-dark my-4"></div>
    <div class="mb-6">
        <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">问题详情</h3>
        <div class="space-y-3 text-sm">
            <div class="flex"><span class="w-20 text-slate-500 flex-shrink-0">问题描述：</span></div>
            <div class="flex"><span class="w-20 text-slate-500 flex-shrink-0">客户应用：</span></div>
            <div class="flex"><span class="w-20 text-slate-500 flex-shrink-0">附件：</span></div>
        </div>
    </div>
     <div class="border-t border-border-light dark:border-border-dark my-4"></div>
    <div class="mb-6">
      <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">会话基础信息</h3>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between items-center">
          <span class="text-slate-500">会话状态：</span>
          <span class="text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded text-xs">会话中</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-500">开始时间：</span>
          <span class="text-slate-800 dark:text-slate-200 font-medium">2026-01-04 10:57:20</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-slate-500">会话处理人：</span>
            <span class="text-slate-800 dark:text-slate-200 font-medium">子鱼</span>
        </div>
      </div>
    </div>
  </div>
);

const HistoryContent: React.FC = () => (
  <div class="p-4 space-y-4">
    <div class="relative inline-block text-left w-32">
        <button class="inline-flex justify-between w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-2 bg-white dark:bg-surface-dark text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50">
            全部
            <span class="material-icons-outlined text-gray-400 text-lg">expand_more</span>
        </button>
    </div>
    {/* List Items */}
    {[
        { status: 'unresolved', type: 'session', date: '2026/01/04 10:43', duration: '7分45秒', agent: '子鱼' },
        { status: 'resolved', type: 'session', date: '2026/01/04 10:35', duration: '7分23秒', agent: '子鱼' },
        { status: 'resolved', type: 'session', date: '2025/12/31 16:13', duration: '7分9秒', agent: '子鱼' },
    ].map((item, i) => (
        <div key={i} class="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-start gap-3 border border-border-light dark:border-border-dark shadow-sm">
             <div class="mt-1"><span class="material-icons-outlined text-green-500 text-lg">chat_bubble_outline</span></div>
             <div class="flex-1">
                 <div class="flex justify-between items-start mb-1">
                     <div class="flex gap-2 items-center">
                         <span class={`px-2 py-0.5 text-xs rounded border ${item.status === 'resolved' ? 'border-tag-resolved-border text-tag-resolved-text bg-tag-resolved-bg' : 'border-tag-unresolved-border text-tag-unresolved-text bg-tag-unresolved-bg'}`}>
                             {item.status === 'resolved' ? '已解决' : '未解决'}
                         </span>
                         <span class="px-2 py-0.5 text-xs rounded border border-tag-session-border text-tag-session-text bg-tag-session-bg">会话</span>
                     </div>
                     <div class="text-xs text-slate-500 text-right">{item.date}</div>
                 </div>
                 <div class="flex justify-between items-end">
                     <div class="text-slate-800 dark:text-slate-200 font-medium">{item.agent}</div>
                     <div class="text-xs text-slate-500">时长：{item.duration}</div>
                 </div>
             </div>
        </div>
    ))}
  </div>
);

const MoreInfoContent: React.FC = () => (
    <div class="p-6 space-y-4">
        <h3 class="font-bold text-base text-slate-800 dark:text-slate-200 mb-4 mt-2">更多信息</h3>
        <div class="space-y-4 text-sm">
            <div class="flex justify-between items-start">
                <span class="text-slate-500 whitespace-nowrap">学院证书</span>
                <span class="text-slate-800 dark:text-slate-200 text-right">中级</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-slate-500 whitespace-nowrap">RPA合作状态</span>
                <span class="px-2 py-0.5 rounded border border-purple-200 bg-purple-50 text-purple-600 text-xs">未签约组织</span>
            </div>
             <div class="flex justify-between items-center">
                <span class="text-slate-500 whitespace-nowrap">服务小组</span>
                <span class="px-2 py-0.5 rounded border border-blue-200 bg-blue-50 text-blue-600 text-xs">江苏业务组</span>
            </div>
            <div class="flex justify-between items-start">
                <span class="text-slate-500 whitespace-nowrap">客户成功</span>
                <span class="text-slate-800 dark:text-slate-200 text-right">索隆</span>
            </div>
             <div class="flex justify-between items-center pt-2">
                <span class="text-slate-500 whitespace-nowrap">完整信息</span>
                <a href="#" class="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                    前往boss <span class="material-icons-outlined text-sm">open_in_new</span>
                </a>
            </div>
        </div>
    </div>
);

export default RightPanel;