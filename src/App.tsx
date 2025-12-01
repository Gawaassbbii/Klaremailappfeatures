import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { VisualFeatures } from './components/VisualFeatures';
import { Features } from './components/Features';
import { ComparisonSection } from './components/ComparisonSection';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { APropos } from './pages/APropos';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Confidentialite } from './pages/Confidentialite';
import { Conditions } from './pages/Conditions';
import { Cookies } from './pages/Cookies';
import { ZenMode } from './pages/ZenMode';
import { PremiumShield } from './pages/PremiumShield';
import { ImmersionLinguistique } from './pages/ImmersionLinguistique';
import { DetoxDigitale } from './pages/DetoxDigitale';
import { Rewind } from './pages/Rewind';
import { Inscription } from './pages/Inscription';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <VisualFeatures />
            <ComparisonSection />
            <Features onNavigate={setCurrentPage} />
            <Pricing onNavigate={setCurrentPage} />
          </>
        );
      case 'a-propos':
        return <APropos />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'confidentialite':
        return <Confidentialite />;
      case 'conditions':
        return <Conditions />;
      case 'cookies':
        return <Cookies />;
      case 'zen-mode':
        return <ZenMode onNavigate={setCurrentPage} />;
      case 'premium-shield':
        return <PremiumShield onNavigate={setCurrentPage} />;
      case 'immersion-linguistique':
        return <ImmersionLinguistique onNavigate={setCurrentPage} />;
      case 'detox-digitale':
        return <DetoxDigitale onNavigate={setCurrentPage} />;
      case 'rewind':
        return <Rewind onNavigate={setCurrentPage} />;
      case 'inscription':
        return <Inscription />;
      default:
        return (
          <>
            <Hero />
            <VisualFeatures />
            <ComparisonSection />
            <Features />
            <Pricing />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}