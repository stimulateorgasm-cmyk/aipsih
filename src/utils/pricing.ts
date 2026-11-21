/**
 * Pricing, counter targets, and copy integrity helpers for Indigo AI Command landing.
 */

export interface TeamRoleCost {
  role: string;
  cost: number | string;
  targetCounter: number;
  monthlyDisplay: string;
}

export const TEAM_ROLES: TeamRoleCost[] = [
  { role: 'Маркетолог', cost: 150000, targetCounter: 150000, monthlyDisplay: '150 000' },
  { role: 'Дизайнер', cost: 100000, targetCounter: 100000, monthlyDisplay: '100 000' },
  { role: 'Копирайтер', cost: 80000, targetCounter: 80000, monthlyDisplay: '80 000' },
  { role: 'Разработчик', cost: 200000, targetCounter: 200000, monthlyDisplay: '200 000' },
  { role: 'Фотограф', cost: 'по съёмкам', targetCounter: 15000, monthlyDisplay: 'по съёмкам' },
];

export const MASTERMIND_PRICE = 35000;
export const AI_SUBSCRIPTION_APPROX = 5000;
export const LIVE_TEAM_MONTHLY_TOTAL = 500000;

export function calculateLiveTeamNumericSum(): number {
  return TEAM_ROLES.reduce((acc, curr) => {
    return typeof curr.cost === 'number' ? acc + curr.cost : acc;
  }, 0);
}

export function calculateMonthlySavings(): number {
  return LIVE_TEAM_MONTHLY_TOTAL - AI_SUBSCRIPTION_APPROX;
}

export function formatNumberWithSpaces(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatRubles(amount: number): string {
  return formatNumberWithSpaces(amount) + ' ₽';
}

export function interpolateCounter(target: number, progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  // easeOutExpo curve
  const eased = clamped === 1 ? 1 : 1 - Math.pow(2, -10 * clamped);
  return Math.round(target * eased);
}
