'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import KpiCard from '@/components/dashboard/KpiCard';
import EggProductionChart from '@/components/dashboard/EggProductionChart';
import QuickActions from '@/components/dashboard/QuickActions';
import FeedStockCard from '@/components/dashboard/FeedStockCard';
import QuickActionModal, { QuickActionType } from '@/components/modals/QuickActionModal';
import {
  initialKpis,
  initialFeedInventory,
  initialActivities,
} from '@/data/farmData';
import { formatNumber, formatPKR } from '@/lib/utils';
import { Egg, Users, Wheat, Receipt } from 'lucide-react';
import { FarmActivity } from '@/types/farm';
import { useLanguage } from '@/context/LanguageContext';

export default function FarmDashboardPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeQuickAction, setActiveQuickAction] = useState<QuickActionType>(null);
  const [kpis, setKpis] = useState(initialKpis);
  const [inventory] = useState(initialFeedInventory);
  const [, setActivities] = useState<FarmActivity[]>(initialActivities);

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

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Dashboard Heading with Quick Entry Actions */}
      <DashboardHeading
        onTriggerQuickAction={(action) => setActiveQuickAction(action)}
      />

      {/* 4 Premium KPI Cards */}
      <section aria-label="Key Performance Indicators">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Egg Production */}
          <KpiCard
            label={t.kpiEggLabel}
            value={formatNumber(kpis.todayEggs)}
            unit={t.kpiEggUnit}
            description={t.kpiEggDesc}
            change={{
              value: `+${formatNumber(kpis.todayEggs - kpis.yesterdayEggs)} (+${kpis.eggChangePercent}%)`,
              isPositive: true,
              comparisonText: t.kpiEggComparison,
            }}
            icon={Egg}
            isPrimary={true}
            sparklinePoints={[12050, 12150, 12220, 12110, 12300, 12130, kpis.todayEggs]}
            actionText={t.actionDetails}
            onAction={() => router.push('/egg-production')}
          />

          {/* Card 2: Active Birds */}
          <KpiCard
            label={t.kpiBirdsLabel}
            value={formatNumber(kpis.activeBirds)}
            unit={t.kpiBirdsUnit}
            description={t.kpiBirdsDesc}
            secondaryInfo={t.kpiBirdsSecondary}
            icon={Users}
            isPrimary={false}
            actionText={t.actionFlocks}
            onAction={() => router.push('/flock-management')}
          />

          {/* Card 3: Feed Consumed Today */}
          <KpiCard
            label={t.kpiFeedLabel}
            value={formatNumber(kpis.todayFeedUsedKg)}
            unit={t.kpiFeedUnit}
            description={t.kpiFeedDesc}
            secondaryInfo={t.kpiFeedSecondary}
            icon={Wheat}
            isPrimary={false}
            actionText={t.actionRations}
            onAction={() => router.push('/feed-inventory')}
          />

          {/* Card 4: Today's Expenses */}
          <KpiCard
            label={t.kpiExpenseLabel}
            value={formatPKR(kpis.todayExpensesPKR)}
            description={t.kpiExpenseDesc}
            secondaryInfo={t.kpiExpenseSecondary}
            icon={Receipt}
            isPrimary={false}
            actionText={t.actionLedger}
            onAction={() => router.push('/expenses')}
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
          onViewInventory={() => router.push('/feed-inventory')}
        />
      </section>

      {/* Quick Action Interactive Modal */}
      <QuickActionModal
        actionType={activeQuickAction}
        onClose={() => setActiveQuickAction(null)}
        onAddActivity={handleAddSessionActivity}
      />
    </div>
  );
}
