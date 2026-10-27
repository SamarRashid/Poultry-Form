'use client';

import React, { useState } from 'react';
import { Banknote, Plus, Download } from 'lucide-react';
import { initialTransactions } from '@/data/farmData';
import { formatPKR } from '@/lib/utils';
import QuickActionModal from '@/components/modals/QuickActionModal';
import { useLanguage } from '@/context/LanguageContext';

export default function ExpensesCashBookPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isUrdu } = useLanguage();

  const totalInflow = initialTransactions
    .filter((tx) => tx.type === 'Income')
    .reduce((sum, tx) => sum + tx.amountPKR, 0);

  const totalOutflow = initialTransactions
    .filter((tx) => tx.type === 'Expense')
    .reduce((sum, tx) => sum + tx.amountPKR, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-[#0D9488] rounded-lg">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              {isUrdu ? 'اخراجات اور کیش بک کھاتہ' : 'Expenses & Cash Book Ledger'}
            </h1>
            <p className="text-xs text-[#64748B] font-normal mt-0.5">
              {isUrdu
                ? 'فارم کے روزمرہ اخراجات، انڈوں کی ہول سیل سیلز، جنریٹر ڈیزل اور میڈیسن واؤچرز'
                : 'Commercial egg sales revenue, generator diesel, vaccine vouchers, and operating expenses in PKR'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isUrdu ? 'نیا خرچ درج کریں' : 'Post Operating Expense'}</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'آمدن (سیلز)' : 'Total Verified Inflow (Sales)'}
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#15803D]">
                {formatPKR(totalInflow)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="text-[11px] text-[#15803D] font-medium">+ 3 Commercial Dispatches</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'اخراجات (ادائیگیاں)' : 'Total Operating Outflow'}
            </span>
            <div className="mt-2 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {formatPKR(totalOutflow)}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs">
            <span className="text-[11px] text-[#64748B]">Fuel, feed & labor vouchers</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-[#64748B] block">
              {isUrdu ? 'خالص کیش بیلنس' : 'Net Operational Cash Margin'}
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
            <h2 className="text-base font-semibold text-[#0F172A]">
              {isUrdu ? 'مالیاتی واؤچرز اور انوائس ریکارڈز' : 'Financial Vouchers & Invoices'}
            </h2>
            <p className="text-xs text-[#64748B]">
              {isUrdu ? 'فارم اکاؤنٹنٹ اور ڈائریکٹر کے تصدیق شدہ اندراجات' : 'Verified entries recorded by farm accountant & operations director'}
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

      {/* Quick Action Modal for Expense Posting */}
      <QuickActionModal
        actionType={modalOpen ? 'add-expense' : null}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
