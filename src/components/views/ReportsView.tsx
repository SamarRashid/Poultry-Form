'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Calendar,
  Filter,
  Eye,
  TrendingUp,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  frequency: string;
  type: string;
  category: 'production' | 'financial' | 'feed' | 'biosecurity';
  period: string;
  recordsSummary: string;
  fileSize: string;
  generatedDate: string;
}

export default function ReportsView() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'production' | 'financial' | 'feed' | 'biosecurity'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const reportsList: ReportItem[] = [
    {
      id: 'rep-01',
      title: 'Daily Harvest & Dispatch Reconciliation',
      frequency: 'Daily Cycle',
      type: 'Production Report',
      category: 'production',
      period: 'Today (26 Oct 2026)',
      recordsSummary: '12,450 eggs harvested · 34 commercial crates dispatched · 99.8% grade-A rating',
      fileSize: '1.4 MB',
      generatedDate: '26 Oct 2026, 05:00 PM',
    },
    {
      id: 'rep-02',
      title: 'Weekly Feed Conversion Ratio (FCR) Statement',
      frequency: 'Weekly Summary',
      type: 'Feed Analytics',
      category: 'feed',
      period: 'Week 43 (19 - 25 Oct 2026)',
      recordsSummary: '1.48 kg feed / kg egg mass (Standard benchmark: 1.52) · 12,400 kg consumed',
      fileSize: '2.1 MB',
      generatedDate: '25 Oct 2026, 11:30 PM',
    },
    {
      id: 'rep-03',
      title: 'Flock Biosecurity, Vaccination & Mortality Audit',
      frequency: 'Monthly Audit',
      type: 'Veterinary Audit',
      category: 'biosecurity',
      period: 'October 2026',
      recordsSummary: '15,000 layers tracked · 0.02% natural mortality · Newcastle booster administered',
      fileSize: '3.8 MB',
      generatedDate: '24 Oct 2026, 02:15 PM',
    },
    {
      id: 'rep-04',
      title: 'Monthly Cash Flow & Operational Expenditure Ledger',
      frequency: 'Monthly Fiscal',
      type: 'Financial Ledger',
      category: 'financial',
      period: 'October 2026 (Month-to-Date)',
      recordsSummary: 'PKR 1,420,000 Gross Sales · PKR 480,500 Operating Costs · PKR 939,500 Net Margin',
      fileSize: '2.9 MB',
      generatedDate: '26 Oct 2026, 04:30 PM',
    },
    {
      id: 'rep-05',
      title: 'Shed Environmental Climate & IoT Telemetry Log',
      frequency: 'Continuous 7-Day',
      type: 'Telemetry Data',
      category: 'production',
      period: 'Last 7 Days',
      recordsSummary: 'Average temp 23.8°C · Avg humidity 64% · 0 ventilation failure incidents',
      fileSize: '4.5 MB',
      generatedDate: '26 Oct 2026, 01:00 PM',
    },
    {
      id: 'rep-06',
      title: 'Feed Silo Stock Replenishment & Vendor Receipts',
      frequency: 'Shipment Audit',
      type: 'Procurement Log',
      category: 'feed',
      period: 'October 2026',
      recordsSummary: '24,000 kg received · 3 supplier consignments verified · 100% moisture test passed',
      fileSize: '1.8 MB',
      generatedDate: '22 Oct 2026, 09:45 AM',
    },
  ];

  const filteredReports = reportsList.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Report "${title}" has been successfully generated and saved as PDF.`);
    }, 700);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Header Card matching Flockora Design System */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#172033]">
              Executive Farm Reports & Audit Statements
            </h2>
            <p className="text-xs text-[#64748B]">
              Automated intelligence statements for production cycles, feed efficiency, and tax audits
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-[#172033] text-xs font-semibold rounded-lg border border-[#E2E8F0] shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#64748B]" />
            <span>Print Summary</span>
          </button>
          <button
            onClick={() => alert('Exporting all operational reports bundle (ZIP)...')}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0D9488] hover:bg-[#0b7d73] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export All (PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Available Reports</span>
            <FileText className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#172033]">6 Reports</div>
          <p className="mt-1 text-[11px] text-[#64748B]">Updated in real-time</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Audit Status</span>
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#172033]">100% Verified</div>
          <p className="mt-1 text-[11px] text-[#0D9488] font-medium">Compliant with farm standards</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Production Cycle</span>
            <TrendingUp className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#172033]">92.8% Yield</div>
          <p className="mt-1 text-[11px] text-[#64748B]">Above target (88.0%)</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Fiscal Month</span>
            <Calendar className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#172033]">October 2026</div>
          <p className="mt-1 text-[11px] text-[#64748B]">6 days remaining in cycle</p>
        </div>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Statements' },
          { key: 'production', label: 'Production & Harvest' },
          { key: 'feed', label: 'Feed & FCR Ratios' },
          { key: 'financial', label: 'Financial & Ledger' },
          { key: 'biosecurity', label: 'Biosecurity & Health' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === tab.key
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#172033] hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((rep) => {
          const isDownloading = downloadingId === rep.id;

          return (
            <div
              key={rep.id}
              className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:border-teal-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                    {rep.type}
                  </span>
                  <span className="text-xs text-[#64748B] font-medium flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-[#64748B]" />
                    {rep.period}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#172033] mt-2">{rep.title}</h3>

                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  {rep.recordsSummary}
                </p>

                <div className="mt-3 flex items-center space-x-3 text-[11px] text-[#64748B]">
                  <span>Size: {rep.fileSize}</span>
                  <span>&bull;</span>
                  <span>Generated: {rep.generatedDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#0D9488] flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#0D9488]" />
                  Verified Audit Record
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => alert(`Previewing statement for: ${rep.title}`)}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#172033] font-semibold text-xs border border-[#E2E8F0] cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#64748B]" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(rep.id, rep.title)}
                    disabled={isDownloading}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0b7d73] text-white font-semibold text-xs shadow-xs cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading ? 'Exporting...' : 'Export PDF'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
