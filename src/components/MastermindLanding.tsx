import React, { useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from './AnimatedCounter';

export function MastermindLanding() {
  const [countersTriggered, setCountersTriggered] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
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
      if (e.key === 'Escape' && videoModalOpen) {
        setVideoModalOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [videoModalOpen]);

  return (
    <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* TOPBAR */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5 font-extrabold text-xl tracking-wide text-white">
          <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_12px_#7c5cff]" aria-hidden="true" />
          <span>
            INDIGO <span className="text-[#a78bff]">LAB</span>
          </span>
        </div>
        <div className="text-[11px] sm:text-xs font-semibold tracking-[1.6px] uppercase text-[#9a9ab0] px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          AI-команда · 5 встреч · 2 месяца
        </div>
      </header>

      {/* SPLIT HERO */}
      <section className="hero-section relative pt-10 sm:pt-14 pb-12 sm:pb-16 min-h-0 md:min-h-[620px] flex items-center">
        <div
          className="hero-glow absolute top-[28%] left-1/2 md:left-[26%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[620px] h-[240px] sm:h-[380px] pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(124, 92, 255, 0.25) 0%, rgba(212, 175, 106, 0.05) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        <div className="hero-content reveal relative z-[2] max-w-[600px] w-full space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(124,92,255,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a78bff] shadow-[0_0_8px_#7c5cff]" />
            <span>Мастермайнд для практиков и экспертов</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white">
            Твоя{' '}
            <em className="not-italic bg-gradient-to-r from-white via-[#c4b5fd] to-[#7c5cff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(124,92,255,0.4)]">
              AI-команда
            </em>
            <br />
            за 2 месяца
          </h1>

          <p className="text-lg sm:text-xl lg:text-[22px] text-[#cfcfdc] max-w-[580px] font-normal leading-relaxed">
            Она соберёт тебе <b className="text-white font-semibold">сайт, соцсети и материалы для клиентов</b> —
            вместо отдела маркетинга на полмиллиона.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
            <a
              href="https://t.me/Indigopeople_assistant"
              className="btn inline-flex items-center justify-center px-8 py-4 sm:py-[18px] rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base sm:text-[17px] tracking-wide shadow-[0_8px_30px_-4px_rgba(124,92,255,0.48),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-4px_rgba(124,92,255,0.68)] w-full sm:w-auto text-center"
            >
              Записаться
            </a>
            <a
              href="#video"
              className="btn ghost inline-flex items-center justify-center px-7 py-4 sm:py-[18px] rounded-2xl bg-[#7c5cff]/[0.08] hover:bg-[#7c5cff]/[0.18] text-[#a78bff] hover:text-white font-bold text-base sm:text-[17px] border border-[#7c5cff]/40 hover:border-[#a78bff] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              Посмотреть, как это работает
            </a>
          </div>
        </div>

        <div className="hero-photo hidden md:block print:hidden" aria-hidden="true">
          <img src="/img/m1.jpg" alt="" loading="eager" />
        </div>
      </section>

      {/* НОВЫЙ БЛОК A: ПОСМОТРИ, КАК ЭТО РАБОТАЕТ */}
      <section id="video" className="pt-4 sm:pt-6 pb-12 sm:pb-16">
        <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-7 lg:gap-10 items-center bg-gradient-to-br from-[#121224]/90 to-[#0a0a12]/95 border border-[#7c5cff]/35 rounded-3xl p-6 sm:p-10 shadow-[0_24px_65px_-20px_rgba(124,92,255,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.16) 0%, transparent 70%)',
              filter: 'blur(45px)',
            }}
            aria-hidden="true"
          />
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white mb-4">
              Сначала — посмотри, как это работает
            </h2>
            <p className="text-[#cfcfdc] text-base sm:text-[16.5px] leading-relaxed">
              Я записал видео на 54 минуты: показал свою AI-команду вживую — сайты, тесты, транскрипцию, визуал с моим лицом, книгу, диссертацию, CRM. Не теория. Всё, что я делаю, на моём железе.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base sm:text-[17px] shadow-[0_8px_30px_-4px_rgba(124,92,255,0.48),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
              >
                Смотреть видео
              </button>
            </div>
            <p className="mt-3.5 text-xs sm:text-[13.5px] text-[#9a9ab0] leading-relaxed">
              Видео бесплатное. В конце — кодовое слово и подарок: стартовый набор нейросетей с промтами и контактами проверенных продавцов.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              aria-label="Смотреть видео продолжительностью 54 минуты"
              className="group relative block w-full aspect-video rounded-2xl overflow-hidden border border-[#a78bff]/35 hover:border-[#a78bff] bg-[#0b0b15] shadow-[0_18px_45px_-12px_rgba(0,0,0,0.75),0_0_32px_-6px_rgba(124,92,255,0.3)] hover:shadow-[0_24px_55px_-12px_rgba(0,0,0,0.85),0_0_44px_-4px_rgba(124,92,255,0.48)] transition-all duration-300 hover:-translate-y-1 cursor-pointer p-0"
            >
              <img
                src="/img/h2.jpg"
                alt="Демонстрация AI-команды на практике: сайты, тесты, визуал и CRM"
                loading="lazy"
                className="w-full h-full object-cover brightness-75 contrast-105 group-hover:scale-[1.03] group-hover:brightness-90 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/10 to-[#0a0a12]/55 pointer-events-none" />
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-full bg-[#7c5cff]/90 group-hover:bg-[#a78bff] border-2 border-white/60 flex items-center justify-center shadow-[0_0_0_12px_rgba(124,92,255,0.2),0_10px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-200"
                aria-hidden="true"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="ml-1">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </span>
              <span className="absolute bottom-3.5 right-3.5 z-10 bg-[#0a0a12]/80 border border-white/15 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full backdrop-blur-md tabular-nums">
                54:00
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* СКОЛЬКО СТОИТ КОМАНДА ВЖИВУЮ */}
      <section className="pt-4 pb-16 sm:pb-24">
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
                <AnimatedCounter target={150000} triggered={countersTriggered} />
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
              <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Дизайнер</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={100000} triggered={countersTriggered} />
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
              <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Копирайтер</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={80000} triggered={countersTriggered} />
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
              <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
            </div>

            <div className="stagger-item relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Разработчик</div>
              <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight tabular-nums">
                <AnimatedCounter target={200000} triggered={countersTriggered} />
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
              <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
            </div>

            <div className="stagger-item col-span-2 sm:col-span-1 relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/15" />
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Фотограф</div>
              <div className="relative inline-block text-lg sm:text-xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                по съёмкам
                <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
              </div>
              <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium tabular-nums">
                от <AnimatedCounter target={15000} triggered={countersTriggered} />
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-black/45 border border-[#d4af6a]/35 text-center text-[#d2d2e2] text-base sm:text-xl leading-relaxed shadow-[0_0_30px_-10px_rgba(212,175,106,0.2)]">
            Итого{' '}
            <b className="inline-block text-[#d4af6a] text-2xl sm:text-[34px] font-extrabold px-3.5 py-1 rounded-xl bg-[#d4af6a]/12 border border-[#d4af6a]/45 shadow-[0_0_20px_rgba(212,175,106,0.25)] mx-1.5">
              ≈ 500 000 ₽ в месяц
            </b>{' '}
            — штат, который большинство практиков не может себе позволить.
          </div>
        </div>
      </section>

      {/* СРАВНЕНИЕ */}
      <section id="compare" className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Та же команда — у тебя<br />за стоимость подписки
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-3.5 md:gap-0 items-stretch mt-8">
          <div className="stagger-item rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#ff5d6c]/[0.04] to-[#12101a]/90 border border-[#ff5d6c]/25 backdrop-blur-xl">
            <h4 className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#ff5d6c] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#ff5d6c] shadow-[0_0_10px_#ff5d6c]" />
              Живая команда
            </h4>
            <ul className="space-y-1.5">
              {[
                <><span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">500 000 ₽</span> в месяц</>,
                <>Работает <span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">8 часов</span> в день</>,
                'Болеет, уходит в отпуск',
                'Выгорает',
                <>Ведёт <span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">десятки других клиентов</span></>,
                <>Надо <span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">искать и собеседовать</span></>,
                <>Делает по ТЗ — <span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">с ошибками</span></>,
                <>Может <span className="line-through decoration-[#ff5d6c]/65 text-[#9e9eb4] font-semibold">уволиться</span> в разгар проекта</>,
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3.5 py-3 px-2.5 rounded-xl bg-white/[0.01] text-[#7e7e96] text-sm sm:text-base border-b border-white/[0.05] last:border-b-0"
                >
                  <span className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#ff5d6c]/12 border border-[#ff5d6c]/35 text-[#ff5d6c] text-sm font-extrabold">
                    −
                  </span>
                  <div>{item}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center py-1 md:py-0" aria-hidden="true">
            <div className="w-9 h-9 rounded-full bg-[#121224] border border-[#7c5cff]/40 text-[#a78bff] text-[11px] font-extrabold tracking-wider flex items-center justify-center shadow-[0_0_20px_rgba(124,92,255,0.25)]">
              VS
            </div>
          </div>

          <div className="stagger-item rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#7c5cff]/[0.14] via-[#34d399]/[0.06] to-[#101024]/95 border border-[#7c5cff]/50 shadow-[0_20px_55px_-12px_rgba(124,92,255,0.28)] backdrop-blur-xl">
            <h4 className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#34d399] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]" />
              Твоя AI-команда
            </h4>
            <ul className="space-y-1.5">
              {[
                <><span className="font-extrabold text-[#c4b5fd]">≈ 5 000 ₽</span> на подписки</>,
                <>Работает <span className="font-extrabold text-[#c4b5fd]">24/7</span></>,
                'Не болеет, не отдыхает',
                'Не выгорает',
                <>Работает <span className="font-extrabold text-[#c4b5fd]">только на тебя</span></>,
                <><span className="font-extrabold text-[#c4b5fd]">Уже собрана</span> — ничего не ищешь</>,
                <>Пишет <span className="font-extrabold text-[#c4b5fd]">в твоём стиле</span></>,
                <><span className="font-extrabold text-[#c4b5fd]">Никуда не денется</span></>,
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3.5 py-3 px-2.5 rounded-xl bg-[#7c5cff]/[0.06] text-[#ebe7ff] text-sm sm:text-base border-b border-[#7c5cff]/15 last:border-b-0"
                >
                  <span className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#34d399]/20 border border-[#34d399]/50 text-[#34d399] text-xs font-black">
                    ✓
                  </span>
                  <div>{item}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-4.5 mt-7">
          <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] mb-3.5" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-2 0-3 1-3 2.2 0 1.4 1.2 2 3 2.3 1.8.3 3 .9 3 2.3 0 1.3-1.2 2.2-3 2.2-1.6 0-2.7-.6-3.2-1.6" />
                <path d="M12 6v12" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">В 100 раз дешевле</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">
              Платишь за инструменты, а не за чужие зарплаты и больничные.
            </span>
          </div>

          <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] mb-3.5" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 14" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">Круглосуточно</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">
              Не спит, не уходит в отпуск, не пропадает в пятницу вечером.
            </span>
          </div>

          <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] mb-3.5" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <b className="block text-white text-lg font-bold mb-1.5">Только твоя</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed block">
              У неё нет других клиентов. Весь фокус — на тебе и твоей практике.
            </span>
          </div>
        </div>
      </section>

      {/* ЧТО УПАКУЕТ */}
      <section className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Что тебе упакует AI-команда
          </h2>
          <p className="text-[#9a9ab0] text-base sm:text-lg max-w-2xl mt-2.5">
            Не конспекты. Готовые продукты, собранные под тебя — на твоих материалах.
          </p>
        </div>

        <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2">Сайт, который продаёт</b>
            <span className="inline-block text-xs font-bold text-[#a78bff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2.5 py-0.5 rounded-full mb-2.5 w-fit">
              Вместо разработчика.
            </span>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Собран под твою услугу — за вечер, а не за месяц ожидания.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2">Контент, который приводит</b>
            <span className="inline-block text-xs font-bold text-[#a78bff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2.5 py-0.5 rounded-full mb-2.5 w-fit">
              Вместо копирайтера.
            </span>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Посты и сообщения в твоём голосе.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2">Обложки и визуал</b>
            <span className="inline-block text-xs font-bold text-[#a78bff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2.5 py-0.5 rounded-full mb-2.5 w-fit">
              Вместо дизайнера.
            </span>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Рилсы, YouTube, презентации — с твоим лицом и стилем.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2">Фото для контента</b>
            <span className="inline-block text-xs font-bold text-[#a78bff] bg-[#7c5cff]/12 border border-[#7c5cff]/25 px-2.5 py-0.5 rounded-full mb-2.5 w-fit">
              Вместо фотографа и фотосессии.
            </span>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Узнаваемые кадры за минуты.
            </span>
          </div>

          <div className="stagger-item flex flex-col p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_14px_38px_-8px_rgba(124,92,255,0.32)] transition-all duration-200 hover:-translate-y-1.5">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/35 text-[#a78bff] mb-4 shadow-[0_0_20px_rgba(124,92,255,0.15)]" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
              </svg>
            </span>
            <b className="block text-white text-[19px] font-extrabold mb-2">Тесты и квизы</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Воронка и диагностика клиента — твой инструмент, а не чужая платформа.
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
            <b className="block text-white text-[19px] font-extrabold mb-2">Ассистент для рутины</b>
            <span className="text-[#9a9ab0] text-sm leading-relaxed">
              Документы, саммари сессий, разбор встреч. Часы уходят из твоей недели.
            </span>
          </div>
        </div>
      </section>

      {/* НОВЫЙ БЛОК B: ДВА РЕЗУЛЬТАТА */}
      <section className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Два результата, ради которых всё это
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="stagger-item relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#121226] to-[#0b0b16] border border-[#7c5cff]/35 hover:border-[#a78bff] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65),0_0_32px_-10px_rgba(124,92,255,0.18)] transition-all duration-200 hover:-translate-y-1 overflow-hidden">
            <span className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-[#7c5cff]/15 border border-[#7c5cff]/40 text-[#a78bff] mb-5" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-3">Сайт</h3>
            <p className="text-[#cfcfdc] text-base leading-relaxed">
              Твой. В твоём стиле. Собранный под твою услугу, с твоими текстами и фото. Доверие к тебе возникает, когда человек видит твои страницы — а не когда приходит на сессию.
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
              Не чат-бот, а программа с файлами, почтой, календарём, CRM и Telegram. Саммари сессий, транскрибация, документы, контент. Он помнит контекст и развивается по ходу работы.
            </p>
          </div>
        </div>
      </section>

      {/* ПРОГРАММА 5 ВСТРЕЧ */}
      <section id="program" className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Как собирается твоя команда
          </h2>
        </div>

        <div className="timeline stagger-group relative mt-9 flex flex-col gap-4 pl-10 sm:pl-[58px]">
          {[
            {
              num: '01',
              tag: 'ВСТРЕЧА 01',
              title: 'Копирайтер: тексты в твоём голосе',
              desc: 'Публицистика для блога, разговорный стиль для сообщений. Промпты под твою интонацию.',
              get: '→ Посты, которые не отличить от твоих',
            },
            {
              num: '02',
              tag: 'ВСТРЕЧА 02',
              title: 'Дизайнер и фотограф: визуал под тебя',
              desc: 'Фото со своим лицом, обложки рилсов, YouTube, книг и презентаций. Авторское право.',
              get: '→ Узнаваемый визуал без фотосессий',
            },
            {
              num: '03',
              tag: 'ВСТРЕЧА 03',
              title: 'Разработчик: сайт без кода',
              desc: 'Сайт или лендинг под твою услугу, тесты и квизы для клиентов, боты.',
              get: '→ Сайт, тест и бот — без подрядчиков',
            },
            {
              num: '04',
              tag: 'ВСТРЕЧА 04',
              title: 'Ассистент: рутина на автомате',
              desc: 'Транскрибация и саммаризацию сессий и встреч, работа с документами и заметками.',
              get: '→ Часы рутины уходят из недели',
            },
            {
              num: '05',
              tag: 'ВСТРЕЧА 05',
              title: 'Маркетолог: система приводит клиентов',
              desc: 'Контент-план → рилс → посты → воронка. Как продолжать делать новое самому.',
              get: '→ Рабочая система, а не разрозненные навыки',
            },
          ].map((step, i) => (
            <React.Fragment key={step.num}>
              <div className="stagger-item relative">
                <div className="absolute -left-10 sm:-left-[58px] top-6 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#131328] border-2 border-[#a78bff] text-white text-[11px] sm:text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_18px_rgba(124,92,255,0.45)] z-10">
                  {step.num}
                </div>
                <div className="p-5 sm:p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:translate-x-1">
                  <span className="inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/12 border border-[#7c5cff]/30 mb-2.5">
                    {step.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">{step.desc}</p>
                  <span className="block mt-4 pt-3.5 border-t border-dashed border-white/10 text-[#a78bff] text-sm sm:text-[15px] font-semibold">
                    {step.get}
                  </span>
                </div>
              </div>
              {i < 4 && (
                <div className="flex justify-start pl-4 sm:pl-5 -my-1.5 text-[#a78bff]/75" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ЗОЛОТОЙ БЛОК НЕЙРОДАННЫХ */}
        <div className="reveal mt-7 relative rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-[#d4af6a]/12 via-[#14111c]/95 to-[#0c0b14] border border-[#d4af6a]/50 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start shadow-[0_20px_55px_-15px_rgba(212,175,106,0.22),inset_0_1px_0_rgba(212,175,106,0.25)] overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 106, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            aria-hidden="true"
          />
          <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-[#d4af6a]/15 border border-[#d4af6a]/45 text-[#d4af6a] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,106,0.25)]" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 12 6 12 9 4 13 20 16 12 22 12" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="inline-block bg-[#d4af6a]/15 border border-[#d4af6a]/45 text-[#d4af6a] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md mb-2.5">
              БОНУС
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Нейроданные в твоём кабинете</h3>
            <p className="text-[#dedee8] text-base leading-relaxed">
              Как ЭЭГ-датчики повышают чек и наглядность результатов. Дадим попробовать.
            </p>
            <span className="block mt-4 pt-3.5 border-t border-dashed border-[#d4af6a]/30 text-[#d4af6a] text-[15.5px] font-bold">
              → Аргумент для повышения чека
            </span>
          </div>
        </div>
      </section>

      {/* НОВЫЙ БЛОК C: ЭТО НЕ МАГИЯ И НЕ БУДУЩЕЕ */}
      <section className="py-14 sm:py-22">
        <div className="reveal rounded-3xl p-6 sm:p-11 bg-gradient-to-br from-[#121224]/85 to-[#0c0c18]/95 border border-white/10">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight text-white mb-4">
            Это не магия и не «будущее». Это уже работает.
          </h2>
          <p className="text-[#cfcfdc] text-base sm:text-lg max-w-3xl leading-relaxed">
            Я не программист и не айтишник. Всё, что ты увидишь, сделано в одиночку — без нанятых людей. И да, нейросети умели это делать полгода назад. Через полгода будет уметь ещё больше.
          </p>
          <div className="stagger-group grid grid-cols-1 md:grid-cols-3 gap-4.5 mt-8">
            <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-[#7c5cff]/30 hover:border-[#a78bff] transition-all duration-200 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#a78bff] mb-2.5 tracking-tight">5 часов</div>
              <div className="text-sm text-[#9a9ab0] leading-relaxed">
                Чистого времени на сайт, который делала команда за полтора месяца
              </div>
            </div>
            <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-[#7c5cff]/30 hover:border-[#a78bff] transition-all duration-200 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#a78bff] mb-2.5 tracking-tight">1,5 часа</div>
              <div className="text-sm text-[#9a9ab0] leading-relaxed">
                На вишлист — список всех своих хотелок в одном месте
              </div>
            </div>
            <div className="stagger-item p-6 rounded-2xl bg-[#121224] border border-[#7c5cff]/30 hover:border-[#a78bff] transition-all duration-200 hover:-translate-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#a78bff] mb-2.5 tracking-tight">1 сообщение</div>
              <div className="text-sm text-[#9a9ab0] leading-relaxed">
                Столько нужно, чтобы получить готовый результат
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДОЙДЁТ */}
      <section className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Кому подойдёт
          </h2>
        </div>

        <div className="stagger-group grid grid-cols-1 gap-3.5 mt-7">
          {[
            {
              text: <><b className="text-white font-bold">Психологам и коучам</b> — тем, кто практикует и хочет расти без выгорания</>,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.8-1.5 5-3.5 6.5V18a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2.5C6.5 14 5 11.8 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9" y1="22" x2="15" y2="22" />
                </svg>
              ),
            },
            {
              text: 'Бизнес-консультантам и тренерам по продажам — кому нужна упаковка и контент',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              ),
            },
            {
              text: 'Экспертам и наставникам, которые продают знания',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              ),
            },
            {
              text: 'Предпринимателям и фрилансерам, кто сам себе маркетинг и отдел разработки',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              ),
            },
            {
              text: 'Всем, кто устал делать контент, сайт и документы руками',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="stagger-item flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 text-[#cfcfdc] text-base sm:text-[16.5px] transition-all duration-200 hover:translate-x-1"
            >
              <span className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#7c5cff]/12 border border-[#7c5cff]/30 text-[#a78bff] flex items-center justify-center" aria-hidden="true">
                {item.icon}
              </span>
              <span className="leading-snug">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ЦЕНА + НОВЫЙ БЛОК D (ЗАПИСАТЬСЯ НА РАЗБОР) */}
      <section id="join" className="py-14 sm:py-22">
        <div className="reveal">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-white">
            Стоимость участия
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 mt-7 items-stretch">
          <div className="reveal p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#16162e] to-[#0d0d1a] border border-[#7c5cff]/35 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_32px_-6px_rgba(124,92,255,0.18)] flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#f7e7c4] to-[#d4af6a] bg-clip-text text-transparent">
                35 000 ₽ <small className="text-base sm:text-xl font-normal text-[#9a9ab0]">/ 2 месяца</small>
              </div>

              <div className="divide-y divide-white/10 mt-7">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                  <span>Формат</span>
                  <span className="font-bold text-white sm:text-right">5 живых онлайн-встреч + записи</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                  <span>Результат</span>
                  <span className="font-bold text-white sm:text-right">упакованный сайт, соцсети и материалы</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                  <span>Старт</span>
                  <span className="font-bold text-white sm:text-right">по набору группы</span>
                </div>
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-[#d4af6a]/[0.08] border border-[#d4af6a]/35 border-l-4 border-l-[#d4af6a] text-[#dedee8] text-sm sm:text-[15px] leading-relaxed">
                <b className="text-[#d4af6a] font-bold">Что нужно, кроме участия.</b> Чтобы войти в игру, понадобится стартовая сумма на
                подписки нейросетей и токены — <b className="text-white font-bold">около 5 000 ₽</b> на первые шаги. Дальше расходы зависят
                от твоих задач. Платишь напрямую сервисам, а не нам за накрутку.
              </div>
            </div>

            <div className="mt-7">
              <a
                className="inline-flex items-center justify-center px-10 py-4 sm:py-[18px] rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-lg tracking-wide shadow-[0_8px_32px_-4px_rgba(124,92,255,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto text-center"
                href="https://t.me/Indigopeople_assistant"
              >
                Записаться
              </a>
              <p className="text-[#9a9ab0] text-sm sm:text-[14.5px] mt-3.5">
                Оставь контакт — расскажем, что именно у тебя появится за 2 месяца.
              </p>
            </div>
          </div>

          <div className="reveal p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#d4af6a]/[0.07] via-[#121224]/95 to-[#0d0d1a] border border-[#d4af6a]/35 shadow-[0_20px_55px_-15px_rgba(0,0,0,0.65)] flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-white leading-snug mb-4">
                Не покупай вслепую. Сначала — разберём, что это даст тебе
              </h3>
              <p className="text-[#cfcfdc] text-base leading-relaxed">
                Созвон со мной: посмотрим, что конкретно нейросети могут дать твоей практике, с чего начать и за сколько встреч окупится. Если не подойдёт — так и скажу.
              </p>
            </div>
            <div className="mt-7">
              <a
                className="inline-flex items-center justify-center px-8 py-4 sm:py-[18px] rounded-2xl bg-gradient-to-r from-[#d4af6a]/20 to-[#d4af6a]/10 hover:from-[#d4af6a]/30 hover:to-[#d4af6a]/15 border border-[#d4af6a]/55 hover:border-[#d4af6a] text-[#f3d9a4] hover:text-white font-bold text-base sm:text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_28px_-6px_rgba(212,175,106,0.22)] w-full sm:w-auto text-center"
                href="https://t.me/Indigopeople_assistant"
              >
                Записаться на разбор
              </a>
              <p className="text-[#9a9ab0] text-sm sm:text-[14.5px] mt-3.5">
                Без продажи в лоб. Сначала разбираем твою задачу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-11 sm:py-14 text-center text-[#9a9ab0] text-sm leading-relaxed">
        <div className="inline-flex items-center gap-2 font-extrabold text-base tracking-wider text-white mb-3">
          <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_10px_#7c5cff]" aria-hidden="true" />
          <span>
            INDIGO <span className="text-[#a78bff]">LAB</span>
          </span>
        </div>
        <div>Indigo Lab · Доказательная психология · Метод БПСП · AI-инструменты для помогающих практиков</div>
        <div className="mt-2 text-xs sm:text-[13.5px] text-[#7d7d96] max-w-3xl mx-auto">
          Антон Шумкин — психолог-гипнотерапевт, 12+ лет в маркетинге и бизнесе, автор книги «Терапия оргазмом», кандидатская диссертация по нейродатчикам
        </div>
      </footer>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 bg-[#06060c]/85 backdrop-blur-md z-[100] flex items-center justify-center p-5 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="react-video-modal-title"
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
              Видео · 54 минуты
            </div>
            <h3 id="react-video-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-3">
              Сначала — посмотри, как это работает
            </h3>
            <p className="text-[#cfcfdc] text-sm sm:text-base leading-relaxed">
              Я записал видео на 54 минуты: показал свою AI-команду вживую — сайты, тесты, транскрипцию, визуал с моим лицом, книгу, диссертацию, CRM. Не теория. Всё, что я делаю, на моём железе.
            </p>
            <p className="mt-3.5 text-xs sm:text-sm text-[#9a9ab0] leading-relaxed">
              Видео бесплатное. В конце — кодовое слово и подарок: стартовый набор нейросетей с промтами и контактами проверенных продавцов.
            </p>
            <div className="mt-6">
              <a
                href="https://t.me/Indigopeople_assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base shadow-[0_8px_30px_-4px_rgba(124,92,255,0.48)] transition"
              >
                Открыть видео в Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
