'use client';

import React, { useState } from 'react';
import { X, Egg, Wheat, PackagePlus, Receipt, CheckCircle, Sparkles } from 'lucide-react';
import { FarmActivity } from '@/types/farm';

export type QuickActionType = 'record-eggs' | 'add-feed' | 'record-feed-usage' | 'add-expense' | null;

interface QuickActionModalProps {
  actionType: QuickActionType;
  onClose: () => void;
  onAddActivity?: (activity: FarmActivity) => void;
}

export default function QuickActionModal({
  actionType,
  onClose,
  onAddActivity,
}: QuickActionModalProps) {
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  // Form states
  const [shed, setShed] = useState('Shed 1 (EC Closed - Lohmann Brown)');
  const [eggCount, setEggCount] = useState('4280');
  const [damagedCount, setDamagedCount] = useState('18');

  const [feedMaterial, setFeedMaterial] = useState('Maize (Yellow Corn #1)');
  const [receivedKg, setReceivedKg] = useState('5000');
  const [supplierName, setSupplierName] = useState('Al-Rehman Grain Traders');

  const [usageShed, setUsageShed] = useState('Shed 1');
  const [feedType, setFeedType] = useState('Layer Feed (Phase-1 Mash)');
  const [usageKg, setUsageKg] = useState('300');

  const [expenseCategory, setExpenseCategory] = useState('Utilities & Power');
  const [expenseDesc, setExpenseDesc] = useState('Standby Generator Diesel Fuel (120L)');
  const [expenseAmount, setExpenseAmount] = useState('34800');

  if (!actionType) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let title = '';
    let description = '';
    let category: FarmActivity['category'] = 'egg';
    let icon: FarmActivity['icon'] = 'egg';

    if (actionType === 'record-eggs') {
      title = 'Egg Harvest Batch Logged';
      description = `${eggCount} eggs logged for ${shed} (${damagedCount} broken/damaged).`;
      category = 'egg';
      icon = 'egg';
      setSubmittedNotice(`Logged ${eggCount} eggs for ${shed}. Added to operational telemetry.`);
    } else if (actionType === 'add-feed') {
      title = 'Grain Stock Delivered';
      description = `+${receivedKg} kg of ${feedMaterial} received into Central Silo from ${supplierName}.`;
      category = 'inventory';
      icon = 'boxes';
      setSubmittedNotice(`Added ${receivedKg} kg ${feedMaterial} to silo inventory.`);
    } else if (actionType === 'record-feed-usage') {
      title = 'Feed Rations Dispensed';
      description = `${usageKg} kg ${feedType} dispensed to automated augers in ${usageShed}.`;
      category = 'feed';
      icon = 'wheat';
      setSubmittedNotice(`Recorded ${usageKg} kg consumption in daily logs.`);
    } else if (actionType === 'add-expense') {
      title = 'Operating Disbursement Added';
      description = `PKR ${Number(expenseAmount || 0).toLocaleString()} posted for ${expenseDesc} (${expenseCategory}).`;
      category = 'expense';
      icon = 'wallet';
      setSubmittedNotice(`Recorded expense PKR ${expenseAmount} to ledger.`);
    }

    if (onAddActivity) {
      onAddActivity({
        id: `ACT-${Date.now()}`,
        title,
        description,
        timeAgo: 'Just now',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category,
        icon,
      });
    }

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const getModalMeta = () => {
    switch (actionType) {
      case 'record-eggs':
        return {
          title: 'Log Daily Egg Harvest',
          subtitle: 'Record morning and evening crate counts by shed unit',
          icon: Egg,
          gradient: 'from-emerald-500 to-teal-600',
        };
      case 'add-feed':
        return {
          title: 'Receive Bulk Grain Delivery',
          subtitle: 'Log incoming corn, soya, or mash into storage silos',
          icon: PackagePlus,
          gradient: 'from-amber-500 to-orange-600',
        };
      case 'record-feed-usage':
        return {
          title: 'Dispense Feed Rations',
          subtitle: 'Log automated auger feed distributions to flocks',
          icon: Wheat,
          gradient: 'from-blue-500 to-indigo-600',
        };
      case 'add-expense':
        return {
          title: 'Post Farm Operating Expense',
          subtitle: 'Record fuel, medicine, labor, and maintenance in PKR',
          icon: Receipt,
          gradient: 'from-rose-500 to-pink-600',
        };
    }
  };

  const meta = getModalMeta();
  const IconComponent = meta.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2.5 bg-gradient-to-br ${meta.gradient} rounded-xl text-white shadow-md`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">
                  {meta.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">{meta.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {submittedNotice ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-slate-900">Record Successfully Logged</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">{submittedNotice}</p>
            <p className="text-[11px] text-emerald-600 font-bold">Updating dashboard telemetry...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* 1. Egg Harvest */}
            {actionType === 'record-eggs' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Shed Unit
                  </label>
                  <select
                    value={shed}
                    onChange={(e) => setShed(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Shed 1 (EC Closed - Lohmann Brown)">Shed 1 (EC Closed - Lohmann Brown - 5,000 birds)</option>
                    <option value="Shed 2 (EC Closed - Hy-Line W-36)">Shed 2 (EC Closed - Hy-Line W-36 - 5,100 birds)</option>
                    <option value="Shed 3 (Semi-Closed - Novogen Brown)">Shed 3 (Semi-Closed - Novogen Brown - 4,900 birds)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Good Eggs Collected
                    </label>
                    <input
                      type="number"
                      required
                      value={eggCount}
                      onChange={(e) => setEggCount(e.target.value)}
                      placeholder="e.g. 4280"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Damaged / Cracked
                    </label>
                    <input
                      type="number"
                      required
                      value={damagedCount}
                      onChange={(e) => setDamagedCount(e.target.value)}
                      placeholder="e.g. 18"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 2. Grain Delivery */}
            {actionType === 'add-feed' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feed Raw Material
                  </label>
                  <select
                    value={feedMaterial}
                    onChange={(e) => setFeedMaterial(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Maize (Yellow Corn #1)">Maize (Yellow Corn #1)</option>
                    <option value="Soybean Meal (48% High CP)">Soybean Meal (48% High CP)</option>
                    <option value="Rice Bran (De-oiled)">Rice Bran (De-oiled)</option>
                    <option value="Layer Feed (Phase-1 Mash)">Layer Feed (Phase-1 Mash)</option>
                    <option value="Calcium Carbonate / Coarse Grit">Calcium Carbonate / Coarse Grit</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      required
                      value={receivedKg}
                      onChange={(e) => setReceivedKg(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      required
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      placeholder="e.g. Al-Rehman Grain Traders"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 3. Feed Usage */}
            {actionType === 'record-feed-usage' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Shed
                    </label>
                    <select
                      value={usageShed}
                      onChange={(e) => setUsageShed(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Shed 1">Shed 1 (5,000 birds)</option>
                      <option value="Shed 2">Shed 2 (5,100 birds)</option>
                      <option value="Shed 3">Shed 3 (4,900 birds)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quantity (kg)
                    </label>
                    <input
                      type="number"
                      required
                      value={usageKg}
                      onChange={(e) => setUsageKg(e.target.value)}
                      placeholder="e.g. 300"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Feed Formulation
                  </label>
                  <select
                    value={feedType}
                    onChange={(e) => setFeedType(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Layer Feed (Phase-1 Mash)">Layer Feed (Phase-1 Mash)</option>
                    <option value="Custom Corn-Soya High Energy Ration">Custom Corn-Soya High Energy Ration</option>
                    <option value="Calcium & Mineral Top-Dressing">Calcium & Mineral Top-Dressing</option>
                  </select>
                </div>
              </>
            )}

            {/* 4. Add Expense */}
            {actionType === 'add-expense' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Utilities & Power">Utilities & Power</option>
                      <option value="Biosecurity & Medicine">Biosecurity & Medicine</option>
                      <option value="Feed Purchases">Feed Purchases</option>
                      <option value="Labor & Farm Wages">Labor & Farm Wages</option>
                      <option value="Repairs & Equipment">Repairs & Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Amount (PKR)
                    </label>
                    <input
                      type="number"
                      required
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      placeholder="e.g. 48500"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Disbursement Description
                  </label>
                  <input
                    type="text"
                    required
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                    placeholder="e.g. Generator diesel fuel for backup ventilation"
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Footer */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-end space-x-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                Submit Record
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
