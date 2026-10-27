import { FeedStatus } from "@/types/farm";

/**
 * Format currency in Pakistani Rupees (PKR)
 * Example: 48500 -> "PKR 48,500"
 */
export function formatPKR(amount: number, prefix: string = 'PKR '): string {
  const formatted = Math.abs(amount).toLocaleString('en-PK', {
    maximumFractionDigits: 0,
  });
  return `${amount < 0 ? '-' : ''}${prefix}${formatted}`;
}

/**
 * Format standard number with commas
 * Example: 12450 -> "12,450"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Derive Feed Status dynamically from available stock and minimum threshold
 * Follows commercial feed inventory standards:
 * - available == 0: Out of Stock
 * - available <= min * 0.5: Critical
 * - available <= min: Low Stock
 * - available > min: In Stock
 */
export function deriveFeedStatus(availableKg: number, minThresholdKg: number): FeedStatus {
  if (availableKg <= 0) {
    return 'Out of Stock';
  }
  if (availableKg <= minThresholdKg * 0.5) {
    return 'Critical';
  }
  if (availableKg <= minThresholdKg) {
    return 'Low Stock';
  }
  return 'In Stock';
}

/**
 * Get status badge style classes based on status string
 */
export function getFeedStatusConfig(status: FeedStatus): {
  badgeBg: string;
  badgeText: string;
  dotColor: string;
  borderColor: string;
  label: string;
} {
  switch (status) {
    case 'In Stock':
      return {
        badgeBg: 'bg-[#E4F4E8]',
        badgeText: 'text-[#196C46]',
        dotColor: 'bg-[#21865B]',
        borderColor: 'border-[#C2E7CA]',
        label: 'In Stock',
      };
    case 'Low Stock':
      return {
        badgeBg: 'bg-[#FFF2D5]',
        badgeText: 'text-[#966A10]',
        dotColor: 'bg-[#D6AE57]',
        borderColor: 'border-[#F4DFAC]',
        label: 'Low Stock',
      };
    case 'Critical':
      return {
        badgeBg: 'bg-[#FCE8E6]',
        badgeText: 'text-[#B92E24]',
        dotColor: 'bg-[#DC2626]',
        borderColor: 'border-[#F8C8C4]',
        label: 'Critical Level',
      };
    case 'Out of Stock':
      return {
        badgeBg: 'bg-zinc-100',
        badgeText: 'text-zinc-700',
        dotColor: 'bg-zinc-500',
        borderColor: 'border-zinc-300',
        label: 'Out of Stock',
      };
  }
}
