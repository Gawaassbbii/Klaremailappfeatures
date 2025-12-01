import React from 'react';
import { motion } from 'motion/react';
import logo from 'figma:asset/78306b29058fa54be2e5709ba9b04f6ea4b3216b.png';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate('home')}
          whileHover={{ scale: 1.02 }}
        >
          <img src={logo} alt="KLAR" className="w-10 h-10" />
          <span className="text-[24px] tracking-tighter text-black">KLAR</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className="text-[14px] text-gray-700 hover:text-black transition-colors"
          >
            Accueil
          </button>
          <div className="relative group">
            <button className="text-[14px] text-gray-700 hover:text-black transition-colors">
              Produit
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[200px]">
              {['zen-mode', 'premium-shield', 'immersion-linguistique', 'detox-digitale', 'rewind'].map((page) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                >
                  {page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => onNavigate('a-propos')}
            className="text-[14px] text-gray-700 hover:text-black transition-colors"
          >
            À propos
          </button>
          <button 
            onClick={() => onNavigate('blog')}
            className="text-[14px] text-gray-700 hover:text-black transition-colors"
          >
            Blog
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-[14px] text-gray-700 hover:text-black transition-colors"
          >
            Contact
          </button>
        </div>

        {/* CTA */}
        <motion.button
          className="px-6 py-2 bg-black text-white rounded-full text-[14px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('inscription')}
        >
          Commencer
        </motion.button>
      </div>
    </nav>
  );
}