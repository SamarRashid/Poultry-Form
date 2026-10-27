'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Egg } from 'lucide-react';
import { eggProduction7Days, eggProduction30Days } from '@/data/farmData';
import { formatNumber } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function EggProductionChart() {
  const { t } = useLanguage();
  const [range, setRange] = useState<'7d' | '30d'>('7d');
  const [viewMode, setViewMode] = useState<'total' | 'by-shed'>('total');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentData = range === '7d' ? eggProduction7Days : eggProduction30Days;

  // Dynamically calculate summary metrics from active records
  const totalEggsInRange = currentData.reduce((acc, curr) => acc + curr.total, 0);
  const avgDaily = Math.round(totalEggsInRange / (currentData.length || 1));
  const peakDay = currentData.reduce(
    (max, curr) => (curr.total > max.total ? curr : max),
    currentData[0] || { total: 0, displayDate: '' }
  );

  return (
    <div className="flockora-card p-4 sm:p-5">
      {/* Header Row: Title, Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-[#0D9488]/10 text-[#0D9488] rounded-lg">
              <Egg className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-[#172033] tracking-tight">
              {t.chartTitle}
            </h2>
            <span className="text-[10px] font-medium bg-slate-100 text-[#64748B] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
              {t.chartTag}
            </span>
          </div>
          <p className="text-xs text-[#64748B] font-normal mt-0.5">
            {t.chartDesc}
          </p>
        </div>

        {/* Period & Mode Filters */}
        <div className="flex items-center space-x-2">
          {/* Mode Toggle: Total vs By Shed */}
          <div className="flex items-center bg-[#F3F6FA] border border-[#E2E8F0] p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('total')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'total'
                  ? 'bg-white text-[#172033] shadow-xs font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              {t.modeTotal}
            </button>
            <button
              onClick={() => setViewMode('by-shed')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'by-shed'
                  ? 'bg-white text-[#172033] shadow-xs font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              {t.modeByShed}
            </button>
          </div>

          {/* Period Toggle: 7 Days vs 30 Days */}
          <div className="flex items-center bg-[#F3F6FA] border border-[#E2E8F0] p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setRange('7d')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                range === '7d'
                  ? 'bg-[#0D9488] text-white font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              {t.range7Days}
            </button>
            <button
              onClick={() => setRange('30d')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                range === '30d'
                  ? 'bg-[#0D9488] text-white font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              {t.range30Days}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Row Above Chart (Calculated Dynamically) */}
      <div className="grid grid-cols-3 gap-3 my-3 p-3 bg-[#F3F6FA] rounded-lg border border-[#E2E8F0] text-xs">
        <div>
          <span className="text-[10px] text-[#64748B] block font-medium">Total Collected</span>
          <span className="font-semibold text-[#172033] text-sm">
            {formatNumber(totalEggsInRange)}{' '}
            <span className="text-[10px] text-[#64748B] font-normal">eggs</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748B] block font-medium">Daily Average</span>
          <span className="font-semibold text-[#172033] text-sm">
            {formatNumber(avgDaily)}{' '}
            <span className="text-[10px] text-[#64748B] font-normal">/ day</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] text-[#64748B] block font-medium">Peak Day</span>
          <span className="font-semibold text-[#0D9488] text-sm">
            {formatNumber(peakDay.total)}{' '}
            <span className="text-[10px] text-[#64748B] font-normal">({peakDay.displayDate})</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 pt-1">
        {isClient ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={currentData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="chartTealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.16} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="chartNavyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#111827" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="chartSlateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* Light Horizontal Grid Lines */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />

              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white/95 backdrop-blur-md text-[#172033] p-3 rounded-xl shadow-xl border border-[#E2E8F0] text-xs space-y-2 min-w-[190px]">
                        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                            <span className="font-bold text-[#172033]">{label}</span>
                          </div>
                          <span className="text-[10.5px] font-semibold text-[#0D9488] bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded">
                            {data.efficiencyRate}% Laying
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-0.5">
                          <span className="text-xs font-semibold text-[#64748B]">Total Yield:</span>
                          <span className="text-sm font-bold text-[#0D9488]">
                            {formatNumber(data.total)}{' '}
                            <span className="text-[10px] font-normal text-[#64748B]">eggs</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-[#64748B] pt-1.5 border-t border-[#F1F5F9] space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                              <span>Shed 1:</span>
                            </span>
                            <span className="font-semibold text-[#172033]">{formatNumber(data.shed1)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                              <span>Shed 2:</span>
                            </span>
                            <span className="font-semibold text-[#172033]">{formatNumber(data.shed2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
                              <span>Shed 3:</span>
                            </span>
                            <span className="font-semibold text-[#172033]">{formatNumber(data.shed3)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={28}
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }}
              />

              {viewMode === 'total' ? (
                <Area
                  type="monotone"
                  name="Total Egg Harvest"
                  dataKey="total"
                  stroke="#0D9488"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#chartTealGrad)"
                  activeDot={{ r: 4, fill: '#0D9488' }}
                />
              ) : (
                <>
                  <Area
                    type="monotone"
                    name="Shed 1 (Lohmann)"
                    dataKey="shed1"
                    stroke="#111827"
                    strokeWidth={1.75}
                    fillOpacity={1}
                    fill="url(#chartNavyGrad)"
                  />
                  <Area
                    type="monotone"
                    name="Shed 2 (Hy-Line)"
                    dataKey="shed2"
                    stroke="#0D9488"
                    strokeWidth={1.75}
                    fillOpacity={1}
                    fill="url(#chartTealGrad)"
                  />
                  <Area
                    type="monotone"
                    name="Shed 3 (Novogen)"
                    dataKey="shed3"
                    stroke="#64748B"
                    strokeWidth={1.75}
                    fillOpacity={1}
                    fill="url(#chartSlateGrad)"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-[#64748B]">
            Loading chart analytics...
          </div>
        )}
      </div>
    </div>
  );
}
