import React from 'react';
import { BookOpen, Mail, Facebook } from 'lucide-react';

export default function Footer({ onOpenDownload }) {
  return (
    <footer className="bg-rosewood-950 border-t border-peach-200/10 py-16 text-slate-300 text-center font-arabic">
      <div className="max-w-xl mx-auto px-4 space-y-8 flex flex-col items-center justify-center">

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2 group">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-peach-500 via-peach-300 to-peach-200 p-[2px] shadow-peach-soft">
            <div className="w-full h-full bg-rosewood-950 rounded-[22px] flex items-center justify-center text-peach-200">
              <BookOpen className="w-9 h-9 stroke-[1.8]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white tracking-tight font-quran">البرقَان</span>
            <span className="text-sm font-sans text-slate-400 tracking-wider">Borqan</span>
          </div>
        </div>

        {/* App Store Download Badges (Matching Uploaded Image) */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* Google Play Button */}
          <button
            onClick={onOpenDownload}
            className="w-full py-3 px-5 rounded-xl border border-slate-700 bg-rosewood-900/80 hover:bg-rosewood-800 hover:border-peach-200/40 text-white transition-all flex items-center justify-between shadow-card"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Available on</span>
              <span className="text-sm font-bold text-white font-sans">Google Play</span>
            </div>
            <svg className="w-7 h-7 text-peach-200 fill-current" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.16,23 5.37,23 5.59,22.91L16.81,15.12M16.81,8.88L5.59,1.09C5.37,1 5.16,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.65,11.09 21,11.5 21,12C21,12.5 20.65,12.91 20.16,13.19L17.89,14.5L15.66,12L17.89,9.5L20.16,10.81Z" />
            </svg>
          </button>

          {/* App Store Button */}
          <button
            onClick={onOpenDownload}
            className="w-full py-3 px-5 rounded-xl border border-slate-700 bg-rosewood-900/80 hover:bg-rosewood-800 hover:border-peach-200/40 text-white transition-all flex items-center justify-between shadow-card"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Download on</span>
              <span className="text-sm font-bold text-white font-sans">App Store</span>
            </div>
            <svg className="w-7 h-7 text-peach-200 fill-current" viewBox="0 0 24 24">
              <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
            </svg>
          </button>
        </div>

        {/* Social Links & Bug Report Contact */}
        <div className="space-y-4 pt-4 border-t border-peach-200/10 w-full">
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-rosewood-900 hover:bg-peach-950 border border-peach-200/15 hover:border-peach-200/40 flex items-center justify-center text-peach-200 transition-all"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-rosewood-900 hover:bg-peach-950 border border-peach-200/15 hover:border-peach-200/40 flex items-center justify-center text-peach-200 font-black text-sm transition-all"
              title="X (Twitter)"
            >
              X
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Mail className="w-4 h-4 text-peach-200" />
            <span>للإبلاغ عن المشاكل والأخطاء:</span>
            <a href="mailto:sayied686@gmail.com" className="text-peach-200 font-bold hover:underline dir-ltr">
              sayied686@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-slate-500 pt-2">
          © {new Date().getFullYear()} البرقَان (Borqan). جميع الحقوق محفوظة.
        </p>

      </div>
    </footer>
  );
}
