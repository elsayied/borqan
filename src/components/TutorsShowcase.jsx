import React, { useState, useRef } from 'react';
import { Award, Star, Volume2, Mic, CheckCircle2, User, Sparkles, PhoneCall, Pause } from 'lucide-react';

export default function TutorsShowcase({ onOpenFreeSession }) {
  const [filterGender, setFilterGender] = useState('all');
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const audioRef = useRef(null);

  const tutors = [
    {
      id: 1,
      name: 'الشيخ محمد دمر',
      gender: 'male',
      title: 'معلم ومدرب تلاوة وتجويد',
      ijazah: 'إجازة في القرآن الكريم بالسند المتصل',
      rating: 5.0,
      students: 1000,
      hours: 10,
      image: 'images/mohamed.jpg', //'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      surahSample: 'سورة الإخلاص (قل هو الله احد) ',
      audioUrl: 'https://server11.mp3quran.net/yasser/112.mp3', // Direct audio file URL or '/audio/sample1.mp3'
      badge: 'شيخ مقرئ معتمد من جامعة الأزهر'
    },
    {
      id: 2,
      name: 'الشيخة د. مريم احمد',
      gender: 'female',
      title: 'أستاذة التجويد والأداء الصوتي',
      ijazah: 'إجازة بالسند لروايتي حفص وورش',
      rating: 4.98,
      students: 1250,
      hours: 3900,
      image: null, // Optional image: null/omitted renders dignified default avatar
      surahSample: 'سورة الفاتحة فاتحة الكتاب',
      audioUrl: 'https://server6.mp3quran.net/qtm/001.mp3',
      badge: 'متخصصة للنساء والأطفال'
    }
  ];

  const filteredTutors = filterGender === 'all'
    ? tutors
    : tutors.filter(t => t.gender === filterGender);

  const toggleAudio = (tutor) => {
    if (playingAudioId === tutor.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (tutor.audioUrl) {
        audioRef.current = new Audio(tutor.audioUrl);
        audioRef.current.play().catch(err => console.log('Audio playback error:', err));
        audioRef.current.onended = () => setPlayingAudioId(null);
      }
      setPlayingAudioId(tutor.id);
    }
  };

  return (
    <section id="tutors" className="py-24 bg-hero-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>نخبة المعلمين والمعلمات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-arabic tracking-tight">
            تعلم على أيدي <span className="gold-gradient-text">علماء ومقرئين معتمدين</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            تم اختبارهم بعناية وحصولهم على أعلى الأسانيد والإجازات القرآنية المسندة.
          </p>

          {/* Gender Filter Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setFilterGender('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filterGender === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/30'
              }`}
            >
              جميع المعلمين والمعلمات ({tutors.length})
            </button>

            <button
              onClick={() => setFilterGender('male')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filterGender === 'male'
                  ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/30'
              }`}
            >
              معلمون (للرجال والأولاد)
            </button>

            <button
              onClick={() => setFilterGender('female')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filterGender === 'female'
                  ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/30'
              }`}
            >
              معلمات (للنساء والأطفال)
            </button>
          </div>
        </div>

        {/* Tutors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {filteredTutors.map((tutor) => {
            const isPlaying = playingAudioId === tutor.id;
            return (
              <div
                key={tutor.id}
                className="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-3xl p-6 text-right space-y-4 backdrop-blur-md hover:bg-slate-900 transition-all duration-300 group shadow-xl"
              >
                {/* Header Image & Badge */}
                <div className="relative flex items-center justify-between">
                  <div className="relative">
                    {tutor.image ? (
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 border-2 border-amber-400 shadow-md flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <User className="w-8 h-8 opacity-90 stroke-[1.8]" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full border-2 border-slate-900">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-emerald-300 border border-emerald-900/50">
                    {tutor.badge}
                  </span>
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium mt-0.5">{tutor.title}</p>
                </div>

                {/* Ijazah Detail */}
                <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  {tutor.ijazah}
                </p>

                {/* Ratings & Hours Stats */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs py-2 bg-emerald-950/30 rounded-xl border border-emerald-900/30">
                  <div>
                    <span className="text-[10px] text-slate-400 block">التقييم</span>
                    <span className="font-bold text-amber-400 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {tutor.rating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">الساعات المنجزة</span>
                    <span className="font-bold text-emerald-300">+{tutor.hours} ساعة</span>
                  </div>
                </div>

                {/* Audio Recitation Player */}
                <button
                  onClick={() => toggleAudio(tutor)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isPlaying
                      ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'إيقاف التشغيل' : 'استمع لتلاوة المعلم'}</span>
                  </span>
                  <span className="text-[10px] opacity-80">{tutor.surahSample}</span>
                </button>

                {/* Session Booking Button */}
                <button
                  onClick={onOpenFreeSession}
                  className="w-full py-2.5 rounded-xl bg-emerald-950 border border-emerald-500/40 hover:bg-emerald-900 text-emerald-300 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>طلب جلسة تجريبية</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
