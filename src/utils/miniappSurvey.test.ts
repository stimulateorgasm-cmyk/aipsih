import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  CODE_WORD,
  SURVEY_STEPS,
  buildLeadPayload,
  buildTriggerVideoUrl,
  canAdvanceStep,
  classifySubmitStatus,
  createInitialAnswers,
  extractUtmParams,
  getActiveVideoLinkButtons,
  getProgressLabel,
  isConfiguredLink,
} from './miniappSurvey.ts';

const miniappHtmlPath = path.resolve(import.meta.dirname, '../../public/miniapp.html');

test('extractUtmParams parses utm_source, utm_medium, utm_campaign and defaults to empty string', () => {
  assert.deepEqual(extractUtmParams('?utm_source=b17&utm_medium=cpc&utm_campaign=ai_video'), {
    utm_source: 'b17',
    utm_medium: 'cpc',
    utm_campaign: 'ai_video',
  });
  assert.deepEqual(extractUtmParams(''), {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
  });
});

test('canAdvanceStep enforces required options, Другое input, and allows optional Q8', () => {
  const answers = createInitialAnswers();
  assert.equal(canAdvanceStep(0, answers), false);

  answers.role = 'Психолог';
  assert.equal(canAdvanceStep(0, answers), true);

  answers.role = 'Другое';
  assert.equal(canAdvanceStep(0, answers), false);

  answers.role_other = '   ';
  assert.equal(canAdvanceStep(0, answers), false);

  answers.role_other = 'Семейный психотерапевт';
  assert.equal(canAdvanceStep(0, answers), true);

  // Q8 is optional even when empty
  assert.equal(canAdvanceStep(7, answers), true);
});

test('getProgressLabel clamps to Шаг 7 из 7', () => {
  assert.equal(getProgressLabel(0), 'Шаг 1 из 7');
  assert.equal(getProgressLabel(6), 'Шаг 7 из 7');
  assert.equal(getProgressLabel(7), 'Шаг 7 из 7');
});

test('buildLeadPayload returns all 18 expected CRM fields including init_data and trimmed role_other', () => {
  const answers = createInitialAnswers();
  answers.role = 'Другое';
  answers.role_other = '  Гештальт-терапевт  ';
  answers.site = 'Свой сайт';
  answers.session_price = '5000–10000 ₽';
  answers.records_sessions = 'Всегда';
  answers.does_summaries = 'Вручную, после сессии';
  answers.has_assistant = 'Нет';
  answers.ai_experience = 'Только чат (DeepSeek, ChatGPT, Gemini)';
  answers.pain_point = '  Саммари и посты  ';

  const payload = buildLeadPayload({
    tgUser: { id: 123456789, first_name: 'Анна', last_name: 'Иванова', username: 'anna_psy' },
    startParam: 'b17_banner',
    initData: 'query_id=AAH&user=%7B%7D&hash=abc',
    answers,
    utm: extractUtmParams('?utm_source=b17&utm_campaign=launch'),
  });

  assert.deepEqual(Object.keys(payload), [
    'telegram_id',
    'first_name',
    'last_name',
    'username',
    'start_param',
    'init_data',
    'role',
    'role_other',
    'site',
    'session_price',
    'records_sessions',
    'does_summaries',
    'has_assistant',
    'ai_experience',
    'pain_point',
    'utm_source',
    'utm_medium',
    'utm_campaign',
  ]);
  assert.equal(payload.telegram_id, '123456789');
  assert.equal(payload.role_other, 'Гештальт-терапевт');
  assert.equal(payload.pain_point, 'Саммари и посты');
  assert.equal(payload.init_data, 'query_id=AAH&user=%7B%7D&hash=abc');
  assert.equal(payload.utm_source, 'b17');
  assert.equal(CODE_WORD, 'ЧЕЛОВЕК-ПАУК');
  assert.equal(SURVEY_STEPS.length, 8);
});

test('getActiveVideoLinkButtons hides {{...}} placeholders and reveals configured links', () => {
  assert.equal(isConfiguredLink('{{YOUTUBE_URL}}'), false);
  assert.equal(isConfiguredLink('https://youtube.com/watch?v=123'), true);
  assert.deepEqual(getActiveVideoLinkButtons(), []);

  const active = getActiveVideoLinkButtons({
    youtube: 'https://youtube.com/watch?v=abc',
    vk: '{{VK_URL}}',
    rutube: 'https://rutube.ru/video/xyz',
    download: '',
  });
  assert.deepEqual(active, [
    { key: 'youtube', label: '📺 Смотреть на YouTube', url: 'https://youtube.com/watch?v=abc' },
    { key: 'rutube', label: '🎬 Смотреть в RuTube', url: 'https://rutube.ru/video/xyz' },
  ]);
});

