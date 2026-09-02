import React, { useState } from 'react';
import { User, Users, Check, Send, AlertCircle, HeartHandshake } from 'lucide-react';
import TelegramLoginWidget from './TelegramLoginWidget';

export default function UserRegistrationModal({ isOpen, onClose, onRegister }) {
  const [role, setRole] = useState('طالب'); // 'وليّ أمر' | 'وليّة أمر' | 'طالب' | 'طالبة'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [age, setAge] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const userData = {
      role,
      name,
      phone,
      telegramId: telegramId || '@user_borqan',
      age: (role === 'طالب' || role === 'طالبة') ? Number(age) || 12 : null
    };

    onRegister(userData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md">
      <div className="bg-rosewood-900 border-2 border-peach-200/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-peach-200/10 pb-4">
          <div className="flex items-center gap-2 text-peach-200">
            <User className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white font-arabic">إنشاء حساب جديد في منصة البرقَان</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Role & Gender Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 block">حدد نوع الحساب المطلوب:</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRole('وليّ أمر')}
                className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'وليّ أمر' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                }`}
              >
                <span>👨‍👦 وليّ أمر (أب)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('وليّة أمر')}
                className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'وليّة أمر' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                }`}
              >
                <span>👩‍👦 وليّة أمر (أم)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('طالب')}
                className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'طالب' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                }`}
              >
                <span>👦 طالب (ذكر)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('طالبة')}
                className={`p-3 rounded-2xl border text-right text-xs font-bold transition-all flex items-center gap-2 ${
                  role === 'طالبة' ? 'bg-peach-200 text-rosewood-950 border-peach-200' : 'bg-rosewood-950 text-slate-300 border-peach-200/15'
                }`}
              >
                <span>👧 طالبة (أنثى)</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200 block">الاسم الكامل:</label>
            <input
              type="text"
              required
              placeholder="الاسم الثلاثي أو الرباعي"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none"
            />
          </div>

          {/* Conditional Age Field for Students */}
          {(role === 'طالب' || role === 'طالبة') && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-peach-200 block">العمر (بالسنوات):</label>
              <input
                type="number"
                required
                min="4"
                max="90"
                placeholder="أدخل عمر الطالب (مثال: 12)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-rosewood-950 border border-peach-200/30 rounded-xl text-xs text-white outline-none font-bold"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200 block">رقم الجوال / الواتساب:</label>
            <input
              type="tel"
              required
              placeholder="+20 10x xxx xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none font-mono dir-ltr text-right"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200 block">معرف التليجرام (Telegram ID):</label>
            <input
              type="text"
              placeholder="@username"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-rosewood-950 border border-peach-200/20 rounded-xl text-xs text-white outline-none font-mono dir-ltr text-right"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-peach-200 text-rosewood-950 font-black text-xs hover:bg-peach-100 transition-all flex items-center justify-center gap-2 shadow-card"
          >
            <Check className="w-5 h-5 text-rosewood-950" />
            <span>تأكيد وإنشاء الحساب الان</span>
          </button>
        </form>

      </div>
    </div>
  );
}
