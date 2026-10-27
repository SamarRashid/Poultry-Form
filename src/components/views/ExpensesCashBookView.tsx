'use client';

import React from 'react';
import { Banknote, Plus, Download } from 'lucide-react';
import { initialTransactions } from '@/data/mockFarmData';
import { formatPKR } from '@/lib/utils';

interface ExpensesCashBookViewProps {
  onOpenAddExpenseModal: () => void;
}

export default function ExpensesCashBookView({
  onOpenAddExpenseModal,
}: ExpensesCashBookViewProps) {
  const totalInflow = initialTransactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amountPKR, 0);

  const totalOutflow = initialTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amountPKR, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Commercial Cash Book & Expense Ledger
            </h2>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              Daily egg wholesale receivables, feed supplier settlements, and operating expenses in PKR
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddExpenseModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Operating Expense</span>
        </button>
      </div>

      {/* Financial Ledger Flow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Total Receipts (Inflow)
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#15803D]">
                {formatPKR(totalInflow)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            Egg Wholesale & Byproducts
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Operating Outflow
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#DC2626]">
                {formatPKR(totalOutflow)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            Feed, Diesel & Biosecurity
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              Operating Net Surplus
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatPKR(totalInflow - totalOutflow)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#0D9488]/10 text-[#0D9488]">
              Operating Cash Buffer
            </span>
          </div>
        </div>
      </div>

      {/* Full Transaction Table */}
      <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-[#0F172A]">Financial Vouchers & Invoices</h3>
            <p className="text-xs text-[#64748B]">
              Verified entries recorded by farm accountant & operations director
            </p>
          </div>
          <button
            onClick={() => alert('Exporting Cash Book ledger to CSV/Excel...')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wider bg-slate-50/80">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Reference #</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-right">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {initialTransactions.map((tx) => {
                const isIncome = tx.type === 'Income';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 text-[#64748B] whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-3 font-mono font-medium text-[#0F172A]">{tx.referenceNo}</td>
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">{tx.description}</td>
                    <td className="py-3 px-3 text-[#64748B]">{tx.category}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                          isIncome
                            ? 'bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/20'
                            : 'bg-slate-100 text-[#64748B] border border-slate-200'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-semibold whitespace-nowrap ${
                        isIncome ? 'text-[#15803D]' : 'text-[#0F172A]'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {formatPKR(tx.amountPKR)}
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
