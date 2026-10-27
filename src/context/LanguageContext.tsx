'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  isUrdu: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('flockora_lang') as Language;
      if (saved === 'en' || saved === 'ur') {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('flockora_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language];
  const isUrdu = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isUrdu }}>
      <div dir={isUrdu ? 'rtl' : 'ltr'} className={isUrdu ? 'font-sans urdu-mode' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
