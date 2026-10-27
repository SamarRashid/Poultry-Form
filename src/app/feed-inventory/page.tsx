'use client';

import React, { useState } from 'react';
import { Boxes, PackagePlus, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { initialFeedInventory } from '@/data/farmData';
import { deriveFeedStatus, formatNumber, formatPKR } from '@/lib/utils';
import QuickActionModal from '@/components/modals/QuickActionModal';
import { useLanguage } from '@/context/LanguageContext';

export default function FeedInventoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isUrdu } = useLanguage();

  const totalStockKg = initialFeedInventory.reduce((sum, item) => sum + item.availableStockKg, 0);
  const totalValuation = initialFeedInventory.reduce(
    (sum, item) => sum + item.availableStockKg * (item.costPerKgPKR || 80),
    0
  );
  const lowStockCount = initialFeedInventory.filter((item) => {
    const s = deriveFeedStatus(item.availableStockKg, item.minimumStockKg);
    return s === 'Low Stock' || s === 'Critical' || s === 'Out of Stock';
  }).length;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              {isUrdu ? 'خوراک کے سائلو کا اسٹاک اور راشن مینجمنٹ' : 'Feed Silo Stock & Rations Management'}
            </h1>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              {isUrdu
                ? 'اناج کے گودام، پری مکس کے ذخائر، سپلائرز کے ریکارڈز اور روزمرہ کی کھپت'
                : 'Raw grain storage silos, premix inventories, vendor receipts, and automated feeding telemetry'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <PackagePlus className="w-4 h-4" />
          <span>{isUrdu ? 'ڈیلیوری وصول کریں' : 'Receive Grain Delivery'}</span>
        </button>
      </div>

      {/* 3 Silo KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'مجموعی دستیاب اسٹاک' : 'Total Feed In Storage'}
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatNumber(totalStockKg)}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">KG</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="text-[11px] text-[#64748B]">Across 6 central silo hoppers</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'اسٹاک کی کل مالیاتی مالیت' : 'Estimated Stock Valuation'}
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatPKR(totalValuation)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="text-[11px] text-[#64748B]">Current procurement value</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'خودمختار خوراک کی مدت' : 'Days of Autonomous Feed'}
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">18.4</span>
              <span className="text-xs font-medium text-[#64748B] uppercase">DAYS</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#15803D]/10 text-[#15803D]">
              Safe Operating Buffer
            </span>
          </div>
        </div>
      </div>

      {/* Full Raw Materials Table */}
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <h2 className="text-base font-semibold text-[#0F172A] mb-0.5">
          {isUrdu ? 'خام مال اور پری مکس کا اسٹاک لیول' : 'Raw Materials & Pre-Mix Stock Levels'}
        </h2>
        <p className="text-xs text-[#64748B] mb-3">
          {isUrdu ? 'سائلو کی شرح، محفوظ حد، قیمت فی کلو اور سپلائر کی تفصیلات' : 'Visual silo fill levels, safety thresholds, unit costs, and supplier info'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wider bg-slate-50/80">
                <th className="py-2.5 px-3">Material Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Silo Fill Level</th>
                <th className="py-2.5 px-3">Available Stock</th>
                <th className="py-2.5 px-3">Cost / kg</th>
                <th className="py-2.5 px-3">Supplier</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {initialFeedInventory.map((item) => {
                const status = deriveFeedStatus(item.availableStockKg, item.minimumStockKg);
                const percent = Math.min(
                  100,
                  Math.round((item.availableStockKg / (item.siloCapacityKg || 10000)) * 100)
                );

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">{item.material}</td>
                    <td className="py-3 px-3 text-[#64748B]">{item.category}</td>
                    <td className="py-3 px-3 min-w-32">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              status === 'Critical'
                                ? 'bg-[#DC2626]'
                                : status === 'Low Stock'
                                ? 'bg-[#D97706]'
                                : 'bg-[#0D9488]'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-[#64748B]">{percent}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0F172A] whitespace-nowrap">
                      {formatNumber(item.availableStockKg)} {item.unit}
                    </td>
                    <td className="py-3 px-3 text-[#0F172A] whitespace-nowrap">
                      PKR {item.costPerKgPKR}
                    </td>
                    <td className="py-3 px-3 text-[#64748B] truncate max-w-40">{item.supplier}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {status === 'In Stock' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/20">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-[#15803D]" />
                          In Stock
                        </span>
                      )}
                      {status === 'Low Stock' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20">
                          <AlertTriangle className="w-3 h-3 mr-1 text-[#D97706]" />
                          Reorder Alert
                        </span>
                      )}
                      {status === 'Critical' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20">
                          <AlertCircle className="w-3 h-3 mr-1 text-[#DC2626]" />
                          Critical Low
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Modal for Grain Delivery */}
      <QuickActionModal
        actionType={modalOpen ? 'add-feed' : null}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
