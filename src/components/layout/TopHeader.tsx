'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Calendar,
  ChevronDown,
  Settings,
  LogOut,
  Check,
} from 'lucide-react';
import { farmProfile, notificationList } from '@/data/farmData';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
  selectedDateRange: string;
  onSelectDateRange: (range: string) => void;
}

export default function TopHeader({
  onToggleMobileSidebar,
  selectedDateRange,
  onSelectDateRange,
}: TopHeaderProps) {
  const pathname = usePathname();
  const { t, isUrdu } = useLanguage();

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationList);

  const dateRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const dateOptions = [
    { label: 'Today (26 Oct 2026)', value: 'Today' },
    { label: 'Yesterday (25 Oct 2026)', value: 'Yesterday' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'Last 30 Days', value: 'Last 30 Days' },
    { label: 'This Month (Oct 2026)', value: 'Month' },
  ];

  const getBreadcrumbTitle = () => {
    if (pathname === '/egg-production') return t.navEggProduction;
    if (pathname === '/flock-management') return t.navFlockManagement;
    if (pathname === '/feed-inventory') return t.navFeedInventory;
    if (pathname === '/expenses') return t.navExpenses;
    if (pathname === '/reports') return t.navReports;
    if (pathname === '/settings') return t.navSettings;
    return t.navDashboard;
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-white border-b border-[#E2E8F0] shadow-2xs">
      {/* Left: Mobile Drawer Trigger & Breadcrumb Path */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation drawer"
          className="p-1.5 text-[#64748B] hover:text-[#172033] hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs">
          <Link href="/" className="text-[#64748B] hover:text-[#172033] font-medium transition-colors">
            {isUrdu ? t.brandName : 'Flockora'}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-[#0F172A]">{getBreadcrumbTitle()}</span>
        </nav>
      </div>

      {/* Right: Date Picker, Language Switcher, Notifications, Admin Profile */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Refined Calendar Selector */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            aria-expanded={dateDropdownOpen}
            className="flex items-center space-x-2 h-9 px-3 text-xs font-medium text-[#0F172A] bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className="hidden sm:inline font-medium">
              {selectedDateRange === 'Today' || selectedDateRange.includes('Today') ? 'Today (26 Oct 2026)' : selectedDateRange}
            </span>
            <span className="sm:hidden font-medium">26 Oct</span>
            <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10.5px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-slate-100">
                Reporting Window
              </div>
              <div className="py-1">
                {dateOptions.map((opt) => {
                  const isSelected =
                    selectedDateRange === opt.value ||
                    (opt.value === 'Today' && selectedDateRange.includes('Today'));

                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSelectDateRange(opt.value);
                        setDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F3F6FA] cursor-pointer transition-colors ${
                        isSelected
                          ? 'font-semibold text-[#0D9488] bg-[#0D9488]/10'
                          : 'text-[#172033]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0D9488]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Global Language Switcher Pill (EN / اردو) */}
        <LanguageSwitcher />

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-expanded={notificationsOpen}
            aria-label="System notifications"
            className="relative p-2 text-[#64748B] hover:text-[#172033] hover:bg-[#F3F6FA] rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0D9488] ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-[#E2E8F0] overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="p-3 bg-[#111827] text-white flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                  <span>{t.notificationsTitle}</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10.5px] text-[#2DD4BF] hover:underline cursor-pointer"
                  >
                    {t.markAllRead}
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs hover:bg-[#F3F6FA] transition-colors ${
                      n.unread ? 'bg-teal-50/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#172033] text-[11px]">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#64748B]">{n.time}</span>
                    </div>
                    <p className="text-[#64748B] text-[11px] leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Administrator Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            className="flex items-center space-x-2 p-1 pl-1.5 rounded-lg hover:bg-[#F3F6FA] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] font-bold text-xs">
              {farmProfile.avatarInitials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-[#0F172A] leading-none">
                {farmProfile.owner}
              </p>
              <p className="text-[10px] text-[#64748B] leading-none mt-0.5">
                {isUrdu ? t.roleAdmin : farmProfile.role}
              </p>
            </div>
            <ChevronDown className="w-3 h-3 text-[#64748B] hidden md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-[#172033]">{farmProfile.owner}</p>
                <p className="text-[10.5px] text-[#64748B] truncate">{farmProfile.location}</p>
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#172033] hover:bg-[#F3F6FA] flex items-center space-x-2 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{t.navSettings}</span>
                </Link>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    alert('Session securely locked. Enter credentials to resume.');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
