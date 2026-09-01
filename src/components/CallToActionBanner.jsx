import React from 'react';
import { Download, Sparkles, PhoneCall, QrCode, ArrowLeft, CheckCircle } from 'lucide-react';

export default function CallToActionBanner({ onOpenDownload, onOpenFreeSession }) {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-14 shadow-2xl shadow-emerald-950/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Main Text */}
          <div className="lg:col-span-8 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ابدأ اليوم قبل الغد</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic leading-tight">
              اجعل القرآن صاحبك اليومي مع <span className="gold-gradient-text">تطبيق البرقان</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              انضم لأكثر من نصف مليون حافظ ومستمع حول العالم. خطوة واحدة تفصلك عن أولى جلساتك المباشرة مع معلمك المقرئ.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenDownload}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-glow-gold transition-all flex items-center justify-center gap-3 group"
              >
                <Download className="w-5 h-5" />
                <span>تحميل التطبيق فورا</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFreeSession}
                className="px-6 py-4 rounded-2xl bg-slate-900 border border-emerald-500/40 hover:bg-emerald-950 text-emerald-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>طلب جلسة تجريبية مجانية</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                تنزيل مجاني 100%
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                متاح لـ iOS و Android
              </span>
            </div>

          </div>

          {/* Right QR Code Graphic Showcase */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-slate-950 p-6 rounded-3xl border border-emerald-500/30 text-center space-y-4 shadow-xl">
              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center shadow-inner">
                {/* Mock SVG QR Code */}
                <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h35 v35 h-35 z M10,10 h15 v15 h-15 z" />
                  <path d="M65,0 h35 v35 h-35 z M75,10 h15 v15 h-15 z" />
                  <path d="M0,65 h35 v35 h-35 z M10,75 h15 v15 h-15 z" />
                  <rect x="45" y="10" width="10" height="20" />
                  <rect x="10" y="45" width="20" height="10" />
                  <rect x="45" y="45" width="25" height="25" />
                  <rect x="75" y="65" width="15" height="25" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-200 block">
                امسح الكود بكاميرا هاتفك للتحميل المباشر
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
