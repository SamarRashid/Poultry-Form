'use client';

import React from 'react';
import {
  Activity,
  Egg,
  Wheat,
  Receipt,
  Boxes,
  Stethoscope,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { initialActivities } from '@/data/mockFarmData';
import { FarmActivity } from '@/types/farm';

interface RecentActivitiesProps {
  activities?: FarmActivity[];
  onViewAll: () => void;
}

export default function RecentActivities({
  activities = initialActivities,
  onViewAll,
}: RecentActivitiesProps) {
  const getIcon = (icon: FarmActivity['icon']) => {
    switch (icon) {
      case 'egg':
        return Egg;
      case 'wheat':
        return Wheat;
      case 'wallet':
        return Receipt;
      case 'boxes':
        return Boxes;
      case 'stethoscope':
        return Stethoscope;
      default:
        return Activity;
    }
  };

  return (
    <div className="flockora-card p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-slate-100 text-[#172033] rounded-lg">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#172033] tracking-tight">
                Recent Farm Activities
              </h2>
              <p className="text-xs text-[#64748B] font-normal">
                Egg collection logs, automated hopper rations, and farm expenses
              </p>
            </div>
          </div>
        </div>

        {/* Activity Rows */}
        <div className="mt-2 divide-y divide-[#E2E8F0] text-xs">
          {activities.slice(0, 4).map((act) => {
            const Icon = getIcon(act.icon);

            return (
              <div
                key={act.id}
                className="py-2.5 flex items-start space-x-2.5 hover:bg-[#F3F6FA]/60 px-1 rounded-lg transition-colors"
              >
                {/* Restrained Neutral Icon Container */}
                <div className="p-1.5 rounded-lg bg-slate-100 text-[#172033] shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#172033] truncate">
                      {act.title}
                    </p>
                    <span className="text-[10px] text-[#64748B] shrink-0 ml-2 flex items-center font-normal">
                      <Clock className="w-3 h-3 mr-0.5 text-slate-400" />
                      {act.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] font-normal mt-0.5 line-clamp-1 leading-normal">
                    {act.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#64748B] font-normal">
          Showing latest {Math.min(activities.length, 4)} verified farm events
        </span>
        <button
          onClick={onViewAll}
          className="inline-flex items-center text-[11px] font-semibold text-[#0D9488] hover:text-[#0f766e] transition-colors cursor-pointer"
        >
          <span>View All Activity</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
