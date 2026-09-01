import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Features from './components/Features';
import TutorsShowcase from './components/TutorsShowcase';
import PricingPlans from './components/PricingPlans';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import CallToActionBanner from './components/CallToActionBanner';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';
import FreeSessionModal from './components/FreeSessionModal';
import TutorsLandingPage from './components/TutorsLandingPage';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [freeSessionModalOpen, setFreeSessionModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === '/tutors' ? 'tutors' : 'students';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(window.location.pathname === '/tutors' ? 'tutors' : 'students');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    const newPath = view === 'tutors' ? '/tutors' : '/';
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'tutors') {
    return <TutorsLandingPage onNavigateToStudents={() => navigateTo('students')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-arabic selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar 
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        onNavigateToTutors={() => navigateTo('tutors')}
      />

      <main>
        {/* Hero Banner with Phone Mockup */}
        <Hero 
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
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
        />

        {/* Pricing Tiers & Subscriptions */}
        <PricingPlans 
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        />

        {/* Real User Reviews & Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* High-Converting Bottom Banner */}
        <CallToActionBanner 
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenFreeSession={() => setFreeSessionModalOpen(true)}
        />
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
      />

    </div>
  );
}
