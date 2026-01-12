import React from 'react';

interface ServiceConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ServiceConfirmationModal: React.FC<ServiceConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      {/* Simple Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0 bg-white dark:bg-surface-dark">
           <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-blue-500 text-xl">flight_takeoff</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">社区飞行员接单「登机须知」</h3>
           </div>
           <button 
             onClick={onClose}
             className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
           >
                <span className="material-icons-outlined text-xl">close</span>
           </button>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
             感谢化身「社区飞行员」！为了飞行安全，起飞前请熟读以下 “飞行手册” ：
          </p>
          
          <div className="space-y-8 mb-8">
            {/* Rule 1 */}
            <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
               <div>
                 <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">保持友善耐心</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                   任何时候保持友善与耐心，用户炸毛别上头，难搞场面交由官方接管，你只管优雅稳飞～
                 </p>
               </div>
            </div>

            {/* Rule 2 */}
            <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
               <div>
                 <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">严守官方渠道</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                   联系用户只认系统「网页外呼电话」唯一渠道，<span className="text-red-500 font-medium">严禁私下使用个人手机或微信等建立联系</span>。
                 </p>
               </div>
            </div>

            {/* Rule 3 */}
            <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</div>
               <div>
                 <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">数据隐私安全</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                   严禁翻阅、复制用户非相关业务数据，否则<span className="text-red-500 font-bold">永久封号</span>。
                 </p>
               </div>
            </div>
          </div>

          {/* Special Reminder Section */}
          <div className="bg-[#fffbe6] dark:bg-yellow-900/10 rounded-lg p-5 border border-yellow-100 dark:border-yellow-900/20 relative">
             <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-1.5">
                     <span className="material-icons-outlined text-amber-500 text-lg">warning</span>
                     <span className="font-bold text-amber-900/80 dark:text-amber-500 text-sm">特别提醒：</span>
                 </div>
                 <button className="text-blue-600 hover:text-blue-700 text-xs flex items-center underline decoration-blue-300 gap-0.5 transition-colors">
                     查看标准 <span className="material-icons-outlined text-[12px] rotate-45">link</span>
                 </button>
             </div>
             
             <p className="text-xs text-amber-900/60 dark:text-amber-500/80 mb-4 pl-0.5">
                服务时长与质量绑定「飞行段位」。
             </p>
             
             <div className="space-y-3 pl-0.5">
                <div className="flex items-start gap-2.5">
                    <span className="material-icons-outlined text-red-400 text-lg mt-0.5 bg-white dark:bg-surface-dark rounded shadow-sm p-0.5">trending_up</span>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100">服务顶格输出 → </span>
                        高激励系数、优质工单优先抢、社区资源直接倾斜；
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                     <span className="material-icons-outlined text-blue-400 text-lg mt-0.5 bg-white dark:bg-surface-dark rounded shadow-sm p-0.5">trending_down</span>
                     <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100">要是摆烂划水 → </span>
                        段位直接俯冲降级，严重的当场吊销 “飞行执照” ！
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 bg-white dark:bg-surface-dark shrink-0">
             <button 
                onClick={onConfirm}
                className="w-full py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.99]"
             >
                <span className="text-[15px]">我已阅，申请起飞</span>
                <span className="text-lg">🚀</span>
             </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfirmationModal;