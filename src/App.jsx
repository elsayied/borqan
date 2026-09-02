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
import ParentsPortal from './components/ParentsPortal';
import AdminDashboard from './components/AdminDashboard';
import UserRegistrationModal from './components/UserRegistrationModal';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [freeSessionModalOpen, setFreeSessionModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('borqan_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null; // Null means unauthenticated
  });

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
    }
  ]);

  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/tutors' || hash === '#/tutors') return 'tutors';
    if (path === '/app' || hash === '#/app') return 'app';
    if (path === '/parents' || hash === '#/parents') return 'parents';
    if (path === '/admin' || hash === '#/admin') return 'admin';
    return 'students';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/tutors' || hash === '#/tutors') setCurrentView('tutors');
      else if (path === '/app' || hash === '#/app') setCurrentView('app');
      else if (path === '/parents' || hash === '#/parents') setCurrentView('parents');
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
    // ACCESS CONTROL RULE: Only students (طالب / طالبة) can open /app!
    if (view === 'app' && currentUser && (currentUser.role === 'وليّ أمر' || currentUser.role === 'وليّة أمر')) {
      alert('بوابة الطلاب مخصصة للطلاب الجلسات المباشرة. تم توجيهك لبوابة أولياء الأمور المخصصة لولايتك.');
      setCurrentView('parents');
      window.history.pushState({}, '', '#/parents');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    const newHash = view === 'tutors' ? '#/tutors' : view === 'app' ? '#/app' : view === 'parents' ? '#/parents' : view === 'admin' ? '#/admin' : '#/';
    window.history.pushState({}, '', newHash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('borqan_current_user', JSON.stringify(userData));
    setRegistrationModalOpen(false);

    // Auto-redirect based on Account Role!
    if (userData.role === 'وليّ أمر' || userData.role === 'وليّة أمر') {
      navigateTo('parents');
    } else {
      navigateTo('app');
    }
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
        currentUser={currentUser}
      />
    );
  }

  if (currentView === 'parents') {
    return (
      <ParentsPortal 
        onNavigateToLanding={() => navigateTo('students')}
        onNavigateToApp={() => navigateTo('app')}
        currentUser={currentUser}
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
        onOpenRegister={() => setRegistrationModalOpen(true)}
        onNavigateToTutors={() => navigateTo('tutors')}
        onNavigateToApp={() => navigateTo('app')}
        onNavigateToParents={() => navigateTo('parents')}
        onNavigateToAdmin={() => navigateTo('admin')}
        currentUser={currentUser}
      />

      <main>
        {/* Hero Banner with Phone Mockup */}
        <Hero 
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
          onOpenRegister={() => setRegistrationModalOpen(true)}
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

      <UserRegistrationModal 
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        onRegister={handleRegisterUser}
      />

    </div>
  );
}
