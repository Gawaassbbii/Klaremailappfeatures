import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  CreditCard,
  Zap,
  Globe,
  RotateCcw,
  Moon,
  Sun,
  Check,
  Mail,
  LogOut
} from 'lucide-react';
import logo from 'figma:asset/78306b29058fa54be2e5709ba9b04f6ea4b3216b.png';
import { useAppContext } from '../context/AppContext';

interface SettingsProps {
  onNavigate: (page: string) => void;
  userEmail?: string;
}

export function Settings({ onNavigate, userEmail = 'test@klar.app' }: SettingsProps) {
  const { settings, updateSettings, userEmail: contextUserEmail } = useAppContext();
  const [activeSection, setActiveSection] = useState('account');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [fullName, setFullName] = useState(settings.fullName);
  const [emailSignature, setEmailSignature] = useState(settings.emailSignature);

  const sections = [
    { id: 'account', label: 'Compte', icon: User },
    { id: 'features', label: 'Fonctionnalités', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'billing', label: 'Abonnement', icon: CreditCard }
  ];

  const handleLogout = () => {
    onNavigate('home');
  };

  const handleSaveAccount = () => {
    updateSettings({
      fullName,
      emailSignature
    });
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  // Getter de langue lisible
  const getLanguageName = (code: string) => {
    const langs: Record<string, string> = {
      en: 'Anglais',
      es: 'Espagnol',
      de: 'Allemand',
      it: 'Italien',
      nl: 'Néerlandais'
    };
    return langs[code] || code;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('mailbox')}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="KLAR" className="w-10 h-10" />
              <span className="text-[24px] tracking-tighter text-black">KLAR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('mailbox')}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-[14px]"
            >
              <Mail size={16} />
              Retour à la boîte
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <LogOut size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-300 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6 px-2">
              <div className="text-[12px] text-gray-500 mb-1">Connecté en tant que</div>
              <div className="text-[14px] truncate">{contextUserEmail}</div>
            </div>

            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === section.id
                      ? 'bg-white border border-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <section.icon size={20} />
                  <span className="flex-1 text-left">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto p-8">
            {/* Account Section */}
            {activeSection === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] mb-8">Informations du compte</h1>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Adresse email</label>
                    <input
                      type="text"
                      value={userEmail}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Signature email</label>
                    <textarea
                      value={emailSignature}
                      onChange={(e) => setEmailSignature(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <motion.button
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveAccount}
                  >
                    Enregistrer les modifications
                  </motion.button>

                  <AnimatePresence>
                    {showSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-full"
                      >
                        Modifications enregistrées
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Features Section */}
            {activeSection === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] mb-8">Fonctionnalités KLAR</h1>

                <div className="space-y-8">
                  {/* Zen Mode */}
                  <div className="p-6 border-2 border-gray-300 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Zap size={24} className="text-purple-600 mt-1" />
                        <div>
                          <h3 className="text-[20px] mb-1">
                            Zen Mode
                            {settings.accountType === 'essential' && (
                              <span className="ml-2 text-[12px] px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Limité</span>
                            )}
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Recevez vos emails par lots à heures fixes pour rester concentré
                          </p>
                          {settings.accountType === 'essential' && (
                            <p className="text-[12px] text-orange-600 mt-1">
                              ⏰ Heures fixes : 9h et 17h • Passez à PRO pour personnaliser
                            </p>
                          )}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.zenModeEnabled}
                          onChange={(e) => updateSettings({ zenModeEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                    
                    {settings.zenModeEnabled && settings.accountType === 'pro' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <label className="block text-[14px] text-gray-600 mb-2">
                            Heures de distribution
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="time"
                              value={settings.zenModeHours[0]}
                              onChange={(e) => updateSettings({ zenModeHours: [e.target.value, settings.zenModeHours[1]] })}
                              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                              type="time"
                              value={settings.zenModeHours[1]}
                              onChange={(e) => updateSettings({ zenModeHours: [settings.zenModeHours[0], e.target.value] })}
                              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {settings.zenModeEnabled && settings.accountType === 'essential' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <p className="text-[14px] text-gray-600 mb-2">Heures de distribution fixes :</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-center">09:00</div>
                            <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-center">17:00</div>
                          </div>
                          <p className="text-[12px] text-purple-600 mt-2">
                            💎 Passez à KLAR PRO pour personnaliser vos heures
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Premium Shield */}
                  <div className="p-6 border-2 border-gray-300 rounded-2xl relative">
                    {settings.accountType === 'essential' && (
                      <div className="absolute inset-0 bg-gray-50 bg-opacity-90 rounded-2xl flex items-center justify-center backdrop-blur-sm z-10">
                        <div className="text-center p-6">
                          <Shield size={48} className="text-gray-400 mx-auto mb-3" />
                          <h4 className="text-[18px] mb-2">Fonctionnalité PRO</h4>
                          <p className="text-[14px] text-gray-600 mb-4">
                            Le Smart Paywall est réservé aux membres KLAR PRO
                          </p>
                          <motion.button
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:opacity-90 transition-opacity"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate('pricing')}
                          >
                            Passer à PRO
                          </motion.button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Shield size={24} className="text-green-600 mt-1" />
                        <div>
                          <h3 className="text-[20px] mb-1">
                            Smart Paywall
                            {settings.accountType === 'essential' && (
                              <span className="ml-2 text-[12px] px-2 py-1 bg-purple-100 text-purple-600 rounded-full">PRO</span>
                            )}
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Fixez le prix que les inconnus doivent payer pour vous écrire (0,10€ à 100€)
                          </p>
                          <p className="text-[12px] text-green-600 mt-1">
                            💰 Vous touchez 1% de commission sur chaque email reçu
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.premiumShieldEnabled}
                          onChange={(e) => updateSettings({ premiumShieldEnabled: e.target.checked })}
                          disabled={settings.accountType === 'essential'}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black peer-disabled:opacity-50"></div>
                      </label>
                    </div>
                    
                    {settings.premiumShieldEnabled && settings.accountType === 'pro' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        <label className="block text-[14px] text-gray-600 mb-2">
                          Prix du timbre (€)
                        </label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0.10"
                            max="100"
                            step="0.10"
                            value={parseFloat(settings.shieldPrice)}
                            onChange={(e) => updateSettings({ shieldPrice: e.target.value })}
                            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600"
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-[12px] text-gray-500">0,10€</span>
                            <span className="text-[20px] text-green-600">{parseFloat(settings.shieldPrice).toFixed(2)}€</span>
                            <span className="text-[12px] text-gray-500">100€</span>
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl mt-3">
                          <p className="text-[12px] text-gray-600">Revenus estimés (30 emails/mois) :</p>
                          <p className="text-[18px] text-green-600">+{(parseFloat(settings.shieldPrice) * 30 * 0.01).toFixed(2)}€/mois</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Immersion Linguistique */}
                  <div className="p-6 border-2 border-gray-300 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Globe size={24} className="text-blue-600 mt-1" />
                        <div>
                          <h3 className="text-[20px] mb-1">
                            Immersion Linguistique
                            {settings.accountType === 'essential' && (
                              <span className="ml-2 text-[12px] px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Basique</span>
                            )}
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Traduisez automatiquement vos emails entrants
                          </p>
                          {settings.accountType === 'essential' && (
                            <p className="text-[12px] text-orange-600 mt-1">
                              🇳🇱 NL uniquement • Vocabulaire limité • Passez à PRO pour toutes les langues
                            </p>
                          )}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.immersionEnabled}
                          onChange={(e) => updateSettings({ immersionEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                    
                    {settings.immersionEnabled && settings.accountType === 'pro' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <label className="block text-[14px] text-gray-600 mb-2">
                          Langue cible
                        </label>
                        <select
                          value={settings.targetLanguage}
                          onChange={(e) => updateSettings({ targetLanguage: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="en">Anglais</option>
                          <option value="es">Espagnol</option>
                          <option value="de">Allemand</option>
                          <option value="it">Italien</option>
                          <option value="nl">Néerlandais</option>
                        </select>
                      </motion.div>
                    )}
                    
                    {settings.immersionEnabled && settings.accountType === 'essential' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <p className="text-[14px] text-gray-600 mb-2">Langue disponible :</p>
                          <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-center">
                            🇳🇱 Néerlandais uniquement
                          </div>
                          <p className="text-[12px] text-blue-600 mt-2">
                            💎 Passez à KLAR PRO pour accéder à toutes les langues
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Rewind */}
                  <div className="p-6 border-2 border-gray-300 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <RotateCcw size={24} className="text-orange-600 mt-1" />
                        <div>
                          <h3 className="text-[20px] mb-1">
                            Rewind
                            {settings.accountType === 'essential' && (
                              <span className="ml-2 text-[12px] px-2 py-1 bg-gray-200 text-gray-600 rounded-full">Limité</span>
                            )}
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Annulez l'envoi d'un email dans les secondes suivantes
                          </p>
                          {settings.accountType === 'essential' && (
                            <p className="text-[12px] text-orange-600 mt-1">
                              ⏱️ 10 secondes uniquement • Passez à PRO pour jusqu'à 60 secondes
                            </p>
                          )}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.rewindEnabled}
                          onChange={(e) => updateSettings({ rewindEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                    
                    {settings.rewindEnabled && settings.accountType === 'pro' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <label className="block text-[14px] text-gray-600 mb-2">
                          Délai d'annulation (secondes)
                        </label>
                        <select
                          value={settings.rewindDelay}
                          onChange={(e) => updateSettings({ rewindDelay: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="10">10 secondes</option>
                          <option value="30">30 secondes</option>
                          <option value="60">60 secondes</option>
                        </select>
                      </motion.div>
                    )}
                    
                    {settings.rewindEnabled && settings.accountType === 'essential' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <p className="text-[14px] text-gray-600 mb-2">Délai d'annulation fixe :</p>
                          <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-center">
                            10 secondes
                          </div>
                          <p className="text-[12px] text-orange-600 mt-2">
                            💎 Passez à KLAR PRO pour jusqu'à 60 secondes
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] mb-8">Notifications</h1>

                <div className="space-y-4">
                  <div className="p-6 border-2 border-gray-300 rounded-2xl flex items-center justify-between">
                    <div>
                      <h3 className="text-[18px] mb-1">Notifications email</h3>
                      <p className="text-[14px] text-gray-600">
                        Recevoir des résumés par email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => updateSettings({ notifications: { ...settings.notifications, email: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  <div className="p-6 border-2 border-gray-300 rounded-2xl flex items-center justify-between">
                    <div>
                      <h3 className="text-[18px] mb-1">Notifications push</h3>
                      <p className="text-[14px] text-gray-600">
                        Alertes instantanées sur votre appareil
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => updateSettings({ notifications: { ...settings.notifications, push: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  <div className="p-6 border-2 border-gray-300 rounded-2xl flex items-center justify-between">
                    <div>
                      <h3 className="text-[18px] mb-1">Sons de notification</h3>
                      <p className="text-[14px] text-gray-600">
                        Jouer un son lors de nouveaux emails
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.sound}
                        onChange={(e) => updateSettings({ notifications: { ...settings.notifications, sound: e.target.checked } })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] mb-8">Sécurité & Confidentialité</h1>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[18px] mb-4">Changer le mot de passe</h3>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Mot de passe actuel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <motion.button
                      className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Mettre à jour le mot de passe
                    </motion.button>
                  </div>

                  <div className="pt-6 border-t border-gray-300">
                    <h3 className="text-[18px] mb-4">Sessions actives</h3>
                    <div className="p-4 border border-gray-300 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[16px]">Cette session</p>
                        <p className="text-[14px] text-gray-600">Dernière activité : Maintenant</p>
                      </div>
                      <Check size={20} className="text-green-600" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-300">
                    <h3 className="text-[18px] mb-2 text-red-600">Zone de danger</h3>
                    <p className="text-[14px] text-gray-600 mb-4">
                      Actions irréversibles concernant votre compte
                    </p>
                    <motion.button
                      className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Supprimer mon compte
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Billing Section */}
            {activeSection === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-[32px] mb-8">Abonnement & Facturation</h1>

                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="bg-white rounded-2xl border border-gray-300 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-[20px] mb-1">Votre abonnement</h2>
                        <p className="text-[14px] text-gray-600">Gérez votre plan KLAR</p>
                      </div>
                      {settings.accountType === 'pro' ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full">
                          <Zap size={16} />
                          <span className="text-[14px]">KLAR PRO</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
                          <span className="text-[14px]">KLAR Essential</span>
                        </div>
                      )}
                    </div>

                    {settings.accountType === 'pro' ? (
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-[24px] mb-1">KLAR PRO</h3>
                            <p className="text-[16px] text-gray-600">Plan actuel</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[32px]">5€</p>
                            <p className="text-[14px] text-gray-600">/mois</p>
                          </div>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Adresse @klar.app personnalisée</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Stockage illimité</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Zen Mode illimité</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Smart Paywall (Premium Shield)</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Immersion Linguistique</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Rewind illimité</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Détox Digitale</span>
                          </li>
                        </ul>
                        <motion.button
                          className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Gérer mon abonnement
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-[24px] mb-1">KLAR Essential</h3>
                            <p className="text-[16px] text-gray-600">Plan actuel • Gratuit</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[32px]">0€</p>
                            <p className="text-[14px] text-gray-600">/mois</p>
                          </div>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Adresse @klar.app</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>5 Go de stockage</span>
                          </li>
                          <li className="flex items-center gap-2 text-[14px]">
                            <Check size={16} className="text-green-600" />
                            <span>Zen Mode limité</span>
                          </li>
                        </ul>
                        <motion.button
                          className="w-full px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onNavigate('pricing')}
                        >
                          Passer à KLAR PRO
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Premium Shield Revenue */}
                  {settings.premiumShieldEnabled && (
                    <div className="p-6 border-2 border-green-300 rounded-2xl bg-green-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield size={24} className="text-green-600" />
                        <h3 className="text-[20px]">Revenus Premium Shield</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-[12px] text-gray-600">Ce mois</p>
                          <p className="text-[24px]">2,40€</p>
                        </div>
                        <div>
                          <p className="text-[12px] text-gray-600">Total</p>
                          <p className="text-[24px]">18,70€</p>
                        </div>
                        <div>
                          <p className="text-[12px] text-gray-600">Timbres</p>
                          <p className="text-[24px]">24</p>
                        </div>
                      </div>
                      <motion.button
                        className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Retirer mes gains
                      </motion.button>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-[18px] mb-4">Moyen de paiement</h3>
                    <p className="text-[14px] text-gray-600 mb-4">
                      Aucune carte enregistrée
                    </p>
                    <motion.button
                      className="px-6 py-3 border border-black text-black rounded-full hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ajouter une carte
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}