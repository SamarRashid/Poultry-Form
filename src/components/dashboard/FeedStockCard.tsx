'use client';

import React, { useState } from 'react';
import { Boxes, AlertTriangle, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { initialFeedInventory } from '@/data/mockFarmData';
import { deriveFeedStatus, formatNumber } from '@/lib/utils';
import { FeedInventoryItem } from '@/types/farm';

interface FeedStockCardProps {
  onViewInventory: () => void;
  items?: FeedInventoryItem[];
}

export default function FeedStockCard({
  onViewInventory,
  items = initialFeedInventory,
}: FeedStockCardProps) {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Alerts') {
      const status = deriveFeedStatus(item.availableStockKg, item.minimumStockKg);
      return status === 'Low Stock' || status === 'Critical' || status === 'Out of Stock';
    }
    return true;
  });

  const lowStockCount = items.filter((item) => {
    const s = deriveFeedStatus(item.availableStockKg, item.minimumStockKg);
    return s === 'Low Stock' || s === 'Critical' || s === 'Out of Stock';
  }).length;

  return (
    <div className="flockora-card p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-slate-100 text-[#172033] rounded-lg">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-semibold text-[#172033] tracking-tight">
                  Feed Silo Inventory
                </h2>
                {lowStockCount > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30">
                    <AlertTriangle className="w-2.5 h-2.5 mr-1 text-[#D97706]" />
                    {lowStockCount} Reorder Alerts
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748B] font-normal">
                Available grain and premix stock vs configured safety thresholds
              </p>
            </div>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center bg-[#F3F6FA] border border-[#E2E8F0] p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterCategory('All')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === 'All'
                  ? 'bg-white text-[#172033] shadow-xs font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setFilterCategory('Alerts')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterCategory === 'Alerts'
                  ? 'bg-[#0D9488] text-white font-semibold'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Alerts ({lowStockCount})
            </button>
          </div>
        </div>

        {/* Table of Inventory */}
        <div className="mt-3 overflow-x-auto">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#64748B]">
              No inventory items match filter.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wider bg-[#F3F6FA]/80">
                  <th scope="col" className="py-2 px-2.5">
                    Feed Material
                  </th>
                  <th scope="col" className="py-2 px-2.5">
                    Available Stock
                  </th>
                  <th scope="col" className="py-2 px-2.5">
                    Min Threshold
                  </th>
                  <th scope="col" className="py-2 px-2.5 text-right">
                    Stock Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredItems.map((item) => {
                  const status = deriveFeedStatus(item.availableStockKg, item.minimumStockKg);

                  return (
                    <tr key={item.id} className="hover:bg-[#F3F6FA]/60 transition-colors">
                      <td className="py-2.5 px-2.5">
                        <div className="font-semibold text-[#172033]">{item.material}</div>
                        <div className="text-[10px] text-[#64748B] font-normal">
                          {item.category}
                        </div>
                      </td>

                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <span className="font-semibold text-[#172033]">
                          {formatNumber(item.availableStockKg)}
                        </span>{' '}
                        <span className="text-[10px] text-[#64748B]">{item.unit}</span>
                      </td>

                      <td className="py-2.5 px-2.5 whitespace-nowrap text-[#64748B]">
                        <span>{formatNumber(item.minimumStockKg)}</span>{' '}
                        <span className="text-[10px]">{item.unit}</span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right whitespace-nowrap">
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
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#64748B] font-normal">
          Calculated from automated silo sensors & receipts
        </span>
        <button
          onClick={onViewInventory}
          className="inline-flex items-center text-[11px] font-semibold text-[#0D9488] hover:text-[#0f766e] transition-colors cursor-pointer"
        >
          <span>View Inventory</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
