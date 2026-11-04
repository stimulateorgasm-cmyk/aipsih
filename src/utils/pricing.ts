/**
 * Pricing and comparison helpers for Indigo AI Command mastermind landing.
 */

export interface TeamRoleCost {
  role: string;
  cost: number | string;
  monthlyDisplay: string;
}

export const TEAM_ROLES: TeamRoleCost[] = [
  { role: 'Маркетолог', cost: 150000, monthlyDisplay: '150 000' },
  { role: 'Дизайнер', cost: 100000, monthlyDisplay: '100 000' },
  { role: 'Копирайтер', cost: 80000, monthlyDisplay: '80 000' },
  { role: 'Разработчик', cost: 200000, monthlyDisplay: '200 000' },
  { role: 'Фотограф', cost: 'по съёмкам', monthlyDisplay: 'по съёмкам' },
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

export function formatRubles(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
}
