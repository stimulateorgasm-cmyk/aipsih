import React, { useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from './AnimatedCounter';

export function VideoLanding() {
  const [countersTriggered, setCountersTriggered] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const [hasSite, setHasSite] = useState('');
  const [sessionPrice, setSessionPrice] = useState('');
  const [recordsSessions, setRecordsSessions] = useState('');
  const [surveyCopied, setSurveyCopied] = useState(false);
  const shockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target === shockRef.current) {
            setCountersTriggered(true);
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .stagger-group');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (videoModalOpen) setVideoModalOpen(false);
        if (surveyModalOpen) setSurveyModalOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [videoModalOpen, surveyModalOpen]);

  const buildTelegramSurveyUrl = () => {
    const lines = [
      'Анкета на видео «AI-команда»:',
      role ? `• Кто я: ${role}` : null,
      hasSite ? `• Есть ли сайт: ${hasSite}` : null,
      sessionPrice ? `• Сколько стоит сессия: ${sessionPrice}` : null,
      recordsSessions ? `• Записываю ли сессии: ${recordsSessions}` : null,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return `https://t.me/Indigopeople_assistant?text=${text}`;
  };

  const handleCopySurvey = async () => {
    const lines = [
      'Анкета на видео:',
      `Кто ты: ${role || '—'}`,
      `Есть ли сайт: ${hasSite || '—'}`,
      `Сколько стоит сессия: ${sessionPrice || '—'}`,
      `Записываешь ли сессии: ${recordsSessions || '—'}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setSurveyCopied(true);
      setTimeout(() => setSurveyCopied(false), 2500);
    } catch {
      setSurveyCopied(true);
      setTimeout(() => setSurveyCopied(false), 2500);
    }
  };

  return (
    <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* TOPBAR */}
      <header className="flex items-center justify-between py-5 sm:py-6 border-b border-white/10 gap-4">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2.5 font-extrabold text-xl tracking-wide text-white">
            <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_12px_#7c5cff]" aria-hidden="true" />
            <span>INDIGO</span>
          </div>
          <div className="text-xs sm:text-[13px] text-[#9a9ab0] font-normal leading-snug">
            Мастермайнд по нейросетям для практиков
          </div>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="hero-section relative pt-10 sm:pt-14 pb-12 sm:pb-16 min-h-0 md:min-h-[620px] flex items-center">
        <div
          className="hero-glow absolute top-[28%] left-1/2 md:left-[26%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[620px] h-[240px] sm:h-[380px] pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(124, 92, 255, 0.25) 0%, rgba(212, 175, 106, 0.06) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        <div className="hero-content reveal relative z-[2] max-w-[600px] w-full space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(124,92,255,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a78bff] shadow-[0_0_8px_#7c5cff]" />
            <span>ЖИВОЙ ЭФИР · ВИДЕО 54 МИНУТЫ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-extrabold leading-[1.06] tracking-tight text-white">
            Покажу, как я собрал себе{' '}
            <em className="not-italic whitespace-nowrap bg-gradient-to-r from-white via-[#c4b5fd] to-[#7c5cff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(124,92,255,0.4)]">
              AI-команду
            </em>
          </h1>

          <p className="text-lg sm:text-xl lg:text-[21px] text-[#cfcfdc] max-w-[580px] font-normal leading-relaxed">
            Сайт, контент, визуал, миниаппки и ассистент с руками — всё сделано одним человеком. Без программиста, без дизайнера, без отдела маркетинга.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="btn inline-flex items-center justify-center px-8 py-4 sm:py-[18px] rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base sm:text-[17px] tracking-wide shadow-[0_8px_30px_-4px_rgba(124,92,255,0.48),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-4px_rgba(124,92,255,0.68)] w-full sm:w-auto text-center cursor-pointer"
            >
              Смотреть видео
            </button>
            <button
              type="button"
              onClick={() => setSurveyModalOpen(true)}
              className="btn ghost inline-flex items-center justify-center px-7 py-4 sm:py-[18px] rounded-2xl bg-[#7c5cff]/[0.08] hover:bg-[#7c5cff]/[0.18] text-[#a78bff] hover:text-white font-bold text-base sm:text-[17px] border border-[#7c5cff]/40 hover:border-[#a78bff] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto text-center cursor-pointer"
            >
              Заполнить анкету и получить видео
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed">
            Видео бесплатное. В конце — кодовое слово и подарок для тех, кто досмотрел.
          </p>
        </div>

        <div className="hero-photo hidden md:block print:hidden" aria-hidden="true">
          <img src="/img/video-hero.jpg" alt="" loading="eager" />
        </div>
      </section>

      {/* 2. БОЛЬ */}
      <section className="py-14 sm:py-20">
        <div className="reveal max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white">
            У психолога есть две работы. За первую платят. За вторую — нет.
          </h2>
          <p className="text-[#cfcfdc] text-base sm:text-lg leading-relaxed mt-4">
            Сессия — это работа. А посты, саммари, обложки, сайт, тесты — это вторая работа. Бесплатная. На неё уходят часы, которых у тебя нет.
          </p>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="stagger-item p-6 rounded-2xl bg-gradient-to-b from-[#ff5d6c]/[0.06] to-[#121224] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#ff5d6c]/12 border border-[#ff5d6c]/30 text-[#ff5d6c] mb-4" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">Саммари сессии</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">Вручную, по вечерам</span>
          </div>

          <div className="stagger-item p-6 rounded-2xl bg-gradient-to-b from-[#ff5d6c]/[0.06] to-[#121224] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#ff5d6c]/12 border border-[#ff5d6c]/30 text-[#ff5d6c] mb-4" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">Контент и обложки</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">Часы под копирайтера и дизайнера</span>
          </div>

          <div className="stagger-item p-6 rounded-2xl bg-gradient-to-b from-[#ff5d6c]/[0.06] to-[#121224] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#ff5d6c]/12 border border-[#ff5d6c]/30 text-[#ff5d6c] mb-4" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 14" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">Сайт и тесты</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">Месяц ожидания и чужой подрядчик</span>
          </div>
        </div>
      </section>

      {/* 3. ЧТО ВНУТРИ ВИДЕО */}
      <section id="inside" className="py-14 sm:py-20">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white">
            Внутри — 54 минуты живых примеров. Без теории.
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Сайты</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Indigo Lab, сайт конференции, личный сайт, лендинг — сделанные голосовым сообщением. Неделя работы, 5 часов чистого времени.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Тесты и миниаппки</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Психологический тест в Telegram: диагностика, PDF-отчёт по результатам, заявка тебе в чат.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Транскрипция и саммари</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Аудио сессии → чистый текст → структурированный отчёт → готовый пост в канал.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Визуал с твоим лицом</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Обложки для YouTube, рилсы, презентации, PDF — в твоём стиле.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Книга, диссертация, CRM</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Всё это тоже ведётся агентом — в одном чате, голосом.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2.5">Агенты с руками</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Копирайтер, дизайнер, маркетолог — работают на тебя, пока ты спишь.
            </span>
          </div>
        </div>
      </section>

      {/* 4. ШОК-ЦИФРА */}
      <section className="py-10 sm:py-16">
        <div
          ref={shockRef}
          id="shock-block"
          className="reveal relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#1c0b16] via-[#120d1c] to-[#0b0914] border border-[#ff5d6c]/35 shadow-[0_20px_60px_-15px_rgba(255,93,108,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 93, 108, 0.18) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold tracking-widest text-[#ff5d6c] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ff5d6c] shadow-[0_0_10px_#ff5d6c] flex-shrink-0" />
            <span>Сколько стоит такая команда, если нанимать живых людей</span>
          </div>

          <div className="stagger-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-7">
            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Маркетолог</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={150000} triggered={countersTriggered} /> ₽
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Дизайнер</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={100000} triggered={countersTriggered} /> ₽
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Копирайтер</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={80000} triggered={countersTriggered} /> ₽
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Разработчик</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={200000} triggered={countersTriggered} /> ₽
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
            </div>

            <div className="stagger-item col-span-2 sm:col-span-1 relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Фотограф</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                от <AnimatedCounter target={15000} triggered={countersTriggered} /> ₽
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8 items-stretch">
            <div className="flex flex-col justify-center p-6 sm:p-7 rounded-2xl bg-black/45 border border-[#d4af6a]/35 shadow-[0_0_30px_-10px_rgba(212,175,106,0.2)]">
              <div className="inline-block w-fit text-[#d4af6a] text-2xl sm:text-[32px] font-extrabold px-4 py-1.5 rounded-xl bg-[#d4af6a]/12 border border-[#d4af6a]/45 shadow-[0_0_20px_rgba(212,175,106,0.25)] tabular-nums">
                ≈ 500 000 ₽ в месяц
              </div>
              <p className="text-[#cfcfdc] text-base sm:text-lg mt-4 leading-relaxed">
                Штат, который большинство практиков не может себе позволить.
              </p>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/20 via-[#34d399]/10 to-[#121226] border border-[#34d399]/45 shadow-[0_14px_40px_-10px_rgba(52,211,153,0.2)]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#34d399]">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]" />
                  AI-команда
                </span>
                <span className="text-2xl sm:text-[32px] font-extrabold text-white bg-[#34d399]/15 border border-[#34d399]/45 px-4 py-1 rounded-xl tabular-nums">
                  ≈ 5 000 ₽
                </span>
              </div>
              <p className="text-[#e8e8f0] text-base mt-4 leading-relaxed">
                на подписки и токены. Работает круглосуточно, не болеет, не уходит в отпуск, не выгорает. Только на тебя.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ЧТО ТЫ ПОЛУЧИШЬ */}
      <section className="py-14 sm:py-20">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white">
            Что у тебя появится за 2 месяца
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="stagger-item relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#121226] to-[#0b0b16] border border-[#7c5cff]/35 hover:border-[#a78bff] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65),0_0_32px_-10px_rgba(124,92,255,0.18)] transition-all duration-200 hover:-translate-y-1 overflow-hidden">
            <span className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-[#7c5cff]/15 border border-[#7c5cff]/40 text-[#a78bff] mb-5" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-3">Сайт, который продаёт</h3>
            <p className="text-[#cfcfdc] text-base leading-relaxed">
              Собран под твою услугу, в твоём стиле. Доверие к тебе возникает, когда человек видит твои страницы — а не когда он приходит на сессию.
            </p>
          </div>

          <div className="stagger-item relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#121226] to-[#0b0b16] border border-[#7c5cff]/35 hover:border-[#a78bff] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65),0_0_32px_-10px_rgba(124,92,255,0.18)] transition-all duration-200 hover:-translate-y-1 overflow-hidden">
            <span className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-[#7c5cff]/15 border border-[#7c5cff]/40 text-[#a78bff] mb-5" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-3">Ассистент с руками</h3>
            <p className="text-[#cfcfdc] text-base leading-relaxed">
              Саммари, транскрибация, документы, контент, календарь. Часы рутины уходят из твоей недели.
            </p>
          </div>
        </div>
      </section>

      {/* 6. КАК ЭТО РАБОТАЕТ */}
      <section id="how" className="py-14 sm:py-20">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white">
            Как это будет работать
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            {
              num: '01',
              title: 'Смотришь видео',
              desc: '54 минуты живых примеров: всё, что я делаю, на моём железе.',
            },
            {
              num: '02',
              title: 'Заполняешь анкету',
              desc: 'Кто ты, есть ли сайт, сколько стоит сессия, записываешь ли сессии. Ответы определяют, что тебе полезнее всего.',
            },
            {
              num: '03',
              title: 'Созвон со мной',
              desc: 'Разберём, что конкретно нейросети могут дать твоей практике, с чего начать и как окупится.',
            },
          ].map((step) => (
            <div
              key={step.num}
              className="stagger-item relative p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/45 transition-all duration-200 hover:-translate-y-1 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#7c5cff]/15 border border-[#7c5cff]/45 text-[#a78bff] font-extrabold text-base tracking-wider mb-5 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">{step.title}</h3>
              <p className="text-[#9a9ab0] text-sm sm:text-[15.5px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. КОМУ ПОДОЙДЁТ */}
      <section className="py-14 sm:py-20">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white">
            Кому это подойдёт
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 gap-3.5 mt-7">
          {[
            {
              text: 'Психологам и коучам — тем, кто практикует и хочет расти без выгорания',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.8-1.5 5-3.5 6.5V18a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2.5C6.5 14 5 11.8 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9" y1="22" x2="15" y2="22" />
                </svg>
              ),
            },
            {
              text: 'Сексологам и телесным терапевтам',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              text: 'Бизнес-консультантам и тренерам по продажам',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              ),
            },
            {
              text: 'Экспертам, наставникам и астрологам',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
            },
            {
              text: 'Тем, кто ведёт канал, но контент делает через силу',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="stagger-item flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 text-[#e8e8f0] text-base sm:text-[16.5px] transition-all duration-200 hover:translate-x-1"
            >
              <span className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#7c5cff]/12 border border-[#7c5cff]/30 text-[#a78bff] flex items-center justify-center" aria-hidden="true">
                {item.icon}
              </span>
              <span className="leading-snug">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA-ФИНАЛ */}
      <section className="py-12 sm:py-20">
        <div className="reveal relative rounded-3xl p-7 sm:p-12 lg:p-14 bg-gradient-to-br from-[#7c5cff]/30 via-[#38237a]/45 to-[#121228] border border-[#a78bff]/45 shadow-[0_24px_70px_-15px_rgba(124,92,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden text-center">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-60 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 255, 0.25) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              Посмотри, что можно сделать за 54 минуты — и получи PDF «Стартовый набор нейросетей для психолога» в подарок
            </h2>
            <p className="text-[#e8e8f0] text-base sm:text-lg mt-5 leading-relaxed">
              Сервисы, промты, контакты проверенных продавцов подписок — всё, чем я пользуюсь сам.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="btn inline-flex items-center justify-center px-10 py-4 sm:py-[18px] rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-lg tracking-wide shadow-[0_8px_32px_-4px_rgba(124,92,255,0.6),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/25 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
              >
                Смотреть видео
              </button>
            </div>
            <p className="text-[#cfcfdc] text-sm mt-5 leading-relaxed">
              Кто досмотрел до конца — в конце видео кодовое слово. Напиши его в личку и получи подарок.
            </p>
          </div>
        </div>
      </section>

      {/* 9. ПОДВАЛ */}
      <footer className="border-t border-white/10 py-11 sm:py-14 text-center text-[#9a9ab0] text-sm leading-relaxed">
        <div className="inline-flex items-center gap-2 font-extrabold text-base tracking-wider text-white mb-3">
          <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_10px_#7c5cff]" aria-hidden="true" />
          <span>INDIGO</span>
        </div>
        <div>Indigo Lab · Доказательная психология · Метод БПСП · AI-инструменты для помогающих практиков</div>
        <div className="mt-2 text-xs sm:text-[13.5px] text-[#7d7d96] max-w-3xl mx-auto">
          Антон Шумкин — психолог-гипнотерапевт, автор книги «Терапия оргазмом», кандидатская диссертация по нейродатчикам
        </div>
      </footer>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 bg-[#06060c]/85 backdrop-blur-md z-[100] flex items-center justify-center p-5 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-landing-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideoModalOpen(false);
          }}
        >
          <div className="bg-[#0f0f1c] border border-[#7c5cff]/40 rounded-3xl max-w-lg w-full p-7 sm:p-8 relative shadow-[0_24px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(124,92,255,0.22)]">
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Закрыть окно"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-white flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/12 border border-[#7c5cff]/30 text-[#a78bff] text-xs font-semibold mb-4">
              ЖИВОЙ ЭФИР · ВИДЕО 54 МИНУТЫ
            </div>
            <h3 id="video-landing-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-3">
              Покажу, как я собрал себе AI-команду
            </h3>
            <p className="text-[#cfcfdc] text-sm sm:text-base leading-relaxed">
              Видео бесплатное. В конце — кодовое слово и подарок для тех, кто досмотрел.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://t.me/Indigopeople_assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base shadow-[0_8px_30px_-4px_rgba(124,92,255,0.48)] transition"
              >
                Открыть видео в Telegram
              </a>
              <button
                type="button"
                onClick={() => {
                  setVideoModalOpen(false);
                  setSurveyModalOpen(true);
                }}
                className="inline-flex items-center justify-center w-full py-3.5 rounded-2xl bg-[#7c5cff]/10 hover:bg-[#7c5cff]/20 border border-[#7c5cff]/40 text-[#a78bff] hover:text-white font-semibold text-sm transition cursor-pointer"
              >
                Заполнить анкету и получить видео
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Survey Modal */}
      {surveyModalOpen && (
        <div
          className="fixed inset-0 bg-[#06060c]/85 backdrop-blur-md z-[100] flex items-center justify-center p-5 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-survey-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSurveyModalOpen(false);
          }}
        >
          <div className="bg-[#0f0f1c] border border-[#7c5cff]/40 rounded-3xl max-w-lg w-full p-7 sm:p-8 relative shadow-[0_24px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(124,92,255,0.22)]">
            <button
              type="button"
              onClick={() => setSurveyModalOpen(false)}
              aria-label="Закрыть анкету"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-white flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <h3 id="video-survey-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-2">
              Заполнить анкету и получить видео
            </h3>
            <p className="text-[#9a9ab0] text-sm mb-5">
              Кто ты, есть ли сайт, сколько стоит сессия, записываешь ли сессии. Ответы определяют, что тебе полезнее всего.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildTelegramSurveyUrl(), '_blank', 'noopener,noreferrer');
              }}
              className="space-y-3.5"
            >
              <div>
                <label htmlFor="survey-role" className="block text-xs font-medium text-[#cfcfdc] mb-1">
                  Кто ты (специализация)
                </label>
                <input
                  id="survey-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Психолог, коуч, сексолог..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121224] border border-white/15 focus:border-[#7c5cff] text-white text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="survey-site" className="block text-xs font-medium text-[#cfcfdc] mb-1">
                  Есть ли сайт
                </label>
                <input
                  id="survey-site"
                  type="text"
                  value={hasSite}
                  onChange={(e) => setHasSite(e.target.value)}
                  placeholder="Да / Нет / В процессе"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121224] border border-white/15 focus:border-[#7c5cff] text-white text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="survey-price" className="block text-xs font-medium text-[#cfcfdc] mb-1">
                    Сколько стоит сессия
                  </label>
                  <input
                    id="survey-price"
                    type="text"
                    value={sessionPrice}
                    onChange={(e) => setSessionPrice(e.target.value)}
                    placeholder="Например: 5 000 ₽"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121224] border border-white/15 focus:border-[#7c5cff] text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="survey-rec" className="block text-xs font-medium text-[#cfcfdc] mb-1">
                    Записываешь ли сессии
                  </label>
                  <input
                    id="survey-rec"
                    type="text"
                    value={recordsSessions}
                    onChange={(e) => setRecordsSessions(e.target.value)}
                    placeholder="Да / Нет / Иногда"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121224] border border-white/15 focus:border-[#7c5cff] text-white text-sm outline-none"
                  />
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={buildTelegramSurveyUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-sm shadow-[0_8px_24px_-4px_rgba(124,92,255,0.48)] transition text-center"
                >
                  Отправить в Telegram
                </a>
                <button
                  type="button"
                  onClick={handleCopySurvey}
                  className="inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 text-sm font-medium transition cursor-pointer"
                >
                  {surveyCopied ? 'Скопировано!' : 'Копировать ответы'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
