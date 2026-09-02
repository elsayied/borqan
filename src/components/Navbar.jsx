import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Download, PhoneCall, Globe, Sparkles, UserCheck, User, Users } from 'lucide-react';

export default function Navbar({ onOpenDownload, onOpenFreeSession, onOpenRegister, onNavigateToTutors, onNavigateToApp, onNavigateToParents, currentUser }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'مميزاتنا', href: '#features' },
    { name: 'معلمونا', href: '#tutors' },
    { name: 'الاشتراكات', href: '#pricing' },
    { name: 'الآراء', href: '#testimonials' },
    { name: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/40 py-3 shadow-xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-borqan-700 via-borqan-500 to-amber-400 p-[2px] shadow-glow">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 font-arabic">
                البرقَان
                <Sparkles className="w-4 h-4 text-amber-400 inline" />
              </span>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wide">
                صاحبك القرآني المباشر
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-emerald-900/30 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-950/50 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-3 py-2 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-400/30 rounded-xl hover:bg-amber-900 transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser ? currentUser.name : 'تسجيل حساب جديد'}</span>
            </button>

            <button
              onClick={onNavigateToParents}
              className="px-3 py-2 text-xs font-bold text-peach-200 hover:text-white bg-rosewood-900 border border-peach-200/20 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>أولياء الأمور (/parents)</span>
            </button>

            <button
              onClick={onNavigateToApp}
              className="px-3 py-2 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950 border border-emerald-500/30 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>تطبيق الطلاب (/app) 📱</span>
            </button>

            <button
              onClick={onNavigateToTutors}
              className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>بوابة المعلمين 👨‍🏫</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-400 rounded-lg flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>حساب جديد</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
