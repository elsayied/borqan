import React from 'react';
import { BookOpen, Sparkles, Mail, Phone, MapPin, Send, Globe, Heart } from 'lucide-react';

export default function Footer({ onOpenDownload, onOpenFreeSession, onNavigateToTutors }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-right">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-borqan-700 via-borqan-500 to-amber-400 p-[2px] shadow-glow">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <span className="text-2xl font-black text-white font-arabic">البرقَان</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              تطبيق ومنصة البرقان لتعليم القرآن الكريم والتجويد والقراءات بالسند المتصل عن بُعد في جلسات فردية مباشرة على مدار 24 ساعة مع نخبة المعلمين والمعلمات.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950 hover:text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950 hover:text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors font-bold text-xs">
                X
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950 hover:text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors font-bold text-xs">
                in
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950 hover:text-emerald-400 border border-slate-800 flex items-center justify-center transition-colors font-bold text-xs">
                yt
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-arabic">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">الرئيسية</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">مميزات التطبيق</a></li>
              <li><a href="#tutors" className="hover:text-emerald-400 transition-colors">كادر المعلمين والمعلمات</a></li>
            </ul>
          </div>

          {/* Column 3: Services & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-arabic">الخدمات والدعم</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onOpenFreeSession} className="hover:text-emerald-400 transition-colors">حجز جلسة تجريبية للطلاب</button></li>
              <li>
                <button 
                  onClick={onNavigateToTutors} 
                  className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1"
                >
                  <span>انضمام المعلمين والمعلمات (tutors.borqan.com)</span>
                </button>
              </li>
              <li><button onClick={onOpenDownload} className="hover:text-emerald-400 transition-colors">تحميل التطبيق مباشرة</button></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">الباقات والاشتراكات</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">سياسة الخصوصية والشروط</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-arabic">تواصل معنا</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@borqan.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">+966 9200 88 999</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-300 block mb-1.5">اشترك في نشرتنا البريدية</span>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-r-xl text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-400"
                />
                <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-l-xl transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لعلامة <strong className="text-white">البرقان (Borqan)</strong> لتعليم القرآن الكريم.</p>
          <p className="flex items-center gap-1">
            تم التطوير بـ <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> لخدمة كتاب الله العزيز
          </p>
        </div>

      </div>
    </footer>
  );
}
