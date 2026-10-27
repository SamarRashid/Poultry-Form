'use client';

import React from 'react';
import { Boxes, PackagePlus, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { initialFeedInventory } from '@/data/mockFarmData';
import { deriveFeedStatus, formatNumber, formatPKR } from '@/lib/utils';

interface FeedInventoryViewProps {
  onOpenAddFeedModal: () => void;
}

export default function FeedInventoryView({ onOpenAddFeedModal }: FeedInventoryViewProps) {
  const totalStockKg = initialFeedInventory.reduce((sum, item) => sum + item.availableStockKg, 0);
  const totalValuation = initialFeedInventory.reduce(
    (sum, item) => sum + item.availableStockKg * (item.costPerKgPKR || 80),
    0
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Feed Inventory & Silo Capacity ERP
            </h2>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              Raw material silos, automated ration stocks, safety buffers, and procurement orders
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddFeedModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <PackagePlus className="w-4 h-4" />
          <span>Receive Grain Delivery</span>
        </button>
      </div>

      {/* Silo Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Total Silo Stock
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatNumber(totalStockKg)}
              </span>
              <span className="text-xs font-medium text-[#64748B] uppercase">KG</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            6 Raw Material Silos Active
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Inventory Valuation
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0D9488]">
                {formatPKR(totalValuation)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            At Current Wholesale Procurement Rates
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Days of Autonomous Feed
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
        <h3 className="text-base font-semibold text-[#0F172A] mb-0.5">
          Raw Materials & Pre-Mix Stock Levels
        </h3>
        <p className="text-xs text-[#64748B] mb-3">
          Visual silo fill levels, safety thresholds, unit costs, and supplier info
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
                          Low Stock
                        </span>
                      )}
                      {status === 'Critical' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20">
                          <AlertCircle className="w-3 h-3 mr-1 text-[#DC2626]" />
                          Critical
                        </span>
                      )}
                      {status === 'Out of Stock' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-300">
                          Out of Stock
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
    </div>
  );
}
