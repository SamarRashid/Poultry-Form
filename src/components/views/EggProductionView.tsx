'use client';

import React from 'react';
import { Egg, Plus, CheckCircle2, Package, Layers } from 'lucide-react';
import { eggProduction7Days } from '@/data/mockFarmData';
import { formatNumber } from '@/lib/utils';
import EggProductionChart from '@/components/dashboard/EggProductionChart';

interface EggProductionViewProps {
  onOpenLogModal: () => void;
}

export default function EggProductionView({ onOpenLogModal }: EggProductionViewProps) {
  const latest = eggProduction7Days[eggProduction7Days.length - 1];
  const cratesPacked = Math.floor(latest.total / 360);
  const remainingEggs = latest.total % 360;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Egg className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Egg Production & Harvest Intelligence
            </h2>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              Automated grading, crates packaging for wholesale dispatch, and laying curve benchmarks
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLogModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Harvest Batch</span>
        </button>
      </div>

      {/* 4 Grading & Yield KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today Harvest */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">
                Today Harvest
              </span>
              <div className="p-1.5 rounded-lg bg-teal-50 text-[#0D9488]">
                <Egg className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatNumber(latest.total)}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">
                eggs
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Collected across 3 sheds</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#0D9488]/10 text-[#0D9488]">
              83.0% Laying Rate
            </span>
          </div>
        </div>

        {/* Card 2: Grade A Table Eggs */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">
                Grade A Table Eggs
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 text-[#0F172A]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatNumber(latest.total - 180 - latest.damagedEggs)}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">
                97.8%
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">Wholesale & export quality</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#64748B]">Standard Grade-A yield</span>
          </div>
        </div>

        {/* Card 3: Crates Ready For Dispatch */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">
                Crates Packaged
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 text-[#0F172A]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {cratesPacked}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">
                crates
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">+ {remainingEggs} loose eggs</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#64748B]">360 eggs per crate</span>
          </div>
        </div>

        {/* Card 4: Damaged / Cracked */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">
                Damaged / Breakage
              </span>
              <div className="p-1.5 rounded-lg bg-slate-100 text-[#0F172A]">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#D97706]">
                {latest.damagedEggs}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">
                eggs
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">0.25% (under 0.5% tolerance)</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#15803D]">Controlled Breakage</span>
          </div>
        </div>
      </div>

      {/* Production Chart */}
      <EggProductionChart />

      {/* Shed Breakdown Table */}
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <h3 className="text-base font-semibold text-[#0F172A] mb-0.5">
          Shed-Wise Collection & Flock Productivity
        </h3>
        <p className="text-xs text-[#64748B] mb-3">
          Detailed metrics from morning and evening egg conveyor belt logs
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wider bg-slate-50/80">
                <th className="py-2.5 px-3">Shed Unit</th>
                <th className="py-2.5 px-3">Breed Type</th>
                <th className="py-2.5 px-3">Flock Count</th>
                <th className="py-2.5 px-3">Today Collection</th>
                <th className="py-2.5 px-3">Laying Efficiency</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#0F172A]">Shed 1 (EC Closed)</td>
                <td className="py-3 px-3 text-[#64748B]">Lohmann Brown Classic</td>
                <td className="py-3 px-3 text-[#0F172A] font-medium">5,000 birds</td>
                <td className="py-3 px-3 font-semibold text-[#0D9488]">4,280 eggs</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
                    85.6%
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-[#15803D] font-medium">Optimal Yield</td>
              </tr>
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#0F172A]">Shed 2 (EC Closed)</td>
                <td className="py-3 px-3 text-[#64748B]">Hy-Line W-36 White</td>
                <td className="py-3 px-3 text-[#0F172A] font-medium">5,100 birds</td>
                <td className="py-3 px-3 font-semibold text-[#0D9488]">4,220 eggs</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
                    82.7%
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-[#15803D] font-medium">Optimal Yield</td>
              </tr>
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#0F172A]">Shed 3 (Semi-Closed)</td>
                <td className="py-3 px-3 text-[#64748B]">Novogen Brown High-Yield</td>
                <td className="py-3 px-3 text-[#0F172A] font-medium">4,900 birds</td>
                <td className="py-3 px-3 font-semibold text-[#0D9488]">3,950 eggs</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
                    80.6%
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-[#15803D] font-medium">Healthy Yield</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
