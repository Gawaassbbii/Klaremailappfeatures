import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface ConnexionProps {
  onNavigate: (page: string) => void;
}

// Liste des comptes de test
const testAccounts = [
  { email: 'test@klar.com', password: 'cipkanamida123', type: 'pro' as const },
  { email: 'testfree@klar.com', password: 'cipkanamida', type: 'essential' as const }
];

export function Connexion({ onNavigate }: ConnexionProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { setUserEmail } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation basique
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!email.includes('@')) {
      setError('Adresse email invalide');
      return;
    }

    // Vérification des credentials de test
    const account = testAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      // Connexion réussie - changer le compte actif
      setUserEmail(account.email);
      onNavigate('mailbox');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4">Connexion</h1>
          <p className="text-gray-600">
            Accédez à votre compte KLAR
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          className="bg-white border border-gray-300 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Mot de passe oublié */}
            <div className="text-right">
              <button
                type="button"
                className="text-[14px] text-gray-600 hover:text-black transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Message d'erreur */}
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-[14px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Bouton de connexion */}
            <motion.button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Se connecter
              <ArrowRight size={20} />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-[14px]">
              <span className="bg-white px-4 text-gray-500">ou</span>
            </div>
          </div>

          {/* Lien vers inscription */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore de compte ?
            </p>
            <motion.button
              onClick={() => onNavigate('inscription')}
              className="w-full border border-black text-black py-4 rounded-full hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Créer un compte
            </motion.button>
          </div>
        </motion.div>

        {/* Note de sécurité */}
        <motion.div
          className="mt-8 text-center text-[14px] text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            Connexion sécurisée • Vos données sont protégées
          </p>
        </motion.div>
      </div>
    </div>
  );
}