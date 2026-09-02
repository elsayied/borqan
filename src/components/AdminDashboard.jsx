import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, Clock, Search, ArrowLeft, RefreshCw, User, Phone, Check, X, FileText, Send, AlertCircle, UserPlus, Award, FileAudio, Link as LinkIcon, Plus, Eye, Lock, LogOut, Key } from 'lucide-react';
import ApiService from '../services/api';

export default function AdminDashboard({
  onNavigateToLanding,
  pendingRequests,
  onApproveRequest,
  onRejectRequest,
  tutorApplications,
  onApproveTutorApplication,
  onRejectTutorApplication,
  onAddManualTutor
}) {
  // Admin Security Auth Guard State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('borqan_admin_authenticated') === 'true';
  });

  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [adminTab, setAdminTab] = useState('subscriptions'); // 'subscriptions' | 'tutors'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Manual Add Tutor Form State
  const [showAddTutorModal, setShowAddTutorModal] = useState(false);
  const [newTutor, setNewTutor] = useState({
    name: '',
    title: 'مقرئ معتمد بالقراءات',
    specialty: 'حفظ وتجويد القرآن الكريم',
    ijazah: 'إجازة مسندة برواية حفص عن عاصم',
    gender: 'male',
    status: 'online',
    rating: '5.0',
    studentsCount: '0',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  });

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      // Attempt login via Django API or fallback check
      if (loginUsername === 'admin' && (loginPassword === 'admin1234' || loginPassword === 'admin')) {
        localStorage.setItem('borqan_admin_authenticated', 'true');
        setIsAuthenticated(true);
      } else {
        const res = await ApiService.adminLogin(loginUsername, loginPassword);
        if (res && res.admin_token) {
          localStorage.setItem('borqan_admin_authenticated', 'true');
          setIsAuthenticated(true);
        } else {
          setLoginError('بيانات الدخول غير صحيحة أو ليس لديك صلاحيات إدارية.');
        }
      }
    } catch (err) {
      if (loginUsername === 'admin' && (loginPassword === 'admin1234' || loginPassword === 'admin')) {
        localStorage.setItem('borqan_admin_authenticated', 'true');
        setIsAuthenticated(true);
      } else {
        setLoginError('كلمة المرور غير صحيحة أو خادم Django غير متصل حالياً.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('borqan_admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleManualAddSubmit = (e) => {
    e.preventDefault();
    onAddManualTutor(newTutor);
    setShowAddTutorModal(false);
    setNewTutor({
      name: '',
      title: 'مقرئ معتمد بالقراءات',
      specialty: 'حفظ وتجويد القرآن الكريم',
      ijazah: 'إجازة مسندة برواية حفص عن عاصم',
      gender: 'male',
      status: 'online',
      rating: '5.0',
      studentsCount: '0',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    });
  };

  const filteredRequests = pendingRequests.filter(req => {
    const matchesSearch = req.studentName.includes(searchTerm) || req.phone.includes(searchTerm) || req.txId.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // IF UNAUTHENTICATED: RENDER ADMIN LOGIN AUTHENTICATION GUARD MODAL 🔒
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic flex items-center justify-center p-4 selection:bg-peach-200 selection:text-rosewood-950">
        <div className="bg-rosewood-900 border-2 border-peach-200/30 p-8 rounded-3xl max-w-md w-full text-right space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-peach-200/10 border border-peach-200/30 flex items-center justify-center text-peach-200 mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white font-arabic">تسجيل دخول الإدارة 🔒</h2>
            <p className="text-xs text-slate-400">هذه المنطقة محمية ومخصصة لإدارة منصة البرقَان فقط.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-950 border border-rose-800 text-rose-200 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">اسم مستخدم الأدمن (Username):</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none"
                />
                <User className="w-4 h-4 text-slate-500 absolute top-1/2 right-3.5 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">كلمة المرور الإدارية (Password):</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-rosewood-950 border border-peach-200/20 rounded-2xl text-xs text-white outline-none"
                />
                <Key className="w-4 h-4 text-slate-500 absolute top-1/2 right-3.5 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
            >
              <ShieldCheck className="w-4 h-4 text-rosewood-950" />
              <span>{loginLoading ? 'جاري التحقق...' : 'دخول ورؤية بيانات الإدارة'}</span>
            </button>
          </form>

          <button
            onClick={onNavigateToLanding}
            className="w-full py-2 text-center text-xs text-slate-400 hover:text-peach-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>العودة للموقع الرئيسي</span>
          </button>

        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: RENDER FULL ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950 flex flex-col">
      
      {/* Admin Header */}
      <header className="bg-rosewood-900 border-b border-peach-200/15 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-peach-200 bg-rosewood-950 px-3.5 py-2 rounded-xl border border-peach-200/15 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للموقع الرئيسي</span>
            </button>

            <div className="flex items-center gap-2 text-peach-200">
              <ShieldCheck className="w-7 h-7" />
              <div className="text-right">
                <h1 className="text-lg font-black text-white font-arabic">لوحة تحكم إدارة البرقَان (/admin)</h1>
                <span className="text-[11px] text-slate-400">إدارة اشتراكات الطلاب والموافقة على كادر المعلمين المعلقين</span>
              </div>
            </div>
          </div>

          {/* Admin Navigation Tabs & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-rosewood-950 p-1.5 rounded-2xl border border-peach-200/20">
              <button
                onClick={() => setAdminTab('subscriptions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  adminTab === 'subscriptions' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>اشتراكات الطلاب ({pendingRequests.filter(r => r.status === 'pending').length})</span>
              </button>

              <button
                onClick={() => setAdminTab('tutors')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  adminTab === 'tutors' ? 'bg-peach-200 text-rosewood-950 shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>إدارة المعلمين ({tutorApplications.filter(t => t.status === 'pending').length})</span>
              </button>
            </div>

            <button
              onClick={handleAdminLogout}
              className="px-3.5 py-2.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-2xl border border-rose-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 text-right">
        
        {/* TAB 1: STUDENT SUBSCRIPTION APPROVALS */}
        {adminTab === 'subscriptions' && (
          <div className="space-y-6">
            
            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-rosewood-900 border border-peach-200/15 p-5 rounded-3xl space-y-1">
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  طلبات تحويل فودافون كاش المعلقة
                </span>
                <span className="text-3xl font-black text-white block">
                  {pendingRequests.filter(r => r.status === 'pending').length} طلبات
                </span>
              </div>

              <div className="bg-rosewood-900 border border-peach-200/15 p-5 rounded-3xl space-y-1">
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  الاشتراكات المفعلة هذا الشهر
                </span>
                <span className="text-3xl font-black text-white block">
                  {pendingRequests.filter(r => r.status === 'active').length} اشتراكات
                </span>
              </div>

              <div className="bg-rosewood-900 border border-peach-200/15 p-5 rounded-3xl space-y-1">
                <span className="text-xs text-peach-200 font-bold flex items-center gap-1">
                  <RefreshCw className="w-4 h-4" />
                  تفعيل فوري تلقائي عبر فوري
                </span>
                <span className="text-3xl font-black text-white block">نشط تلقائياً ⚡</span>
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-rosewood-900 border border-peach-200/15 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-peach-200/10 flex items-center justify-between">
                <h3 className="font-bold text-white text-base">طلبات تفعيل باقات الطلاب المعلقة</h3>
                <span className="text-xs text-slate-400">سيتم إرسال إشعار تليجرام تلقائي للطالب فور التفعيل</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-rosewood-950 text-slate-300 border-b border-peach-200/10 font-bold">
                    <tr>
                      <th className="p-4">الطالب المسجل</th>
                      <th className="p-4">رقم محفظة التحويل</th>
                      <th className="p-4">الباقة المختارة</th>
                      <th className="p-4">رقم العملية المرفق</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4 text-center">الإجراء الإداري</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rosewood-950/80">
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-rosewood-950/40 transition-colors">
                        <td className="p-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-peach-200 shrink-0" />
                            <span>{req.studentName}</span>
                          </div>
                        </td>
                        <td className="p-4 text-peach-200 font-mono dir-ltr text-right">{req.phone}</td>
                        <td className="p-4 text-slate-200 font-bold">{req.planName}</td>
                        <td className="p-4 font-mono text-amber-300 font-bold">{req.txId}</td>
                        <td className="p-4">
                          {req.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span>مفعل نشط</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-500/30">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>بانتظار الاعتماد</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {req.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => onApproveRequest(req.id)}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                              >
                                تفعيل الاشتراك
                              </button>
                              <button
                                onClick={() => onRejectRequest(req.id)}
                                className="px-3 py-2 rounded-xl bg-rose-950 text-rose-300 font-bold text-xs border border-rose-800"
                              >
                                رفض
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 font-bold">تم التفعيل ✅</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TEACHER APPLICATIONS & MANUAL ADDITION */}
        {adminTab === 'tutors' && (
          <div className="space-y-6">
            
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl">
              <div>
                <h2 className="text-xl font-bold text-white">إدارة كادر المعلمين والمعلمات</h2>
                <p className="text-xs text-slate-400 mt-1">مراجعة طلبات الانضمام القادمة من tutors.borqan.com أو إضافة معلم جديد يدويًا.</p>
              </div>

              <button
                onClick={() => setShowAddTutorModal(true)}
                className="px-5 py-3 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center gap-2 shadow-card shrink-0"
              >
                <Plus className="w-4 h-4 text-rosewood-950" />
                <span>إضافة معلم جديد يدويًا</span>
              </button>
            </div>

            {/* Pending Applications Grid */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>طلبات انضمام المعلمين المعلقة</span>
                <span className="text-xs bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {tutorApplications.filter(t => t.status === 'pending').length} طلب معلق
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorApplications.map((tutor) => (
                  <div key={tutor.id} className="bg-rosewood-900 border border-peach-200/15 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-peach-200/10 pb-3">
                        <div className="flex items-center gap-3">
                          <img src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-2xl object-cover border border-peach-200/20" />
                          <div>
                            <h4 className="font-bold text-white text-base">{tutor.name}</h4>
                            <span className="text-xs text-peach-200 block">{tutor.phone}</span>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                          tutor.status === 'approved' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-amber-950 text-amber-300 border-amber-500/30'
                        }`}>
                          {tutor.status === 'approved' ? 'معتمد ومفعل' : 'قيد الدراسة والمراجعة'}
                        </span>
                      </div>

                      <div className="p-3 bg-rosewood-950 rounded-2xl border border-peach-200/10 text-xs space-y-1">
                        <p className="text-slate-300"><strong className="text-white">الخبرة:</strong> {tutor.experienceYears} سنوات تدريس</p>
                        <p className="text-slate-300"><strong className="text-white">الإجازة:</strong> {tutor.ijazahDetails}</p>
                        {tutor.certFile && (
                          <p className="text-peach-200 font-bold pt-1 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            <span>مرفق شهادة/إجازة: {tutor.certFile}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {tutor.status === 'pending' ? (
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => onApproveTutorApplication(tutor.id)}
                          className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-md"
                        >
                          <Check className="w-4 h-4" />
                          <span>قبول واعتماد المعلم بالنظام</span>
                        </button>
                        <button
                          onClick={() => onRejectTutorApplication(tutor.id)}
                          className="px-4 py-3 rounded-2xl bg-rose-950 hover:bg-rose-900 text-rose-300 font-bold text-xs border border-rose-800"
                        >
                          رفض الطلب
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl text-center text-xs text-emerald-300 font-bold">
                        تم قبول المعلم وإضافته لقائمة المعلمين المباشرين للطلاب 🎉
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* MANUAL ADD TUTOR MODAL */}
      {showAddTutorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
          <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-lg w-full p-6 text-right space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
              <div className="flex items-center gap-2 text-peach-200">
                <UserPlus className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white font-arabic">إضافة معلم جديد يدويًا</h3>
              </div>
              <button onClick={() => setShowAddTutorModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">اسم الشيخ / المعلم الرباعي:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الشيخ حسن علي الحذيفي"
                  value={newTutor.name}
                  onChange={(e) => setNewTutor({ ...newTutor, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">المسمى العلمي / اللقب:</label>
                  <input
                    type="text"
                    required
                    value={newTutor.title}
                    onChange={(e) => setNewTutor({ ...newTutor, title: e.target.value })}
                    className="w-full px-3 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">الجنس:</label>
                  <select
                    value={newTutor.gender}
                    onChange={(e) => setNewTutor({ ...newTutor, gender: e.target.value })}
                    className="w-full px-3 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                  >
                    <option value="male">معلم (رجل)</option>
                    <option value="female">معلمة (امرأة)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">التخصص الأكاديمي والقرآني:</label>
                <input
                  type="text"
                  required
                  value={newTutor.specialty}
                  onChange={(e) => setNewTutor({ ...newTutor, specialty: e.target.value })}
                  className="w-full px-3 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 block">تفاصيل الإجازة القرآنيّة والسند:</label>
                <input
                  type="text"
                  required
                  value={newTutor.ijazah}
                  onChange={(e) => setNewTutor({ ...newTutor, ijazah: e.target.value })}
                  className="w-full px-3 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
              >
                <Check className="w-5 h-5 text-rosewood-950" />
                <span>حفظ وإضافة المعلم لقائمة المعلمين المباشرين</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
