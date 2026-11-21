export interface SurveyAnswers {
  role: string;
  role_other: string;
  site: string;
  session_price: string;
  records_sessions: string;
  does_summaries: string;
  has_assistant: string;
  ai_experience: string;
  pain_point: string;
}

export interface TelegramUserData {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface SurveyStepConfig {
  id: keyof SurveyAnswers;
  stepNumber: number;
  question: string;
  options: readonly string[];
  hasOtherInput?: boolean;
  optional?: boolean;
  caption?: string;
}

export const CODE_WORD = 'ЧЕЛОВЕК-ПАУК';

export const SURVEY_STEPS: readonly SurveyStepConfig[] = [
  {
    id: 'role',
    stepNumber: 1,
    question: 'Кто ты?',
    options: [
      'Психолог',
      'Коуч',
      'Сексолог',
      'Телесный терапевт',
      'Таролог / астролог',
      'Массажист',
      'Психолог-консультант',
      'Другое',
    ],
    hasOtherInput: true,
  },
  {
    id: 'site',
    stepNumber: 2,
    question: 'Есть ли у тебя сайт?',
    options: [
      'Свой сайт',
      'Сайт на агрегаторе (b17, yasno и т.п.)',
      'Только соцсети',
      'Пока нет',
    ],
  },
  {
    id: 'session_price',
    stepNumber: 3,
    question: 'Сколько стоит твоя сессия?',
    options: [
      'До 2000 ₽',
      '2000–5000 ₽',
      '5000–10000 ₽',
      '10000–20000 ₽',
      'Больше 20000 ₽',
      'Консультация бесплатная',
    ],
  },
  {
    id: 'records_sessions',
    stepNumber: 4,
    question: 'Записываешь ли ты сессии?',
    options: ['Всегда', 'Иногда', 'Нет'],
  },
  {
    id: 'does_summaries',
    stepNumber: 5,
    question: 'Делаешь ли ты саммари и транскрибацию?',
    options: [
      'Вручную, после сессии',
      'Изредка',
      'Никогда',
      'У меня есть ассистент',
    ],
  },
  {
    id: 'has_assistant',
    stepNumber: 6,
    question: 'Есть ли у тебя ассистент?',
    options: ['Да, живой человек', 'Да, нейросеть / бот', 'Нет'],
  },
  {
    id: 'ai_experience',
    stepNumber: 7,
    question: 'Что ты уже пробовал с нейросетями?',
    options: [
      'Только чат (DeepSeek, ChatGPT, Gemini)',
      'Генерировал картинки и видео',
      'Пробовал агентов и автоматизацию',
      'Пока ничего',
    ],
  },
  {
    id: 'pain_point',
    stepNumber: 8,
    question: 'Что для тебя сейчас главная боль — что отнимает больше всего времени?',
    options: [],
    optional: true,
    caption: 'Ответ не обязателен. Но по нему я пойму, с чего начать разбор.',
  },
];

export function createInitialAnswers(): SurveyAnswers {
  return {
    role: '',
    role_other: '',
    site: '',
    session_price: '',
    records_sessions: '',
    does_summaries: '',
    has_assistant: '',
    ai_experience: '',
    pain_point: '',
  };
}

export function extractUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  };
}

export function canAdvanceStep(stepIndex: number, answers: SurveyAnswers): boolean {
  const step = SURVEY_STEPS[stepIndex];
  if (!step) return false;
  if (step.optional) return true;
  const val = (answers[step.id] || '').trim();
  if (!val) return false;
  if (step.hasOtherInput && val === 'Другое') {
    return answers.role_other.trim().length > 0;
  }
  return true;
}

export function getProgressLabel(stepIndex: number): string {
  const clamped = Math.min(stepIndex + 1, 7);
  return `Шаг ${clamped} из 7`;
}

export function buildLeadPayload(params: {
  tgUser?: TelegramUserData;
  startParam?: string;
  initData?: string;
  answers: SurveyAnswers;
  utm: UtmParams;
}) {
  const user = params.tgUser || {};
  return {
    telegram_id: user.id !== undefined && user.id !== null ? String(user.id) : '',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    start_param: params.startParam || '',
    init_data: params.initData || '',
    role: params.answers.role,
    role_other: params.answers.role === 'Другое' ? params.answers.role_other.trim() : '',
    site: params.answers.site,
    session_price: params.answers.session_price,
    records_sessions: params.answers.records_sessions,
    does_summaries: params.answers.does_summaries,
    has_assistant: params.answers.has_assistant,
    ai_experience: params.answers.ai_experience,
    pain_point: params.answers.pain_point.trim(),
    utm_source: params.utm.utm_source,
    utm_medium: params.utm.utm_medium,
    utm_campaign: params.utm.utm_campaign,
  };
}

export const CRM_ENDPOINT = 'https://crm.strah.fun/api/ai-command-leads';
export const TRIGGER_VIDEO_URL = 'https://crm.strah.fun/api/quiz/trigger-video';
export const CONSULT_URL = 'https://t.me/Indigopeople_assistant';
export const VIDEO_BEACON_SENT_KEY = 'ai_command_video_sent';

export interface VideoLinksMap {
  youtube: string;
  vk: string;
  rutube: string;
  download: string;
}

export const VIDEO_LINKS: VideoLinksMap = {
  youtube: '{{YOUTUBE_URL}}',
  vk: '{{VK_URL}}',
  rutube: '{{RUTUBE_URL}}',
  download: '{{DOWNLOAD_URL}}',
};

export interface VideoLinkButton {
  key: keyof VideoLinksMap;
  label: string;
  url: string;
}

const VIDEO_LINK_SPECS: ReadonlyArray<{ key: keyof VideoLinksMap; label: string }> = [
  { key: 'youtube', label: '📺 Смотреть на YouTube' },
  { key: 'vk', label: '▶️ Смотреть в VK Видео' },
  { key: 'rutube', label: '🎬 Смотреть в RuTube' },
  { key: 'download', label: '⬇️ Скачать видео файлом' },
];

export function isConfiguredLink(url: string | undefined | null): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.length > 0 && !trimmed.startsWith('{{');
}

export function getActiveVideoLinkButtons(links: VideoLinksMap = VIDEO_LINKS): VideoLinkButton[] {
  const result: VideoLinkButton[] = [];
  for (const spec of VIDEO_LINK_SPECS) {
    const candidate = links[spec.key];
    if (isConfiguredLink(candidate)) {
      result.push({ key: spec.key, label: spec.label, url: candidate.trim() });
    }
  }
  return result;
}

export function buildTriggerVideoUrl(telegramId: string | number, now: number = Date.now()): string {
  return `${TRIGGER_VIDEO_URL}?telegram_id=${encodeURIComponent(String(telegramId))}&video_key=video_ai_command&test_type=aicommand&_=${now}`;
}

export function classifySubmitStatus(status: number): 'success' | 'error' | 'queue_and_success' {
  if (status >= 200 && status < 300) return 'success';
  if (status >= 400 && status < 500) return 'error';
  return 'queue_and_success';
}