test('buildTriggerVideoUrl and classifySubmitStatus handle CRM responses correctly', () => {
  assert.equal(
    buildTriggerVideoUrl(123456, 1700000000000),
    'https://crm.strah.fun/api/quiz/trigger-video?telegram_id=123456&video_key=video_ai_command&test_type=aicommand&_=1700000000000',
  );
  assert.equal(classifySubmitStatus(200), 'success');
  assert.equal(classifySubmitStatus(201), 'success');
  assert.equal(classifySubmitStatus(400), 'error');
  assert.equal(classifySubmitStatus(422), 'error');
  assert.equal(classifySubmitStatus(500), 'queue_and_success');
  assert.equal(classifySubmitStatus(503), 'queue_and_success');
});

test('public/miniapp.html stays under 500 KB, uses only telegram-web-app.js externally, and preserves verbatim copy', () => {
  const html = fs.readFileSync(miniappHtmlPath, 'utf-8');
  const sizeBytes = Buffer.byteLength(html, 'utf-8');

  assert.ok(sizeBytes < 500 * 1024, `Expected < 500 KB, got ${sizeBytes} bytes`);
  assert.ok(
    html.includes('https://telegram.org/js/telegram-web-app.js'),
    'Expected official Telegram WebApp SDK script',
  );
  assert.ok(!html.includes('fonts.googleapis.com'), 'Must not load external Google Fonts');
  assert.ok(!html.includes('cdn.tailwindcss.com'), 'Must not load Tailwind CDN');
  assert.ok(!html.includes('<video'), 'Must not embed <video> player inside miniapp.html');
  assert.ok(!html.includes('<iframe'), 'Must not embed <iframe> player inside miniapp.html');

  for (const apiCall of [
    'tg.ready()',
    'tg.expand()',
    'setHeaderColor',
    'setBackgroundColor',
    'disableVerticalSwipes',
    'MainButton',
    'BackButton',
    'HapticFeedback',
    'themeParams',
    'localStorage',
    'init_data',
    'https://crm.strah.fun/api/ai-command-leads',
    'https://crm.strah.fun/api/quiz/trigger-video',
    'ai_command_video_sent',
    'VIDEO_LINKS',
    '{{YOUTUBE_URL}}',
    '{{VK_URL}}',
    '{{RUTUBE_URL}}',
    '{{DOWNLOAD_URL}}',
  ]) {
    assert.ok(html.includes(apiCall), `Expected Telegram/CRM/storage feature: ${apiCall}`);
  }

  const verbatimInOrder = [
    'Открой анкету внутри Telegram',
    'INDIGO',
    'AI-команда для практиков',
    'Чтобы получить видео и подарок — заполни короткую анкету',
    '7 вопросов, 2 минуты. Ответы нужны, чтобы понять, что тебе полезнее всего.',
    'Начать',
    'Видео бесплатное. В конце — кодовое слово и подарок.',
    'Готово. Вот твоё:',
    'ЧЕЛОВЕК-ПАУК',
    'Скопировать',
    'Напиши это слово в личку — и я пришлю подарок: стартовый набор нейросетей для психолога с промтами и контактами проверенных продавцов подписок.',
    '54 минуты живых примеров: всё, что я делаю, на моём железе.',
    'Видео также придёт тебе в личку с ботом — там оно лежит файлом, со всеми ссылками.',
    'Если хочешь понять, что конкретно это даст твоей практике — запишись на разбор. Посмотрим, с чего начать и за сколько встреч окупится.',
    'Записаться на разбор',
    'Данные ушли Антону. Он напишет лично, если увидит, что тебе это полезно.',
    'Не отправилось. Проверь интернет и попробуй ещё раз.',
    'Попробовать снова',
    '@ahilleon',
    'Кто ты?',
    'Психолог-консультант',
    'Другое',
    'Есть ли у тебя сайт?',
    'Сайт на агрегаторе (b17, yasno и т.п.)',
    'Сколько стоит твоя сессия?',
    '2000–5000 ₽',
    '5000–10000 ₽',
    '10000–20000 ₽',
    'Консультация бесплатная',
    'Записываешь ли ты сессии?',
    'Делаешь ли ты саммари и транскрибацию?',
    'Вручную, после сессии',
    'Есть ли у тебя ассистент?',
    'Да, живой человек',
    'Да, нейросеть / бот',
    'Что ты уже пробовал с нейросетями?',
    'Только чат (DeepSeek, ChatGPT, Gemini)',
    'Что для тебя сейчас главная боль — что отнимает больше всего времени?',
  ];

  let lastIdx = -1;
  for (const phrase of verbatimInOrder) {
    const idx = html.indexOf(phrase, lastIdx + 1);
    assert.ok(idx > lastIdx, `Expected verbatim phrase in order: "${phrase}"`);
    lastIdx = idx;
  }
});
