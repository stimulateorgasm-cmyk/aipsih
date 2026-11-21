import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  TEAM_ROLES,
  calculateLiveTeamNumericSum,
  calculateMonthlySavings,
  formatRubles,
  formatNumberWithSpaces,
  interpolateCounter,
  LIVE_TEAM_MONTHLY_TOTAL,
} from './pricing.ts';

test('team roles have all 5 members and exact counter targets', () => {
  assert.equal(TEAM_ROLES.length, 5);
  assert.deepEqual(
    TEAM_ROLES.map((r) => [r.role, r.targetCounter]),
    [
      ['Маркетолог', 150000],
      ['Дизайнер', 100000],
      ['Копирайтер', 80000],
      ['Разработчик', 200000],
      ['Фотограф', 15000],
    ]
  );
});

test('numeric sum of roles equals 530000 and LIVE_TEAM_MONTHLY_TOTAL is 500000', () => {
  assert.equal(calculateLiveTeamNumericSum(), 530000);
  assert.equal(LIVE_TEAM_MONTHLY_TOTAL, 500000);
  assert.equal(calculateMonthlySavings(), 495000);
});

test('formatNumberWithSpaces and formatRubles format Russian thousands accurately', () => {
  assert.equal(formatNumberWithSpaces(150000), '150 000');
  assert.equal(formatNumberWithSpaces(15000), '15 000');
  assert.equal(formatRubles(35000), '35 000 ₽');
  assert.equal(formatRubles(500000), '500 000 ₽');
});

test('interpolateCounter starts at 0 and reaches exact target at progress 1', () => {
  assert.equal(interpolateCounter(150000, 0), 0);
  assert.equal(interpolateCounter(150000, 1), 150000);
  const mid = interpolateCounter(200000, 0.5);
  assert.ok(mid > 100000 && mid < 200000);
});

test('standalone.html contains all required copy, 4 new blocks, and zero external CDNs', () => {
  const htmlPath = path.resolve(import.meta.dirname, '../../public/standalone.html');
  if (!fs.existsSync(htmlPath)) {
    assert.fail('public/standalone.html must exist');
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  // No external Google Fonts or JS CDN links
  assert.equal(/fonts\.googleapis\.com|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com/i.test(html), false);

  // Required verbatim copy checks
  const requiredPhrases = [
    'Мастермайнд для практиков и экспертов',
    'Твоя <em>AI-команда</em>',
    'Сначала — посмотри, как это работает',
    'Я записал видео на 54 минуты: показал свою AI-команду вживую',
    'Смотреть видео',
    'Видео бесплатное. В конце — кодовое слово и подарок',
    'Сколько стоит такая команда, если нанимать живых людей',
    '≈ 500 000 ₽ в месяц',
    'Та же команда — у тебя',
    'Что тебе упакует AI-команда',
    'Два результата, ради которых всё это',
    'Ассистент с руками',
    'Как собирается твоя команда',
    'Нейроданные в твоём кабинете',
    'Это не магия и не «будущее». Это уже работает.',
    '5 часов',
    '1,5 часа',
    '1 сообщение',
    'Кому подойдёт',
    'Стоимость участия',
    '35 000 ₽',
    'Что нужно, кроме участия.',
    'Не покупай вслепую. Сначала — разберём, что это даст тебе',
    'Записаться на разбор',
    'Без продажи в лоб. Сначала разбираем твою задачу.',
    'Антон Шумкин — психолог-гипнотерапевт, 12+ лет в маркетинге и бизнесе, автор книги «Терапия оргазмом», кандидатская диссертация по нейродатчикам',
    '@media print',
  ];

  for (const phrase of requiredPhrases) {
    assert.ok(html.includes(phrase), `Missing required phrase in standalone.html: ${phrase}`);
  }
});
