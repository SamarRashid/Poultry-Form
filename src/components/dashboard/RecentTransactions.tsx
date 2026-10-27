'use client';

import React from 'react';
import {
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from 'lucide-react';
import { initialTransactions } from '@/data/mockFarmData';
import { formatPKR } from '@/lib/utils';
import { CashTransaction } from '@/types/farm';

interface RecentTransactionsProps {
  transactions?: CashTransaction[];
  onViewCashBook: () => void;
}

export default function RecentTransactions({
  transactions = initialTransactions,
  onViewCashBook,
}: RecentTransactionsProps) {
  return (
    <div className="flockora-card p-4 sm:p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-slate-100 text-[#172033] rounded-lg">
              <Banknote className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#172033] tracking-tight">
                Recent Transactions
              </h2>
              <p className="text-xs text-[#64748B] font-normal">
                Wholesale egg sales and farm operating disbursements
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Rows */}
        <div className="mt-2 divide-y divide-[#E2E8F0] text-xs">
          {transactions.slice(0, 4).map((tx) => {
            const isIncome = tx.type === 'Income';

            return (
              <div
                key={tx.id}
                className="py-2.5 flex items-center justify-between hover:bg-[#F3F6FA]/60 px-1 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isIncome
                        ? 'bg-[#15803D]/10 text-[#15803D]'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#172033] truncate">
                      {tx.description}
                    </p>
                    <div className="flex items-center space-x-1.5 text-[10px] text-[#64748B] mt-0.5">
                      <span>{tx.date}</span>
                      <span>&bull;</span>
                      <span className="font-mono">{tx.referenceNo}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-semibold ${
                      isIncome ? 'text-[#15803D]' : 'text-[#172033]'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatPKR(tx.amountPKR)}
                  </div>
                  <span
                    className={`inline-block text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                      isIncome
                        ? 'bg-[#15803D]/10 text-[#15803D]'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {tx.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#64748B] font-normal">
          Verified general ledger entries
        </span>
        <button
          onClick={onViewCashBook}
          className="inline-flex items-center text-[11px] font-semibold text-[#0D9488] hover:text-[#0f766e] transition-colors cursor-pointer"
        >
          <span>View Cash Book</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
