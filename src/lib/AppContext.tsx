'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from './translations';

interface AppContextType {
  language: Language;
  darkMode: boolean;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (!saved) return false;
      return JSON.parse(saved) === true;
    } catch {
      return false;
    }
  });

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode));
      } catch {
        // ignore storage failures (privacy mode, blocked storage, etc.)
      }
      return newMode;
    });
  };

  return (
    <AppContext.Provider value={{ language, darkMode, toggleLanguage, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
