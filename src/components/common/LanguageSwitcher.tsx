'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center bg-[#F3F6FA] border border-[#E2E8F0] p-0.5 rounded-lg text-xs font-semibold shadow-2xs"
      role="group"
      aria-label="Language Switcher"
    >
      {!compact && (
        <span className="px-1.5 text-[#64748B] flex items-center">
          <Languages className="w-3.5 h-3.5 text-[#0D9488]" />
        </span>
      )}

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-xs ${
          language === 'en'
            ? 'bg-[#0D9488] text-white shadow-xs font-bold'
            : 'text-[#64748B] hover:text-[#172033] hover:bg-white/60'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ur')}
        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-xs ${
          language === 'ur'
            ? 'bg-[#0D9488] text-white shadow-xs font-bold'
            : 'text-[#64748B] hover:text-[#172033] hover:bg-white/60'
        }`}
        aria-pressed={language === 'ur'}
      >
        اردو
      </button>
    </div>
  );
}
