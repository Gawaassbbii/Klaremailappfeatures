import React, { useState } from 'react';
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
import { Carrieres } from './pages/Carrieres';
import { Confidentialite } from './pages/Confidentialite';
import { Conditions } from './pages/Conditions';
import { Cookies } from './pages/Cookies';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <VisualFeatures />
            <ComparisonSection />
            <Features />
            <Pricing />
          </>
        );
      case 'a-propos':
        return <APropos />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'carrieres':
        return <Carrieres />;
      case 'confidentialite':
        return <Confidentialite />;
      case 'conditions':
        return <Conditions />;
      case 'cookies':
        return <Cookies />;
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