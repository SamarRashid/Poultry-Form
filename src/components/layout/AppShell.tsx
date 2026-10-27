'use client';

import React, { useState } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import TopHeader from '@/components/layout/TopHeader';
import { useLanguage } from '@/context/LanguageContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Today (26 Oct 2026)');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex flex-col font-sans text-[#172033]">
      {/* Persistent Flockora Sidebar Navigation */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-[250px] min-w-0 transition-all">
        {/* Sticky Top Header */}
        <TopHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          selectedDateRange={selectedDateRange}
          onSelectDateRange={(range) => setSelectedDateRange(range)}
        />

        {/* Next.js Route Page Content */}
        <main
          id="main-content"
          className="flex-1 p-4 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto space-y-5"
        >
          {children}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-[#E2E8F0] bg-white text-xs text-[#64748B]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <p>{t.copyright}</p>
            <p className="text-[#64748B]">{t.systemCompliance}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
