import React from 'react';

interface ServiceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ServiceConfirmationModal: React.FC<ServiceConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-surface-dark rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-full">
               <span className="material-icons-outlined text-xl">volunteer_activism</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">社区服务公约</h3>
              <p className="text-xs text-blue-100 opacity-90">热心开发者接单确认</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
            <p>感谢您作为<span className="font-bold text-blue-600 dark:text-blue-400">「热心开发者」</span>参与社区互助。在接入该用户的咨询前，请确认以下事项：</p>
            
            <ul className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
              <li className="flex gap-2 items-start">
                <span className="material-icons-outlined text-green-500 text-sm mt-0.5 shrink-0">check_circle</span>
                <span>保持友善与耐心，准确理解用户需求。</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="material-icons-outlined text-green-500 text-sm mt-0.5 shrink-0">check_circle</span>
                <span>我承诺通过系统“外呼功能”联系客户，严禁使用私人手机或加微信语音。</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="material-icons-outlined text-green-500 text-sm mt-0.5 shrink-0">check_circle</span>
                <span>我承诺远程操作仅限于解决当前工单问题，严禁翻阅、复制客户非相关业务数据。</span>
              </li>
            </ul>

            <p className="text-xs text-slate-400">
              * 接单后系统将自动记录服务时长与质量评价，这将影响您的社区信誉积分。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            我再想想
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm transition-all flex items-center gap-1"
          >
            <span>我已了解，立即接单</span>
            <span className="material-icons-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfirmationModal;