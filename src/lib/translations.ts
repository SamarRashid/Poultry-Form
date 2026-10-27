export type Language = 'en' | 'ur';

export const translations = {
  en: {
    // Brand
    brandName: 'Flockora',
    tagline: 'Smart Poultry. Better Operations.',
    subtitle: 'Farm Intelligence',
    roleAdmin: 'Farm Administrator',
    systemCompliance: 'Commercial Layer Farm Management Platform • Pakistan Standard Telemetry',
    copyright: '© 2026 Flockora • Smart Poultry. Better Operations.',

    // Navigation Groups
    navWorkspace: 'WORKSPACE',
    navOperations: 'OPERATIONS',
    navInsights: 'INSIGHTS',
    navPreferences: 'PREFERENCES',

    // Navigation Items
    navDashboard: 'Dashboard',
    navEggProduction: 'Egg Production',
    navFlockManagement: 'Flock Management',
    navFeedInventory: 'Feed Inventory',
    navFeedConsumption: 'Feed Consumption',
    navExpenses: 'Expenses',
    navCashBook: 'Cash Book',
    navReports: 'Reports',
    navSettings: 'Settings',

    // Header
    todayBadge: 'Today (26 Oct 2026)',
    notificationsTitle: 'Telemetry Alerts',
    markAllRead: 'Mark all as read',

    // Dashboard Heading
    dashTitle: 'Operations Dashboard',
    dashSubtitle: 'Real-time commercial layer yield, flock performance, and feed telemetry.',
    quickEntry: 'Quick Entry',
    logFarmOperation: 'Log Farm Operation',

    // KPI Cards
    kpiEggLabel: "Today's Egg Production",
    kpiEggDesc: 'Collected today across Sheds 1, 2 & 3',
    kpiEggUnit: 'eggs',
    kpiEggComparison: 'vs yesterday',
    kpiBirdsLabel: 'Active Birds',
    kpiBirdsDesc: 'Current layers (excludes mortality)',
    kpiBirdsUnit: 'birds',
    kpiBirdsSecondary: '3 Active Sheds · 99.9% viability',
    kpiFeedLabel: 'Feed Consumed Today',
    kpiFeedDesc: 'Dispensed to automated hoppers',
    kpiFeedUnit: 'kg',
    kpiFeedSecondary: 'FCR 1.48 kg / kg egg mass',
    kpiExpenseLabel: "Today's Expenses",
    kpiExpenseDesc: 'Operating disbursements in PKR',
    kpiExpenseSecondary: '3 verified vouchers recorded',
    actionDetails: 'Details',
    actionFlocks: 'Flocks',
    actionRations: 'Rations',
    actionLedger: 'Ledger',

    // Egg Production Chart
    chartTitle: 'Egg Production Trend',
    chartTag: 'Commercial Layer Yield',
    chartDesc: 'Daily collection yield across Shed 1 (Lohmann), Shed 2 (Hy-Line), and Shed 3 (Novogen)',
    modeTotal: 'Total',
    modeByShed: 'By Shed',
    range7Days: '7 Days',
    range30Days: '30 Days',
    statTotalYield: 'Total Yield (Period):',
    statDailyAvg: 'Daily Average:',
    statPeakDay: 'Peak Collection:',

    // Quick Actions
    qaTitle: 'Quick Operational Entries',
    qaSubtitle: 'Direct telemetry logging and commercial entries',
    qaTag: 'Fast Actions',
    qaEggTitle: 'Record Egg Production',
    qaEggDesc: 'Morning & evening crates by shed',
    qaAddFeedTitle: 'Add Feed Stock',
    qaAddFeedDesc: 'Receive grain or premix delivery',
    qaFeedUsageTitle: 'Record Feed Usage',
    qaFeedUsageDesc: 'Dispense to automated hoppers',
    qaExpenseTitle: 'Add Expense',
    qaExpenseDesc: 'Log operating disbursements',

    // Feed Stock Card
    feedCardTitle: 'Feed Silo Inventory',
    feedCardSubtitle: 'Available grain and premix stock vs configured safety thresholds',
    feedFilterAll: 'All',
    feedFilterAlerts: 'Alerts',
    feedColMaterial: 'Feed Material',
    feedColStock: 'Available Stock',
    feedColMin: 'Min Threshold',
    feedColStatus: 'Stock Status',
    statusInStock: 'In Stock',
    statusLowStock: 'Low Stock',
    statusCritical: 'Critical',
    viewFullInventory: 'View Full Inventory & Procurement Logs',
  },

  ur: {
    // Brand
    brandName: 'فلاکوورا',
    tagline: 'اسمارٹ پولٹری۔ بہتر انتظام۔',
    subtitle: 'فارم انٹیلی جنس',
    roleAdmin: 'فارم ایڈمنسٹریٹر',
    systemCompliance: 'کمرشل لیئر فارم مینجمنٹ پلیٹ فارم • پاکستان اسٹینڈرڈ ٹیلی میٹری',
    copyright: '© 2026 فلاکوورا • اسمارٹ پولٹری۔ بہتر انتظام۔',

    // Navigation Groups
    navWorkspace: 'ورک اسپیس',
    navOperations: 'آپریشنز',
    navInsights: 'تجزیات',
    navPreferences: 'ترجیحات',

    // Navigation Items
    navDashboard: 'ڈیش بورڈ',
    navEggProduction: 'انڈوں کی پیداوار',
    navFlockManagement: 'فلاک کا انتظام',
    navFeedInventory: 'خوراک کا اسٹاک',
    navFeedConsumption: 'خوراک کی کھپت',
    navExpenses: 'اخراجات',
    navCashBook: 'کیش بک (کھاتہ)',
    navReports: 'رپورٹس',
    navSettings: 'سیٹنگز',

    // Header
    todayBadge: 'آج (26 اکتوبر 2026)',
    notificationsTitle: 'ٹیلی میٹری الرٹس',
    markAllRead: 'سب کو پڑھا ہوا نشان زد کریں',

    // Dashboard Heading
    dashTitle: 'آپریشنز ڈیش بورڈ',
    dashSubtitle: 'کمرشل لیئر پیداوار، فلاک کارکردگی اور خوراک کی لائیو ٹیلی میٹری۔',
    quickEntry: 'فوری اندراج',
    logFarmOperation: 'فارم آپریشن درج کریں',

    // KPI Cards
    kpiEggLabel: 'آج کی انڈوں کی پیداوار',
    kpiEggDesc: 'شیڈ 1، 2 اور 3 سے آج کا مجموعی کلیکشن',
    kpiEggUnit: 'انڈے',
    kpiEggComparison: 'گزشتہ کل کے مقابلے میں',
    kpiBirdsLabel: 'فعال مرغیاں',
    kpiBirdsDesc: 'موجودہ زندہ مرغیاں (اموات کے علاوہ)',
    kpiBirdsUnit: 'مرغیاں',
    kpiBirdsSecondary: '3 فعال شیڈز · 99.9% حیات کی شرح',
    kpiFeedLabel: 'آج کی خوراک کی کھپت',
    kpiFeedDesc: 'خودکار ہوپرز میں تقسیم کی گئی',
    kpiFeedUnit: 'کلوگرام',
    kpiFeedSecondary: 'ایف سی آر 1.48 کلو / کلوگرام انڈے',
    kpiExpenseLabel: 'آج کے اخراجات',
    kpiExpenseDesc: 'پاکستانی روپے میں یومیہ ادائیگیاں',
    kpiExpenseSecondary: '3 تصدیق شدہ واؤچرز درج',
    actionDetails: 'تفصیلات',
    actionFlocks: 'فلاکس',
    actionRations: 'راشن',
    actionLedger: 'کھاتہ',

    // Egg Production Chart
    chartTitle: 'انڈوں کی پیداوار کا رجحان',
    chartTag: 'کمرشل لیئر پیداوار',
    chartDesc: 'شیڈ 1 (لوہمن)، شیڈ 2 (ہائی لائن) اور شیڈ 3 (نوووجن) کی یومیہ پیداوار',
    modeTotal: 'مجموعی',
    modeByShed: 'شیڈ کے لحاظ سے',
    range7Days: '7 دن',
    range30Days: '30 دن',
    statTotalYield: 'مجموعی پیداوار (مدت):',
    statDailyAvg: 'یومیہ اوسط:',
    statPeakDay: 'زیادہ سے زیادہ پیداوار:',

    // Quick Actions
    qaTitle: 'فوری آپریشنل اندراجات',
    qaSubtitle: 'براہ راست ٹیلی میٹری لاگنگ اور کمرشل ریکارڈز',
    qaTag: 'فوری کارروائیاں',
    qaEggTitle: 'انڈوں کی پیداوار درج کریں',
    qaEggDesc: 'صبح اور شام کے کریٹس شیڈ کے لحاظ سے',
    qaAddFeedTitle: 'خوراک کا اسٹاک شامل کریں',
    qaAddFeedDesc: 'اناج یا پری مکس کی ڈیلیوری وصول کریں',
    qaFeedUsageTitle: 'خوراک کی کھپت درج کریں',
    qaFeedUsageDesc: 'خودکار ہوپرز میں تقسیم کریں',
    qaExpenseTitle: 'خرچ درج کریں',
    qaExpenseDesc: 'آپریشنل اخراجات کا اندراج کریں',

    // Feed Stock Card
    feedCardTitle: 'خوراک کے سائلو کا ذخیرہ',
    feedCardSubtitle: 'دستیاب اناج کا ذخیرہ اور محفوظ حد کی صورتحال',
    feedFilterAll: 'تمام',
    feedFilterAlerts: 'الرٹس',
    feedColMaterial: 'خوراک کا مواد',
    feedColStock: 'دستیاب اسٹاک',
    feedColMin: 'کم از کم حد',
    feedColStatus: 'اسٹاک کی حالت',
    statusInStock: 'اسٹاک موجود ہے',
    statusLowStock: 'کم اسٹاک',
    statusCritical: 'انتہائی کم',
    viewFullInventory: 'مکمل انوینٹری اور سپلائی لاگز دیکھیں',
  },
};
