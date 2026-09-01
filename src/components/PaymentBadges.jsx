import React from 'react';

export function PaymentBadges() {
  const paymentMethods = [
    {
      name: 'فودافون كاش (Vodafone Cash)',
      img: '/images/vodafone-cash.svg',
      alt: 'Vodafone Cash'
    },
    {
      name: 'InstaPay',
      img: '/images/instapay.svg',
      alt: 'InstaPay Egypt'
    },
    {
      name: 'بطاقة فيزا (Visa)',
      img: '/images/visa.svg',
      alt: 'Visa Card'
    },
    {
      name: 'فوري (Fawry)',
      img: '/images/fawry.png',
      alt: 'Fawry Pay'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
      {paymentMethods.map((method, idx) => (
        <div 
          key={idx}
          className="group relative p-1 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <img 
            src={method.img} 
            alt={method.alt} 
            className="h-10 w-auto object-contain rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
