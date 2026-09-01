import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Award, ShieldCheck, Clock, Users, Globe, ArrowLeft, CheckCircle, PhoneCall, Send, FileText, Heart, DollarSign, Upload, Music, FileAudio, Link as LinkIcon, Award as CertificateIcon, FileCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function TutorsLandingPage({ onNavigateToStudents }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCertFile, setSelectedCertFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const certFileInputRef = useRef(null);

  const [tutorForm, setTutorForm] = useState({
    name: '',
    phone: '',
    gender: 'male',
    ijazahDetails: '',
    experienceYears: '',
    recitationLink: '',
  });

  const handleTutorSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: 'حرية كاملة في اختيار ساعات العمل',
      desc: 'اعمل من منزلك وفي الأوقات التي تناسب جدولك اليومي على مدار 24 ساعة دون إجبار على مواعيد محددة.'
    },
    {
      icon: Globe,
      title: 'تعليم طلاب من كافة دول العالم',
      desc: 'تواصل مباشر مع طلاب وأسر شغوفة بتعلم القرآن والتجويد من الخليج، أوروبا، وأمريكا الشمالية.'
    },
    {
      icon: DollarSign,
      title: 'عوائد مالية مجزية ومستحقات منتظمة',
      desc: 'احصل على مكافآت وحساب دقيق لكل دقيقة تعليمية منجزة مع تحويلات مالية دورية آمنة.'
    },
    {
      icon: Heart,
      title: 'أعظم رسالة وأعلى أجر',
      desc: 'امتثالاً لقول النبي ﷺ: «خيركم من تعلم القرآن وعلّمه»، واجعل علمك صدقة جارية ونوراً في حياتك.'
    }
  ];

  const requirements = [
    'حفظ القرآن الكريم كاملاً عن ظهر قلب بإتقان تام',
    'الحصول على إجازة قرآنيّة واحدة على الأقل بالسند المتصل',
    'إتقان أحكام التجويد النظري والتطبيقي ومخارج الحروف',
    'التحلي بالصبر وحسن التعامل مع مختلف الأعمار (خاصة الأطفال)',
    'توفر اتصال إنترنت ثابت وسريع وسماعة صوت نقية'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-arabic selection:bg-emerald-500 selection:text-white">
      
      {/* Tutor Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/40 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateToStudents(); }} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-borqan-700 via-borqan-500 to-amber-400 p-[2px] shadow-glow">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-2xl font-black text-white flex items-center gap-1.5 font-arabic">
                  البرقَان <span className="text-xs text-amber-300 font-bold px-2.5 py-0.5 bg-amber-400/10 rounded-full border border-amber-400/20">بوابة المعلمين</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-mono dir-ltr text-right">tutors.borqan.com</span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onNavigateToStudents}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-colors"
            >
              الذهاب لمنصة الطلاب 🎓
            </button>

            <a
              href="#apply-form"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 shadow-glow-gold hover:shadow-glow transition-all"
            >
              تقديم طلب انضمام كمعلم
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-4xl">
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-arabic tracking-tight">
            علّم القرآن الكريم للعالم من منزلك عبر <span className="gold-gradient-text">منصة البرقان</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            نبحث عن كبار المعلمين والمعلمات الحافظين المتقنين ذوي الإجازات المسندة لتعليم القرآن والتجويد والقراءات لآلاف الطلاب الشغوفين.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply-form"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-sm shadow-glow-gold hover:shadow-glow transition-all flex items-center gap-2 group"
            >
              <span>قدّم طلب انضمامك كمعلّم الآن</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </a>

            <a
              href="#requirements"
              className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-sm transition-colors"
            >
              استعرض شروط الانضمام
            </a>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-900">مميزات المعلمين</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-arabic">لماذا تختار التعليم عبر منصة البرقان؟</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-4 text-right hover:border-emerald-500/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-amber-400">
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-hero-gradient relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">معايير القبول</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-arabic">شروط ومتطلبات الانضمام لكادر المعلمين</h2>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 p-8 rounded-3xl space-y-4 backdrop-blur-xl">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-200">{req}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href="#apply-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-sm shadow-glow-gold hover:shadow-glow transition-all"
            >
              <span>تأكدت من الشروط؟ ابدأ ملء نموذج الانضمام أدناه</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Embedded Full Webpage Application Form */}
      <section id="apply-form" className="py-24 bg-slate-950 relative scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-12 text-right shadow-2xl backdrop-blur-xl space-y-8">
            
            {!submitted ? (
              <>
                {/* Form Header */}
                <div className="space-y-3 text-center border-b border-slate-800 pb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 shadow-sm">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>نموذج التقديم لكادر المعلمين والمعلمات</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white font-arabic tracking-tight">
                    طلب انضمام معلّم / معلّمة
                  </h2>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    يرجى تعبئة بياناتك العلمية والدقيقة، وسيتم مراجعة الطلب وعينة التلاوة بواسطة اللجنة العلمية بالمنصة.
                  </p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleTutorSubmit} className="space-y-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-200 block">الاسم الثلاثي أو الرباعي:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: الشيخ محمد عبد الله النجار"
                      value={tutorForm.name}
                      onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-colors shadow-inner"
                    />
                  </div>

                  {/* Gender & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200 block">الجنس:</label>
                      <select
                        value={tutorForm.gender}
                        onChange={(e) => setTutorForm({ ...tutorForm, gender: e.target.value })}
                        className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value="male">معلم (رجل)</option>
                        <option value="female">معلمة (امرأة)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200 block">سنوات الخبرة في التدريس (عدد السنوات):</label>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        required
                        placeholder="أدخل عدد السنوات (مثال: 5)"
                        value={tutorForm.experienceYears}
                        onChange={(e) => setTutorForm({ ...tutorForm, experienceYears: e.target.value })}
                        className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Ijazah Details */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-200 block">تفاصيل الإجازات والأسانيد الحاصل عليها:</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="اذكر اسم الشيخة/الشيخ المقرئ والنظام أو الرواية (مثال: إجازة بحفص عن عاصم من طريق الشاطبية)"
                      value={tutorForm.ijazahDetails}
                      onChange={(e) => setTutorForm({ ...tutorForm, ijazahDetails: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-200 block">رقم الجوال / الواتساب مع المفتاح الدولي:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 5x xxx xxxx"
                      value={tutorForm.phone}
                      onChange={(e) => setTutorForm({ ...tutorForm, phone: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 outline-none dir-ltr text-right focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Drag & Drop File Upload + URL Field */}
                  <div className="space-y-3 pt-2">
                    <label className="text-sm font-bold text-slate-200 block">
                      عينة تلاوة صوتية أو سيرة ذاتية (اختياري):
                    </label>

                    {/* Drag & Drop File Upload Box */}
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 ${
                        dragActive
                          ? 'border-amber-400 bg-amber-400/10'
                          : selectedFile
                          ? 'border-emerald-400 bg-emerald-950/40'
                          : 'border-slate-800 hover:border-emerald-500/40 bg-slate-950/60'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*,.mp3,.wav,.m4a,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3 text-emerald-300">
                          <FileAudio className="w-8 h-8 text-amber-400" />
                          <div className="text-right">
                            <span className="text-sm font-bold block">{selectedFile.name}</span>
                            <span className="text-xs text-slate-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • جاهز للرفع
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-amber-400">
                            <Upload className="w-6 h-6 stroke-[2]" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              اختر ملف صوتي أو سيرة ذاتية من جهازك
                            </span>
                            <span className="text-xs text-slate-400 block mt-1">
                              (يمكنك سحب وإسقاط الملف هنا أو الضغط للتصفح - MP3, WAV, PDF)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Or URL input */}
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>أو قم بلصق رابط ملف صوتي من الإنترنت (Drive / Telegram):</span>
                      </div>
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="https://drive.google.com/... أو رابط صوتي"
                          value={tutorForm.recitationLink}
                          onChange={(e) => setTutorForm({ ...tutorForm, recitationLink: e.target.value })}
                          className="w-full pr-10 pl-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 outline-none dir-ltr text-right focus:border-emerald-400 transition-colors"
                        />
                        <LinkIcon className="w-4 h-4 text-slate-500 absolute top-1/2 right-3 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate / Ijazah Verification Document Upload Field */}
                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-bold text-slate-200 block">
                      إرفاق صورة/ملف الإجازة أو الشهادة للتحقق (اختياري):
                    </label>

                    <div
                      onClick={() => certFileInputRef.current?.click()}
                      className={`p-5 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 ${
                        selectedCertFile
                          ? 'border-emerald-400 bg-emerald-950/40'
                          : 'border-slate-800 hover:border-emerald-500/40 bg-slate-950/60'
                      }`}
                    >
                      <input
                        ref={certFileInputRef}
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedCertFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />

                      {selectedCertFile ? (
                        <div className="flex items-center justify-center gap-3 text-emerald-300">
                          <CertificateIcon className="w-7 h-7 text-amber-400" />
                          <div className="text-right">
                            <span className="text-sm font-bold block">{selectedCertFile.name}</span>
                            <span className="text-xs text-slate-400">
                              {(selectedCertFile.size / (1024 * 1024)).toFixed(2)} MB • مرفق للتحقق
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3 text-slate-400">
                          <CertificateIcon className="w-6 h-6 text-amber-400 shrink-0" />
                          <div className="text-right">
                            <span className="text-xs font-bold text-white block">
                              اضغط لإرفاق وثيقة الإجازة أو الشهادة (صورة أو PDF)
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              (يُساعد اللجنة العلمية في تسريع اعتماد حسابك كمعلم)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-slate-950 font-black text-base shadow-glow-gold hover:shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب الانضمام للجنة الاختيار</span>
                    </button>
                  </div>

                </form>
              </>
            ) : (
              /* Confirmation Success State */
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow">
                  <CheckCircle className="w-12 h-12 stroke-[2]" />
                </div>
                <h3 className="text-3xl font-black text-white font-arabic">تم استلام طلب الانضمام بنجاح! 🎉</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  شكراً فضيلة الشيخ / الشيخة <strong className="text-amber-400">{tutorForm.name}</strong>. سيتم مراجعة إجازاتك وعينة التلاوة المرفقة والتواصل معك عبر الواتساب لإجراء المقابلة وتفعيل حساب المعلم.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelectedFile(null); setSelectedCertFile(null); }}
                  className="px-8 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
                >
                  إرسال طلب جديد
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} البرقَان للمعلمين (tutors.borqan.com). جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}
