import React, { useState } from 'react';
import { BookOpen, Video, Mic, MicOff, VideoOff, PhoneOff, Play, Pause, Award, CheckCircle, FileText, Download, User, ArrowLeft, Volume2, Sparkles, Circle, ShieldCheck, Clock, MessageSquare, RefreshCw, Lock, CreditCard, Check, AlertCircle, Shield, Settings, Send, LogOut, Star, ShoppingBag, Edit3, Users, HeartHandshake, Plus, CheckSquare, BellRing } from 'lucide-react';
import PaymentBadges from './PaymentBadges';

export default function StudentApp({ onNavigateToLanding, onNavigateToAdmin }) {
  const [activeTab, setActiveTab] = useState('tutors'); // 'tutors' | 'call' | 'materials' | 'messages' | 'notes' | 'family'
  const [selectedTutor, setSelectedTutor] = useState(null);
  
  // DUAL-MODE WORKFLOW SYSTEM: 'adult' (Independent Adult) | 'parent' (Parent-Managed Children)
  const [accountMode, setAccountMode] = useState('parent'); // Default to parent for full demonstration

  // Master Account State
  const [masterAccount, setMasterAccount] = useState({
    parentName: 'محمود عبد العزيز (ولي الأمر)',
    parentPhone: '+20 101 234 5678',
    parentWhatsapp: '+20 101 234 5678',
    familySubscription: 'باقة العائلة الموحدة (20 جلسة)',
    totalMinutesPool: 1200, // 20 hours / 20 sessions pool
    allocatedMinutes: 800
  });

  // Parent-Managed Child Profiles Gateway List
  const [childProfiles, setChildProfiles] = useState([
    {
      id: 'child_1',
      name: 'عمر محمود (9 سنوات)',
      age: 9,
      allocatedSessions: 10,
      sessionsCompleted: 6,
      assignedTutor: 'الشيخ د. عبد الرحمن السعيد',
      hifzProgress: 'جزء عم وجزء تبارك'
    },
    {
      id: 'child_2',
      name: 'مريم محمود (12 سنة)',
      age: 12,
      allocatedSessions: 10,
      sessionsCompleted: 8,
      assignedTutor: 'الشيخة أستاذة فاطمة الزهراء',
      hifzProgress: 'سورة البقرة وآل عمران'
    }
  ]);

  const [activeChildId, setActiveChildId] = useState('child_1');
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');

  // Student Auth & Subscription State
  const [studentUser, setStudentUser] = useState(() => {
    const saved = localStorage.getItem('borqan_student_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: 'عمر محمود (طفل)',
      telegramId: '@student_quran',
      phone: '+20 101 234 5678',
      isLoggedIn: true,
      subscriptionStatus: 'active',
      activePlan: 'باقة العائلة الموحدة (10 جلسات مخصصة)',
      sessionsLeft: 4,
      paymentRef: 'VOD-884920'
    };
  });

  const [loginTelegramId, setLoginTelegramId] = useState('@student_quran');
  const [loginName, setLoginName] = useState('أحمد محمود');
  const [loginPhone, setLoginPhone] = useState('+20 101 234 5678');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('vodafone');
  const [vodafoneTxId, setVodafoneTxId] = useState('');
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');

  // Call Controls & Post-Session Rating State
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState('alfatiha');

  // Post-Session Rating Modal State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [sessionRating, setSessionRating] = useState(5);
  const [sessionReviewComment, setSessionReviewComment] = useState('');
  const [ratingSubmittedSuccess, setRatingSubmittedSuccess] = useState(false);

  // Student Direct Chat with Teacher State
  const [studentChatMessages, setStudentChatMessages] = useState([
    { sender: 'teacher', text: 'السلام عليكم، أهلاً بك في جلسات القرآن اليومية. جاهز للتلاوة؟', time: '10:30 ص' },
    { sender: 'student', text: 'وعليكم السلام يا شيخنا، نعم جاهز لمراجعة السورة.', time: '10:31 ص' }
  ]);
  const [studentInputMsg, setStudentInputMsg] = useState('');

  // Student Session Notes State
  const [studentSessionNotes, setStudentSessionNotes] = useState([
    {
      id: 'note_1',
      teacherName: 'الشيخ د. عبد الرحمن السعيد',
      date: '2026-09-01',
      surahRevised: 'سورة الملك (الآيات 1-15)',
      weaknessPoints: 'ضعف في أحكام المد اللازم ومخارج حرف القاف والكاف.',
      recommendation: 'تم إرسال تقرير المتابعة والتلاوة المسجلة لواتساب ولي الأمر مباشرة 📱.'
    }
  ]);

  const handleAddChildSubmit = (e) => {
    e.preventDefault();
    if (!newChildName) return;

    const createdChild = {
      id: `child_${Date.now()}`,
      name: `${newChildName} (${newChildAge || 10} سنوات)`,
      age: Number(newChildAge) || 10,
      allocatedSessions: 5,
      sessionsCompleted: 0,
      assignedTutor: 'لم يتم التعيين بعد',
      hifzProgress: 'بداية الحفظ'
    };

    setChildProfiles([...childProfiles, createdChild]);
    setShowAddChildModal(false);
    setNewChildName('');
    setNewChildAge('');
  };

  const activeChildObj = childProfiles.find(c => c.id === activeChildId) || childProfiles[0];

  const handleTelegramLoginSubmit = (e) => {
    if (e) e.preventDefault();
    const updatedUser = {
      ...studentUser,
      name: loginName || 'طالب البرقَان',
      telegramId: loginTelegramId || '@student_quran',
      phone: loginPhone || '+20 101 234 5678',
      isLoggedIn: true
    };
    setStudentUser(updatedUser);
    localStorage.setItem('borqan_student_user', JSON.stringify(updatedUser));
  };

  const handleStudentLogout = () => {
    const loggedOutUser = { ...studentUser, isLoggedIn: false };
    setStudentUser(loggedOutUser);
    localStorage.removeItem('borqan_student_user');
  };

  const tutorsList = [
    {
      id: '1',
      name: 'الشيخ د. عبد الرحمن السعيد',
      title: 'مقرئ بالقراءات العشر المسندة',
      status: 'online',
      rating: 4.9,
      studentsCount: 1420,
      specialty: 'حفظ وتجويد بالقراءات العشر',
      ijazah: 'إجازة مسندة إلى النبي ﷺ من طريق الشاطبية',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: '2',
      name: 'الشيخة أستاذة فاطمة الزهراء',
      title: 'معلمة القراءات وأحكام التلاوة',
      status: 'online',
      rating: 5.0,
      studentsCount: 980,
      specialty: 'تحفيظ النساء والأطفال وتجويد',
      ijazah: 'إجازة برواية حفص عن عاصم ورواية قالون',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const handleStartCall = (tutor) => {
    if (studentUser.subscriptionStatus !== 'active') {
      setSelectedTutor(tutor);
      setShowPaymentModal(true);
      return;
    }
    setSelectedTutor(tutor);
    setIsCalling(true);
    setActiveTab('call');
  };

  const handleEndCallSession = () => {
    setIsCalling(false);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    setRatingSubmittedSuccess(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmittedSuccess(false);
    }, 2000);
  };

  const handleSendStudentMessage = (e) => {
    e.preventDefault();
    if (!studentInputMsg.trim()) return;

    setStudentChatMessages([
      ...studentChatMessages,
      { sender: 'student', text: studentInputMsg, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setStudentInputMsg('');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...studentUser,
      subscriptionStatus: 'active',
      activePlan: 'باقة الشهر الكامل (8 جلسات)',
      sessionsLeft: 8
    };
    setStudentUser(updated);
    localStorage.setItem('borqan_student_user', JSON.stringify(updated));
    setPaymentSuccessMessage('تم التفعيل التلقائي الفوري بنجاح! تم فتح الجلسات المباشرة 🎉');
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccessMessage('');
      if (selectedTutor) handleStartCall(selectedTutor);
    }, 2000);
  };

  const surahContent = {
    alfatiha: {
      name: 'سورة الفاتحة',
      text: [
        'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ (1)',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (2)',
        'الرَّحْمَنِ الرَّحِيمِ (3)',
        'مَالِكِ يَوْمِ الدِّينِ (4)',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (5)',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (6)',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (7)'
      ]
    }
  };

  // IF UNAUTHENTICATED: RENDER TELEGRAM AUTHENTICATION GUARD 📱
  if (!studentUser.isLoggedIn) {
    return (
      <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic flex items-center justify-center p-4 selection:bg-peach-200 selection:text-rosewood-950">
        <div className="bg-rosewood-900 border-2 border-peach-200/30 p-8 rounded-3xl max-w-md w-full text-right space-y-6 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-peach-200/10 border border-peach-200/30 flex items-center justify-center text-peach-200 mb-2">
              <Send className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white font-arabic">تسجيل دخول منصة البرقَان 📱</h2>
            <p className="text-xs text-slate-400">ادخل ببيانات حسابك لمتابعة الجلسات القرآنية وإدارة باقتك.</p>
          </div>

          <form onSubmit={handleTelegramLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">اسم الطالب / ولي الأمر:</label>
              <input
                type="text"
                required
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full px-4 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">معرف التليجرام (Telegram ID):</label>
              <input
                type="text"
                required
                value={loginTelegramId}
                onChange={(e) => setLoginTelegramId(e.target.value)}
                className="w-full px-4 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none font-mono dir-ltr text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
            >
              <Send className="w-4 h-4 text-rosewood-950" />
              <span>متابعة وتأكيد الدخول عبر تليجرام (@burqan5_bot)</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: RENDER DUAL-MODE STUDENT & PARENT WEB APP
  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950 flex flex-col">
      
      {/* Top Header & Account Mode Switcher Bar */}
      <header className="bg-rosewood-900 border-b border-peach-200/15 py-3 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-peach-200 bg-rosewood-950 px-3 py-1.5 rounded-xl border border-peach-200/15 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>العودة للموقع الرئيسي</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-peach-500 to-peach-200 p-[1.5px]">
                <div className="w-full h-full bg-rosewood-950 rounded-[10px] flex items-center justify-center text-peach-200">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <span className="text-lg font-black text-white font-quran">البرقَان <span className="text-xs font-sans text-peach-200 bg-peach-950 px-2 py-0.5 rounded-full border border-peach-200/20">تطبيق القرآن 📱</span></span>
            </div>
          </div>

          {/* DUAL-MODE PROFILE WORKFLOW TOGGLE (Adult vs Parent-Managed Child) */}
          <div className="flex items-center gap-2 bg-rosewood-950 p-1.5 rounded-2xl border border-peach-200/20">
            <button
              onClick={() => setAccountMode('adult')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                accountMode === 'adult' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>حساب بالغ مستقل</span>
            </button>

            <button
              onClick={() => setAccountMode('parent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                accountMode === 'parent' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>حساب وليّ أمر (للأطفال) 👨‍👩‍👧‍👦</span>
            </button>
          </div>

          {/* Student Status & Logout */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStudentLogout}
              className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-rosewood-950 p-1 rounded-2xl border border-peach-200/15">
            {accountMode === 'parent' && (
              <button
                onClick={() => setActiveTab('family')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'family' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>إدارة العائلة والأبناء</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'tutors' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>المعلمون</span>
            </button>

            <button
              onClick={() => setActiveTab('call')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'call' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>غرفة الجلسة</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'messages' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>المحادثات</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'notes' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>سجل الملاحظات</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 text-right space-y-6">

        {/* PARENT-MANAGED NOTIFICATION BANNER (When in Parent Mode) */}
        {accountMode === 'parent' && (
          <div className="bg-rosewood-900 border border-peach-200/20 p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-peach-200/10 border border-peach-200/30 flex items-center justify-center text-peach-200 shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-peach-200 block">نظام التزامن المباشر لواتساب ولي الأمر 📱</span>
                <p className="text-xs text-slate-300">
                  جميع تسجـيلات الجلسات وتنبيهات الحفظ وملاحظات المعلمين تُرسل مباشرة لرقم الواتساب الخاص بك: <strong className="text-white dir-ltr font-mono">{masterAccount.parentWhatsapp}</strong>
                </p>
              </div>
            </div>

            {/* Child Profile Selector Gateway */}
            <div className="flex items-center gap-2 bg-rosewood-950 p-1.5 rounded-2xl border border-peach-200/15">
              <span className="text-xs text-slate-400 font-bold px-2">الطفل الحالي:</span>
              {childProfiles.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChildId(c.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeChildId === c.id ? 'bg-peach-200 text-rosewood-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB: FAMILY & CHILDREN MANAGEMENT (FOR PARENT MODE) */}
        {activeTab === 'family' && accountMode === 'parent' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl">
              <div>
                <span className="text-xs text-peach-200 font-bold bg-peach-950 px-3 py-1 rounded-full border border-peach-200/20">
                  بوابة إدارة الأبناء والفواتير الموحدة
                </span>
                <h2 className="text-xl font-bold text-white mt-1">حساب ولي الأمر: {masterAccount.parentName}</h2>
                <p className="text-xs text-slate-400 mt-1">الفاتورة الموحدة: <strong className="text-white">{masterAccount.familySubscription}</strong> (تم تخصيص {masterAccount.allocatedMinutes} دقيقة للأبناء).</p>
              </div>

              <button
                onClick={() => setShowAddChildModal(true)}
                className="px-5 py-3 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center gap-2 shadow-card shrink-0"
              >
                <Plus className="w-4 h-4 text-rosewood-950" />
                <span>إضافة ملف طفل جديد للعائلة</span>
              </button>
            </div>

            {/* Child Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childProfiles.map(child => (
                <div key={child.id} className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-peach-200/10 border border-peach-200/20 flex items-center justify-center text-peach-200 font-bold text-lg">
                        👶
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{child.name}</h3>
                        <span className="text-xs text-peach-200 block">المعلم المخصص: {child.assignedTutor}</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                      مخصص: {child.allocatedSessions} جلسة
                    </span>
                  </div>

                  <div className="p-3 bg-rosewood-950 rounded-2xl border border-peach-200/10 text-xs space-y-1.5">
                    <p><strong className="text-white">مستوى الحفظ الحالي:</strong> {child.hifzProgress}</p>
                    <p><strong className="text-white">الجلسات المكتملة:</strong> {child.sessionsCompleted} من أصل {child.allocatedSessions} جلسة</p>
                    <p className="text-peach-200 font-bold">إشعارات الحفظ والتسجيلات تصل لواتساب ولي الأمر تلقائياً ✅</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: LIVE TUTORS */}
        {activeTab === 'tutors' && (
          <div className="space-y-6 text-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorsList.map((tutor) => (
                <div key={tutor.id} className="bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-2xl object-cover border border-peach-200/30" />
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{tutor.name}</h3>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        </div>
                        <span className="text-xs text-peach-200 block">{tutor.title}</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">⭐ {tutor.rating} ({tutor.studentsCount} طالب)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-rosewood-950/80 rounded-2xl border border-peach-200/10 text-xs space-y-1 text-right">
                      <span className="text-slate-400 block"><strong className="text-white">التخصص:</strong> {tutor.specialty}</span>
                      <span className="text-slate-400 block"><strong className="text-white">الإجازة:</strong> {tutor.ijazah}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartCall(tutor)}
                    className="w-full py-3.5 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
                  >
                    <Video className="w-4 h-4" />
                    <span>
                      {accountMode === 'parent' ? `بدء الاتصال لطفلي (${activeChildObj.name})` : 'بدء الاتصال المباشر الآن'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CALL ROOM */}
        {activeTab === 'call' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
            <div className="lg:col-span-5 bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 flex flex-col justify-between text-right">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    جلسة نشطة 🟢 (Agora.io)
                  </span>
                  <span className="text-xs text-slate-400">
                    {accountMode === 'parent' ? `الطفل: ${activeChildObj.name}` : `جلسات متبقية: ${studentUser.sessionsLeft}`}
                  </span>
                </div>

                <div className="aspect-video bg-rosewood-950 rounded-2xl border border-peach-200/20 overflow-hidden relative">
                  <img src={selectedTutor ? selectedTutor.avatar : tutorsList[0].avatar} alt="Teacher" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-rosewood-950/90 px-3 py-1 rounded-lg text-xs text-white">
                    {selectedTutor ? selectedTutor.name : 'الشيخ د. عبد الرحمن السعيد'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-peach-200/10">
                <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-2xl bg-rosewood-950 border border-peach-200/20 flex items-center justify-center">
                  {isMuted ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5 text-white" />}
                </button>
                <button onClick={handleEndCallSession} className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center" title="إنهاء الجلسة وتقييمها">
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 text-right">
              <h3 className="text-lg font-bold text-peach-200 font-quran mb-4">المصحف التفاعلي للجلسة</h3>
              <div className="p-6 bg-rosewood-950 rounded-2xl border border-peach-200/20 text-center space-y-4 font-quran text-xl leading-loose">
                {surahContent[selectedSurah].text.map((verse, idx) => (
                  <p key={idx} className="p-2 hover:bg-peach-950/40 rounded-xl">{verse}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT 2-WAY DIRECT CHAT WITH TEACHER */}
        {activeTab === 'messages' && (
          <div className="max-w-3xl mx-auto bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
              <div className="flex items-center gap-3">
                <img src={tutorsList[0].avatar} alt="Teacher Avatar" className="w-10 h-10 rounded-xl object-cover border border-peach-200/20" />
                <div>
                  <h3 className="font-bold text-white text-sm">محادثة الشيخ د. عبد الرحمن السعيد</h3>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    {accountMode === 'parent' ? `(محادثة تدار بواسطة ولي الأمر لـ ${activeChildObj.name})` : 'متاح للتواصل المباشر 🟢'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-rosewood-950 p-4 rounded-2xl border border-peach-200/15 h-[350px] flex flex-col justify-between">
              <div className="space-y-3 overflow-y-auto max-h-[270px]">
                {studentChatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'student' ? 'items-start' : 'items-end'}`}>
                    <div className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                      msg.sender === 'student' ? 'bg-peach-200 text-rosewood-950 font-bold' : 'bg-rosewood-900 text-white'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-75 block text-left dir-ltr mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendStudentMessage} className="flex items-center gap-2 pt-3 border-t border-peach-200/10">
                <input
                  type="text"
                  placeholder="ارسل استفساراً أو سؤالاً للشيخ المعلم..."
                  value={studentInputMsg}
                  onChange={(e) => setStudentInputMsg(e.target.value)}
                  className="flex-1 px-3 py-2 bg-rosewood-900 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-peach-200 text-rosewood-950 font-bold text-xs rounded-xl">
                  إرسال
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: TEACHER SESSION NOTES & WEAKNESS POINTS */}
        {activeTab === 'notes' && (
          <div className="max-w-3xl mx-auto space-y-6 text-right">
            <div className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
                <h3 className="font-bold text-white text-base">سجل ملاحظات المعلم ونقاط الضعف للتطوير</h3>
                <span className="text-xs text-slate-400">تحديث بعد كل جلسة 60 دقيقة</span>
              </div>

              <div className="space-y-4">
                {studentSessionNotes.map((note) => (
                  <div key={note.id} className="p-5 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-peach-200">{note.teacherName}</span>
                      <span className="text-slate-400 font-mono">{note.date}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <p><strong className="text-white">السورة المراجعة:</strong> {note.surahRevised}</p>
                      <p className="text-rose-300"><strong className="text-white">نقاط الضعف الملاحظة:</strong> {note.weaknessPoints}</p>
                      <p className="text-emerald-300"><strong className="text-white">التوصيات والواجب:</strong> {note.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD CHILD PROFILE MODAL FOR PARENTS */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-md w-full p-6 text-right space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
              <h3 className="text-lg font-bold text-white">إضافة ملف طفل جديد للعائلة 👶</h3>
              <button onClick={() => setShowAddChildModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddChildSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">اسم الابن / الابنة:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: يوسف محمود"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full p-3 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">العمر (بالسنوات):</label>
                <input
                  type="number"
                  required
                  placeholder="10"
                  value={newChildAge}
                  onChange={(e) => setNewChildAge(e.target.value)}
                  className="w-full p-3 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all shadow-card"
              >
                حفظ وإضافة لملف العائلة
              </button>
            </form>
          </div>
        </div>
      )}

      {/* POST-SESSION 60-MIN RATING MODAL 🌟 */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-md w-full p-6 text-right space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
                <Star className="w-8 h-8 fill-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white font-arabic">تقييم الجلسة القرآنية المباشرة 🌟</h3>
              <p className="text-xs text-slate-400">كيف كانت تجربتك واستفادتك العلمية في جلسة 60 دقيقة مع الشيخ؟</p>
            </div>

            {ratingSubmittedSuccess ? (
              <div className="p-4 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-2xl text-center text-xs font-bold space-y-1">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>شكراً لتقييمك! تم حفظ تقييمك وملاحظاتك بنجاح 🎉</p>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSessionRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${star <= sessionRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">اكتب رأيك وتجربتك عن الجلسة (اختياري):</label>
                  <textarea
                    rows={3}
                    placeholder="التلاوة كانت ممتازة وتم تصحيح مخرج حرف القاف..."
                    value={sessionReviewComment}
                    onChange={(e) => setSessionReviewComment(e.target.value)}
                    className="w-full p-3 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
                >
                  <Check className="w-4 h-4 text-rosewood-950" />
                  <span>إرسال التقييم والإفادة</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
