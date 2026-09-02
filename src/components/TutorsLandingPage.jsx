import React, { useState, useRef } from 'react';
import { BookOpen, Sparkles, Award, ShieldCheck, Clock, Users, Globe, ArrowLeft, CheckCircle, PhoneCall, Send, FileText, Heart, DollarSign, Upload, Music, FileAudio, Link as LinkIcon, Award as CertificateIcon, FileCheck, Plus, Video, Mic, MicOff, PhoneOff, Check, HelpCircle, Layers, Radio, MessageSquare, TrendingUp, Lock, FileSpreadsheet, Star, UserCheck, Edit3 } from 'lucide-react';

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

  // Active Teacher Portal Dashboard Sub-Tabs
  const [tutorSubTab, setTutorSubTab] = useState('progress'); // 'progress' | 'materials' | 'messages' | 'quizzes' | 'session_notes'

  // Module 1: Students Progress State
  const [studentsProgressList, setStudentsProgressList] = useState([
    {
      id: 'st_1',
      name: 'أحمد محمود',
      phone: '+20 101 234 5678',
      memorizedSurahs: 'سورة البقرة، آل عمران، الفاتحة، الملك',
      progressPercent: 85,
      sessionsCompleted: 12,
      weaknessPoints: 'ضعف في أحكام المد اللازم ومخارج حرف القاف والكاف.',
      teacherNotes: 'طالب مجتهد جداً، يحتاج التركيز على غُنّة الإخفاء الشفوي.'
    },
    {
      id: 'st_2',
      name: 'مريم السيد',
      phone: '+20 112 334 5566',
      memorizedSurahs: 'سورة النجم، الرحمن، الواقعة',
      progressPercent: 92,
      sessionsCompleted: 16,
      weaknessPoints: 'حاجة لضبط زمن التنوين عند الإدغام بغنة.',
      teacherNotes: 'تلاوة ممتازة ونبرة صوتية خاشعة.'
    }
  ]);

  // Module 2: Educational Materials List (Free or Paid)
  const [materialsList, setMaterialsList] = useState([
    {
      id: 'mat_1',
      title: 'ملخص أحكام التجويد الشامل (PDF)',
      type: 'pdf',
      priceType: 'free', // 'free' | 'paid'
      priceEgp: 0,
      downloadsCount: 142,
      fileUrl: 'tajweed_summary_sheet.pdf'
    },
    {
      id: 'mat_2',
      title: 'شرح متن الجزرية بالصوت والصورة (فيديو + PPTX)',
      type: 'video',
      priceType: 'paid',
      priceEgp: 50,
      downloadsCount: 48,
      fileUrl: 'jazariyyah_masterclass.mp4'
    }
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'pdf',
    priceType: 'free',
    priceEgp: 0,
    fileName: ''
  });

  // Module 3: Messages State
  const [activeStudentChat, setActiveStudentChat] = useState('st_1');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'student', text: 'السلام عليكم يا شيخنا، هل يمكن مراجعة سورة الملك اليوم؟', time: '10:30 ص' },
    { sender: 'teacher', text: 'وعليكم السلام ورحمة الله وبركاته، نعم بالتأكيد جهّز التلاوة وسنبدأ في موعد الجلسة.', time: '10:32 ص' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Module 4: Session Notes Form State
  const [selectedStudentForNote, setSelectedStudentForNote] = useState('st_1');
  const [newSessionNote, setNewSessionNote] = useState({
    surahRevised: 'سورة الملك (الآيات 1-15)',
    weaknessesObserved: 'حاجة لمراجعة أحكام الميم الساكنة وترقيق الراء المكسورة.',
    sharedWithOtherTeachers: true,
    recommendations: 'التركيز على التكرار اليومي لمدة 15 دقيقة.'
  });
  const [savedNotesSuccess, setSavedNotesSuccess] = useState(false);

  // Active Agora WebRTC Call Session State for Teacher
  const [isTeacherCalling, setIsTeacherCalling] = useState(false);

  const handleTutorSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleAddMaterialSubmit = (e) => {
    e.preventDefault();
    if (!newMaterial.title) return;

    const created = {
      id: `mat_${Date.now()}`,
      title: newMaterial.title,
      type: newMaterial.type,
      priceType: newMaterial.priceType,
      priceEgp: newMaterial.priceType === 'paid' ? Number(newMaterial.priceEgp) : 0,
      downloadsCount: 0,
      fileUrl: newMaterial.fileName || 'uploaded_document.pdf'
    };

    setMaterialsList([created, ...materialsList]);
    setNewMaterial({ title: '', type: 'pdf', priceType: 'free', priceEgp: 0, fileName: '' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages([
      ...chatMessages,
      { sender: 'teacher', text: inputMessage, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMessage('');
  };

  const handleSaveSessionNotesSubmit = (e) => {
    e.preventDefault();
    setStudentsProgressList(studentsProgressList.map(st => {
      if (st.id === selectedStudentForNote) {
        return {
          ...st,
          weaknessPoints: newSessionNote.weaknessesObserved,
          teacherNotes: newSessionNote.recommendations
        };
      }
      return st;
    }));
    setSavedNotesSuccess(true);
    setTimeout(() => setSavedNotesSuccess(false), 3000);
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
              <span>حساب المعلم المعتمد</span>
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

      {/* TAB 2: ACTIVE TEACHER ACCOUNT & PORTAL DASHBOARD */}
      {activeTutorTab === 'dashboard' && (
        <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-right">
          
          {/* Active Teacher Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-emerald-500/30 p-6 rounded-3xl backdrop-blur-xl">
            <div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                حساب المعلم المعتمد (Active Tutor Account)
              </span>
              <h2 className="text-2xl font-black text-white mt-1">الشيخ د. عبد الرحمن السعيد 💚</h2>
              <p className="text-xs text-slate-400 mt-0.5">محرك الجلسات المباشرة متصل عبر شبكة **Agora.io WebRTC**.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-950 px-4 py-2 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300 font-bold">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Agora.io WebRTC: متصل 🟢</span>
              </div>
            </div>
          </div>

          {/* Teacher Portal Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setTutorSubTab('progress')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                tutorSubTab === 'progress' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>متابعة تقدم الطلاب ({studentsProgressList.length})</span>
            </button>

            <button
              onClick={() => setTutorSubTab('materials')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                tutorSubTab === 'materials' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>رفع المواد التعليمية ({materialsList.length})</span>
            </button>

            <button
              onClick={() => setTutorSubTab('messages')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                tutorSubTab === 'messages' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>الرسائل المباشرة للطلاب</span>
            </button>

            <button
              onClick={() => setTutorSubTab('session_notes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                tutorSubTab === 'session_notes' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>ملاحظات وسجل الجلسة للمعلمين</span>
            </button>
          </div>

          {/* SUB-TAB 1: STUDENTS PROGRESS TRACKER */}
          {tutorSubTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base">قائمة الطلاب النشطين ومعدل تقدمهم القرآني</h3>
                  <span className="text-xs text-slate-400">تحديث تلقائي بعد كل جلسة</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studentsProgressList.map((st) => (
                    <div key={st.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <h4 className="font-bold text-white text-sm">{st.name}</h4>
                          <span className="text-xs text-amber-300 font-mono">{st.phone}</span>
                        </div>
                        <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-xs border border-emerald-500/30">
                          إنجاز {st.progressPercent}%
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5 text-slate-300">
                        <p><strong className="text-white">السور المحفوظة:</strong> {st.memorizedSurahs}</p>
                        <p><strong className="text-white">الجلسات المكتملة:</strong> {st.sessionsCompleted} جلسة</p>
                        <p className="text-rose-300"><strong className="text-white">نقاط الضعف للحفظ والتركيز:</strong> {st.weaknessPoints}</p>
                        <p className="text-amber-200"><strong className="text-white">ملاحظة معلم السابقة:</strong> {st.teacherNotes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: EDUCATIONAL MATERIALS HUB (PDF / PPT / VIDEO / FREE / PAID) */}
          {tutorSubTab === 'materials' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <h3 className="font-bold text-white text-base">إضافة ورفع المواد التعليمية (PDF / PPT / فيديو / اختبـارات)</h3>
                
                <form onSubmit={handleAddMaterialSubmit} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">عنوان المادة أو المذكرة التعليمية:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: ملخص أحكام التجويد الميسر بالصوت والصورة"
                      value={newMaterial.title}
                      onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">نوع الملف:</label>
                      <select
                        value={newMaterial.type}
                        onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                      >
                        <option value="pdf">ملف PDF / مذكرة</option>
                        <option value="ppt">عرض باوربوينت (PPTX)</option>
                        <option value="video">مقطع فيديو شارح</option>
                        <option value="quiz">اختبار تجويدي</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">التسعير للطلاب:</label>
                      <select
                        value={newMaterial.priceType}
                        onChange={(e) => setNewMaterial({ ...newMaterial, priceType: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                      >
                        <option value="free">مجاني لجميع الطلاب (Free)</option>
                        <option value="paid">مدفوع بمبلغ محدد (Paid)</option>
                      </select>
                    </div>

                    {newMaterial.priceType === 'paid' && (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 block">السعر بالجنيه المصري (EGP):</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="50 EGP"
                          value={newMaterial.priceEgp}
                          onChange={(e) => setNewMaterial({ ...newMaterial, priceEgp: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-slate-950" />
                    <span>نشر المادة في مكتبة الطلاب</span>
                  </button>
                </form>

                {/* Materials List Table */}
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-xs">المواد المنشورة حالياً في حسابك ({materialsList.length}):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {materialsList.map((m) => (
                      <div key={m.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-white text-xs">{m.title}</h5>
                          <span className="text-[10px] text-slate-400 block">التحميلات: {m.downloadsCount} مرة</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                          m.priceType === 'free' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-amber-950 text-amber-300 border-amber-500/30'
                        }`}>
                          {m.priceType === 'free' ? 'مجاني 🎁' : `${m.priceEgp} EGP`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: DIRECT 2-WAY MESSAGING SYSTEM */}
          {tutorSubTab === 'messages' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white text-base">المحادثات المباشرة مع الطلاب النشطين</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
                {/* Students List sidebar */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 overflow-y-auto">
                  {studentsProgressList.map(st => (
                    <button
                      key={st.id}
                      onClick={() => setActiveStudentChat(st.id)}
                      className={`w-full p-3 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between ${
                        activeStudentChat === st.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{st.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </button>
                  ))}
                </div>

                {/* Chat window */}
                <div className="md:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3 overflow-y-auto max-h-[300px]">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'teacher' ? 'items-start' : 'items-end'}`}>
                        <div className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                          msg.sender === 'teacher' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-white'
                        }`}>
                          <p>{msg.text}</p>
                          <span className="text-[9px] opacity-75 block text-left dir-ltr mt-1">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="اكتب رسالتك للطالب هنا..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                    />
                    <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl">
                      إرسال
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: POST-SESSION NOTES & SHARED ASSESSMENT */}
          {tutorSubTab === 'session_notes' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <div>
                <h3 className="font-bold text-white text-base">إضافة ملاحظات وسجل الجلسة للطالب (مشاركة للمعلمين والطلاب)</h3>
                <p className="text-xs text-slate-400 mt-1">تتيح هذه الملاحظات للطالب معرفة نقاط ضعفه، وتُحفظ كمرجع للمعلمين الآخرين في حال تغيير المعلم مستقبلاً.</p>
              </div>

              {savedNotesSuccess && (
                <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold">
                  تم حفظ ملاحظات الجلسة ومشاركتها في ملف الطالب بنجاح 🎉
                </div>
              )}

              <form onSubmit={handleSaveSessionNotesSubmit} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">اختر الطالب:</label>
                  <select
                    value={selectedStudentForNote}
                    onChange={(e) => setSelectedStudentForNote(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  >
                    {studentsProgressList.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.phone})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">السورة والآيات التي تم مراجعتها وتصحيحها:</label>
                  <input
                    type="text"
                    required
                    value={newSessionNote.surahRevised}
                    onChange={(e) => setNewSessionNote({ ...newSessionNote, surahRevised: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">نقاط الضعف الملاحظة (للتركيز عليها الجلسة القادمة):</label>
                  <textarea
                    required
                    rows={2}
                    value={newSessionNote.weaknessesObserved}
                    onChange={(e) => setNewSessionNote({ ...newSessionNote, weaknessesObserved: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">التوصيات والنصائح الموجهة للطالب:</label>
                  <textarea
                    required
                    rows={2}
                    value={newSessionNote.recommendations}
                    onChange={(e) => setNewSessionNote({ ...newSessionNote, recommendations: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="shareNotes"
                    checked={newSessionNote.sharedWithOtherTeachers}
                    onChange={(e) => setNewSessionNote({ ...newSessionNote, sharedWithOtherTeachers: e.target.checked })}
                    className="w-4 h-4 accent-amber-400"
                  />
                  <label htmlFor="shareNotes" className="text-xs text-slate-300 font-bold">
                    مشاركة الملاحظات مع المعلمين الآخرين في حال تغيير الطالب لمعلمه لاحقاً.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  <span>حفظ وإضافة الملاحظات لسجل الطالب</span>
                </button>
              </form>
            </div>
          )}

        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} البرقَان للمعلمين (tutors.borqan.com). جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}
