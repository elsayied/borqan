import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Award, ShieldCheck, Clock, Users, Globe, ArrowLeft, CheckCircle, PhoneCall, Send, FileText, Heart, DollarSign, Upload, Music, FileAudio, Link as LinkIcon, Award as CertificateIcon, FileCheck, Plus, Video, Mic, MicOff, PhoneOff, Check, HelpCircle, Layers, Radio } from 'lucide-react';

export default function TutorsLandingPage({ onNavigateToStudents }) {
  const [activeTutorTab, setActiveTutorTab] = useState('apply'); // 'apply' | 'dashboard'
  
  // Application Form State
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

  // Quiz Builder State inside Tutor Dashboard
  const [quizzesList, setQuizzesList] = useState([
    {
      id: 'q1',
      question: 'ما هو الحكم التجويدي في قوله تعالى: (مَن يَقُولُ)؟',
      options: ['إدغام بغنة', 'إظهار حلقي', 'إقلاب', 'إخفاء حقيقي'],
      correctIndex: 0,
      explanation: 'النون الساكنة جاء بعدها حرف الياء من حروف (ينمو)، فحكمها الإدغام بغنة.'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctIndex: 0,
    explanation: ''
  });

  // Active Agora WebRTC Call Session State for Teacher
  const [isTeacherCalling, setIsTeacherCalling] = useState(false);
  const [currentStudent, setCurrentStudent] = useState('أحمد محمود (طالب)');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const handleTutorSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleAddQuizSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.question || !newQuestion.optionA || !newQuestion.optionB) return;

    const createdQuiz = {
      id: `q_${Date.now()}`,
      question: newQuestion.question,
      options: [newQuestion.optionA, newQuestion.optionB, newQuestion.optionC || 'خيار C', newQuestion.optionD || 'خيار D'],
      correctIndex: Number(newQuestion.correctIndex),
      explanation: newQuestion.explanation
    };

    setQuizzesList([createdQuiz, ...quizzesList]);
    setNewQuestion({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctIndex: 0,
      explanation: ''
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
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

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTutorTab('apply')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTutorTab === 'apply' ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black shadow-glow-gold' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              تقديم طلب انضمام
            </button>

            <button
              onClick={() => setActiveTutorTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTutorTab === 'dashboard' ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black shadow-glow-gold' : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>لوحة تحكم المعلم والجلسات</span>
            </button>

            <button
              onClick={onNavigateToStudents}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              المنصة 🎓
            </button>
          </div>

        </div>
      </header>

      {/* TAB 1: TUTOR RECRUITMENT & APPLICATION */}
      {activeTutorTab === 'apply' && (
        <div className="pt-28">
          
          {/* Hero Section */}
          <section className="py-16 bg-hero-gradient relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-arabic tracking-tight">
                علّم القرآن الكريم للعالم من منزلك عبر <span className="gold-gradient-text">منصة البرقان</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                نبحث عن كبار المعلمين والمعلمات الحافظين المتقنين ذوي الإجازات المسندة لتعليم القرآن والتجويد والقراءات لآلاف الطلاب الشغوفين.
              </p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, idx) => {
                  const IconComp = b.icon;
                  return (
                    <div key={idx} className="bg-slate-900/70 border border-slate-800 p-6 rounded-3xl space-y-4 text-right">
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

          {/* Embedded Application Form */}
          <section id="apply-form" className="py-16 bg-slate-950 relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-12 text-right shadow-2xl space-y-8">
                {!submitted ? (
                  <form onSubmit={handleTutorSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200 block">الاسم الثلاثي أو الرباعي:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: الشيخ محمد عبد الله النجار"
                        value={tutorForm.name}
                        onChange={(e) => setTutorForm({ ...tutorForm, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-200 block">الجنس:</label>
                        <select
                          value={tutorForm.gender}
                          onChange={(e) => setTutorForm({ ...tutorForm, gender: e.target.value })}
                          className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none"
                        >
                          <option value="male">معلم (رجل)</option>
                          <option value="female">معلمة (امرأة)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-200 block">سنوات الخبرة:</label>
                        <input
                          type="number"
                          required
                          placeholder="عدد السنوات (مثال: 5)"
                          value={tutorForm.experienceYears}
                          onChange={(e) => setTutorForm({ ...tutorForm, experienceYears: e.target.value })}
                          className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200 block">تفاصيل الإجازات والأسانيد:</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="تفاصيل الإجازة القرآنيّة والسند المتصل..."
                        value={tutorForm.ijazahDetails}
                        onChange={(e) => setTutorForm({ ...tutorForm, ijazahDetails: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-200 block">رقم الجوال / الواتساب:</label>
                      <input
                        type="tel"
                        required
                        placeholder="+966 5x xxx xxxx"
                        value={tutorForm.phone}
                        onChange={(e) => setTutorForm({ ...tutorForm, phone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white outline-none dir-ltr text-right"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-slate-950 font-black text-base shadow-glow-gold hover:shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب الانضمام للجنة الاختيار</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="text-3xl font-black text-white">تم استلام طلب الانضمام بنجاح! 🎉</h3>
                    <p className="text-sm text-slate-300">سيتم مراجعة الطلب والتواصل معك عبر الواتساب لإجراء المقابلة وتفعيل حسابك كمعلم.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 2: TUTOR DASHBOARD & WEBRTC (AGORA.IO) & QUIZ BUILDER */}
      {activeTutorTab === 'dashboard' && (
        <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-emerald-500/30 p-6 rounded-3xl backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                لوحة التحكم المباشرة للمعلم
              </span>
              <h2 className="text-2xl font-black text-white mt-1">مرحباً فضيلة الشيخ / د. عبد الرحمن السعيد 💚</h2>
              <p className="text-xs text-slate-400 mt-0.5">محرك الجلسات المباشرة يعمل عبر شبكة **Agora.io WebRTC** فائقة السرعة.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-950 px-4 py-2 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300 font-bold">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Agora.io WebRTC: متصل ونشط 🟢</span>
              </div>
            </div>
          </div>

          {/* Section 1: Manage & Start Live WebRTC Session (Agora.io) */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Video className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">إدارة وبدء الجلسات المباشرة (Agora.io WebRTC Engine)</h3>
              </div>
              <span className="text-xs text-slate-400">جلسات 1-on-1 مع الطلاب</span>
            </div>

            {!isTeacherCalling ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">طلب جلسة مباشر قادم من: أحمد محمود</span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">طالب مشترك (8 جلسات)</span>
                  </div>
                  <p className="text-xs text-slate-400">السورة المطلوبة للتلاوة والتصحيح: <strong className="text-amber-300 font-quran">سورة الفاتحة & سورة الملك</strong></p>
                  
                  <button
                    onClick={() => setIsTeacherCalling(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-xs hover:shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-slate-950" />
                    <span>قبول وبدء الجلسة الصوتية والمرئية فوراً (Agora.io)</span>
                  </button>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">طالب آخر بانتظار بدء الجلسة: مريم السيد</span>
                    <span className="text-xs bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">في قائمة الانتظار</span>
                  </div>
                  <p className="text-xs text-slate-400">التخصص: تصحيح مخارج الحروف وتطبيق أحكام التجويد</p>
                </div>
              </div>
            ) : (
              /* Active Agora WebRTC Call Session View for Teacher */
              <div className="p-6 bg-slate-950 rounded-2xl border-2 border-emerald-500/40 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Radio className="w-5 h-5 text-emerald-400 animate-ping" />
                    <span>جلسة مباشرة نشطة الآن عبر Agora.io مع الطالب: {currentStudent}</span>
                  </div>
                  <button
                    onClick={() => setIsTeacherCalling(false)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>إنهاء الجلسة</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" alt="Teacher Video" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 px-2.5 py-1 rounded-lg text-xs text-white">كاميرا المعلم (Agora Stream 1)</span>
                  </div>

                  <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <User className="w-12 h-12 text-peach-200 mx-auto" />
                      <span className="text-xs text-slate-300 block">{currentStudent}</span>
                      <span className="text-[10px] text-emerald-400 block font-mono">Audio Channel Connected (Agora.io)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Add Quizzes & Tajweed Tests Engine */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Plus className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">إضافة وتصمّيم الاختبارات والأسئلة القرآنيّة للطلاب</h3>
              </div>
              <span className="text-xs text-slate-400">Quiz & Assessment Engine</span>
            </div>

            {/* Quiz Creation Form */}
            <form onSubmit={handleAddQuizSubmit} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">نص السؤال القرآني أو التجويدي:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ما هو حكم النون الساكنة في قوله تعالى: (مَن يَقُولُ)؟"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الخيار (أ):</label>
                  <input
                    type="text"
                    required
                    placeholder="إدغام بغنة"
                    value={newQuestion.optionA}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الخيار (ب):</label>
                  <input
                    type="text"
                    required
                    placeholder="إظهار حلقي"
                    value={newQuestion.optionB}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الخيار (ج):</label>
                  <input
                    type="text"
                    placeholder="إقلاب"
                    value={newQuestion.optionC}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الخيار (د):</label>
                  <input
                    type="text"
                    placeholder="إخفاء حقيقي"
                    value={newQuestion.optionD}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الإجابة الصحيحة:</label>
                  <select
                    value={newQuestion.correctIndex}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctIndex: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  >
                    <option value={0}>الخيار (أ)</option>
                    <option value={1}>الخيار (ب)</option>
                    <option value={2}>الخيار (ج)</option>
                    <option value={3}>الخيار (د)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الشرح والتفسير العلمي:</label>
                  <input
                    type="text"
                    placeholder="النون الساكنة جاء بعدها حرف الياء..."
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-xs hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>حفظ وإضافة السؤال لبنك اختبارات الطلاب</span>
              </button>
            </form>

            {/* List of Created Quizzes */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">الاختبارات المفعلة حالياً في بنك الأسئلة ({quizzesList.length}):</h4>
              <div className="space-y-2">
                {quizzesList.map((quiz, i) => (
                  <div key={quiz.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-white">س{i + 1}: {quiz.question}</p>
                    <p className="text-slate-400">الخيارات: {quiz.options.join(' | ')}</p>
                    <p className="text-emerald-400 font-bold">الإجابة الصحيحة: {quiz.options[quiz.correctIndex]}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} البرقَان للمعلمين (tutors.borqan.com). جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}
