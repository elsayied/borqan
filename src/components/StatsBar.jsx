import React from 'react';
import { Award, BookOpen, Users, Globe2, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: BookOpen,
      count: '+20',
      label: 'جلسة تعليمية ناجحة',
      desc: 'تمت عبر الصوت والفيديو بجودة عالية',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Award,
      count: '+30',
      label: 'معلم ومعلمة معتمدون',
      desc: 'حاصلون على إجازات بأعلى الأسانيد',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      icon: Globe2,
      count: '+10',
      label: 'دولة حول العالم',
      desc: 'يستفيد الدارسون من خدماتنا فيها',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: HeartHandshake,
      count: '101.1%',
      label: 'نسبة رضا الدارسين',
      desc: 'بناءً على تقييمات موثقة من أولياء الأمور والطلاب',
      color: 'from-emerald-300 to-emerald-500',
    },
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl shadow-emerald-950/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 division-x division-slate-800">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-800/40 transition-colors">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} p-[1px] shrink-0`}>
                  <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center text-amber-400">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl lg:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block font-mono tracking-tight`}>
                    {stat.count}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{stat.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
