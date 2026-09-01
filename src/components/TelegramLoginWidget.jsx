import React, { useEffect, useRef, useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

export default function TelegramLoginWidget({ onAuth }) {
  const containerRef = useRef(null);
  const [showLocalFallback, setShowLocalFallback] = useState(false);

  useEffect(() => {
    // Define global callback handler for Telegram Widget
    window.onTelegramAuth = (user) => {
      console.log('Telegram User Logged In:', user);
      if (onAuth) {
        onAuth(user);
      } else {
        alert(
          'Logged in as ' +
            user.first_name +
            ' ' +
            (user.last_name || '') +
            ' (' +
            user.id +
            (user.username ? ', @' + user.username : '') +
            ')'
        );
      }
    };

    // Dynamically insert Telegram Script
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?24';
      script.async = true;
      script.setAttribute('data-telegram-login', 'burqan5_bot');
      script.setAttribute('data-size', 'medium');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');

      script.onerror = () => {
        setShowLocalFallback(true);
      };

      containerRef.current.appendChild(script);
    }
  }, [onAuth]);

  // Mock Telegram Auth for local testing on localhost
  const triggerMockAuth = () => {
    const mockUser = {
      id: 8830688058,
      first_name: 'تجربة',
      last_name: 'محلية',
      username: 'test_user',
      auth_date: Math.floor(Date.now() / 1000)
    };
    if (window.onTelegramAuth) {
      window.onTelegramAuth(mockUser);
    }
  };

  return (
    <div className="space-y-2">
      {/* Telegram Official Widget Container */}
      <div ref={containerRef} className="flex justify-center my-2" />

      {/* Local Testing Mock Button (Active when testing on localhost) */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={triggerMockAuth}
          className="px-3 py-1.5 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 mx-auto"
        >
          <Send className="w-3.5 h-3.5" />
          <span>اختبار الدخول بالتليجرام (محاكاة Localhost)</span>
        </button>
        <span className="text-[10px] text-slate-500 block mt-1">
          ملاحظة: تليجرام يتطلب تعيين النطاق الرسمى في @BotFather عبر الأمر /setdomain عند النشر.
        </span>
      </div>
    </div>
  );
}
