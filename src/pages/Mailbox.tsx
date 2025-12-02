import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Clock, 
  Send,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronLeft,
  Shield,
  Globe,
  RotateCcw,
  Zap,
  AlertTriangle,
  Pin
} from 'lucide-react';
import logo from 'figma:asset/78306b29058fa54be2e5709ba9b04f6ea4b3216b.png';
import { useAppContext } from '../context/AppContext';

interface MailboxProps {
  onNavigate: (page: string) => void;
  userEmail?: string;
}

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  daysInInbox: number; // Nombre de jours depuis réception
  isRead: boolean;
  isStarred: boolean;
  hasShield: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isSent: boolean;
}

const mockEmails: Email[] = [
  {
    id: 1,
    from: 'Marie Dubois',
    subject: 'Réunion de demain',
    preview: 'Bonjour, je voulais confirmer notre réunion de demain à 14h. Pouvez-vous apporter les documents dont nous avons parlé ?',
    time: '09:00',
    daysInInbox: 0,
    isRead: false,
    isStarred: true,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 2,
    from: 'Thomas Laurent',
    subject: 'Proposition de projet',
    preview: 'Suite à notre conversation, voici la proposition détaillée pour le nouveau projet. J\'attends vos retours.',
    time: '08:30',
    daysInInbox: 0,
    isRead: false,
    isStarred: false,
    hasShield: true,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 3,
    from: 'Newsletter KLAR',
    subject: 'Nouvelles fonctionnalités disponibles',
    preview: 'Découvrez les dernières mises à jour de KLAR : Zen Mode amélioré, nouvelles langues pour Immersion Linguistique...',
    time: 'Hier',
    daysInInbox: 1,
    isRead: true,
    isStarred: false,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 4,
    from: 'Sophie Martin',
    subject: 'Feedback sur la présentation',
    preview: 'Excellente présentation aujourd\'hui ! Quelques suggestions pour la prochaine fois...',
    time: 'Hier',
    daysInInbox: 1,
    isRead: true,
    isStarred: true,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 5,
    from: 'Jean Dupont',
    subject: 'Budget Q4 2025',
    preview: 'Voici le récapitulatif du budget pour le dernier trimestre. Merci de valider avant vendredi.',
    time: '2 jours',
    daysInInbox: 2,
    isRead: true,
    isStarred: false,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 6,
    from: 'Ancien Client',
    subject: 'Opportunité de collaboration',
    preview: 'Cela fait un moment ! J\'ai une proposition intéressante à vous soumettre concernant un nouveau projet.',
    time: '25 jours',
    daysInInbox: 25,
    isRead: false,
    isStarred: false,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  },
  {
    id: 7,
    from: 'Service RH',
    subject: 'Documents administratifs',
    preview: 'Merci de compléter les documents ci-joints pour finaliser votre dossier.',
    time: '27 jours',
    daysInInbox: 27,
    isRead: false,
    isStarred: false,
    hasShield: false,
    isArchived: false,
    isDeleted: false,
    isSent: false
  }
];

