# Flockora — Enterprise Poultry & Layer Farm Management Platform

Flockora is a comprehensive, production-ready SaaS management dashboard engineered for modern commercial layer farms and poultry operations. The platform integrates real-time daily egg harvesting analytics, flock demographics, feed stock monitoring, automated telemetry thresholds, and fiscal cash book reconciliation.

## Core Capabilities

- **Operations Dashboard**: Real-time layer yield metrics, active bird tracking, daily feed usage, and daily expense summaries.
- **Egg Production Intelligence**: Shed-by-shed yield logs, 7-day and 30-day collection curves, damaged egg sorting, and efficiency percentages.
- **Flock Demographics & Viability**: Live flock demographics (Lohmann Brown, Hy-Line W-36, Novogen Brown), bird age, mortality rates, and closed-shed climate telemetry.
- **Feed Silo Inventory & FCR Ratios**: Live silo fill percentages, automated reorder buffer warnings, supplier delivery tracking, and Feed Conversion Ratio (FCR) telemetry.
- **Expenses & Cash Book Ledger**: Complete voucher tracking in PKR, invoice receipts, vendor payments, and instant CSV ledger export.
- **Executive Audit Reports**: Automated production reports, feed efficiency statements, and biosecurity audit sheets ready for print or PDF export.
- **Platform Configuration**: Enterprise profile controls, IoT climate alert thresholds, and multi-channel SMS/WhatsApp notifications.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Data Visualizations**: Recharts
- **Architecture**: Fully responsive, client-first interactive UI

## Getting Started

1. Install project dependencies:
```bash
npm install
```

2. Start the local development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Production Build

To test and compile an optimized production distribution:
```bash
npm run build
npm run start
```
