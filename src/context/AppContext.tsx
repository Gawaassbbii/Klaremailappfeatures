import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserSettings {
  fullName: string;
  emailSignature: string;
  accountType: 'essential' | 'pro'; // Type de compte
  zenModeEnabled: boolean;
  zenModeActive: boolean; // État actif dans la mailbox
  zenModeHours: [string, string];
  premiumShieldEnabled: boolean;
  shieldPrice: string;
  immersionEnabled: boolean;
  targetLanguage: string;
  rewindEnabled: boolean;
  rewindDelay: string;
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
}

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Paramètres par défaut pour les nouveaux comptes
const getDefaultSettings = (accountType: 'essential' | 'pro'): UserSettings => ({
  fullName: '',
  emailSignature: '',
  accountType: accountType,
  zenModeEnabled: false,
  zenModeActive: false,
  zenModeHours: ['09:00', '17:00'], // Heures fixes pour Essential
  premiumShieldEnabled: false, // Désactivé pour Essential
  shieldPrice: '0.10',
  immersionEnabled: false,
  targetLanguage: 'nl', // NL uniquement pour Essential
  rewindEnabled: false,
  rewindDelay: accountType === 'pro' ? '30' : '10', // 10 secondes max pour Essential
  notifications: {
    email: true,
    push: false,
    sound: true
  }
});

// Configuration des comptes par défaut
const accountsConfig: { [email: string]: 'essential' | 'pro' } = {
  'test@klar.com': 'pro',
  'testfree@klar.com': 'essential'
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string>('test@klar.com');
  
  // Charger les settings depuis localStorage en fonction du compte
  const loadSettings = (email: string): UserSettings => {
    const saved = localStorage.getItem(`klar_settings_${email}`);
    if (saved) {
      return JSON.parse(saved);
    }
    // Retourner les settings par défaut selon le type de compte
    const accountType = accountsConfig[email] || 'essential';
    return getDefaultSettings(accountType);
  };

  const [settings, setSettings] = useState<UserSettings>(() => loadSettings(userEmail));

  // Sauvegarder dans localStorage quand les settings changent
  useEffect(() => {
    localStorage.setItem(`klar_settings_${userEmail}`, JSON.stringify(settings));
  }, [settings, userEmail]);

  // Changer de compte et charger ses settings
  const setUserEmail = (email: string) => {
    setUserEmailState(email);
    setSettings(loadSettings(email));
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider value={{ settings, updateSettings, userEmail, setUserEmail }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}