export function Mailbox({ onNavigate, userEmail = 'test@klar.app' }: MailboxProps) {
  const { settings, updateSettings, userEmail: contextUserEmail } = useAppContext();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeView, setActiveView] = useState<'inbox' | 'starred' | 'sent' | 'archived' | 'trash'>('inbox');

  const toggleStar = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const markAsRead = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isRead: true } : email
    ));
  };

  const archiveEmail = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isArchived: true } : email
    ));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const moveToTrash = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isDeleted: true } : email
    ));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const deleteEmail = (id: number) => {
    setEmails(emails.filter(email => email.id !== id));
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const restoreEmail = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isDeleted: false, isArchived: false } : email
    ));
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    markAsRead(email.id);
  };

  const handleLogout = () => {
    onNavigate('home');
  };

  // Filtrer les emails en fonction de la vue active
  const filteredEmails = emails.filter(email => {
    if (activeView === 'inbox') {
      return !email.isArchived && !email.isDeleted && !email.isSent;
    } else if (activeView === 'starred') {
      return email.isStarred && !email.isDeleted;
    } else if (activeView === 'sent') {
      return email.isSent && !email.isDeleted;
    } else if (activeView === 'archived') {
      return email.isArchived && !email.isDeleted;
    } else if (activeView === 'trash') {
      return email.isDeleted;
    }
    return false;
  });

  // Filtrer par recherche
  const searchFilteredEmails = searchQuery.trim() === '' 
    ? filteredEmails 
    : filteredEmails.filter(email => {
        const query = searchQuery.toLowerCase();
        return (
          email.from.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query)
        );
      });

  const unreadCount = emails.filter(e => !e.isRead && !e.isArchived && !e.isDeleted && !e.isSent).length;
  const starredCount = emails.filter(e => e.isStarred && !e.isDeleted).length;
  const archivedCount = emails.filter(e => e.isArchived && !e.isDeleted).length;
  const trashCount = emails.filter(e => e.isDeleted).length;

  // Titres des vues
  const viewTitles = {
    inbox: 'Boîte de réception',
    starred: 'Favoris',
    sent: 'Envoyés',
    archived: 'Archives',
    trash: 'Corbeille'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="KLAR" className="w-10 h-10" />
            <span className="text-[24px] tracking-tighter text-black">KLAR</span>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher dans vos emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-[14px]"
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {/* Zen Mode Toggle */}
            <motion.button
              onClick={() => updateSettings({ zenModeActive: !settings.zenModeActive })}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                settings.zenModeActive 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={16} />
              <span className="text-[14px]">Zen Mode</span>
            </motion.button>

            <button 
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              onClick={() => onNavigate('settings')}
            >
              <Settings size={20} className="text-gray-700" />
            </button>

            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <LogOut size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Zen Mode Banner */}
        <AnimatePresence>
          {settings.zenModeActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-black text-white px-6 py-3 text-center text-[14px]"
            >
              <div className="flex items-center justify-center gap-2">
                <Zap size={16} />
                <span>Zen Mode activé • Prochaine distribution à 17h00</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-300 bg-gray-50 overflow-y-auto hidden md:block">
          <div className="p-4 space-y-2">
            <div className="mb-6 px-2">
              <div className="text-[12px] text-gray-500 mb-1">Connecté en tant que</div>
              <div className="text-[14px] truncate mb-2">{contextUserEmail}</div>
              {settings.accountType === 'pro' ? (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-[11px]">
                  <Zap size={12} />
                  <span>KLAR PRO</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-[11px]">
                  <span>KLAR Essential</span>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveView('inbox')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeView === 'inbox' 
                  ? 'bg-white border border-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Mail size={20} />
              <span className="flex-1 text-left">Boîte de réception</span>
              {unreadCount > 0 && (
                <span className="bg-black text-white text-[12px] px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveView('starred')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeView === 'starred' 
                  ? 'bg-white border border-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Star size={20} />
              <span className="flex-1 text-left">Favoris</span>
              {starredCount > 0 && (
                <span className="bg-black text-white text-[12px] px-2 py-1 rounded-full">
                  {starredCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveView('sent')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeView === 'sent' 
                  ? 'bg-white border border-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Send size={20} />
              <span className="flex-1 text-left">Envoyés</span>
            </button>

            <button 
              onClick={() => setActiveView('archived')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeView === 'archived' 
                  ? 'bg-white border border-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Archive size={20} />
              <span className="flex-1 text-left">Archives</span>
              {archivedCount > 0 && (
                <span className="bg-black text-white text-[12px] px-2 py-1 rounded-full">
                  {archivedCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveView('trash')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeView === 'trash' 
                  ? 'bg-white border border-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Trash2 size={20} />
              <span className="flex-1 text-left">Corbeille</span>
              {trashCount > 0 && (
                <span className="bg-black text-white text-[12px] px-2 py-1 rounded-full">
                  {trashCount}
                </span>
              )}
            </button>

            {/* Features */}
            <div className="pt-6 mt-6 border-t border-gray-300">
              <div className="text-[12px] text-gray-500 mb-3 px-2">FONCTIONNALITÉS</div>
              
              <motion.button 
                onClick={() => {
                  updateSettings({ premiumShieldEnabled: !settings.premiumShieldEnabled });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield size={18} className={settings.premiumShieldEnabled ? 'text-green-600' : ''} />
                <span className="flex-1 text-left text-[14px]">Premium Shield</span>
                {settings.premiumShieldEnabled && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Activé" />
                )}
              </motion.button>

              <motion.button 
                onClick={() => {
                  updateSettings({ immersionEnabled: !settings.immersionEnabled });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe size={18} className={settings.immersionEnabled ? 'text-blue-600' : ''} />
                <span className="flex-1 text-left text-[14px]">Immersion</span>
                {settings.immersionEnabled && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" title="Activé" />
                )}
              </motion.button>

              <motion.button 
                onClick={() => {
                  updateSettings({ rewindEnabled : !settings.rewindEnabled });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={18} className={settings.rewindEnabled ? 'text-orange-600' : ''} />
                <span className="flex-1 text-left text-[14px]">Rewind</span>
                {settings.rewindEnabled && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" title="Activé" />
                )}
              </motion.button>
            </div>
          </div>
        </aside>

        {/* Email List */}
        <div className={`${selectedEmail ? 'hidden lg:block' : 'flex-1'} lg:w-96 border-r border-gray-300 bg-white overflow-y-auto`}>
          <div className="p-4 border-b border-gray-300 flex items-center justify-between">
            <h2 className="text-[18px]">{viewTitles[activeView]}</h2>
            <span className="text-[14px] text-gray-500">
              {searchQuery.trim() !== '' && `${searchFilteredEmails.length} résultat${searchFilteredEmails.length > 1 ? 's' : ''} • `}
              {filteredEmails.length} message{filteredEmails.length > 1 ? 's' : ''}
            </span>
          </div>

          {searchQuery.trim() !== '' && searchFilteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-[16px]">Aucun résultat pour "{searchQuery}"</p>
              <p className="text-[14px] mt-2">Essayez une autre recherche</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {searchFilteredEmails.map((email) => {
                const daysRemaining = 30 - email.daysInInbox;
                const isExpiringSoon = daysRemaining <= 7 && !email.isStarred;
                
                return (
                <motion.div
                  key={email.id}
                  className={`p-4 cursor-pointer transition-colors relative ${
                    selectedEmail?.id === email.id 
                      ? 'bg-gray-100 border-l-4 border-l-black' 
                      : 'hover:bg-gray-50'
                  } ${!email.isRead ? 'bg-blue-50/50' : ''}`}
                  onClick={() => handleEmailClick(email)}
                  whileHover={{ x: 4 }}
                  initial={{ opacity: email.isRead ? 1 : 0.95 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-start gap-3">
                    {/* Indicateur non lu */}
                    {!email.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {email.hasShield && (
                          <Shield size={14} className="text-blue-600 flex-shrink-0" />
                        )}
                        <span className={`text-[14px] truncate ${!email.isRead ? 'font-bold' : ''}`}>
                          {email.from}
                        </span>
                        <span className="text-[12px] text-gray-500 ml-auto flex-shrink-0">
                          {email.time}
                        </span>
                      </div>
                      <div className={`text-[14px] mb-1 truncate ${!email.isRead ? 'font-bold' : 'text-gray-700'}`}>
                        {email.subject}
                      </div>
                      <div className="text-[13px] text-gray-500 truncate">
                        {email.preview}
                      </div>
                      
                      {/* Alerte expiration */}
                      {isExpiringSoon && (
                        <motion.div 
                          className="flex items-center gap-2 mt-2"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-[11px]">
                            <AlertTriangle size={12} />
                            <span className="font-medium">{daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="flex-shrink-0 p-1 hover:bg-gray-200 rounded"
                      title={email.isStarred ? "Retirer des favoris" : "Sauvegarder (ne sera pas supprimé)"}
                    >
                      <Star 
                        size={16} 
                        className={email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                      />
                    </button>
                  </div>
                </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Detail */}
        <div className={`${selectedEmail ? 'flex-1' : 'hidden lg:flex lg:flex-1'} bg-white overflow-y-auto`}>
          {selectedEmail ? (
            <div className="flex flex-col h-full">
              {/* Alerte Détox Digitale */}
              {selectedEmail && (() => {
                const daysRemaining = 30 - selectedEmail.daysInInbox;
                const isExpiringSoon = daysRemaining <= 7 && !selectedEmail.isStarred;
                
                if (isExpiringSoon) {
                  return (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-200 px-6 py-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle size={20} className="text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-[16px] text-red-900 mb-1">
                              ⚠️ Suppression automatique dans {daysRemaining} jour{daysRemaining > 1 ? 's' : ''}
                            </h3>
                            <p className="text-[13px] text-red-700">
                              Avec la Détox Digitale, cet email sera supprimé définitivement. Sauvegardez-le pour le conserver.
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => toggleStar(selectedEmail.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Star size={16} />
                          <span className="text-[14px]">Sauvegarder</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })()}
              
              {/* Email header */}
              <div className="p-6 border-b border-gray-300">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="lg:hidden mb-4 flex items-center gap-2 text-gray-600 hover:text-black"
                >
                  <ChevronLeft size={20} />
                  Retour
                </button>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-[20px] mb-2">{selectedEmail.subject}</h1>
                    <div className="flex items-center gap-2 text-[14px] text-gray-600">
                      {selectedEmail.hasShield && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-[12px]">
                          <Shield size={12} />
                          <span>Premium Shield</span>
                        </div>
                      )}
                      <span>{selectedEmail.from}</span>
                      <span>•</span>
                      <span>{selectedEmail.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStar(selectedEmail.id)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      title={selectedEmail.isStarred ? "Message sauvegardé" : "Sauvegarder ce message"}
                    >
                      <Star 
                        size={20} 
                        className={selectedEmail.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                      />
                    </button>
                    
                    {activeView === 'trash' ? (
                      <button 
                        onClick={() => restoreEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Restaurer"
                      >
                        <RotateCcw size={20} className="text-gray-600" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => archiveEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Archiver"
                      >
                        <Archive size={20} className="text-gray-600" />
                      </button>
                    )}
                    
                    {activeView === 'trash' ? (
                      <button 
                        onClick={() => deleteEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Supprimer définitivement"
                      >
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => moveToTrash(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Mettre à la corbeille"
                      >
                        <Trash2 size={20} className="text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Email content */}
              <div className="flex-1 p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEmail.preview}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Cordialement,<br />
                    {selectedEmail.from}
                  </p>
                </div>
              </div>

              {/* Reply section */}
              <div className="p-6 border-t border-gray-300">
                <motion.button
                  className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  Répondre
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Mail size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-[16px]">Sélectionnez un email pour le lire</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}