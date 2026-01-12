import React, { useState } from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenOutbound: () => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

type PilotTier = 'ace' | 'gold' | 'silver' | 'bronze' | 'trainee';
type UserStatus = 'online' | 'away' | 'offline';

interface TierConfig {
  label: string;
  icon: string;
  rewardText: string;
  styles: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    tooltipHeaderBg: string;
    tooltipText: string;
    tooltipBorder: string;
    iconColor: string;
  };
}

const TIER_CONFIGS: Record<PilotTier, TierConfig> = {
  ace: {
    label: '王牌飞行员',
    icon: 'workspace_premium',
    rewardText: '此“飞行段位”额外奖励 75%',
    styles: {
      badgeBg: 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20',
      badgeText: 'text-purple-600 dark:text-purple-400',
      badgeBorder: 'border-purple-500/30',
      tooltipHeaderBg: 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      tooltipText: 'text-purple-700 dark:text-purple-300',
      tooltipBorder: 'border-purple-100 dark:border-purple-900/30',
      iconColor: 'text-purple-500'
    }
  },
  gold: {
    label: '金牌飞行员',
    icon: 'military_tech',
    rewardText: '此“飞行段位”额外奖励 50%',
    styles: {
      badgeBg: 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20',
      badgeText: 'text-amber-600 dark:text-amber-400',
      badgeBorder: 'border-amber-500/40',
      tooltipHeaderBg: 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      tooltipText: 'text-amber-700 dark:text-amber-400',
      tooltipBorder: 'border-amber-100 dark:border-amber-900/30',
      iconColor: 'text-amber-500'
    }
  },
  silver: {
    label: '银牌飞行员',
    icon: 'military_tech',
    rewardText: '此“飞行段位”额外奖励 40%',
    styles: {
      badgeBg: 'bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-700 dark:to-gray-700 hover:opacity-90',
      badgeText: 'text-slate-600 dark:text-slate-300',
      badgeBorder: 'border-slate-300 dark:border-slate-500',
      tooltipHeaderBg: 'bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800',
      tooltipText: 'text-slate-700 dark:text-slate-300',
      tooltipBorder: 'border-slate-200 dark:border-slate-600',
      iconColor: 'text-slate-500 dark:text-slate-400'
    }
  },
  bronze: {
    label: '铜牌飞行员',
    icon: 'military_tech',
    rewardText: '此“飞行段位”额外奖励 20%',
    styles: {
      badgeBg: 'bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20',
      badgeText: 'text-orange-700 dark:text-orange-400',
      badgeBorder: 'border-orange-300 dark:border-orange-700',
      tooltipHeaderBg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10',
      tooltipText: 'text-orange-800 dark:text-orange-300',
      tooltipBorder: 'border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600 dark:text-orange-500'
    }
  },
  trainee: {
    label: '见习飞行员',
    icon: 'flight_takeoff',
    rewardText: '见习期收益系数 0.5x',
    styles: {
      badgeBg: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
      badgeText: 'text-emerald-600 dark:text-emerald-400',
      badgeBorder: 'border-emerald-200 dark:border-emerald-700',
      tooltipHeaderBg: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10',
      tooltipText: 'text-emerald-700 dark:text-emerald-300',
      tooltipBorder: 'border-emerald-100 dark:border-emerald-800',
      iconColor: 'text-emerald-500'
    }
  }
};

