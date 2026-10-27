'use client';

import React from 'react';
import { Egg, Boxes, Wheat, Receipt, ArrowRight } from 'lucide-react';
import { QuickActionType } from '@/components/modals/QuickActionModal';
import { useLanguage } from '@/context/LanguageContext';

interface QuickActionsProps {
  onTriggerAction: (action: QuickActionType) => void;
}

export default function QuickActions({ onTriggerAction }: QuickActionsProps) {
  const { t } = useLanguage();

  const actions = [
    {
      id: 'record-eggs' as QuickActionType,
      label: t.qaEggTitle,
      desc: t.qaEggDesc,
      icon: Egg,
    },
    {
      id: 'add-feed' as QuickActionType,
      label: t.qaAddFeedTitle,
      desc: t.qaAddFeedDesc,
      icon: Boxes,
    },
    {
      id: 'record-feed-usage' as QuickActionType,
      label: t.qaFeedUsageTitle,
      desc: t.qaFeedUsageDesc,
      icon: Wheat,
    },
    {
      id: 'add-expense' as QuickActionType,
      label: t.qaExpenseTitle,
      desc: t.qaExpenseDesc,
      icon: Receipt,
    },
  ];

  return (
    <div className="flockora-card p-4 sm:p-5">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-base font-semibold text-[#172033] tracking-tight">
            {t.qaTitle}
          </h2>
          <p className="text-xs text-[#64748B] font-normal">
            {t.qaSubtitle}
          </p>
        </div>
        <span className="text-[11px] font-medium text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded-full border border-[#0D9488]/20">
          {t.qaTag}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onTriggerAction(act.id)}
              className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] bg-[#F3F6FA]/70 hover:bg-white hover:border-[#CBD5E1] hover:shadow-xs transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#0D9488] shrink-0 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#172033] truncate">
                    {act.label}
                  </p>
                  <p className="text-[11px] text-[#64748B] truncate">
                    {act.desc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#0D9488] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
