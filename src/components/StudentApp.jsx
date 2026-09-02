import React, { useState } from 'react';
import { BookOpen, Video, Mic, MicOff, VideoOff, PhoneOff, Play, Pause, Award, CheckCircle, FileText, Download, User, ArrowLeft, Volume2, Sparkles, Circle, ShieldCheck, Clock, MessageSquare, RefreshCw, Lock, CreditCard, Check, AlertCircle, Shield, Settings } from 'lucide-react';
import PaymentBadges from './PaymentBadges';

export default function StudentApp({ onNavigateToLanding }) {
  const [activeTab, setActiveTab] = useState('tutors'); // 'tutors' | 'call' | 'quizzes' | 'materials' | 'admin'
  const [selectedTutor, setSelectedTutor] = useState(null);
  
  // Student Auth & Subscription State
  const [studentUser, setStudentUser] = useState({
    name: 'أحمد محمود',
    phone: '+20 101 234 5678',
    isLoggedIn: true,
    subscriptionStatus: 'unsubscribed', // 'unsubscribed' | 'pending_manual' | 'active'
    activePlan: null,
    sessionsLeft: 0,
    paymentRef: ''
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('vodafone'); // 'vodafone' | 'instapay' | 'fawry' | 'visa'
  const [vodafoneTxId, setVodafoneTxId] = useState('');
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');

  // Call Controls State
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState('alfatiha');

  // Quiz Engine State
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
    },
    {
      id: '3',
      name: 'الشيخ محمد محمود الشنقيطي',
      title: 'استشاري التجويد ومخارج الحروف',
      status: 'busy',
      rating: 4.8,
      studentsCount: 2100,
      specialty: 'مراجعة وتصحيح التلاوة والمخارج',
      ijazah: 'إجازة في المتون القرآنية والجزرية',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const handleStartCall = (tutor) => {
    // Access Control Check
    if (studentUser.subscriptionStatus !== 'active') {
      setSelectedTutor(tutor);
      setShowPaymentModal(true);
      return;
    }

    setSelectedTutor(tutor);
    setIsCalling(true);
    setActiveTab('call');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (selectedPaymentMethod === 'fawry' || selectedPaymentMethod === 'visa') {
      // Automatic Instant Activation for Fawry & Visa
      setStudentUser({
        ...studentUser,
        subscriptionStatus: 'active',
        activePlan: 'باقة الشهر الكامل (8 جلسات)',
        sessionsLeft: 8
      });
      setPaymentSuccessMessage('تم التفعيل التلقائي الفوري عبر فوري بنجاح! يمكنك الآن بدء الجلسات المباشرة 🎉');
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccessMessage('');
        if (selectedTutor) handleStartCall(selectedTutor);
      }, 2000);
    } else {
      // Manual Activation for Vodafone Cash / InstaPay
      setStudentUser({
        ...studentUser,
        subscriptionStatus: 'pending_manual',
        paymentRef: vodafoneTxId || 'VOD-884920'
      });
      setPaymentSuccessMessage('تم استلام رقم عملية التحويل بنجاح! الطلب قيد التأكيد اليدوي من الإدارة الآن (سيتم التفعيل خلال دقائق).');
    }
  };

  // Admin Manual Activation Trigger
  const handleAdminApprovePayment = () => {
    setStudentUser({
      ...studentUser,
      subscriptionStatus: 'active',
      activePlan: 'باقة الشهر الكامل (فودافون كاش)',
      sessionsLeft: 8
    });
    setShowPaymentModal(false);
  };

  const quizQuestions = [
    {
      question: 'ما هو الحكم التجويدي في قوله تعالى: (مَن يَقُولُ)؟',
      options: ['إدغام بغنة', 'إظهار حلقي', 'إقلاب', 'إخفاء حقيقي'],
      correct: 0,
      explanation: 'النون الساكنة جاء بعدها حرف الياء (من حروف ينمو)، فحكمها الإدغام بغنة.'
    },
    {
      question: 'أكمل الآية الكريمة: (اهْدِنَا الصِّرَاطَ ...)',
      options: ['الْمُسْتَقِيمَ', 'الْمَغْضُوبِ', 'الْعَلِيمَ', 'الْحَكِيمَ'],
      correct: 0,
      explanation: 'سورة الفاتحة الآية 6: (اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ).'
    }
  ];

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
    },
    almulk: {
      name: 'سورة الملك (بداية السورة)',
      text: [
        'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
        'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (1)',
        'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ (2)'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950 flex flex-col">
      
      {/* Top Header & Status Bar */}
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
              <span className="text-lg font-black text-white font-quran">البرقَان <span className="text-xs font-sans text-peach-200 bg-peach-950 px-2 py-0.5 rounded-full border border-peach-200/20">منصة الطلاب</span></span>
            </div>
          </div>

          {/* Student Account Status Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-rosewood-950 px-3 py-1.5 rounded-2xl border border-peach-200/15 text-xs">
              <User className="w-3.5 h-3.5 text-peach-200" />
              <span className="font-bold text-white">{studentUser.name}</span>
              
              {studentUser.subscriptionStatus === 'active' ? (
                <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>اشتراك نشط ({studentUser.sessionsLeft} جلسة)</span>
                </span>
              ) : studentUser.subscriptionStatus === 'pending_manual' ? (
                <span className="bg-amber-950 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>بانتظار تفعيل الإدارة (فودافون كاش)</span>
                </span>
              ) : (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-peach-200 text-rosewood-950 font-black px-3 py-0.5 rounded-full hover:bg-peach-100 transition-colors flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>تفعيل الاشتراك الان</span>
                </button>
              )}
            </div>

            {/* Quick Admin Simulation Trigger */}
            <button
              onClick={() => setActiveTab('admin')}
              className="p-2 rounded-xl bg-rosewood-950 hover:bg-rosewood-800 border border-peach-200/20 text-peach-200 transition-colors"
              title="لوحة الأدمن لتفعيل الاشتراك يدويًا"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-rosewood-950 p-1 rounded-2xl border border-peach-200/15">
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
              onClick={() => setActiveTab('quizzes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'quizzes' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>الاختبارات</span>
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'materials' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>المواد</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">

        {/* TAB 1: LIVE TUTORS */}
        {activeTab === 'tutors' && (
          <div className="space-y-6 text-right">
            
            {studentUser.subscriptionStatus !== 'active' && (
              <div className="p-4 bg-amber-950/60 border border-amber-500/40 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="text-xs text-amber-200">
                    {studentUser.subscriptionStatus === 'pending_manual'
                      ? 'تم استلام رقم عملية فودافون كاش بنجاح وقيد التأكيد اليدوي من الإدارة الآن.'
                      : 'يلزم الاشتراك في باقة لتشغيل وتفعيل الجلسات المباشرة مع المعلمين.'}
                  </span>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-4 py-1.5 bg-peach-200 text-rosewood-950 rounded-xl font-bold text-xs shrink-0"
                >
                  {studentUser.subscriptionStatus === 'pending_manual' ? 'عرض حالة الطلب' : 'تفعيل باقة الجلسات'}
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorsList.map((tutor) => (
                <div key={tutor.id} className="bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-2xl object-cover border border-peach-200/30" />
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{tutor.name}</h3>
                          <span className={`w-2.5 h-2.5 rounded-full ${tutor.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
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
                    {studentUser.subscriptionStatus === 'active' ? (
                      <>
                        <Video className="w-4 h-4" />
                        <span>بدء الاتصال المباشر الآن</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-rosewood-950" />
                        <span>اشترك لبدء الجلسة الفردية</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CALL ROOM */}
        {activeTab === 'call' && (
          studentUser.subscriptionStatus !== 'active' ? (
            <div className="text-center py-20 bg-rosewood-900 border border-peach-200/15 rounded-3xl p-8 space-y-4 max-w-md mx-auto">
              <Lock className="w-12 h-12 text-peach-200 mx-auto" />
              <h3 className="text-xl font-bold text-white">غرفة الجلسات المباشرة مقفلة</h3>
              <p className="text-xs text-slate-300">قم بتفعيل اشتراكك عبر فوري (تلقائي فوراً) أو فودافون كاش (تأكيد يدوي) لبدء الاتصال بالمعلمين.</p>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-3 bg-peach-200 text-rosewood-950 font-bold rounded-2xl text-xs shadow-card"
              >
                تفعيل الاشتراك الآن 💳
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
              {/* Call Room Interface */}
              <div className="lg:col-span-5 bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 flex flex-col justify-between text-right">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      جلسة نشطة 🟢
                    </span>
                    <span className="text-xs text-slate-400">جلسات متبقية: {studentUser.sessionsLeft}</span>
                  </div>

                  <div className="aspect-video bg-rosewood-950 rounded-2xl border border-peach-200/20 overflow-hidden relative">
                    <img src={selectedTutor ? selectedTutor.avatar : tutorsList[0].avatar} alt="Teacher" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-rosewood-950/90 px-3 py-1 rounded-lg text-xs text-white">
                      {selectedTutor ? selectedTutor.name : 'الشيخ'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4 border-t border-peach-200/10">
                  <button onClick={() => setIsMuted(!isMuted)} className="w-12 h-12 rounded-2xl bg-rosewood-950 border border-peach-200/20 flex items-center justify-center">
                    {isMuted ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5 text-white" />}
                  </button>
                  <button onClick={() => setIsCalling(false)} className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center">
                    <PhoneOff className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Mushaf Viewer */}
              <div className="lg:col-span-7 bg-rosewood-900 border border-peach-200/15 rounded-3xl p-6 text-right">
                <h3 className="text-lg font-bold text-peach-200 font-quran mb-4">المصحف التفاعلي للجلسة</h3>
                <div className="p-6 bg-rosewood-950 rounded-2xl border border-peach-200/20 text-center space-y-4 font-quran text-xl leading-loose">
                  {surahContent[selectedSurah].text.map((verse, idx) => (
                    <p key={idx} className="p-2 hover:bg-peach-950/40 rounded-xl">{verse}</p>
                  ))}
                </div>
              </div>
            </div>
          )
        )}

        {/* TAB 3: QUIZZES */}
        {activeTab === 'quizzes' && (
          <div className="max-w-2xl mx-auto space-y-6 text-right">
            <div className="bg-rosewood-900 border border-peach-200/15 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white">اختبارات التجويد اليومية</h3>
              <p className="text-xs text-slate-300">أجب عن الأسئلة واكسب نقاط التميز القرآني.</p>
            </div>
          </div>
        )}

        {/* TAB 4: MATERIALS */}
        {activeTab === 'materials' && (
          <div className="space-y-6 text-right">
            <div className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white">المواد التعليمية والمذكرات Mapped</h2>
            </div>
          </div>
        )}

        {/* TAB 5: SIMULATED ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="max-w-2xl mx-auto space-y-6 text-right">
            <div className="bg-rosewood-900 border-2 border-amber-500/40 p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                  <h2 className="text-xl font-bold text-white font-arabic">لوحة تحكم الإدارة (تأكيد المدفوعات اليدوية)</h2>
                </div>
                <span className="text-xs text-slate-400 bg-rosewood-950 px-3 py-1 rounded-full border border-peach-200/15">وضع المحاكاة الإدارية</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">الطالب: {studentUser.name} ({studentUser.phone})</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      studentUser.subscriptionStatus === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {studentUser.subscriptionStatus === 'active' ? 'مفعل نشط' : 'قيد الانتظار'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">طريقة الدفع: <strong className="text-peach-200">فودافون كاش / InstaPay</strong></p>
                  <p className="text-xs text-slate-400">رقم التحويل المرفق: <strong className="text-white font-mono">{studentUser.paymentRef || 'VOD-884920'}</strong></p>

                  <div className="pt-3">
                    <button
                      onClick={handleAdminApprovePayment}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>الموافقة وتفعيل باقة الطالب فوراً (8 جلسات)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* SUBSCRIPTION & PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
              <div className="flex items-center gap-2 text-peach-200">
                <CreditCard className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white font-arabic">تفعيل اشتراك منصة البرقان</h3>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            {paymentSuccessMessage ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-xs text-emerald-200 font-bold leading-relaxed">{paymentSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-1">
                  <span className="text-xs text-peach-200 font-bold block">باقة الشهر الكامل (8 جلسات فردية مباشرة)</span>
                  <span className="text-xl font-black text-white block">350 جنيه مصري / 85 ريال سعودي</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200 block">اختر طريقة الدفع المناسبة:</label>
                  
                  {/* Payment Methods Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('vodafone')}
                      className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all ${
                        selectedPaymentMethod === 'vodafone' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                      }`}
                    >
                      <span>فودافون كاش / InstaPay</span>
                      <span className="text-[10px] block opacity-80 mt-0.5">(تأكيد يدوي من الإدارة)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('fawry')}
                      className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all ${
                        selectedPaymentMethod === 'fawry' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                      }`}
                    >
                      <span>فوري (Fawry Pay)</span>
                      <span className="text-[10px] block opacity-80 mt-0.5">(تفعيل تلقائي فوري ⚡)</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Fields based on method */}
                {selectedPaymentMethod === 'vodafone' ? (
                  <div className="space-y-3 p-4 bg-rosewood-950 rounded-2xl border border-peach-200/15 text-xs text-right">
                    <p className="text-slate-300">
                      قم بتحويل المبلغ إلى رقم المحفظة: <strong className="text-peach-200 dir-ltr font-mono">+20 101 988 7766</strong>
                    </p>
                    <div className="space-y-1">
                      <label className="text-slate-200 font-bold block">أدخل رقم عملية التحويل / رقم الجوال المحول منه:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: VOD-998822 أو رقم المحفظة"
                        value={vodafoneTxId}
                        onChange={(e) => setVodafoneTxId(e.target.value)}
                        className="w-full px-3 py-2 bg-rosewood-900 border border-peach-200/20 rounded-xl text-white outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/15 text-xs text-slate-300 space-y-1">
                    <span className="text-emerald-400 font-bold block">تفعيل تلقائي فوري ⚡</span>
                    <p>سيتم تفعيل الاشتراك وفتح غرفة الجلسات المباشرة فور إتمام الدفع عبر كود فوري المرجعي.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-sm shadow-card hover:bg-peach-100 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-rosewood-950" />
                  <span>
                    {selectedPaymentMethod === 'fawry' ? 'إتمام الدفع والتفعيل التلقائي' : 'إرسال رقم التحويل للتأكيد اليدوي'}
                  </span>
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
