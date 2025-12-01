import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Mail, User, Lock, CreditCard } from 'lucide-react';

export function Inscription() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<'essential' | 'pro'>('essential');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulation de création de compte
      alert(`Compte créé avec succès !\nVotre adresse : ${formData.username}@klar.app\nPlan : KLAR ${selectedPlan === 'pro' ? 'PRO' : 'Essential'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  step >= num
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: num * 0.1 }}
              >
                {step > num ? <Check size={20} /> : num}
              </motion.div>
              {num < 3 && (
                <div
                  className={`w-16 h-1 ${
                    step > num ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Titles */}
        <motion.div
          className="text-center mb-12"
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[56px] mb-4">
            {step === 1 && 'Choisissez votre plan'}
            {step === 2 && 'Créez votre identité'}
            {step === 3 && 'Sécurisez votre compte'}
          </h1>
          <p className="text-[18px] text-gray-600">
            {step === 1 && 'Commencez gratuitement, évoluez quand vous voulez'}
            {step === 2 && 'Votre adresse @klar.app unique'}
            {step === 3 && 'Dernière étape avant la clarté'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div
                className={`border-2 rounded-2xl p-8 cursor-pointer transition-all ${
                  selectedPlan === 'essential'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedPlan('essential')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[32px] mb-2">KLAR Essential</h3>
                    <p className="text-[24px]">Gratuit</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'essential'
                        ? 'border-black bg-black'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPlan === 'essential' && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Zen Mode (2 livraisons/jour)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Détox Digitale (auto-delete 30j)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Interface minimaliste
                  </li>
                </ul>
              </div>

              <div
                className={`border-2 rounded-2xl p-8 cursor-pointer transition-all relative overflow-hidden ${
                  selectedPlan === 'pro'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-[12px]">
                  POPULAIRE
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[32px] mb-2">KLAR PRO</h3>
                    <p className="text-[24px]">5€ / mois</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'pro'
                        ? 'border-black bg-black'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPlan === 'pro' && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Tout KLAR Essential
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Premium Shield activé
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Immersion Linguistique (NL + DE)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Rewind (modification post-envoi)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    Support prioritaire
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Step 2: Identity */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-[14px] mb-2 text-gray-600">
                  <User size={16} className="inline mr-2" />
                  Prénom
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="Jean"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] mb-2 text-gray-600">
                  <User size={16} className="inline mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="Dupont"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] mb-2 text-gray-600">
                  <Mail size={16} className="inline mr-2" />
                  Votre adresse KLAR
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '')
                      })
                    }
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors"
                    placeholder="votre_nom"
                    pattern="[a-z0-9._-]+"
                    required
                  />
                  <span className="text-[18px] text-gray-600">@klar.app</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-2">
                  Lettres minuscules, chiffres, points, tirets et underscores uniquement
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Security */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-[14px] mb-2 text-gray-600">
                  <Lock size={16} className="inline mr-2" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
                <p className="text-[12px] text-gray-500 mt-2">
                  Minimum 8 caractères
                </p>
              </div>

              <div>
                <label className="block text-[14px] mb-2 text-gray-600">
                  <Lock size={16} className="inline mr-2" />
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {selectedPlan === 'pro' && (
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
                  <h4 className="text-[18px] mb-4 flex items-center gap-2">
                    <CreditCard size={20} />
                    Informations de paiement
                  </h4>
                  <p className="text-[14px] text-gray-600 mb-4">
                    Vous serez redirigé vers notre page de paiement sécurisée après la création de votre compte.
                  </p>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 text-[12px] text-gray-500">
                    💳 Premier mois offert · Annulation à tout moment · Paiement sécurisé
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
                <h4 className="text-[18px] mb-2">Récapitulatif</h4>
                <div className="space-y-2 text-[14px]">
                  <p>
                    <span className="text-gray-600">Nom complet :</span>{' '}
                    <strong>{formData.firstName} {formData.lastName}</strong>
                  </p>
                  <p>
                    <span className="text-gray-600">Adresse email :</span>{' '}
                    <strong>{formData.username}@klar.app</strong>
                  </p>
                  <p>
                    <span className="text-gray-600">Plan :</span>{' '}
                    <strong>KLAR {selectedPlan === 'pro' ? 'PRO (5€/mois)' : 'Essential (Gratuit)'}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-8 py-4 border-2 border-gray-300 rounded-full hover:border-black transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Retour
              </motion.button>
            )}
            <motion.button
              type="submit"
              className="flex-1 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {step === 3 ? 'Créer mon compte' : 'Continuer'}
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center text-[12px] text-gray-500">
          <p>
            🔒 Connexion sécurisée · 🇪🇺 Données hébergées en Europe · 🚫 Aucune publicité
          </p>
        </div>
      </div>
    </div>
  );
}