const Header: React.FC<HeaderProps> = ({ onOpenOutbound, userRole, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState<PilotTier>('gold');
  
  // Status State
  const [userStatus, setUserStatus] = useState<UserStatus>('online');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [acceptTickets, setAcceptTickets] = useState(true);

  const tierConfig = TIER_CONFIGS[currentTier];

  const statusOptions = [
    { key: 'online', label: '在线', icon: 'check_circle', color: 'text-green-500', sub: '接收会话与工单' },
    { key: 'away', label: '挂机', icon: 'bedtime', color: 'text-amber-500', sub: '暂不分配新会话' },
    { key: 'offline', label: '离线', icon: 'highlight_off', color: 'text-slate-400', sub: '停止所有服务' },
  ] as const;

  const currentStatusConfig = statusOptions.find(s => s.key === userStatus) || statusOptions[0];

  return (
    <header className="h-12 bg-[#20293a] flex items-center justify-between px-4 shrink-0 shadow-md z-20">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          <span className="material-icons-outlined text-sm">support_agent</span>
        </div>
        <h1 className="text-white font-medium text-sm tracking-wide">
            {userRole === 'developer' ? '在线工程师.beta' : '在线工程师系统'}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenOutbound}
          className="bg-[#a3e635] hover:bg-[#84cc16] text-slate-900 px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors"
        >
          外呼发起(空闲:28)
        </button>

        {/* Status Switcher */}
        <div className="relative">
            <button
                onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors focus:outline-none group"
            >
                <span className={`material-icons-outlined text-base ${currentStatusConfig.color}`}>
                    {currentStatusConfig.icon}
                </span>
                <span className={`text-xs font-medium ${userStatus === 'offline' ? 'text-gray-400' : 'text-gray-200 group-hover:text-white'}`}>
                    {currentStatusConfig.label}
                </span>
                <span className="material-icons-outlined text-xs text-gray-400">arrow_drop_down</span>
            </button>

            {isStatusMenuOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsStatusMenuOpen(false)} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-100">
                         <div className="p-2 space-y-1">
                            {statusOptions.map(option => (
                                <button
                                    key={option.key}
                                    onClick={() => { setUserStatus(option.key as any); setIsStatusMenuOpen(false); }}
                                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left group ${userStatus === option.key ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                >
                                    <span className={`material-icons-outlined text-xl mt-0.5 ${option.color}`}>{option.icon}</span>
                                    <div>
                                        <div className={`text-sm font-medium ${userStatus === option.key ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900'}`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{option.sub}</div>
                                    </div>
                                    {userStatus === option.key && <span className="material-icons-outlined text-blue-600 text-base ml-auto mt-1">check</span>}
                                </button>
                            ))}
                         </div>
                         
                         <div className="border-t border-slate-100 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`text-sm font-bold ${userStatus === 'online' ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>工单接单模式</span>
                                        {userStatus === 'online' && acceptTickets && <span className="text-[10px] bg-green-100 text-green-600 px-1.5 rounded-full border border-green-200">听单中</span>}
                                    </div>
                                    <span className="text-xs text-slate-400 mt-0.5">类似滴滴模式，自动接收派单</span>
                                </div>
                                <button 
                                    onClick={() => userStatus === 'online' && setAcceptTickets(!acceptTickets)}
                                    className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${acceptTickets && userStatus === 'online' ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed opacity-70'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-transform duration-200 ${acceptTickets && userStatus === 'online' ? 'left-[22px]' : 'left-1'}`}></div>
                                </button>
                            </div>
                            {userStatus !== 'online' && (
                                <div className="text-xs text-amber-600 mt-2 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded border border-amber-100 dark:border-amber-900/30">
                                    <span className="material-icons-outlined text-sm">warning_amber</span>
                                    需切换至「在线」状态才可接单
                                </div>
                            )}
                         </div>
                    </div>
                </>
            )}
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
                  {userRole === 'official' ? (
                    <span className="text-[9px] opacity-70 scale-90 origin-left border border-gray-500 px-1 rounded">
                        官方工程师
                    </span>
                  ) : (
                    <div className="relative group" onClick={(e) => e.stopPropagation()}>
                        <div className={`scale-90 origin-left text-[9px] border px-1.5 rounded cursor-help flex items-center gap-0.5 transition-colors ${tierConfig.styles.badgeBg} ${tierConfig.styles.badgeText} ${tierConfig.styles.badgeBorder}`}>
                            <span className="material-icons-outlined text-[10px]">{tierConfig.icon}</span>
                            <span className="font-bold">{tierConfig.label}</span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute top-full right-0 pt-3 w-80 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[60] cursor-default">
                              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                {/* Header */}
                                <div className={`p-3 border-b flex justify-between items-center relative overflow-hidden ${tierConfig.styles.tooltipHeaderBg} ${tierConfig.styles.tooltipBorder}`}>
                                    <div className="z-10 relative">
                                        <div className={`font-bold text-xs flex items-center gap-1 ${tierConfig.styles.tooltipText}`}>
                                            <span className="material-icons-outlined text-sm">{tierConfig.icon}</span>
                                            <span>{tierConfig.label}</span>
                                        </div>
                                        <div className={`text-[10px] mt-0.5 font-medium opacity-90 ${tierConfig.styles.tooltipText}`}>
                                            {tierConfig.rewardText}
                                        </div>
                                    </div>
                                    <span className={`material-icons-outlined text-5xl opacity-10 absolute -right-2 -bottom-4 rotate-12 ${tierConfig.styles.iconColor}`}>
                                        {tierConfig.icon}
                                    </span>
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
                                                <span className="text-[10px] text-slate-600 dark:text-slate-300">互助会话量</span>
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

                                    {/* Special Reminder */}
                                    <div className="bg-[#fffbe6] dark:bg-yellow-900/10 rounded p-2.5 border border-yellow-100 dark:border-yellow-900/20">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1">
                                                    <span className="material-icons-outlined text-amber-500 text-xs">warning</span>
                                                    <span className="font-bold text-[10px] text-amber-800 dark:text-amber-500">特别提醒</span>
                                                </div>
                                                <button className="text-blue-500 hover:text-blue-600 text-[10px] flex items-center gap-0.5 cursor-pointer">
                                                    标准 <span className="material-icons-outlined text-[10px]">open_in_new</span>
                                                </button>
                                            </div>
                                            
                                            <p className="text-[10px] text-amber-800/70 dark:text-amber-500/70 mb-2 font-medium">
                                            服务时长与质量绑定「飞行段位」
                                            </p>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-1.5">
                                                    <span className="material-icons-outlined text-red-400 text-xs mt-0.5">trending_up</span>
                                                    <div className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                                                        <span className="font-bold text-slate-800 dark:text-slate-200">顶格输出：</span>
                                                        高激励系数、优质工单优先抢、资源倾斜
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-1.5">
                                                        <span className="material-icons-outlined text-blue-400 text-xs mt-0.5">trending_down</span>
                                                        <div className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">
                                                        <span className="font-bold text-slate-800 dark:text-slate-200">摆烂划水：</span>
                                                        段位俯冲降级，严重者当场吊销执照
                                                    </div>
                                                </div>
                                            </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                                            <span className="material-icons-outlined text-[10px] text-slate-400">help_outline</span>
                                            说明
                                        </div>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                            等级体系：见习 / 铜牌 / 银牌 / 金牌 / 王牌。<br/>当前等级由运营团队综合评估。
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
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-20 py-1 animate-in fade-in zoom-in-95 duration-100">
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
                        <span>社区飞行员</span>
                        {userRole === 'developer' && <span className="material-icons-outlined text-sm">check</span>}
                    </button>

                    {/* Tier Switcher for Demo */}
                    {userRole === 'developer' && (
                        <>
                           <div className="px-3 py-1.5 border-b border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/50 mt-1">切换段位 (演示)</div>
                           <div className="grid grid-cols-1">
                                {(['ace', 'gold', 'silver', 'bronze', 'trainee'] as PilotTier[]).map(tier => (
                                    <button
                                        key={tier}
                                        onClick={(e) => { e.stopPropagation(); setCurrentTier(tier); }}
                                        className={`px-4 py-2 text-xs text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between ${currentTier === tier ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-600'}`}
                                    >
                                        <span>{TIER_CONFIGS[tier].label}</span>
                                        {currentTier === tier && <span className="material-icons-outlined text-xs">radio_button_checked</span>}
                                    </button>
                                ))}
                           </div>
                        </>
                    )}

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