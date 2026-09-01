import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Light/Dark Theme"
      className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-400/40 transition-all duration-300 flex items-center gap-1.5 text-xs font-bold shadow-sm"
      title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح (Light Mode)' : 'التبديل إلى الوضع الداكن (Dark Mode)'}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">الوضع الفاتح</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">الوضع الداكن</span>
        </>
      )}
    </button>
  );
}
