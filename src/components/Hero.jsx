import React, { useState } from 'react';
import { Download, Play, Mic, Video, Star, CheckCircle, ShieldCheck, Clock, Users, Award, Sparkles, Volume2, ArrowLeft, PhoneCall } from 'lucide-react';

export default function Hero({ onOpenDownload, onOpenFreeSession }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-gradient">
      {/* Background Decorative Lighting & Grids */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Islamic Geometric Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-glow">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>مُدكرك القرآني صاحبك في كل وقت ومعك أينما كنت</span>
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-bold">24/7 مباشر</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-arabic tracking-tight">
              تعلم <span className="gold-gradient-text">القرآن الكريم</span> بسهولة وإتقان في جلسات فردية مباشرة
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl">
              تطبيق <strong className="text-emerald-400">البرقان</strong> يعينك على حفظ وتلاوة وتجويد الكتاب العزيز مع نخبة من أمهر المعلمين والمعلمات المعتمدين والمجازين، في أي وقت وبمنتهى الخصوصية والمرونة.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/40 px-3 py-2 rounded-xl border border-emerald-900/30">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>جلسات 24/7 دون انتظار</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/40 px-3 py-2 rounded-xl border border-emerald-900/30">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>معلمون ومعلمات مجازون</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/40 px-3 py-2 rounded-xl border border-emerald-900/30">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>خصوصية وبيئة آمنة</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenDownload}
                className="px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 rounded-2xl shadow-glow-gold hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                <Download className="w-5 h-5 group-hover:bounce" />
                <span>حمّل تطبيق البرقان الآن</span>
                <ArrowLeft className="w-4 h-4 opacity-75 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFreeSession}
                className="px-6 py-4 text-base font-bold text-emerald-300 hover:text-white bg-slate-900/80 hover:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Mic className="w-5 h-5 text-amber-400" />
                <span>ابدأ جلسة تجريبية مجاناً</span>
              </button>
            </div>

            {/* Store Badges & Trust Footer */}
            <div className="pt-6 border-t border-emerald-900/40 flex flex-wrap items-center justify-between gap-4">
              
              {/* App Store Links mockup icons */}
              <div className="flex items-center gap-3">
                <button onClick={onOpenDownload} className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-200 transition-colors">
                  <svg className="w-5 h-5 fill-current text-slate-200" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.95.99-3.09-1 .04-2.17.67-2.88 1.5-.64.74-1.2 1.91-1.05 3.04 1.12.09 2.27-.63 2.94-1.45z"/></svg>
                  <div className="text-right leading-none">
                    <span className="text-[9px] text-slate-400 block">Download on</span>
                    <span>App Store</span>
                  </div>
                </button>

                <button onClick={onOpenDownload} className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-200 transition-colors">
                  <svg className="w-5 h-5 fill-current text-emerald-400" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.12C19.46,12.47 19.46,11.53 18.81,10.88L16.81,8.88L14.75,10.94L14.75,13.06L16.81,15.12M15.81,6.88L14.75,7.94L4.85,1.15C5.19,1.05 5.56,1.1 5.86,1.27L15.81,6.88M4.85,22.85L14.75,16.06L15.81,17.12L5.86,22.73C5.56,22.9 5.19,22.95 4.85,22.85Z"/></svg>
                  <div className="text-right leading-none">
                    <span className="text-[9px] text-slate-400 block">GET IT ON</span>
                    <span>Google Play</span>
                  </div>
                </button>
              </div>

              {/* User Ratings & Active Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 space-x-reverse">
                  <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-white mr-1">4.9/5</span>
                  </div>
                  <span className="text-[11px] text-slate-400">من أكثر من 45,000 تقييم</span>
                </div>
              </div>

            </div>

          </div>

          {/* Left Column: Interactive App Interface Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Phone Mockup Frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-slate-950 rounded-[44px] p-4 border-4 border-slate-800 shadow-2xl shadow-emerald-950/80 transform hover:rotate-1 transition-transform duration-500">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 bg-slate-950 rounded-full border border-slate-800" />
              </div>

              {/* Screen Content */}
              <div className="relative bg-slate-900 rounded-[34px] overflow-hidden pt-8 pb-4 px-4 border border-emerald-900/40 text-slate-100 space-y-4">
                
                {/* App Screen Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-emerald-400">جلسة قائمة الآن</span>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md">14:28 دقيقة</span>
                </div>

                {/* Tutor Active Card */}
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-emerald-500/20 flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" 
                      alt="Tutor" 
                      className="w-12 h-12 rounded-xl object-cover border border-amber-400/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-slate-950" />
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <h4 className="text-sm font-bold text-white">الشيخ د. عبد الله النجار</h4>
                    <p className="text-[11px] text-emerald-400">إجازة بالقراءات العشر (متصل السند)</p>
                  </div>
                </div>

                {/* Live Quran Verse Text Card */}
                <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40 text-center space-y-2">
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">سورة الروم - آية 22</span>
                  <p className="font-quran text-lg text-emerald-100 leading-relaxed font-bold">
                    «وَمِنْ آيَاتِهِ خَلْقُ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافُ أَلْسِنَتِكُمْ وَأَلْوَانِكُمْ»
                  </p>
                  <p className="text-[11px] text-slate-400 italic">مستوى التجويد: ممتاز ★★★★★</p>
                </div>

                {/* Audio Waveform & Live Call Controls */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">الصوت المباشر</span>
                    <button 
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="text-xs text-amber-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'إيقاف الاستماع' : 'استمع للنموذج'}</span>
                    </button>
                  </div>

                  {/* Audio Bars */}
                  <div className="flex items-center justify-center gap-1.5 h-8">
                    <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'wave-bar-1' : 'h-2'}`} />
                    <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'wave-bar-2' : 'h-4'}`} />
                    <div className={`w-1.5 bg-amber-400 rounded-full ${isPlayingAudio ? 'wave-bar-3' : 'h-6'}`} />
                    <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'wave-bar-4' : 'h-3'}`} />
                    <div className={`w-1.5 bg-emerald-400 rounded-full ${isPlayingAudio ? 'wave-bar-5' : 'h-5'}`} />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <button className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="w-11 h-11 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center text-white shadow-lg">
                      <PhoneCall className="w-5 h-5 rotate-[135deg]" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200">
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer status inside mock */}
                <div className="text-center">
                  <span className="text-[10px] text-slate-400">تطبيق البرقان متوافر لـ iOS و Android و المتصفح</span>
                </div>

              </div>
            </div>

            {/* Floating Card 1: 24/7 Availability */}
            <div className="absolute -bottom-4 -right-4 sm:-right-8 bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">متاح على مدار 24 ساعة</span>
                <span className="text-[10px] text-slate-400">معلم متواجد في كل دقيقة</span>
              </div>
            </div>

            {/* Floating Card 2: Satisfied Students Badge */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-slate-900/90 border border-amber-500/40 backdrop-blur-md p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white block">+500,000 طالب وطالبة</span>
                <span className="text-[10px] text-slate-300">في أكثر من 85 دولة</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
