import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, Zap, ArrowLeft, Clock, Gift } from 'lucide-react';
import { PaymentBadges } from './PaymentBadges';

export default function PricingPlans({ onOpenFreeSession }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'الباقة الأساسية',
      desc: 'مناسبة للمبتدئين ولتصحيح تلاوة السور والتسميع الخفيف',
      monthlyPrice: '1$',
      annualPrice: '1$',
      minutes: '120 دقيقة شهرياً',
      popular: false,
      features: [
        'جلسات فردية مباشرة 15 أو 30 دقيقة',
        'متاحة 24/7 دون حاجة لحجز مسبق',
        'اختيار المعلم أو المعلمة',
        'تقارير أداء أساسية بعد كل جلسة',
        'إمكانية تدوير الدقائق المتبقية للمشاركين'
      ]
    },
    {
      name: 'باقة البرقان الذهبية',
      desc: 'الخيار الأمثل للحفظ المستمر والإتقان ومتابعة التجويد',
      monthlyPrice: '89$',
      annualPrice: '69$',
      minutes: '300 دقيقة شهرياً',
      popular: true,
      badge: 'الأكثر طلباً واختياراً',
      features: [
        'جميع مزايا الباقة الأساسية',
        'أولوية الاتصال الفوري بدون أي انتظار',
        'تخصيص معلم ثابت (عند الرغبة)',
        'خطة حفظ شخصية مع متابعة الشيخ',
        'تقارير تفصيلية شاملة لجميع السور',
        'شهادة حفظ إتمام كل جزء'
      ]
    },
    {
      name: 'الباقة العائلية الشاملة',
      desc: 'مخصصة لجميع أفراد الأسرة مع إمكانية توزيع الدقائق',
      monthlyPrice: '1$',
      annualPrice: '2$',
      minutes: '600 دقيقة شهرياً (تشارك 4 أفراد)',
      popular: false,
      features: [
        'جميع مزايا الباقة الذهبية',
        'مشاركة الحساب والدقائق حتى 4 أفراد من العائلة',
        'مسار براعم الأطفال مع معلمين متخصصين للصغار',
        'إمكانية حجز جلسات جماعية عائلية',
        'خصم خاص على برامج الإجازات بالسند'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">

      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>خطط واشتراكات مرنة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            استثمر في آخرتك مع <span className="gold-gradient-text">أنسب الباقات</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            خطط واضحة بدون التزامات خفية، مع ضمان استرجاع خلال 7 أيام من اشتراكك.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>اشتراك شهري</span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-9 bg-slate-900 border border-emerald-500/40 rounded-full p-1 transition-colors relative"
            >
              <div className={`w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-transform ${isAnnual ? 'translate-x-[-28px]' : 'translate-x-0'}`} />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>اشتراك سنوي</span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                خصم 20% 🎉
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 via-emerald-950/60 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-emerald-950 scale-105 z-20'
                  : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 z-10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="space-y-6">

                {/* Name & Desc */}
                <div className="text-right space-y-2">
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
                </div>

                {/* Pricing Display */}
                <div className="text-right border-y border-slate-800/80 py-4 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-400">/ شهرياً</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{plan.minutes}</span>
                  </div>
                </div>

                {/* Features Checkbox */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 block text-right">يتضمن الاشتراط:</span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 text-right">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={onOpenFreeSession}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow-glow-gold hover:shadow-glow'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>اشترك في هذه الباقة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Moneyback Guarantee & Supported Payment Badges */}
        <div className="mt-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ضمان استرجاع المبالغ كاملة خلال 7 أيام في حال لم تحز الخدمة على رضاك.</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">طرق الدفع الإلكترونية المتاحة:</span>
            <PaymentBadges />
          </div>
        </div>

      </div>
    </section>
  );
}
