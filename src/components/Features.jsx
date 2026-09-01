import React from 'react';
import { Clock, ShieldCheck, UserCheck, BarChart3, Award, Sparkles, Sliders, Smartphone, CheckCircle, Zap } from 'lucide-react';

export default function Features({ onOpenDownload }) {
  const featuresList = [
    {
      icon: Clock,
      title: 'جلسات مباشرة 24/7 دون انتظار',
      desc: 'احصل على معلمك المعتمد في أي وقت يناسب جدولك اليومي، أناء الليل وأطراف النهار دون الحاجة للارتباط بمواعيد ثابته.',
      badge: 'متاح الآن',
      highlight: true
    },
    {
      icon: UserCheck,
      title: 'معلمون ومعلمات مجازون ومفحوصون',
      desc: 'نخبة من خريجي الجامعات الإسلامية والحافظين المتقنين ذوي الخيرة في التعامل مع مختلف الأعمار والجنسيات.',
      badge: 'كادر موثوق',
      highlight: false
    },
    {
      icon: Sliders,
      title: 'مسارات تعليمية مرنة ومخصصة',
      desc: 'سواء كنت مبتدئاً يريد تصحيح الفاتحة أو حافظاً يسعى للإجازة بالسند المتصل، نصمم لك خطتك بما يلائم قدراتك.',
      badge: 'لكل المستويات',
      highlight: false
    },
    {
      icon: BarChart3,
      title: 'تقارير أداء ومتابعة مستمرة',
      desc: 'لوحة تحكم ذكية ترصد تقدمك، عدد الدقائق المتعلمة، عدد الصفحات المحفوظة، وملاحظات التجويد بعد كل جلسة.',
      badge: 'تتبع تلقائي',
      highlight: false
    },
    {
      icon: ShieldCheck,
      title: 'خصوصية وأمان تام للعائلة',
      desc: 'بيئة تعليمية مريحة تحافظ على الخصوصية التامة مع إمكانية اختيار المعلمات للنساء والأطفال والجلسات الصوتية أو المرئية.',
      badge: 'أمان كامل',
      highlight: false
    },
    {
      icon: Award,
      title: 'شهادات موثقة وإجازات مسندة',
      desc: 'احصل على شهادات إتمام المناهج والمسارات القرآنية، وصولاً للإجازة بالسند المتصل بروايات حفص ورش وغيرها.',
      badge: 'اعتماد رسمي',
      highlight: true
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>ما يميّز تطبيق البرقان</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            تجربة قرآنية متكاملة صُممت خصيصاً <span className="gold-gradient-text">لراحتك وإتقانك</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            جمعنا بين أصالة التلقي القرآني وأحدث التقنيات الرقمية المباشرة لنضع بين يديك أسهل وسيلة للتعلم والارتقاء.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          {featuresList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl transition-all duration-300 ${
                  item.highlight
                    ? 'bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl shadow-emerald-950/40'
                    : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-900/40 border border-emerald-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-emerald-900/50">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-[-4px] transition-transform">
                  <span>اكتشف المزيد في التطبيق</span>
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Banner CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-8 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-right space-y-2">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              جاهز لبدء أولى خطواتك مع القرآن الكريم؟
            </h4>
            <p className="text-sm text-slate-300">
              حمّل التطبيق الآن واستفد من الجلسة التجريبية الأولى مجاناً بدون الحاجة إلى إدخال بطاقة ائتمان.
            </p>
          </div>
          <button
            onClick={onOpenDownload}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-glow-gold hover:shadow-glow transition-all shrink-0"
          >
            جرب التطبيق مجاناً الآن
          </button>
        </div>

      </div>
    </section>
  );
}
