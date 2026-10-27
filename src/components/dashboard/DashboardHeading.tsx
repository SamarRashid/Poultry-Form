'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Egg, Wheat, Receipt, Boxes, ChevronDown } from 'lucide-react';
import { QuickActionType } from '@/components/modals/QuickActionModal';

interface DashboardHeadingProps {
  onTriggerQuickAction: (action: QuickActionType) => void;
}

export default function DashboardHeading({
  onTriggerQuickAction,
}: DashboardHeadingProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAction = (action: QuickActionType) => {
    setMenuOpen(false);
    onTriggerQuickAction(action);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 pb-2">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
          Operations Dashboard
        </h1>
        <p className="text-xs text-[#64748B] font-normal">
          Real-time commercial layer yield, flock performance, and feed telemetry.
        </p>
      </div>

      {/* Primary Action Button: + Quick Entry */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Entry</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-80 ml-0.5" />
        </button>

        {/* Quick Entry Action Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-40 animate-in fade-in zoom-in-95">
            <div className="px-3 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-slate-100 mb-1">
              Log Farm Operation
            </div>

            <button
              onClick={() => handleSelectAction('record-eggs')}
              className="w-full text-left px-3 py-2 text-xs text-[#172033] hover:bg-[#F3F6FA] flex items-center space-x-2.5 cursor-pointer"
            >
              <div className="p-1 rounded bg-[#0D9488]/10 text-[#0D9488]">
                <Egg className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold leading-none">Record Egg Production</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">Morning & evening crates</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectAction('add-feed')}
              className="w-full text-left px-3 py-2 text-xs text-[#172033] hover:bg-[#F3F6FA] flex items-center space-x-2.5 cursor-pointer"
            >
              <div className="p-1 rounded bg-slate-100 text-[#172033]">
                <Boxes className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold leading-none">Add Feed Stock</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">Receive grain or premix</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectAction('record-feed-usage')}
              className="w-full text-left px-3 py-2 text-xs text-[#172033] hover:bg-[#F3F6FA] flex items-center space-x-2.5 cursor-pointer"
            >
              <div className="p-1 rounded bg-slate-100 text-[#172033]">
                <Wheat className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold leading-none">Record Feed Usage</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">Dispense to automated hoppers</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectAction('add-expense')}
              className="w-full text-left px-3 py-2 text-xs text-[#172033] hover:bg-[#F3F6FA] flex items-center space-x-2.5 cursor-pointer border-t border-slate-100 mt-1 pt-1.5"
            >
              <div className="p-1 rounded bg-slate-100 text-[#172033]">
                <Receipt className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold leading-none">Add Expense</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">Log operating disbursements</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
