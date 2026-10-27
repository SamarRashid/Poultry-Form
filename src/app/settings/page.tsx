'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Bell,
  Save,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { farmProfile } from '@/data/farmData';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { isUrdu } = useLanguage();
  const [companyName, setCompanyName] = useState('Flockora Layers');
  const [directorName, setDirectorName] = useState(farmProfile.owner);
  const [farmLocation, setFarmLocation] = useState(farmProfile.location);
  const [licenseNumber, setLicenseNumber] = useState('PK-AGRI-7829-LAYER');
  const [minSiloBuffer, setMinSiloBuffer] = useState('2000');
  const [tempAlertLimit, setTempAlertLimit] = useState('26.5');
  const [lowTempAlert, setLowTempAlert] = useState('18.0');
  const [dailyWaterMin, setDailyWaterMin] = useState('3200');

  const [enableSmsAlerts, setEnableSmsAlerts] = useState(true);
  const [enableDailySummary, setEnableDailySummary] = useState(true);
  const [enableHopperAlarm, setEnableHopperAlarm] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Standardized White Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#172033]">
              {isUrdu ? 'فلاکوورا پلیٹ فارم کنفیگریشن' : 'Flockora Platform Configuration'}
            </h1>
            <p className="text-xs text-[#64748B]">
              {isUrdu
                ? 'فارم کی قانونی معلومات، ٹیلی میٹری الرٹ کی حدود اور خودکار نوٹیفکیشنز کا انتظام'
                : 'Manage farm enterprise parameters, telemetry alert triggers, and biometric notifications'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {saved && (
            <span className="flex items-center space-x-1 text-xs font-semibold text-[#0D9488] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'کامیابی سے محفوظ ہو گیا' : 'Saved Successfully'}</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0b7d73] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isUrdu ? 'تبدیلیاں محفوظ کریں' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card 1: Enterprise & Commercial Profile */}
          <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E2E8F0]">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#172033]">
                  {isUrdu ? 'کمرشل پروفائل اور برانڈ کی معلومات' : 'Enterprise & Commercial Profile'}
                </h2>
                <p className="text-[11px] text-[#64748B]">
                  {isUrdu ? 'فارم کی شناخت اور زرعی رجسٹریشن' : 'Commercial entity credentials and farm licensing'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                {isUrdu ? 'برانڈ کا نام' : 'Software & Enterprise Brand Name'}
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                {isUrdu ? 'مینجنگ ڈائریکٹر / انچارج' : 'Executive Officer / Managing Director'}
              </label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  {isUrdu ? 'فارم کا پتہ' : 'Facility Location'}
                </label>
                <input
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  {isUrdu ? 'زرعی لائسنس / این ٹی این' : 'Agri License / NTN'}
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: IoT Telemetry & Automatic Threshold Limits */}
          <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E2E8F0]">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#172033]">
                  {isUrdu ? 'آئی او ٹی سینسرز اور الرٹ کی حدود' : 'IoT Telemetry & Trigger Limits'}
                </h2>
                <p className="text-[11px] text-[#64748B]">
                  {isUrdu ? 'خودکار درجہ حرارت اور سائلو کے حفاظتی پیرامیٹرز' : 'Automated climate and silo safety parameters'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                {isUrdu ? 'سائلو کی کم از کم الرٹ حد (کلوگرام)' : 'Emergency Silo Buffer Threshold (kg)'}
              </label>
              <input
                type="number"
                value={minSiloBuffer}
                onChange={(e) => setMinSiloBuffer(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
              />
              <p className="text-[11px] text-[#64748B] mt-1">Triggers emergency reorder alerts when silo reaches this limit</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  High Temp Alert (&deg;C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tempAlertLimit}
                  onChange={(e) => setTempAlertLimit(e.target.value)}
                  className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                />
                <p className="text-[11px] text-[#64748B] mt-1">Triggers cooling tunnels</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  Low Temp Alert (&deg;C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={lowTempAlert}
                  onChange={(e) => setLowTempAlert(e.target.value)}
                  className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                />
                <p className="text-[11px] text-[#64748B] mt-1">Triggers heating brooders</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                Minimum Daily Water Dispense (Liters)
              </label>
              <input
                type="number"
                value={dailyWaterMin}
                onChange={(e) => setDailyWaterMin(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E2E8F0] p-2.5 font-medium text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Alert Channels & Notifications */}
        <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E2E8F0]">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#172033]">
                {isUrdu ? 'ایس ایم ایس اور واٹس ایپ نوٹیفکیشنز' : 'Critical Notification Dispatch'}
              </h2>
              <p className="text-[11px] text-[#64748B]">
                {isUrdu ? 'فارم منیجرز کے موبائل پر فوری الارم الرٹس' : 'Instant SMS and WhatsApp alerts for farm managers'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg border border-[#E2E8F0] bg-slate-50/50 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#172033]">
                  {isUrdu ? 'اموات کی شرح الرٹ' : 'High Mortality Alerts'}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Instant SMS if mortality &gt; 0.05%</p>
              </div>
              <input
                type="checkbox"
                checked={enableSmsAlerts}
                onChange={(e) => setEnableSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0D9488] rounded-sm focus:ring-[#0D9488] cursor-pointer mt-0.5 accent-[#0D9488]"
              />
            </div>

            <div className="p-3.5 rounded-lg border border-[#E2E8F0] bg-slate-50/50 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#172033]">
                  {isUrdu ? 'شام کا پیداواری خلاصہ' : 'Evening Production Summary'}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Automated WhatsApp dispatch at 8 PM</p>
              </div>
              <input
                type="checkbox"
                checked={enableDailySummary}
                onChange={(e) => setEnableDailySummary(e.target.checked)}
                className="w-4 h-4 text-[#0D9488] rounded-sm focus:ring-[#0D9488] cursor-pointer mt-0.5 accent-[#0D9488]"
              />
            </div>

            <div className="p-3.5 rounded-lg border border-[#E2E8F0] bg-slate-50/50 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#172033]">
                  {isUrdu ? 'موٹر یا لائن جام کا الارم' : 'Feed Line Jam Alarms'}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Audio and mobile alert on motor trip</p>
              </div>
              <input
                type="checkbox"
                checked={enableHopperAlarm}
                onChange={(e) => setEnableHopperAlarm(e.target.checked)}
                className="w-4 h-4 text-[#0D9488] rounded-sm focus:ring-[#0D9488] cursor-pointer mt-0.5 accent-[#0D9488]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#64748B]">
            All configuration updates are cryptographically logged for farm compliance.
          </p>

          <button
            type="submit"
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#0D9488] hover:bg-[#0b7d73] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isUrdu ? 'کنفیگریشن محفوظ کریں' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
