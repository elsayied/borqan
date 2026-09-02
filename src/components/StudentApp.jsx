import React, { useState } from 'react';
import { BookOpen, Video, Mic, MicOff, VideoOff, PhoneOff, Play, Pause, Award, CheckCircle, FileText, Download, User, ArrowLeft, Volume2, Sparkles, Circle, ShieldCheck, Clock, MessageSquare, RefreshCw, Lock, CreditCard, Check, AlertCircle, Shield, Settings, Send, LogOut, Star, ShoppingBag, Edit3, Radio } from 'lucide-react';
import PaymentBadges from './PaymentBadges';

export default function StudentApp({ onNavigateToLanding, onNavigateToAdmin, currentUser }) {
  const [activeTab, setActiveTab] = useState('tutors'); // 'tutors' | 'call' | 'messages' | 'notes'
  const [selectedTutor, setSelectedTutor] = useState(null);

  // STRICT STUDENT AUTHENTICATION GUARD
  const [studentUser, setStudentUser] = useState(() => {
    // Check if parent passed an active currentUser
    if (currentUser && (currentUser.role === 'طالب' || currentUser.role === 'طالبة')) {
      return {
        name: currentUser.name,
        role: currentUser.role,
        age: currentUser.age || 12,
        telegramId: currentUser.telegramId || '@student_quran',
        phone: currentUser.phone || '+20 101 234 5678',
        isLoggedIn: true,
        subscriptionStatus: 'active',
        activePlan: 'باقة الشهر الكامل (8 جلسات)',
        sessionsLeft: 7,
        paymentRef: 'VOD-884920'
      };
    }

    // Check localStorage
    const saved = localStorage.getItem('borqan_student_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isLoggedIn) {
          return parsed;
        }
      } catch (e) {}
    }

    // UNAUTHENTICATED DEFAULT: MUST BE LOGGED IN FIRST!
    return {
      name: '',
      role: 'طالب',
      age: 12,
      telegramId: '',
      phone: '',
      isLoggedIn: false, // STRICTLY FALSE BY DEFAULT
      subscriptionStatus: 'inactive',
      activePlan: '',
      sessionsLeft: 0,
      paymentRef: ''
    };
  });

  const [loginTelegramId, setLoginTelegramId] = useState('@student_quran');
  const [loginName, setLoginName] = useState('أحمد محمود');
  const [loginPhone, setLoginPhone] = useState('+20 101 234 5678');
  const [loginAge, setLoginAge] = useState('12');

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
    { sender: 'teacher', text: 'السلام عليكم، أهلاً بك في جلسات القرآن اليومية. جاهز للتلاوة والتصحيح؟', time: '10:30 ص' },
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
      recommendation: 'تم تدوين الملاحظة والتلاوة لتكرارها يومياً 15 دقيقة.'
    }
  ]);

  const handleTelegramLoginSubmit = (e) => {
    if (e) e.preventDefault();
    if (!loginName || !loginTelegramId) return;

    const updatedUser = {
      name: loginName,
      role: 'طالب',
      age: Number(loginAge) || 12,
      telegramId: loginTelegramId,
      phone: loginPhone,
      isLoggedIn: true,
      subscriptionStatus: 'active',
      activePlan: 'باقة الشهر الكامل (8 جلسات)',
      sessionsLeft: 8,
      paymentRef: 'VOD-884920'
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

  // IF UNAUTHENTICATED: RENDER STRICT TELEGRAM / STUDENT LOGIN GUARD 🔒📱
  if (!studentUser.isLoggedIn) {
    return (
      <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic flex items-center justify-center p-4 selection:bg-peach-200 selection:text-rosewood-950">
        <div className="bg-rosewood-900 border-2 border-peach-200/30 p-8 rounded-3xl max-w-md w-full text-right space-y-6 shadow-2xl">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-peach-200/10 border border-peach-200/30 flex items-center justify-center text-peach-200 mb-2 shadow-glow">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white font-arabic">تسجيل دخول الطلاب 🔒📱</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              هذه البوابة مخصصة حصرياً للطلاب. يجب تسجيل الدخول بحساب الطالب للوصول للجلسات المباشرة.
            </p>
          </div>

          <form onSubmit={handleTelegramLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">اسم الطالب / الطالبة:</label>
              <input
                type="text"
                required
                placeholder="أحمد محمود"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full px-4 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">العمر (بالسنوات):</label>
              <input
                type="number"
                required
                min="4"
                max="90"
                placeholder="12"
                value={loginAge}
                onChange={(e) => setLoginAge(e.target.value)}
                className="w-full px-4 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">معرف التليجرام (Telegram ID):</label>
              <input
                type="text"
                required
                placeholder="@student_quran"
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
              <span>تأكيد وتسجيل الدخول عبر تليجرام (@burqan5_bot)</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onNavigateToLanding}
              className="text-xs text-slate-400 hover:text-peach-200 underline"
            >
              العودة للموقع الرئيسي
            </button>
          </div>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: RENDER NATIVE MOBILE APP LAYOUT FOR STUDENTS 📱
  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950 flex flex-col pb-24">
      
      {/* Top App Bar */}
      <header className="bg-rosewood-900 border-b border-peach-200/15 py-3 sticky top-0 z-40 backdrop-blur-md shadow-md">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-peach-500 to-peach-200 p-[1.5px] shadow-glow">
              <div className="w-full h-full bg-rosewood-950 rounded-[14px] flex items-center justify-center text-peach-200">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-base font-black text-white font-quran flex items-center gap-1">
                البرقَان <span className="text-[10px] text-emerald-400 font-mono">Mobile App</span>
              </span>
              <span className="text-[10px] text-peach-200 font-bold">{studentUser.name} ({studentUser.age} سنة)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              {studentUser.sessionsLeft} جلسات متبقية
            </span>

            <button
              onClick={handleStudentLogout}
              className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Mobile Screen Viewport */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 space-y-5 text-right">

        {/* TAB 1: LIVE TUTORS */}
        {activeTab === 'tutors' && (
          <div className="space-y-4">
            <div className="bg-rosewood-900 p-4 rounded-2xl border border-peach-200/15">
              <h2 className="text-sm font-bold text-white mb-0.5">معلمو القرآٰن المتاحون للجلسات المباشرة 🎙️</h2>
              <p className="text-[11px] text-slate-400">اختر معلمك المفضل للبدء في تلاوة وسماع تصحيح الأحكام.</p>
            </div>

            <div className="space-y-4">
              {tutorsList.map((tutor) => (
                <div key={tutor.id} className="bg-rosewood-900 border border-peach-200/15 rounded-3xl p-5 space-y-3 shadow-card">
                  <div className="flex items-center gap-3">
                    <img src={tutor.avatar} alt={tutor.name} className="w-14 h-14 rounded-2xl object-cover border border-peach-200/30" />
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-sm">{tutor.name}</h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <span className="text-[11px] text-peach-200 block">{tutor.title}</span>
                      <span className="text-[10px] text-slate-400 block">⭐ {tutor.rating} ({tutor.studentsCount} طالب)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-rosewood-950/90 rounded-2xl border border-peach-200/10 text-[11px] space-y-1">
                    <p className="text-slate-300"><strong className="text-white">التخصص:</strong> {tutor.specialty}</p>
                    <p className="text-slate-300"><strong className="text-white">الإجازة:</strong> {tutor.ijazah}</p>
                  </div>

                  <button
                    onClick={() => handleStartCall(tutor)}
                    className="w-full py-3 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
                  >
                    <Video className="w-4 h-4 text-rosewood-950" />
                    <span>بدء اتّصال مباشر مع الشيخ (Agora.io)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CALL ROOM */}
        {activeTab === 'call' && (
          <div className="space-y-4">
            <div className="bg-rosewood-900 border border-peach-200/15 rounded-3xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Radio className="w-4 h-4 text-emerald-400 animate-ping" />
                  جلسة نشطة 🟢 (Agora.io)
                </span>
                <span className="text-[11px] text-slate-400">جلسات متبقية: {studentUser.sessionsLeft}</span>
              </div>

              <div className="aspect-video bg-rosewood-950 rounded-2xl border border-peach-200/20 overflow-hidden relative">
                <img src={selectedTutor ? selectedTutor.avatar : tutorsList[0].avatar} alt="Teacher" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-rosewood-950/90 px-3 py-1 rounded-lg text-xs text-white">
                  {selectedTutor ? selectedTutor.name : 'الشيخ د. عبد الرحمن السعيد'}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-2xl bg-rosewood-950 border border-peach-200/20 flex items-center justify-center">
                  {isMuted ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5 text-white" />}
                </button>
                <button onClick={handleEndCallSession} className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center" title="إنهاء الجلسة وتقييمها">
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="bg-rosewood-900 border border-peach-200/15 rounded-3xl p-5 text-right space-y-3">
              <h3 className="text-base font-bold text-peach-200 font-quran">المصحف التفاعلي للجلسة</h3>
              <div className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/20 text-center space-y-3 font-quran text-lg leading-loose">
                {surahContent[selectedSurah].text.map((verse, idx) => (
                  <p key={idx} className="p-1.5 hover:bg-peach-950/40 rounded-xl">{verse}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT 2-WAY DIRECT CHAT WITH TEACHER */}
        {activeTab === 'messages' && (
          <div className="bg-rosewood-900 border border-peach-200/15 p-4 rounded-3xl space-y-3 text-right">
            <div className="flex items-center gap-3 border-b border-peach-200/10 pb-3">
              <img src={tutorsList[0].avatar} alt="Teacher Avatar" className="w-10 h-10 rounded-xl object-cover border border-peach-200/20" />
              <div>
                <h3 className="font-bold text-white text-xs">{tutorsList[0].name}</h3>
                <span className="text-[10px] text-emerald-400 font-bold block">متاح للتواصل المباشر 🟢</span>
              </div>
            </div>

            <div className="bg-rosewood-950 p-3 rounded-2xl border border-peach-200/15 h-[340px] flex flex-col justify-between">
              <div className="space-y-3 overflow-y-auto max-h-[260px]">
                {studentChatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'student' ? 'items-start' : 'items-end'}`}>
                    <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                      msg.sender === 'student' ? 'bg-peach-200 text-rosewood-950 font-bold' : 'bg-rosewood-900 text-white'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-75 block text-left dir-ltr mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendStudentMessage} className="flex items-center gap-2 pt-2 border-t border-peach-200/10">
                <input
                  type="text"
                  placeholder="ارسل رسالتك للشيخ المعلم..."
                  value={studentInputMsg}
                  onChange={(e) => setStudentInputMsg(e.target.value)}
                  className="flex-1 px-3 py-2 bg-rosewood-900 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
                <button type="submit" className="px-3.5 py-2 bg-peach-200 text-rosewood-950 font-bold text-xs rounded-xl">
                  إرسال
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: TEACHER SESSION NOTES & WEAKNESS POINTS */}
        {activeTab === 'notes' && (
          <div className="bg-rosewood-900 border border-peach-200/15 p-4 rounded-3xl space-y-3 text-right">
            <h3 className="font-bold text-white text-sm">سجل ملاحظات المعلم وتصحيح التلاوة</h3>
            
            <div className="space-y-3">
              {studentSessionNotes.map((note) => (
                <div key={note.id} className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-peach-200">{note.teacherName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{note.date}</span>
                  </div>

                  <p><strong className="text-white">السورة المراجعة:</strong> {note.surahRevised}</p>
                  <p className="text-rose-300"><strong className="text-white">نقاط الضعف الملاحظة:</strong> {note.weaknessPoints}</p>
                  <p className="text-emerald-300"><strong className="text-white">التوصيات:</strong> {note.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MOBILE APP BOTTOM NAVIGATION BAR 📱 (Fixed at bottom of screen) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-rosewood-900/95 backdrop-blur-xl border-t border-peach-200/20 py-2">
        <div className="max-w-md mx-auto px-4 flex items-center justify-around">
          
          <button
            onClick={() => setActiveTab('tutors')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'tutors' ? 'text-peach-200 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">المعلمون</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === 'call' ? 'text-peach-200 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-peach-200 text-rosewood-950 flex items-center justify-center -mt-5 shadow-card border-2 border-rosewood-950">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-[11px]">الجلسة المباشرة</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'messages' ? 'text-peach-200 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[11px]">المحادثات</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'notes' ? 'text-peach-200 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-5 h-5" />
            <span className="text-[11px]">الملاحظات</span>
          </button>

        </div>
      </div>

      {/* POST-SESSION 60-MIN RATING MODAL 🌟 */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-sm w-full p-6 text-right space-y-5 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
                <Star className="w-7 h-7 fill-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-arabic">تقييم الجلسة القرآنية 🌟</h3>
              <p className="text-xs text-slate-400">كيف كانت تجربتك في جلسة 60 دقيقة مع الشيخ؟</p>
            </div>

            {ratingSubmittedSuccess ? (
              <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-2xl text-center text-xs font-bold space-y-1">
                <CheckCircle className="w-7 h-7 text-emerald-400 mx-auto" />
                <p>شكراً لتقييمك! تم حفظ التقييم بنجاح 🎉</p>
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
                      <Star className={`w-7 h-7 ${star <= sessionRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  placeholder="ملاحظاتك عن الجلسة (اختياري)..."
                  value={sessionReviewComment}
                  onChange={(e) => setSessionReviewComment(e.target.value)}
                  className="w-full p-3 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
                >
                  <Check className="w-4 h-4 text-rosewood-950" />
                  <span>إرسال التقييم</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
