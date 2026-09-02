import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import TutorsShowcase from './components/TutorsShowcase';
import PricingPlans from './components/PricingPlans';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';
import FreeSessionModal from './components/FreeSessionModal';
import TutorsLandingPage from './components/TutorsLandingPage';
import StudentApp from './components/StudentApp';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [freeSessionModalOpen, setFreeSessionModalOpen] = useState(false);
  
  // Pending Vodafone Cash / InstaPay Requests State
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'req_101',
      studentName: 'أحمد محمود',
      telegramId: '@ahmed_m',
      phone: '+20 101 988 7766',
      planName: 'باقة الشهر الكامل (8 جلسات)',
      amount: '350 EGP',
      txId: 'VOD-884920',
      status: 'pending'
    },
    {
      id: 'req_102',
      studentName: 'مريم السيد',
      telegramId: '@maryam_quran',
      phone: '+20 112 334 5566',
      planName: 'باقة الشهرين (16 جلسة)',
      amount: '650 EGP',
      txId: 'INSTA-99214',
      status: 'active'
    }
  ]);

  // Tutor Applications State
  const [tutorApplications, setTutorApplications] = useState([
    {
      id: 'tut_app_1',
      name: 'الشيخ د. مصطفى البكري',
      phone: '+20 100 445 6677',
      experienceYears: '7',
      ijazahDetails: 'إجازة بحفص وعاصم بالسند المتصل من الشاطبية',
      certFile: 'ijazah_cert_bakri.pdf',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'tut_app_2',
      name: 'الشيخة عائشة النجار',
      phone: '+966 50 123 4567',
      experienceYears: '10',
      ijazahDetails: 'إجازة بالقراءات السبع من مكة المكرمة',
      certFile: 'ijazah_aysha.jpg',
      status: 'approved',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
    }
  ]);

  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/tutors' || hash === '#/tutors') return 'tutors';
    if (path === '/app' || hash === '#/app') return 'app';
    if (path === '/admin' || hash === '#/admin') return 'admin';
    return 'students';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/tutors' || hash === '#/tutors') setCurrentView('tutors');
      else if (path === '/app' || hash === '#/app') setCurrentView('app');
      else if (path === '/admin' || hash === '#/admin') setCurrentView('admin');
      else setCurrentView('students');
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    const newHash = view === 'tutors' ? '#/tutors' : view === 'app' ? '#/app' : view === 'admin' ? '#/admin' : '#/';
    window.history.pushState({}, '', newHash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApproveRequest = (id) => {
    setPendingRequests(pendingRequests.map(r => r.id === id ? { ...r, status: 'active' } : r));
  };

  const handleRejectRequest = (id) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== id));
  };

  const handleApproveTutorApplication = (id) => {
    setTutorApplications(tutorApplications.map(t => t.id === id ? { ...t, status: 'approved' } : t));
  };

  const handleRejectTutorApplication = (id) => {
    setTutorApplications(tutorApplications.filter(t => t.id !== id));
  };

  const handleAddManualTutor = (newTutorData) => {
    const createdTutor = {
      id: `tut_app_${Date.now()}`,
      ...newTutorData,
      experienceYears: '5',
      ijazahDetails: newTutorData.ijazah,
      certFile: null,
      status: 'approved'
    };
    setTutorApplications([createdTutor, ...tutorApplications]);
  };

  if (currentView === 'tutors') {
    return <TutorsLandingPage onNavigateToStudents={() => navigateTo('students')} />;
  }

  if (currentView === 'app') {
    return (
      <StudentApp 
        onNavigateToLanding={() => navigateTo('students')} 
        onNavigateToAdmin={() => navigateTo('admin')}
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onNavigateToLanding={() => navigateTo('students')}
        pendingRequests={pendingRequests}
        onApproveRequest={handleApproveRequest}
        onRejectRequest={handleRejectRequest}
        tutorApplications={tutorApplications}
        onApproveTutorApplication={handleApproveTutorApplication}
        onRejectTutorApplication={handleRejectTutorApplication}
        onAddManualTutor={handleAddManualTutor}
      />
    );
  }

  return (
    <div className="min-h-screen bg-rosewood-950 text-slate-100 font-arabic selection:bg-peach-200 selection:text-rosewood-950">
      
      {/* Navigation Bar */}
      <Navbar 
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        onNavigateToTutors={() => navigateTo('tutors')}
        onNavigateToApp={() => navigateTo('app')}
        onNavigateToAdmin={() => navigateTo('admin')}
      />

      <main>
        {/* Hero Banner with Phone Mockup */}
        <Hero 
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
          onNavigateToApp={() => navigateTo('app')}
        />

        {/* Floating Achievements Bar */}
        <StatsBar />

        {/* Features & Advantages */}
        <Features 
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        {/* Tutors & Teachers Showcase */}
        <TutorsShowcase 
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
          onNavigateToApp={() => navigateTo('app')}
        />

        {/* Pricing Tiers & Subscriptions */}
        <PricingPlans 
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        />

        {/* Real User Reviews & Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        onNavigateToTutors={() => navigateTo('tutors')}
      />

      {/* Modals */}
      <DownloadModal 
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <FreeSessionModal 
        isOpen={freeSessionModalOpen}
        onClose={() => setFreeSessionModalOpen(false)}
        onNavigateToTutors={() => navigateTo('tutors')}
        onNavigateToApp={() => navigateTo('app')}
      />

    </div>
  );
}
