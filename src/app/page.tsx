'use client';

import React, { useState } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import TopHeader from '@/components/layout/TopHeader';
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import KpiCard from '@/components/dashboard/KpiCard';
import EggProductionChart from '@/components/dashboard/EggProductionChart';
import QuickActions from '@/components/dashboard/QuickActions';
import FeedStockCard from '@/components/dashboard/FeedStockCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActionModal, { QuickActionType } from '@/components/modals/QuickActionModal';
import EggProductionView from '@/components/views/EggProductionView';
import FlockManagementView from '@/components/views/FlockManagementView';
import FeedInventoryView from '@/components/views/FeedInventoryView';
import ExpensesCashBookView from '@/components/views/ExpensesCashBookView';
import ReportsView from '@/components/views/ReportsView';
import SettingsView from '@/components/views/SettingsView';

import {
  initialKpis,
  initialFeedInventory,
  initialActivities,
  initialTransactions,
} from '@/data/mockFarmData';
import { formatNumber, formatPKR } from '@/lib/utils';
import { Egg, Users, Wheat, Receipt } from 'lucide-react';
import { FarmActivity } from '@/types/farm';

export default function FarmDashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeQuickAction, setActiveQuickAction] = useState<QuickActionType>(null);
  const [selectedDateRange, setSelectedDateRange] = useState('Today (26 Oct 2026)');

  const [kpis, setKpis] = useState(initialKpis);
  const [inventory] = useState(initialFeedInventory);
  const [activities, setActivities] = useState<FarmActivity[]>(initialActivities);
  const [transactions] = useState(initialTransactions);

  const handleAddSessionActivity = (newActivity: FarmActivity) => {
    setActivities((prev) => [newActivity, ...prev]);

    if (newActivity.category === 'egg') {
      setKpis((prev) => ({
        ...prev,
        todayEggs: prev.todayEggs + 120,
      }));
    } else if (newActivity.category === 'expense') {
      setKpis((prev) => ({
        ...prev,
        todayExpensesPKR: prev.todayExpensesPKR + 15000,
      }));
    }
  };

  const isDashboardActive = activeNav === 'Dashboard' || activeNav === 'Overview';

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex flex-col font-sans text-[#172033]">
      {/* Flockora Sidebar Navigation */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        activeNav={activeNav}
        onSelectNav={(item) => setActiveNav(item)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-[250px] min-w-0 transition-all">
        {/* Top Header */}
        <TopHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          activeNav={activeNav}
          selectedDateRange={selectedDateRange}
          onSelectDateRange={(range) => setSelectedDateRange(range)}
          onOpenSettings={() => setActiveNav('Settings')}
        />

        {/* Dashboard Content Container */}
        <main
          id="main-dashboard-content"
          className="flex-1 p-4 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto space-y-5"
        >
          {isDashboardActive && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Dashboard Heading with + Quick Entry */}
              <DashboardHeading
                onTriggerQuickAction={(action) => setActiveQuickAction(action)}
              />

              {/* 4 Premium KPI Cards */}
              <section aria-label="Key Performance Indicators">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Today's Egg Production */}
                  <KpiCard
                    label="Today's Egg Production"
                    value={formatNumber(kpis.todayEggs)}
                    unit="eggs"
                    description="Collected today across Sheds 1, 2 & 3"
                    change={{
                      value: `+${formatNumber(kpis.todayEggs - kpis.yesterdayEggs)} (+${kpis.eggChangePercent}%)`,
                      isPositive: true,
                      comparisonText: 'vs yesterday',
                    }}
                    icon={Egg}
                    isPrimary={true}
                    sparklinePoints={[12050, 12150, 12220, 12110, 12300, 12130, kpis.todayEggs]}
                    actionText="Details"
                    onAction={() => setActiveNav('Egg Production')}
                  />

                  {/* Card 2: Active Birds */}
                  <KpiCard
                    label="Active Birds"
                    value={formatNumber(kpis.activeBirds)}
                    unit="birds"
                    description="Current layers (excludes mortality)"
                    secondaryInfo="3 Active Sheds · 99.9% viability"
                    icon={Users}
                    isPrimary={false}
                    actionText="Flocks"
                    onAction={() => setActiveNav('Flock Management')}
                  />

                  {/* Card 3: Feed Consumed Today */}
                  <KpiCard
                    label="Feed Consumed Today"
                    value={formatNumber(kpis.todayFeedUsedKg)}
                    unit="kg"
                    description="Dispensed to automated hoppers"
                    secondaryInfo="FCR 1.48 kg / kg egg mass"
                    icon={Wheat}
                    isPrimary={false}
                    actionText="Rations"
                    onAction={() => setActiveNav('Feed Consumption')}
                  />

                  {/* Card 4: Today's Expenses */}
                  <KpiCard
                    label="Today's Expenses"
                    value={formatPKR(kpis.todayExpensesPKR)}
                    description="Operating disbursements in PKR"
                    secondaryInfo={`${kpis.recentExpenseCount} verified vouchers recorded`}
                    icon={Receipt}
                    isPrimary={false}
                    actionText="Ledger"
                    onAction={() => setActiveNav('Expenses')}
                  />
                </div>
              </section>

              {/* Egg Production Analytics Trendline */}
              <section aria-label="Egg Production Trend">
                <EggProductionChart />
              </section>

              {/* Quick Actions Component */}
              <section aria-label="Quick Actions">
                <QuickActions
                  onTriggerAction={(action) => setActiveQuickAction(action)}
                />
              </section>

              {/* Feed Inventory */}
              <section aria-label="Feed Silo Inventory">
                <FeedStockCard
                  items={inventory}
                  onViewInventory={() => setActiveNav('Feed Inventory')}
                />
              </section>
            </div>
          )}

          {/* Sub-Views for Navigation */}
          {activeNav === 'Egg Production' && (
            <EggProductionView
              onOpenLogModal={() => setActiveQuickAction('record-eggs')}
            />
          )}

          {activeNav === 'Flock Management' && <FlockManagementView />}

          {(activeNav === 'Feed Inventory' || activeNav === 'Feed Consumption') && (
            <FeedInventoryView
              onOpenAddFeedModal={() => setActiveQuickAction('add-feed')}
            />
          )}

          {(activeNav === 'Expenses' || activeNav === 'Cash Book') && (
            <ExpensesCashBookView
              onOpenAddExpenseModal={() => setActiveQuickAction('add-expense')}
            />
          )}

          {activeNav === 'Reports' && <ReportsView />}

          {activeNav === 'Settings' && <SettingsView />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-[#E2E8F0] bg-white text-xs text-[#64748B]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <p>
              &copy; 2026 <strong>Flockora</strong> &bull; Smart Poultry. Better Operations.
            </p>
            <p className="text-[#64748B]">
              Commercial Layer Farm Management Platform &bull; Pakistan Standard Telemetry
            </p>
          </div>
        </footer>
      </div>

      {/* Quick Action Interactive Modal */}
      <QuickActionModal
        actionType={activeQuickAction}
        onClose={() => setActiveQuickAction(null)}
        onAddActivity={handleAddSessionActivity}
      />
    </div>
  );
}
