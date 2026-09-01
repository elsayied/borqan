import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Download, PhoneCall, Globe, Sparkles, UserCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenDownload, onOpenFreeSession, onNavigateToTutors }) {
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
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onNavigateToTutors}
              className="px-3.5 py-2 text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>انضم كمعلّم 👨‍🏫</span>
            </button>

            <button
              onClick={onOpenFreeSession}
              className="px-4 py-2 text-sm font-semibold text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>جلسة مجانية</span>
            </button>

            <button
              onClick={onOpenDownload}
              className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 rounded-xl shadow-glow-gold hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>تحميل التطبيق</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenDownload}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>التطبيق</span>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-emerald-900/50 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-emerald-950 hover:text-emerald-400 transition-colors text-right"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenFreeSession(); }}
              className="w-full py-3 text-sm font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>احجز جلسة مجانية تجريبية</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDownload(); }}
              className="w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-xl shadow-glow flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>حمل تطبيق البرقان الآن</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
