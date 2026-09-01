import React, { useState } from 'react';
import { X, Mic, CheckCircle, Sparkles, User, Phone, BookOpen, Clock, ShieldCheck, Send } from 'lucide-react';
import TelegramLoginWidget from './TelegramLoginWidget';

export default function FreeSessionModal({ isOpen, onClose, onNavigateToTutors }) {
  const [submitted, setSubmitted] = useState(false);
  const [telegramUser, setTelegramUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    track: 'تصحيح التلاوة والترتيل',
    tutorGender: 'no_preference',
  });

  if (!isOpen) return null;

  const handleTelegramAuth = (user) => {
    setTelegramUser(user);
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
    const displayName = fullName + (user.username ? ` (@${user.username})` : '');
    setFormData(prev => ({
      ...prev,
      name: displayName
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 relative text-right shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                <Mic className="w-3.5 h-3.5 text-amber-400" />
                <span>حجز جلسة تجريبية مجانية 100%</span>
              </div>
              <h3 className="text-2xl font-black text-white font-arabic">
                ابدأ تجربتك الأولى مع معلمك المقرئ
              </h3>
              <p className="text-xs text-slate-400">
                سجل بياناتك أو قم بتسجيل الدخول عبر تليجرام لملء البيانات فورياً.
              </p>
            </div>

            {/* Telegram Login Widget */}
            <div className="p-3 bg-slate-950 border border-sky-500/30 rounded-2xl text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-400">
                <Send className="w-4 h-4" />
                <span>تسجيل الدخول السريع عبر تليجرام (Telegram)</span>
              </div>

              {telegramUser ? (
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/80 py-2 px-3 rounded-xl border border-emerald-500/40">
                  <CheckCircle className="w-4 h-4" />
                  <span>مرحباً بك: {telegramUser.first_name} {telegramUser.last_name || ''}</span>
                </div>
              ) : (
                <TelegramLoginWidget onAuth={handleTelegramAuth} />
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">الاسم الكريم:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبد الله أحمد"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute top-1/2 right-3 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">رقم الجوال (واتساب):</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+966 5x xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pr-10 pl-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-xl text-xs text-white placeholder-slate-500 outline-none dir-ltr text-right"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute top-1/2 right-3 -translate-y-1/2" />
                </div>
              </div>

              {/* Track Choice */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">اختر المسار المرغوب:</label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-xl text-xs text-white outline-none"
                >
                  <option value="تصحيح التلاوة والترتيل">مسار تصحيح التلاوة والترتيل</option>
                  <option value="الحفظ والمراجعة">مسار الحفظ والمراجعة التراكمية</option>
                  <option value="أحكام التجويد والأداء">مسار أحكام التجويد والأداء</option>
                  <option value="الإجازة بالسند">مسار الإجازة بالسند المتصل</option>
                  <option value="براعم البرقان للأطفال">مسار براعم البرقان (للأطفال)</option>
                </select>
              </div>

              {/* Tutor Gender */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">تفضيل المعلم/المعلمة:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tutorGender: 'male' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.tutorGender === 'male'
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    معلم (للرجال)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tutorGender: 'female' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.tutorGender === 'female'
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    معلمة (للنساء/أطفال)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tutorGender: 'no_preference' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.tutorGender === 'no_preference'
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    لا مانع
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-sm shadow-glow-gold hover:shadow-glow transition-all"
              >
                تأكيد حجز الجلسة المجانية للطلاب
              </button>

              {/* Tutor recruitment redirect note */}
              <div className="text-center pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">هل أنت معلّم أو معلّمة وتود الانضمام لكادر البرقان؟</span>
                <button
                  type="button"
                  onClick={() => { onClose(); if (onNavigateToTutors) onNavigateToTutors(); }}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 underline mt-0.5"
                >
                  قدّم طلب انضمام كمعلّم من هنا (tutors.borqan.com) 👨‍🏫
                </button>
              </div>

            </form>
          </>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-10 h-10 stroke-[2]" />
            </div>

            <h3 className="text-2xl font-black text-white font-arabic">
              تم استلام طلبك بنجاح! 🎉
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              شكراً لك <strong className="text-amber-400">{formData.name}</strong>. سيتم التواصل معك عبر الواتساب على الرقم <span dir="ltr" className="font-mono text-emerald-400">{formData.phone}</span> لتحديد موعد الجلسة المجانية.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              إغلاق النافذة
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
