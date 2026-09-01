import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, PhoneCall, CheckCircle2, Mic, Play, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

export default function InteractiveAppShowcase({ onOpenDownload }) {
  const [activeDevice, setActiveDevice] = useState('phone');

  const steps = [
    {
      num: '01',
      title: 'تحميل التطبيق أو فتح المنصة',
      desc: 'حمّل تطبيق البرقان مجاناً من متجر أبل أو جوجل بلاي، أو استخدم المنصة المباشرة من المتصفح دون أي تعقيد.',
      icon: Smartphone,
    },
    {
      num: '02',
      title: 'اختيار المسار ونوع الجلسة',
      desc: 'حدد مسارك المفصل (حفظ، تصحيح تلاوة، تجويد، أو إجازة)، واختر المعلم أو المعلمة المناسبة لك ولطفلك.',
      icon: CheckCircle2,
    },
    {
      num: '03',
      title: 'الاتصال الفوري أو الحجز',
      desc: 'انقر على "اتصل الآن" للبدء المباشر خلال ثوانٍ معدودة مع المعلم المتاح، أو حظر موعدك المفضل.',
      icon: PhoneCall,
    },
    {
      num: '04',
      title: 'بدء التسميع وتلقي التقرير',
      desc: 'اقرأ واستمع لملاحظات المعلم وتوجيهاته للتجويد، واحصل على تقرير فوري بنهاية الجلسة يوثق نقاط قوتك.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>سهولة وسرعة الوصول</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            كيف ابدأ رحلتي القرآنية في <span className="emerald-gradient-text">4 خطوات بسيطة؟</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            تجربة سلسة صُممت لتبدأ أولى جلساتك خلال أقل من دقيقة واحدة
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="relative bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 p-6 rounded-3xl space-y-4 group hover:bg-slate-900 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-emerald-500/40 group-hover:text-amber-400 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Device Simulator Showcase */}
        <div className="mt-20 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="text-right">
              <h3 className="text-xl font-bold text-white">شاشة الجلسة المباشرة المفتوحة</h3>
              <p className="text-xs text-slate-400">تطبيق البرقان يعمل بكفاءة عالية على جميع أجهزتك الذكية</p>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveDevice('phone')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDevice === 'phone' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>التطبيق (الهاتف)</span>
              </button>

              <button
                onClick={() => setActiveDevice('tablet')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDevice === 'tablet' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>الأجهزة اللوحية</span>
              </button>

              <button
                onClick={() => setActiveDevice('web')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDevice === 'web' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>المنصة (المتصفح)</span>
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div className="pt-8 flex justify-center">
            <div className="w-full max-w-4xl bg-slate-950 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl">
              
              {/* Fake Browser/App Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 mr-2 font-mono dir-ltr">app.borqan.com/session/live</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  بث مباشر مشفر 256-bit
                </span>
              </div>

              {/* Mock Screen Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Quran Page View Simulator */}
                <div className="md:col-span-7 bg-amber-50/5 p-6 rounded-2xl border border-amber-500/20 text-center space-y-4">
                  <div className="flex items-center justify-between text-xs text-amber-300 border-b border-amber-500/20 pb-2">
                    <span>الجزء الثلاثون</span>
                    <span className="font-bold">سورة النبأ</span>
                    <span>صفحة 582</span>
                  </div>

                  <div className="font-quran text-slate-100 text-xl sm:text-2xl leading-loose font-bold tracking-wide">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ <br />
                    عَمَّ يَتَسَاءَلُونَ ﴿١﴾ عَنِ النَّبَإِ الْعَظِيمِ ﴿٢﴾ الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ ﴿٣﴾ كَلَّا سَيَعْلَمُونَ ﴿٤﴾ ثُمَّ كَلَّا سَيَعْلَمُونَ ﴿٥﴾
                  </div>

                  <div className="pt-2 flex justify-center gap-2">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      ملاحظة المعلم: إظهار النون في «عَنِ النَّبَإِ»
                    </span>
                  </div>
                </div>

                {/* Tutor & Session Controls Side Panel */}
                <div className="md:col-span-5 space-y-4 text-right">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                        alt="Tutor"
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-400"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">الشيخة د. مريم السعيد</h4>
                        <p className="text-[11px] text-emerald-400">معلمة قرآن وتجويد معتمدة</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">نوع الجلسة:</span>
                        <span className="font-bold text-amber-300">تصحيح وحفظ جديد</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">زمن الجلسة:</span>
                        <span className="font-mono text-emerald-400">22 دقيقة</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenDownload}
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold rounded-xl text-xs hover:shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>تنزيل التطبيق وتجربة الجلسة فوراً</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
