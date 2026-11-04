import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TEAM_ROLES,
  calculateLiveTeamNumericSum,
  calculateMonthlySavings,
  formatRubles,
  LIVE_TEAM_MONTHLY_TOTAL,
  MASTERMIND_PRICE
} from './pricing.ts';

test('team roles have all 5 members from original copy', () => {
  assert.equal(TEAM_ROLES.length, 5);
  const roles = TEAM_ROLES.map(r => r.role);
  assert.deepEqual(roles, ['Маркетолог', 'Дизайнер', 'Копирайтер', 'Разработчик', 'Фотограф']);
});

test('numeric sum of roles equals 530000 without photographer (≈ 500 000 ₽ total target)', () => {
  const sum = calculateLiveTeamNumericSum();
  assert.equal(sum, 530000);
  assert.equal(LIVE_TEAM_MONTHLY_TOTAL, 500000);
});

test('monthly savings calculation shows massive budget relief', () => {
  const savings = calculateMonthlySavings();
  assert.equal(savings, 495000);
});

test('formatRubles correctly spaces thousands and appends ruble sign', () => {
  assert.equal(formatRubles(35000), '35 000 ₽');
  assert.equal(formatRubles(500000), '500 000 ₽');
});
