'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Egg,
  Users,
  Package,
  Wheat,
  Receipt,
  BookOpen,
  ChartNoAxesColumn,
  Settings,
  X,
  ChevronRight,
} from 'lucide-react';
import FlockoraLogo from '@/components/brand/FlockoraLogo';
import { farmProfile } from '@/data/farmData';
import { useLanguage } from '@/context/LanguageContext';

interface AppSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface NavGroup {
  heading: string;
  items: NavItem[];
}

export default function AppSidebar({
  mobileOpen,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { t, isUrdu } = useLanguage();

  const navigationGroups: NavGroup[] = [
    {
      heading: t.navWorkspace,
      items: [
        { id: 'dashboard', label: t.navDashboard, href: '/', icon: LayoutDashboard },
        { id: 'egg-production', label: t.navEggProduction, href: '/egg-production', icon: Egg },
        { id: 'flock-management', label: t.navFlockManagement, href: '/flock-management', icon: Users },
      ],
    },
    {
      heading: t.navOperations,
      items: [
        { id: 'feed-inventory', label: t.navFeedInventory, href: '/feed-inventory', icon: Package },
        { id: 'feed-consumption', label: t.navFeedConsumption, href: '/feed-inventory', icon: Wheat },
        { id: 'expenses', label: t.navExpenses, href: '/expenses', icon: Receipt },
        { id: 'cash-book', label: t.navCashBook, href: '/expenses', icon: BookOpen },
      ],
    },
    {
      heading: t.navInsights,
      items: [
        { id: 'reports', label: t.navReports, href: '/reports', icon: ChartNoAxesColumn },
      ],
    },
    {
      heading: t.navPreferences,
      items: [
        { id: 'settings', label: t.navSettings, href: '/settings', icon: Settings },
      ],
    },
  ];

  // Close drawer on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        onCloseMobile();
      }
    },
    [mobileOpen, onCloseMobile]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {mobileOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity duration-200"
        />
      )}

      {/* Main Sidebar Rail (Rich Executive Teal Matching Brand Buttons) */}
      <aside
        id="flockora-sidebar"
        aria-label="Sidebar Navigation"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-[250px] min-w-[250px] max-w-[250px] h-screen bg-[#073330] box-border border-r border-[#0D4A47] shadow-lg transition-transform duration-200 ease-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 1. Brand Header */}
        <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-teal-800/40">
          <Link href="/" onClick={() => mobileOpen && onCloseMobile()} className="flex items-center">
            <FlockoraLogo size={34} showText={true} lightText={true} />
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            aria-label="Close navigation"
            className="p-1.5 text-teal-200/70 hover:text-white rounded-md transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Middle Navigation Groups (Scrollable) */}
        <nav
          className="flex-1 px-3 py-3 overflow-y-auto space-y-3.5"
          aria-label="Flockora Platform Modules"
        >
          {navigationGroups.map((group, groupIdx) => (
            <div key={group.heading} className="space-y-0.5">
              {/* Group Heading */}
              <div
                className={`px-3 text-[10px] font-semibold tracking-wider text-teal-300/70 uppercase select-none ${
                  groupIdx === 0 ? 'pt-1 pb-1' : 'pt-2 pb-1'
                }`}
              >
                {group.heading}
              </div>

              {/* Group Items */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => mobileOpen && onCloseMobile()}
                      aria-current={active ? 'page' : undefined}
                      className={`relative w-full h-[40px] flex items-center px-3 rounded-lg text-[13px] transition-colors duration-150 cursor-pointer text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                        active
                          ? 'bg-white/15 text-white font-semibold shadow-2xs'
                          : 'text-teal-100/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {/* Active Indicator on Left Edge */}
                      {active && (
                        <span
                          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#2DD4BF]"
                          aria-hidden="true"
                        />
                      )}

                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Icon
                          className={`w-[17px] h-[17px] shrink-0 transition-colors duration-150 ${
                            active
                              ? 'text-[#2DD4BF]'
                              : 'text-teal-200/60 group-hover:text-white'
                          }`}
                          strokeWidth={1.8}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 3. Bottom Profile Section */}
        <div className="p-3 mx-2 border-t border-teal-800/40 shrink-0">
          <Link
            href="/settings"
            onClick={() => mobileOpen && onCloseMobile()}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-black/20 hover:bg-white/10 border border-teal-800/50 transition-colors duration-150 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Administrator profile and settings"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              {/* Circular Avatar */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/25 border border-teal-300/40 text-teal-200 font-bold text-xs shrink-0">
                {farmProfile.avatarInitials}
              </div>

              {/* User Metadata */}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate leading-tight">
                  {farmProfile.owner}
                </p>
                <p className="text-[10.5px] text-teal-200/70 truncate leading-tight mt-0.5">
                  {isUrdu ? t.roleAdmin : farmProfile.role}
                </p>
              </div>
            </div>

            {/* Subtle Chevron */}
            <ChevronRight className="w-4 h-4 text-teal-300/70 group-hover:text-white transition-colors shrink-0 ml-1" />
          </Link>
        </div>
      </aside>
    </>
  );
}
