import React from 'react';
import { X, Download, Smartphone, CheckCircle, ExternalLink, QrCode } from 'lucide-react';

export default function DownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative text-right shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
            <Smartphone className="w-3.5 h-3.5" />
            <span>تنزيل تطبيق البرقان</span>
          </div>
          <h3 className="text-2xl font-black text-white font-arabic">
            اختر منصتك المفضلة لبدء التحميل
          </h3>
          <p className="text-xs text-slate-400">
            التطبيق متاح مجاناً لكافة الهواتف الذكية والأجهزة اللوحية والمتصفح المباشر.
          </p>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          
          {/* iOS App Store */}
          <a
            href="https://apple.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.95.99-3.09-1 .04-2.17.67-2.88 1.5-.64.74-1.2 1.91-1.05 3.04 1.12.09 2.27-.63 2.94-1.45z"/></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">App Store لأجهزة أبل</h4>
                <p className="text-[11px] text-slate-400">يدعم iPhone و iPad و Mac</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </a>

          {/* Android Google Play */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.12C19.46,12.47 19.46,11.53 18.81,10.88L16.81,8.88L14.75,10.94L14.75,13.06L16.81,15.12M15.81,6.88L14.75,7.94L4.85,1.15C5.19,1.05 5.56,1.1 5.86,1.27L15.81,6.88M4.85,22.85L14.75,16.06L15.81,17.12L5.86,22.73C5.56,22.9 5.19,22.95 4.85,22.85Z"/></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Google Play لأجهزة أندرويد</h4>
                <p className="text-[11px] text-slate-400">يدعم كافة هواتف وأجهزة Android</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </a>

          {/* Web Direct App */}
          <button
            onClick={() => { alert('جاري توجيهك للمنصة المباشرة على المتصفح...'); onClose(); }}
            className="w-full p-4 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between group transition-all text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">استخدام المنصة المباشرة (المتصفح)</h4>
                <p className="text-[11px] text-slate-400">بدون الحاجة لتنزيل أي تطبيق</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400">مباشر ⚡</span>
          </button>

        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-400">حجم التطبيق: 24 ميجابايت • التحديث الأخير v3.4</span>
        </div>

      </div>
    </div>
  );
}
