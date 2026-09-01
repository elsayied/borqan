import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Heart, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Testimonials() {
  const reviews = [

    {
      name: 'السيد محمد',
      role: 'مصمم',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      flag: '🇸🇦',
      track: 'مسار أطفال البرقان',
      comment: 'أفضل تطبيق إن شاء الله',
      rating: 5.5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>قصص نجاح وآراء دارسينا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            ماذا يقول مشتركونا عن <span className="gold-gradient-text">تطبيق البرقان؟</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            انطبعت تجارب آلاف العائلات والدارسين بالرضا والتشجيع لسهولة الاستخدام وجودة الكادر التعليمي.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-3xl p-8 text-right space-y-6 backdrop-blur-xl relative group hover:bg-slate-900 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <Quote className="absolute top-6 left-6 w-10 h-10 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />

              <div className="space-y-4">
                {/* Rating & Track Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(Math.min(5, Math.floor(Math.max(1, Number(rev.rating) || 5))))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    {Number(rev.rating) > 0 && (
                      <span className="text-xs font-bold text-amber-300 mr-1">{rev.rating}</span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {rev.track}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-medium">
                  «{rev.comment}»
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <span className="text-sm">{rev.flag}</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{rev.role}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
