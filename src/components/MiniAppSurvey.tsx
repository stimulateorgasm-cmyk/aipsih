import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import {
  CODE_WORD,
  SURVEY_STEPS,
  buildLeadPayload,
  canAdvanceStep,
  createInitialAnswers,
  extractUtmParams,
  getProgressLabel,
  type SurveyAnswers,
} from '../utils/miniappSurvey';

type ScreenState = 'welcome' | 'questions' | 'success' | 'error';

const BOT_URL = 'https://t.me/Indigopeople_assistant';
const VIDEO_URL = 'https://t.me/Indigopeople_assistant';
const CONSULT_URL = 'https://t.me/Indigopeople_assistant';
const QUEUE_STORAGE_KEY = 'indigo_ai_lead_queue';

interface TelegramWebAppLike {
  initData?: string;
  initDataUnsafe?: {
    start_param?: string;
    user?: {
      id?: string | number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  disableVerticalSwipes?: () => void;
  HapticFeedback?: {
    impactOccurred?: (style: 'light' | 'medium' | 'heavy') => void;
  };
}

function getTelegramWebApp(): TelegramWebAppLike | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { Telegram?: { WebApp?: TelegramWebAppLike } };
  return w.Telegram?.WebApp ?? null;
}

export function MiniAppSurvey() {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(createInitialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const otherInputRef = useRef<HTMLInputElement | null>(null);

  const tg = getTelegramWebApp();
  const hasValidTgInitData = Boolean(tg?.initData && tg.initData.length > 0);

  useEffect(() => {
    if (!tg) return;
    try {
      tg.ready?.();
      tg.expand?.();
      tg.setHeaderColor?.('#0a0a12');
      tg.setBackgroundColor?.('#0a0a12');
      tg.disableVerticalSwipes?.();
    } catch {
      // Safe fallback outside Telegram
    }
  }, [tg]);

  const hapticLight = () => {
    try {
      tg?.HapticFeedback?.impactOccurred?.('light');
    } catch {
      // Ignore outside Telegram
    }
  };

  const step = SURVEY_STEPS[currentStep];
  const isLastStep = currentStep === SURVEY_STEPS.length - 1;
  const canProceed = canAdvanceStep(currentStep, answers);
  const progressPct = Math.min(((currentStep + 1) / 7) * 100, 100);
  const progressLabel = getProgressLabel(currentStep);

  const handleSelectOption = (opt: string) => {
    hapticLight();
    setAnswers((prev) => ({
      ...prev,
      [step.id]: opt,
    }));
    if (step.hasOtherInput && opt === 'Другое') {
      setTimeout(() => otherInputRef.current?.focus(), 40);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const search = typeof window !== 'undefined' ? window.location.search : '';
    const params = new URLSearchParams(search);
    const forceError = params.get('simulateError') === '1';
    const utm = extractUtmParams(search);

    const payload = buildLeadPayload({
      tgUser: tg?.initDataUnsafe?.user,
      startParam: tg?.initDataUnsafe?.start_param,
      initData: tg?.initData,
      answers,
      utm,
    });

    try {
      const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
      const existing = raw ? (JSON.parse(raw) as unknown[]) : [];
      existing.push(payload);
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // Ignore storage quota issues in restricted browsers
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setScreen(forceError ? 'error' : 'success');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 280);
  };

  const handleNext = () => {
    if (!canProceed || isSubmitting) return;
    hapticLight();
    if (currentStep < SURVEY_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (isSubmitting) return;
    hapticLight();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setScreen('welcome');
    }
  };

  const handleCopyCode = async () => {
    hapticLight();
    try {
      await navigator.clipboard.writeText(CODE_WORD);
    } catch {
      // Fallback visual confirmation
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="relative z-10 w-full max-w-[520px] mx-auto px-4 pt-4 pb-28 sm:py-8">
      <div className="sm:rounded-[28px] sm:border sm:border-white/10 sm:bg-[#0d0d18]/90 sm:p-6 sm:shadow-[0_24px_70px_-20px_rgba(124,92,255,0.28)]">
        {/* Outside Telegram notice */}
        {!hasValidTgInitData && (
          <div
            role="alert"
            className="flex items-center justify-between gap-3 rounded-2xl bg-[#d4af6a]/10 border border-[#d4af6a]/40 px-3.5 py-3 mb-4 text-[13px] text-[#f3d9a4]"
          >
            <span>Открой анкету внутри Telegram</span>
            <a
              href={BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3 py-1.5 rounded-[10px] bg-[#d4af6a]/20 border border-[#d4af6a]/50 text-white font-bold text-xs whitespace-nowrap hover:bg-[#d4af6a]/30 transition"
            >
              Открыть в Telegram
            </a>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 font-extrabold text-lg tracking-[0.06em] text-white">
            <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_10px_#7c5cff]" aria-hidden="true" />
            INDIGO
          </div>
          <div className="text-[12.5px] font-medium text-[#9a9ab0]">AI-команда для практиков</div>
        </header>

        {/* Screen 1 — Welcome */}
        {screen === 'welcome' && (
          <main className="pt-6">
            <div className="rounded-3xl border border-[#7c5cff]/35 bg-gradient-to-br from-[#121224]/95 to-[#0b0b16]/98 p-6 shadow-[0_20px_55px_-18px_rgba(124,92,255,0.25)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#7c5cff]/15 border border-[#7c5cff]/35 px-3.5 py-1.5 text-[12.5px] font-bold text-[#a78bff] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bff] shadow-[0_0_8px_#7c5cff]" />
                AI-команда для практиков
              </div>

              <h1 className="text-[26px] sm:text-[30px] font-extrabold leading-[1.15] tracking-[-0.025em] text-white">
                Чтобы получить видео и подарок — заполни короткую анкету
              </h1>

              <p className="mt-3.5 text-base leading-relaxed text-[#cfcfdc]">
                7 вопросов, 2 минуты. Ответы нужны, чтобы понять, что тебе полезнее всего.
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    hapticLight();
                    setCurrentStep(0);
                    setScreen('questions');
                  }}
                  className="w-full min-h-[54px] px-5 py-3.5 rounded-2xl bg-gradient-to-br from-[#8a6bff] to-[#6b46f6] border border-white/20 text-white font-bold text-base shadow-[0_8px_28px_-4px_rgba(124,92,255,0.45)] hover:-translate-y-0.5 transition cursor-pointer"
                >
                  Начать
                </button>
              </div>

              <p className="mt-3.5 text-[13px] text-[#9a9ab0]">
                Видео бесплатное. В конце — кодовое слово и подарок.
              </p>
            </div>
          </main>
        )}

        {/* Screen 2 — Questions */}
        {screen === 'questions' && (
          <section className="pt-5" aria-live="polite">
            <div className="mb-5">
              <div className="flex items-center justify-between text-[13px] font-bold text-[#a78bff] mb-2">
                <span>{progressLabel}</span>
              </div>
              <div
                className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={7}
                aria-valuenow={Math.min(currentStep + 1, 7)}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#a78bff] shadow-[0_0_12px_rgba(124,92,255,0.3)] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div key={step.id}>
              <h2 className="text-[22px] sm:text-[25px] font-extrabold leading-[1.22] tracking-[-0.02em] text-white">
                {step.question}
              </h2>

              {step.options.length > 0 ? (
                <>
                  <div className="flex flex-col gap-2 mt-4" role="radiogroup" aria-label={step.question}>
                    {step.options.map((opt) => {
                      const selected = answers[step.id] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-[15px] border text-[15px] leading-snug transition cursor-pointer ${
                            selected
                              ? 'bg-gradient-to-br from-[#7c5cff]/25 to-[#7c5cff]/10 border-[#a78bff] text-white font-bold shadow-[0_8px_24px_-8px_rgba(124,92,255,0.45)]'
                              : 'bg-[#121224] border-white/[0.08] text-[#e8e8f0] font-medium hover:bg-[#161630] hover:border-[#7c5cff]/35'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            aria-hidden="true"
                            className={`w-[22px] h-[22px] shrink-0 rounded-full border flex items-center justify-center transition ${
                              selected
                                ? 'bg-[#7c5cff] border-[#a78bff] text-white shadow-[0_0_10px_rgba(124,92,255,0.35)]'
                                : 'border-white/25 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {step.hasOtherInput && answers.role === 'Другое' && (
                    <div className="mt-3">
                      <input
                        ref={otherInputRef}
                        type="text"
                        value={answers.role_other}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, role_other: e.target.value }))
                        }
                        placeholder="Укажи свой вариант"
                        aria-label="Свой вариант"
                        className="w-full px-4 py-3.5 rounded-[14px] bg-[#121224] border border-[#7c5cff]/40 text-white text-[15.5px] placeholder-[#9a9ab0] focus:outline-none focus:border-[#a78bff]"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-4">
                  <textarea
                    rows={4}
                    value={answers.pain_point}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, pain_point: e.target.value }))
                    }
                    placeholder="Напиши здесь..."
                    className="w-full px-4 py-3.5 rounded-[14px] bg-[#121224] border border-[#7c5cff]/40 text-white text-[15.5px] placeholder-[#9a9ab0] focus:outline-none focus:border-[#a78bff]"
                  />
                  {step.caption && (
                    <p className="mt-3 text-[13px] text-[#9a9ab0] leading-relaxed">{step.caption}</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2.5">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="min-w-[104px] min-h-[52px] px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[#e8e8f0] font-bold text-[15px] hover:bg-white/[0.08] disabled:opacity-40 transition cursor-pointer"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed || isSubmitting}
                className="flex-1 min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-br from-[#8a6bff] to-[#6b46f6] border border-white/20 text-white font-bold text-base shadow-[0_8px_28px_-4px_rgba(124,92,255,0.45)] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition cursor-pointer"
              >
                {isSubmitting ? '...' : isLastStep ? 'Отправить' : 'Далее'}
              </button>
            </div>
          </section>
        )}

        {/* Screen 3 — Success */}
        {screen === 'success' && (
          <section className="pt-6">
            <h2 className="text-[24px] sm:text-[26px] font-extrabold text-white">Готово. Вот твоё:</h2>

            <div className="flex flex-col gap-4 mt-4">
              {/* Block 1 — Code word */}
              <div className="rounded-[20px] border border-[#a78bff]/45 bg-gradient-to-br from-[#7c5cff]/15 to-[#121224]/95 p-5 shadow-[0_14px_40px_-12px_rgba(124,92,255,0.35)]">
                <div className="flex items-center justify-between gap-2.5 px-3.5 py-3 rounded-[14px] bg-[#0a0a12]/75 border border-[#a78bff]/50 shadow-[0_0_24px_rgba(124,92,255,0.25)]">
                  <span className="font-mono text-[16px] sm:text-[22px] font-extrabold tracking-[0.05em] text-white whitespace-nowrap">
                    {CODE_WORD}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="shrink-0 px-3 py-2 rounded-[10px] bg-[#7c5cff]/25 border border-[#a78bff]/50 text-white text-[13px] font-bold hover:bg-[#7c5cff]/40 transition cursor-pointer"
                  >
                    {copiedCode ? 'Скопировано' : 'Скопировать'}
                  </button>
                </div>
                <p className="mt-3 text-[14.5px] text-[#cfcfdc] leading-relaxed">
                  Напиши это слово в личку — и я пришлю подарок: стартовый набор нейросетей для психолога с промтами и контактами проверенных продавцов подписок.
                </p>
              </div>

              {/* Block 2 — Video */}
              <div className="rounded-[20px] border border-white/[0.08] bg-[#121224] p-5">
                <h3 className="text-lg font-bold text-white">Видео</h3>
                <div className="mt-3.5">
                  <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-br from-[#8a6bff] to-[#6b46f6] border border-white/20 text-white font-bold text-base shadow-[0_8px_28px_-4px_rgba(124,92,255,0.45)] hover:-translate-y-0.5 transition"
                  >
                    Смотреть видео (54 минуты)
                  </a>
                </div>
                <p className="mt-3 text-[14.5px] text-[#cfcfdc] leading-relaxed">
                  В конце видео — то же кодовое слово. Если ты уже смотрел — просто напиши его мне.
                </p>
              </div>

              {/* Block 3 — Consultation */}
              <div className="rounded-[20px] border border-white/[0.08] bg-[#121224] p-5">
                <h3 className="text-lg font-bold text-white">Разбор</h3>
                <p className="mt-2.5 text-[14.5px] text-[#cfcfdc] leading-relaxed">
                  Если хочешь понять, что конкретно это даст твоей практике — запишись на разбор. Посмотрим, с чего начать и за сколько встреч окупится.
                </p>
                <div className="mt-4">
                  <a
                    href={CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-br from-[#d4af6a]/25 to-[#d4af6a]/10 border border-[#d4af6a]/55 text-[#f3d9a4] font-bold text-base shadow-[0_8px_24px_-6px_rgba(212,175,106,0.22)] hover:-translate-y-0.5 transition"
                  >
                    Записаться на разбор
                  </a>
                </div>
              </div>

              <p className="text-center text-[13px] text-[#9a9ab0] leading-relaxed">
                Данные ушли Антону. Он напишет лично, если увидит, что тебе это полезно.
              </p>
            </div>
          </section>
        )}

        {/* Screen 4 — Error */}
        {screen === 'error' && (
          <section className="pt-6">
            <div className="rounded-[22px] border border-[#ff5d6c]/35 bg-gradient-to-br from-[#ff5d6c]/10 to-[#121224] p-6">
              <div className="w-12 h-12 rounded-[14px] bg-[#ff5d6c]/15 border border-[#ff5d6c]/40 text-[#ff5d6c] flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-[22px] font-extrabold leading-snug text-white">
                Не отправилось. Проверь интернет и попробуй ещё раз.
              </h2>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-br from-[#8a6bff] to-[#6b46f6] border border-white/20 text-white font-bold text-base shadow-[0_8px_28px_-4px_rgba(124,92,255,0.45)] cursor-pointer"
                >
                  Попробовать снова
                </button>
              </div>
              <p className="mt-4 text-[13px] text-[#9a9ab0]">
                Если не получается — напиши в личку:{' '}
                <a
                  href="https://t.me/ahilleon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a78bff] underline"
                >
                  @ahilleon
                </a>
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
