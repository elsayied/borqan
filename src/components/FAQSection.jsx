import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';
import { PaymentBadges } from './PaymentBadges';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'كيف أبدأ أول جلسة تعليمية في تطبيق البرقان؟',
      a: 'الأمر في غاية البساطة! قم بتحميل التطبيق أو فتح المنصة، سجّل حسابك خلال ثوانٍ، ثم اضغط على زر "ابدأ الجلسة الآن". سيتصل بك معلم متاح فوراً لتبدأ حفظك أو تصحيح تلاوتك.'
    },
    {
      q: 'هل الجلسات المباشرة متاحة بالفعل على مدار 24 ساعة؟',
      a: 'نعم متوفرون '
    },
    {
      q: 'ما هي طرق السداد المتاحة للاشتراكات؟',
      a: 'ندعم كافة طرق الدفع الرقمية الآمنة مثل فودافون كاش (Vodafone Cash)، InstaPay، بطاقات الفيزا (Visa)، وفوري (Fawry)، بالإضافة للتحويلات البنكية المباشرة.',
      isPaymentFaq: true
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.includes(searchQuery) || faq.a.includes(searchQuery)
  );

  return (
    <section id="faq" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>إجابات استفساراتكم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-arabic tracking-tight">
            الأسئلة <span className="emerald-gradient-text">الشائعة</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            كل ما تود معرفته عن منصة البرقان وآلية العمل والخدمات المقدمة.
          </p>

          {/* Search Box */}
          <div className="pt-4 relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤالك هنا..."
              className="w-full pl-4 pr-11 py-3 bg-slate-900 border border-slate-800 focus:border-emerald-400 rounded-2xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 mt-12">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 font-bold text-base text-white hover:text-emerald-400 transition-colors"
                >
                  <span className="flex-1">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-950 text-emerald-400' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 bg-slate-950/40 animate-fadeIn space-y-3">
                    <p>{faq.a}</p>
                    {faq.isPaymentFaq && <PaymentBadges />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
