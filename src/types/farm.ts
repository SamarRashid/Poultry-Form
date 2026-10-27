export type FeedStatus = 'In Stock' | 'Low Stock' | 'Critical' | 'Out of Stock';

export interface EggProductionRecord {
  date: string;
  displayDate: string;
  shed1: number;
  shed2: number;
  shed3: number;
  total: number;
  damagedEggs: number;
  efficiencyRate: number; // percentage
}

export interface FlockRecord {
  id: string;
  name: string;
  breed: string;
  ageWeeks: number;
  shed: string;
  initialCount: number;
  activeBirds: number;
  mortalityToday: number;
  culledToday: number;
  status: 'Active' | 'Molting' | 'Sold';
  temperatureC: number;
  humidityPercent: number;
  eggProductionRate: number;
  feedDailyKg: number;
}

export interface FeedInventoryItem {
  id: string;
  material: string;
  category: 'Grains' | 'Protein' | 'By-Products' | 'Commercial Feed' | 'Mineral';
  availableStockKg: number;
  minimumStockKg: number;
  siloCapacityKg: number;
  unit: string;
  lastRestocked: string;
  supplier: string;
  costPerKgPKR: number;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: 'Feed' | 'Medicine & Vaccines' | 'Utilities & Fuel' | 'Maintenance' | 'Labor & Wages';
  description: string;
  amountPKR: number;
  recipient: string;
  voucherNo: string;
}

export interface CashTransaction {
  id: string;
  date: string;
  description: string;
  type: 'Income' | 'Expense';
  amountPKR: number;
  category: string;
  referenceNo: string;
}

export interface FarmActivity {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  category: 'egg' | 'feed' | 'expense' | 'inventory' | 'health';
  icon: 'egg' | 'wheat' | 'wallet' | 'boxes' | 'stethoscope';
}

export interface FarmKpiSummary {
  todayEggs: number;
  yesterdayEggs: number;
  eggChangePercent: number;
  activeBirds: number;
  activeFlocksCount: number;
  totalFlocksCapacity: number;
  todayFeedUsedKg: number;
  feedFormulationCount: number;
  todayExpensesPKR: number;
  recentExpenseCount: number;
  layingRatePercent: number;
  dailyFCR: number;
  crackedRatePercent: number;
}
