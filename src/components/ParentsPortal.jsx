import React, { useState } from 'react';
import { BookOpen, Users, BellRing, Plus, CheckCircle, Video, MessageSquare, CreditCard, Clock, UserCheck, ShieldCheck, ArrowLeft, HeartHandshake, Phone, Edit3, Send } from 'lucide-react';

export default function ParentsPortal({ onNavigateToLanding, onNavigateToApp, currentUser }) {
  const [activeParentTab, setActiveParentTab] = useState('children'); // 'children' | 'billing' | 'messages' | 'whatsapp'
  
  // Master Parent State
  const [parentAccount, setParentAccount] = useState({
    name: currentUser?.name || 'محمود عبد العزيز',
    role: currentUser?.role || 'وليّ أمر', // 'وليّ أمر' | 'وليّة أمر'
    phone: currentUser?.phone || '+20 101 234 5678',
    whatsapp: currentUser?.phone || '+20 101 234 5678',
    familySubscription: 'باقة العائلة الموحدة (20 جلسة شهرياً)',
    sessionsPoolTotal: 20,
    sessionsAllocated: 16
  });

  // Children Managed Profiles
  const [childrenList, setChildrenList] = useState([
    {
      id: 'ch_1',
      name: 'عمر محمود',
      gender: 'طالب',
      age: 9,
      allocatedSessions: 8,
      completedSessions: 6,
      assignedTutor: 'الشيخ د. عبد الرحمن السعيد',
      hifzProgress: 'جزء عم وجزء تبارك (سورة الملك والسجدة)',
      lastFeedback: 'تلاوة ممتازة مع تحسن ملحوظ في غُنّة الإخفاء الشفوي.'
    },
    {
      id: 'ch_2',
      name: 'مريم محمود',
      gender: 'طالبة',
      age: 12,
      allocatedSessions: 8,
      completedSessions: 7,
      assignedTutor: 'الشيخة أستاذة فاطمة الزهراء',
      hifzProgress: 'سورة البقرة وآل عمران',
      lastFeedback: 'أداء ممتاز وتم إرسال تسجيل الجلسة لواتساب وليّ الأمر.'
    }
  ]);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildGender, setNewChildGender] = useState('طالب');
  const [newChildAge, setNewChildAge] = useState('');

  // Parent Messaging with Tutors State
  const [activeTutorChat, setActiveTutorChat] = useState('ch_1');
  const [parentMessages, setParentMessages] = useState([
    { sender: 'tutor', text: 'السلام عليكم، نود إحاطتكم علماً بأن تلاوة عمر اليوم كانت ممتازة وتم إكمال سورة الملك.', time: '11:00 ص' },
    { sender: 'parent', text: 'وعليكم السلام جزاكم الله خيراً يا فضيلة الشيخ على المتابعة.', time: '11:05 ص' }
  ]);
  const [parentInputMsg, setParentInputMsg] = useState('');

  const handleAddChildSubmit = (e) => {
    e.preventDefault();
    if (!newChildName) return;

    const createdChild = {
      id: `ch_${Date.now()}`,
      name: newChildName,
      gender: newChildGender,
      age: Number(newChildAge) || 10,
      allocatedSessions: 4,
      completedSessions: 0,
      assignedTutor: 'لم يتم اختيار المعلم بعد',
      hifzProgress: 'بداية الحفظ والتجويد',
      lastFeedback: 'حساب جديد مضاف متاح للبدء'
    };

    setChildrenList([...childrenList, createdChild]);
    setShowAddChildModal(false);
    setNewChildName('');
    setNewChildAge('');
  };

  const handleSendParentMessage = (e) => {
    e.preventDefault();
    if (!parentInputMsg.trim()) return;

    setParentMessages([
      ...parentMessages,
      { sender: 'parent', text: parentInputMsg, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setParentInputMsg('');
  };

  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950 flex flex-col">
      
      {/* Parents Portal Header */}
      <header className="bg-rosewood-900 border-b border-peach-200/15 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-peach-200 bg-rosewood-950 px-3.5 py-2 rounded-xl border border-peach-200/15 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>الموقع الرئيسي</span>
            </button>

            <div className="flex items-center gap-2 text-peach-200">
              <Users className="w-7 h-7" />
              <div className="text-right">
                <h1 className="text-lg font-black text-white font-arabic flex items-center gap-2">
                  <span>بوابة أولياء الأمور (/parents)</span>
                  <span className="text-xs bg-peach-950 text-peach-200 font-bold px-2.5 py-0.5 rounded-full border border-peach-200/20">
                    {parentAccount.role}
                  </span>
                </h1>
                <span className="text-[11px] text-slate-400">متابعة الأبناء والتزامن الفوري عبر الواتساب والفواتير الموحدة</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs inside Parents Portal */}
          <div className="flex items-center gap-2 bg-rosewood-950 p-1.5 rounded-2xl border border-peach-200/20">
            <button
              onClick={() => setActiveParentTab('children')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeParentTab === 'children' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>متابعة الأبناء ({childrenList.length})</span>
            </button>

            <button
              onClick={() => setActiveParentTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeParentTab === 'messages' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>المحادثة مع المعلمين</span>
            </button>

            <button
              onClick={() => setActiveParentTab('billing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeParentTab === 'billing' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>الفاتورة الموحدة والتوزيع</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 text-right space-y-6">
        
        {/* WhatsApp Real-Time Syncing Notification Banner */}
        <div className="bg-rosewood-900 border border-peach-200/20 p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <BellRing className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-300 block">نظام التزامن المباشر لواتساب وليّ / وليّة الأمر 📱</span>
              <p className="text-xs text-slate-300">
                جميع تسجـيلات الجلسات وسجلات الحفظ وتقارير المعلمين الخاصة بالأبناء تُرسل مباشرة لرقم الواتساب: <strong className="text-white dir-ltr font-mono">{parentAccount.whatsapp}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToApp}
              className="px-4 py-2 rounded-xl bg-peach-200 text-rosewood-950 font-bold text-xs hover:bg-peach-100 transition-colors"
            >
              دخول تطبيق الجلسات المباشرة 📱
            </button>
          </div>
        </div>

        {/* TAB 1: CHILDREN MANAGEMENT & PROGRESS CARDS */}
        {activeParentTab === 'children' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl">
              <div>
                <span className="text-xs text-peach-200 font-bold bg-peach-950 px-3 py-1 rounded-full border border-peach-200/20">
                  لوحة العائلة المخصصة لـ {parentAccount.role}: {parentAccount.name}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">بطاقات متابعة القرآن والتجويد للأبناء</h2>
              </div>

              <button
                onClick={() => setShowAddChildModal(true)}
                className="px-5 py-3 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center gap-2 shadow-card shrink-0"
              >
                <Plus className="w-4 h-4 text-rosewood-950" />
                <span>إضافة طفل جديد للحساب</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {childrenList.map((child) => (
                <div key={child.id} className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-peach-200/10 border border-peach-200/20 flex items-center justify-center text-peach-200 font-bold text-lg">
                        {child.gender === 'طالب' ? '👦' : '👧'}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{child.name} ({child.age} سنة)</h3>
                        <span className="text-xs text-peach-200 block">المعلم المخصص: {child.assignedTutor}</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                      مخصص: {child.allocatedSessions} جلسة
                    </span>
                  </div>

                  <div className="p-4 bg-rosewood-950 rounded-2xl border border-peach-200/10 text-xs space-y-2">
                    <p><strong className="text-white">مستوى الحفظ الحالي:</strong> {child.hifzProgress}</p>
                    <p><strong className="text-white">الجلسات المكتملة:</strong> {child.completedSessions} من أصل {child.allocatedSessions} جلسة</p>
                    <p className="text-amber-200"><strong className="text-white">آخر ملاحظات المعلم:</strong> {child.lastFeedback}</p>
                    <p className="text-emerald-400 font-bold pt-1">يصلك إشعار فوري بعد كل جلسة على الواتساب ✅</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DIRECT MESSAGING WITH CHILDREN'S TUTORS */}
        {activeParentTab === 'messages' && (
          <div className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-base">المحادثة المباشرة بين وليّ/وليّة الأمر ومعلمي الأبناء</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
              <div className="bg-rosewood-950 p-3 rounded-2xl border border-peach-200/15 space-y-2 overflow-y-auto">
                {childrenList.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveTutorChat(c.id)}
                    className={`w-full p-3 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between ${
                      activeTutorChat === c.id ? 'bg-peach-200 text-rosewood-950' : 'bg-rosewood-900 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>محادثة معلم {c.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 bg-rosewood-950 p-4 rounded-2xl border border-peach-200/15 flex flex-col justify-between">
                <div className="space-y-3 overflow-y-auto max-h-[300px]">
                  {parentMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === 'parent' ? 'items-start' : 'items-end'}`}>
                      <div className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                        msg.sender === 'parent' ? 'bg-peach-200 text-rosewood-950 font-bold' : 'bg-rosewood-900 text-white'
                      }`}>
                        <p>{msg.text}</p>
                        <span className="text-[9px] opacity-75 block text-left dir-ltr mt-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendParentMessage} className="flex items-center gap-2 pt-3 border-t border-peach-200/10">
                  <input
                    type="text"
                    placeholder="اكتب استفسارك لمعلم الطفل هنا..."
                    value={parentInputMsg}
                    onChange={(e) => setParentInputMsg(e.target.value)}
                    className="flex-1 px-3 py-2 bg-rosewood-900 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-peach-200 text-rosewood-950 font-bold text-xs rounded-xl">
                    إرسال
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UNIFIED BILLING & SESSION POOL ALLOCATION */}
        {activeParentTab === 'billing' && (
          <div className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-6">
            <div>
              <h3 className="font-bold text-white text-base">إدارة الفاتورة العائلية الموحدة وتوزيع رصيد الجلسات</h3>
              <p className="text-xs text-slate-400 mt-1">ولي الأمر يسدد فاتورة عائلية موحدة واحدة وتتوزع الجلسات على الأبناء بسهولة.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-1">
                <span className="text-xs text-peach-200 font-bold">إجمالي رصيد الباقة العائلية</span>
                <span className="text-2xl font-black text-white block">{parentAccount.sessionsPoolTotal} جلسة شهرياً</span>
              </div>

              <div className="p-5 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-1">
                <span className="text-xs text-emerald-400 font-bold">الجلسات الموزعة على الأبناء</span>
                <span className="text-2xl font-black text-white block">{parentAccount.sessionsAllocated} جلسة</span>
              </div>

              <div className="p-5 bg-rosewood-950 rounded-2xl border border-peach-200/15 space-y-1">
                <span className="text-xs text-amber-400 font-bold">الجلسات المتبقية للتوزيع</span>
                <span className="text-2xl font-black text-white block">{parentAccount.sessionsPoolTotal - parentAccount.sessionsAllocated} جلسة</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD CHILD PROFILE MODAL */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-md w-full p-6 text-right space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
              <h3 className="text-lg font-bold text-white">إضافة طفل جديد للحساب 👶</h3>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">الجنس:</label>
                  <select
                    value={newChildGender}
                    onChange={(e) => setNewChildGender(e.target.value)}
                    className="w-full p-3 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                  >
                    <option value="طالب">طالب (ولد)</option>
                    <option value="طالبة">طالبة (بنت)</option>
                  </select>
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

    </div>
  );
}
