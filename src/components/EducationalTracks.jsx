import React, { useState } from 'react';
import { BookOpen, Award, Sparkles, Check, ArrowLeft, Star, HeartHandshake, ShieldCheck, Flame } from 'lucide-react';

export default function EducationalTracks({ onOpenFreeSession }) {
  const [activeTab, setActiveTab] = useState(0);

  const tracks = [
    {
      id: 'recitation',
      title: 'مسار تصحيح التلاوة والترتيل',
      subtitle: 'لجميع الأعمار والمستويات الراغبين في ضبط المخارج والقراءة الصحبة',
      badge: 'الأكثر إقبالاً',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: BookOpen,
      targetAudience: 'المبتدئون والمقسطون في التلاوة',
      duration: 'جلسات 15 - 30 دقيقة',
      features: [
        'تصحيح مخارج الحروف وصفاتها حكماً بحكم',
        'ضبط تلاوة الفاتحة والسور المقررة يومياً',
        'متابعة دورية مستمرة مع المعلم أو المعلمة',
        'مرونة كاملة في تحديد وقت الجلسة ورقم الصفحة'
      ],
      description: 'يهدف هذا المسار لتمكين الدارس من قراءة القرآن الكريم قراءة صحيحة خالية من اللحن الجلي والفي، مع التركيز على السلامة اللفظية وإتقان الترتيل.'
    },
    {
      id: 'hifz',
      title: 'مسار الحفظ والمراجعة التراكمية',
      subtitle: 'برنامج مخصص للحفظ الجيد والمراجعة المنهجية المنظمة',
      badge: 'مسار مكثف',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Flame,
      targetAudience: 'الراغبون في حفظ القرآن كاملاً أو أجزاء منه',
      duration: 'جلسات 30 - 45 دقيقة',
      features: [
        'خطة حفظ يومية أو أسبوعية تلاءم وقتك',
        'تسميع الحفظ الجديد ومراجعة القريب والبعيد',
        'اختبارات تقييمية نهاية كل جزء',
        'شهادة حفظ موثقة لكل جزء يتم إتمامه'
      ],
      description: 'مسار متكامل يجمع بين التسميع المباشر وضبط المحفوظ مع اختبارات دورية لضمان ثبات الحفظ وعدم النسيان.'
    },
    {
      id: 'tajweed',
      title: 'مسار أحكام التجويد والتطبيق',
      subtitle: 'دراسة قواعد التجويد النظرية والتطبيقية مع الترتيل',
      badge: 'تخصص متميز',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      icon: Sparkles,
      targetAudience: 'الراغبون في الارتقاء بمستوى الترتيل والأحكام',
      duration: 'جلسات 30 دقيقة',
      features: [
        'شرح كتاب الجزرية أو تحفة الأطفال تطبيقا',
        'التركيز على أحكام النون والميم والمدود والوقف',
        'تدريبات أداء صوتي ومخارج الحروف',
        'تقييمات مهارية شاملة في كل باب تجويدي'
      ],
      description: 'يمنحك هذا المسار الفهم الدقيق لأحكام التجويد مع تطبيقها المباشر أثناء القراءة للحصول على صوت شجي وقراءة محبرة.'
    },
    {
      id: 'ijazah',
      title: 'مسار الإجازة بالسند المتصل',
      subtitle: 'ختم القرآن كاملاً غيباً أو نظراً والحصول على السند للرسول ﷺ',
      badge: 'أعلى رتبة',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: Award,
      targetAudience: 'الحفاظ المتقنون الراغبون في السند الشريف',
      duration: 'جلسات 45 - 60 دقيقة',
      features: [
        'القراءة على شيوخ مسندين معتمدين بأعلى الأسانيد',
        'ختمة كاملة بالتدقيق الشديد في الرواية المحددة',
        'الحصول على وثيقة الإجازة بالسند المتصل للنبي ﷺ',
        'متاح بالروايات المشهورة (حفص، ورش، قالون، شعبة...)'
      ],
      description: 'أرقى المسارات التعليمية المخصصة للحفظة، حيث يتم الختم كاملاً أمام الشيخ أو الشيخة المقرئة ونيل شرف الاتصال بالسند النبوي.'
    },
    {
      id: 'kids',
      title: 'مسار براعم البرقان للأطفال',
      subtitle: 'منهج ممتع وتفاعلي لتعليم الصغار القاعدة النورانية وحفظ جزء عم',
      badge: 'للأطفال من 4-12 سنة',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      icon: Star,
      targetAudience: 'الأطفال والبذرة الصالحة من سن مبكراً',
      duration: 'جلسات 15 - 20 دقيقة ممتعة',
      features: [
        'معلمون متخصصون في أدبيات تعليم الأطفال وتشجيعهم',
        'طريقة القاعدة النورانية لتهجئة كلمات القرآن',
        'نقاط تحفيز وأوسمة إنجاز تفاعلية داخل التطبيق',
        'إرسال تقارير سريعة لولي الأمر بعد كل درس'
      ],
      description: 'يعتمد هذا المسار على الجلسات القصيرة المشوقة والمحفزة التي تبني حب القرآن في نفوس الأطفال وترسخ النطق الصحيح منذ الصغر.'
    }
  ];

  const currentTrack = tracks[activeTab];

  return (
    <section id="tracks" className="py-24 bg-hero-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>المسارات التعليمية المخصصة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            اختر <span className="gold-gradient-text">مسارك القرآني</span> الذي يلائم هدفك ووقتك
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            تضمن لك منصة البرقان خططاً دراسية تناسب كلاً من الأطفال، الكبار، المبتدئين والحفاظ.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-12 mb-10">
          {tracks.map((t, idx) => {
            const IconComp = t.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow-glow-gold scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detail Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-emerald-950/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentTrack.badgeColor}`}>
                {currentTrack.badge}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                الفئة المستهدفة: {currentTrack.targetAudience}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-arabic">
              {currentTrack.title}
            </h3>

            <p className="text-slate-300 text-base leading-relaxed">
              {currentTrack.description}
            </p>

            {/* Features Checkbox list */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-emerald-400">مميزات هذا المسار:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTrack.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-medium text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenFreeSession}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-glow-gold transition-all flex items-center justify-center gap-2"
              >
                <span>اشترك في هذا المسار الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-400 flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>جلسة أولى مجانية مائة بالمائة</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 via-emerald-950/30 to-slate-950 p-6 rounded-2xl border border-emerald-500/20 space-y-6 text-center">
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-[2px] shadow-glow">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400">
                <currentTrack.icon className="w-10 h-10 stroke-[1.8]" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-emerald-400 font-bold">مدة الجلسة المقترحة</span>
              <p className="text-xl font-black text-white">{currentTrack.duration}</p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-right space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">معدل التقييم:</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> 4.98 / 5.0
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">توفر المعلمين:</span>
                <span className="text-emerald-400 font-bold">فوري 24/7</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">نمط التواصل:</span>
                <span className="text-slate-200 font-medium">صوت فقط أو صوت وفيديو</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              «خيركم من تعلم القرآن وعلّمه» - حديث شريف
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
