import React from 'react';
import { Hero } from './components/Hero';
import { VisualFeatures } from './components/VisualFeatures';
import { Features } from './components/Features';
import { ComparisonSection } from './components/ComparisonSection';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <VisualFeatures />
      <ComparisonSection />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}