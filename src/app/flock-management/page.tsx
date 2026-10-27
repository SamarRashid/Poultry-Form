'use client';

import React from 'react';
import { Users, Thermometer, Droplets, Wind, ShieldCheck, HeartPulse } from 'lucide-react';
import { sampleFlocks } from '@/data/farmData';
import { formatNumber } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function FlockManagementPage() {
  const { isUrdu } = useLanguage();
  const totalActive = sampleFlocks.reduce((sum, f) => sum + f.activeBirds, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              {isUrdu ? 'کمرشل لیئر فلاک اور شیڈ ٹیلی میٹری' : 'Commercial Layer Flock Telemetry'}
            </h1>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              {isUrdu
                ? `3 فعال شیڈز • ${formatNumber(totalActive)} فعال مرغیاں • خودکار ماحولیاتی مانیٹرنگ`
                : `3 Active Layer Flocks • ${formatNumber(totalActive)} Active Layers • Automated Climate Monitoring`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-semibold w-fit shrink-0">
          <HeartPulse className="w-4 h-4 text-[#0D9488]" />
          <span>{isUrdu ? 'اموات کی شرح: 0.02% (محفوظ)' : 'Flock Mortality: 0.02% (Optimal)'}</span>
        </div>
      </div>

      {/* 3 Detailed Flock Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {sampleFlocks.map((flock) => (
          <div
            key={flock.id}
            className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:border-slate-300 transition-colors space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded border border-[#0D9488]/20">
                  {flock.shed}
                </span>
                <h2 className="text-sm font-bold text-[#0F172A] mt-1.5">{flock.name}</h2>
                <p className="text-xs text-[#64748B]">{flock.breed}</p>
              </div>
              <span className="text-xs font-semibold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-md">
                {isUrdu ? `ہفتہ ${flock.ageWeeks}` : `Week ${flock.ageWeeks}`}
              </span>
            </div>

            {/* Counts */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#F8FAFC] rounded-lg text-xs border border-[#E2E8F0]">
              <div>
                <span className="text-[10px] text-[#64748B] font-medium block">
                  {isUrdu ? 'زندہ لیئرز' : 'Active Layers'}
                </span>
                <span className="text-lg font-bold text-[#0F172A]">
                  {formatNumber(flock.activeBirds)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] font-medium block">
                  {isUrdu ? 'پیداواری شرح' : 'Laying Ratio'}
                </span>
                <span className="text-lg font-bold text-[#0D9488]">
                  {flock.eggProductionRate}%
                </span>
              </div>
            </div>

            {/* Live Climate Sensors */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] block">
                {isUrdu ? 'شیڈ کا ماحولیاتی سینسر ڈیٹا' : 'Shed Environment Telemetry'}
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                  <div className="flex items-center justify-center space-x-1 text-[#64748B] mb-0.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-medium">{isUrdu ? 'درجہ حرارت' : 'Temp'}</span>
                  </div>
                  <span className="font-bold text-[#0F172A]">{flock.temperatureC}&deg;C</span>
                </div>

                <div className="p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                  <div className="flex items-center justify-center space-x-1 text-[#64748B] mb-0.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    <span className="text-[10px] font-medium">{isUrdu ? 'نمی' : 'RH'}</span>
                  </div>
                  <span className="font-bold text-[#0F172A]">{flock.humidityPercent}%</span>
                </div>

                <div className="p-2 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                  <div className="flex items-center justify-center space-x-1 text-[#64748B] mb-0.5">
                    <Wind className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span className="text-[10px] font-medium">{isUrdu ? 'ہوا' : 'Airflow'}</span>
                  </div>
                  <span className="font-bold text-[#0D9488]">Optimal</span>
                </div>
              </div>
            </div>

            {/* Health Status */}
            <div className="flex items-center justify-between text-xs pt-2.5 border-t border-[#E2E8F0] text-[#64748B]">
              <span className="flex items-center font-medium text-[#15803D]">
                <ShieldCheck className="w-4 h-4 mr-1 text-[#15803D]" />
                ND/IB Vaccinated
              </span>
              <span className="text-[11px] text-[#64748B]">
                {isUrdu ? `آج کا نقصان: ${flock.mortalityToday}` : `Loss today: ${flock.mortalityToday} birds`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
