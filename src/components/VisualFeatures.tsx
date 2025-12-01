import React from 'react';
import { motion } from 'motion/react';
import { Clock, Shield, Brain, Trash2, RotateCcw, ArrowRight, Ban, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const visualFeatures = [
  {
    icon: Clock,
    title: 'Zen Mode',
    tagline: '2x par jour seulement',
    visual: 'focus',
    color: '#0066FF',
    stats: { before: '47 notifications/jour', after: '2 livraisons/jour' }
  },
  {
    icon: Shield,
    title: 'Premium Shield',
    tagline: 'Timbre payant = 0 spam',
    visual: 'shield',
    color: '#00CC88',
    stats: { before: '23 spams/jour', after: '0 spam' }
  },
  {
    icon: Brain,
    title: 'Immersion Linguistique',
    tagline: 'Apprenez en lisant',
    visual: 'learn',
    color: '#FF6B00',
    stats: { before: 'Interface FR', after: 'FR + NL + DE' }
  }
];

export function VisualFeatures() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[64px] leading-none tracking-tight mb-4 text-black">
            Simple. Visuel. Efficace.
          </h2>
          <p className="text-[24px] text-gray-700">
            Comprenez en un coup d'œil ce qui change votre vie
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visualFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="border-2 border-gray-300 rounded-3xl overflow-hidden bg-white hover:shadow-2xl transition-shadow hover:border-gray-400">
                {/* Visual Section */}
                <div className="relative h-64 flex items-center justify-center p-8" style={{ backgroundColor: `${feature.color}15` }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon size={80} strokeWidth={1.5} style={{ color: feature.color }} />
                  </motion.div>

                  {/* Floating stats */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-[10px] border border-gray-300 shadow-lg text-gray-700"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Ban size={10} className="inline mr-1 text-red-500" />
                    {feature.stats.before}
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 right-4 text-white rounded-full px-3 py-1 text-[10px] shadow-lg"
                    style={{ backgroundColor: feature.color }}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <CheckCircle2 size={10} className="inline mr-1" />
                    {feature.stats.after}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-[32px] leading-none tracking-tight mb-2 text-black">
                    {feature.title}
                  </h3>
                  <p className="text-[16px] text-gray-600 mb-4">
                    {feature.tagline}
                  </p>
                  <motion.button
                    className="flex items-center gap-2 text-[14px] group"
                    style={{ color: feature.color }}
                    whileHover={{ x: 5 }}
                  >
                    Découvrir
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}