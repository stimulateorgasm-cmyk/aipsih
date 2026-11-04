/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Copy, Check, Download, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showExportBar, setShowExportBar] = useState(true);

  // IntersectionObserver for delicate scroll micro-animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .stagger-group');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleCopyHtml = async () => {
    try {
      const response = await fetch('/standalone.html');
      const htmlText = await response.text();
      await navigator.clipboard.writeText(htmlText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadHtml = async () => {
    try {
      const response = await fetch('/standalone.html');
      const htmlText = await response.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a12] text-[#e8e8f0] font-sans antialiased overflow-x-hidden selection:bg-[#7c5cff]/30 selection:text-white">
      {/* Background radial atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 50% at 50% -10%, rgba(124, 92, 255, 0.18), transparent 75%),
            radial-gradient(circle 600px at 85% 20%, rgba(212, 175, 106, 0.04), transparent),
            radial-gradient(circle 500px at 15% 65%, rgba(124, 92, 255, 0.05), transparent)
          `,
        }}
      />

      {/* High-tech scientific grid backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Floating Action Bar for Art-Director Export */}
      {showExportBar && (
        <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a12]/80 border-b border-white/10 px-4 py-2.5 transition-all">
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7c5cff]/20 text-[#a78bff] border border-[#7c5cff]/40">
                <Sparkles className="w-3 h-3" />
              </span>
              <span className="font-medium text-white">Новый редизайн лендинга готов</span>
              <span className="hidden sm:inline text-zinc-400">· 100% исходного копирайтинга сохранено</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyHtml}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7c5cff] hover:bg-[#8f72ff] text-white font-medium shadow-sm transition active:scale-95 cursor-pointer"
                title="Скопировать чистый HTML без фреймворков для сохранения в файл"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать чистый HTML'}</span>
              </button>
              <button
                onClick={handleDownloadHtml}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-medium transition active:scale-95 cursor-pointer"
                title="Скачать готовый index.html"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Скачать .html</span>
              </button>
              <a
                href="/standalone.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition"
                title="Открыть чистый автономный HTML"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowExportBar(false)}
                className="text-zinc-400 hover:text-white px-1.5 py-1 ml-1"
                title="Скрыть панель"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Container */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOPBAR */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2.5 font-extrabold text-xl tracking-wide text-white">
            <span className="w-2 h-2 rounded-full bg-[#a78bff] shadow-[0_0_12px_#7c5cff]" aria-hidden="true" />
            <span>INDIGO <span className="text-[#a78bff]">LAB</span></span>
          </div>
          <div className="text-[11px] sm:text-xs font-semibold tracking-[1.6px] uppercase text-[#9a9ab0] px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            AI-команда · 5 встреч · 2 месяца
          </div>
        </header>

        {/* HERO */}
        <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
          {/* Ambient Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[260px] sm:h-[400px] pointer-events-none -z-10 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(124, 92, 255, 0.22) 0%, rgba(124, 92, 255, 0.05) 50%, transparent 75%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />

          <div className="reveal space-y-6 max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#a78bff] text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(124,92,255,0.18)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a78bff] shadow-[0_0_8px_#7c5cff]" />
              <span>Мастермайнд для практиков и экспертов</span>
            </div>

            {/* Cinematic H1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold leading-[1.05] tracking-tight text-white">
              Твоя{' '}
              <em className="not-italic bg-gradient-to-r from-white via-[#c4b5fd] to-[#7c5cff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(124,92,255,0.4)]">
                AI-команда
              </em>
              <br />
              за 2 месяца
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl text-[#cfcfdc] max-w-2xl font-normal leading-relaxed pt-2">
              Она соберёт тебе <b className="text-white font-semibold">сайт, соцсети и материалы для клиентов</b> —
              вместо отдела маркетинга на полмиллиона.
            </p>

            {/* Single Primary Action Button */}
            <div className="pt-4">
              <a
                href="#compare"
                className="btn inline-flex items-center justify-center px-8 sm:px-10 py-5 rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-base sm:text-lg tracking-wide shadow-[0_8px_32px_-4px_rgba(124,92,255,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_-4px_rgba(124,92,255,0.7)] active:translate-y-0 text-center w-full sm:w-auto"
              >
                Посмотреть, как это работает
              </a>
            </div>
          </div>
        </section>

        {/* СКОЛЬКО СТОИТ КОМАНДА ВЖИВУЮ (SHOCK SECTION) */}
        <section className="pt-0 pb-16 sm:pb-24">
          <div className="reveal relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#1c0b16] via-[#120d1c] to-[#0b0914] border border-[#ff5d6c]/35 shadow-[0_20px_60px_-15px_rgba(255,93,108,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
            {/* Warning Glow Ambient */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 93, 108, 0.18) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />

            {/* Section Tag */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold tracking-widest text-[#ff5d6c] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff5d6c] shadow-[0_0_10px_#ff5d6c]" />
              <span>Сколько стоит такая команда, если нанимать живых людей</span>
            </div>

            {/* Staggered Price Tag Cards */}
            <div className="stagger-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-7">
              {/* Card 1 */}
              <div className="stagger-item group relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Маркетолог</div>
                <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                  150 000
                  <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
              </div>

              {/* Card 2 */}
              <div className="stagger-item group relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Дизайнер</div>
                <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                  100 000
                  <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
              </div>

              {/* Card 3 */}
              <div className="stagger-item group relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Копирайтер</div>
                <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                  80 000
                  <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
              </div>

              {/* Card 4 */}
              <div className="stagger-item group relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Разработчик</div>
                <div className="relative inline-block text-xl sm:text-2xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                  200 000
                  <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">₽ / мес</div>
              </div>

              {/* Card 5 */}
              <div className="stagger-item col-span-2 sm:col-span-1 group relative p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-[#ff5d6c]/25 hover:border-[#ff5d6c]/50 text-center backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="text-xs sm:text-sm font-semibold text-zinc-300 mt-2">Фотограф</div>
                <div className="relative inline-block text-lg sm:text-xl font-extrabold text-[#ff5d6c] mt-2.5 tracking-tight">
                  по съёмкам
                  <span className="absolute left-[-4px] right-[-4px] top-[52%] h-[2px] bg-[#ff5d6c] -rotate-6 shadow-[0_0_8px_#ff5d6c]" />
                </div>
                <div className="text-[11px] sm:text-xs text-[#9a9ab0] mt-1 font-medium">от 15 000</div>
              </div>
            </div>

            {/* Shock Total Box */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-black/40 border border-[#ff5d6c]/30 text-center text-zinc-200 text-base sm:text-xl leading-relaxed">
              Итого{' '}
              <b className="inline-block text-white text-xl sm:text-3xl font-extrabold px-3 py-1 rounded-xl bg-[#ff5d6c]/15 border border-[#ff5d6c]/40 text-[#ff808d] shadow-[0_0_20px_rgba(255,93,108,0.35)] mx-1">
                ≈ 500 000 ₽ в месяц
              </b>{' '}
              — штат, который большинство практиков не может себе позволить.
            </div>
          </div>
        </section>

        {/* СРАВНЕНИЕ (COMPARE SECTION) */}
        <section id="compare" className="py-16 sm:py-24">
          <div className="reveal">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Та же команда — у тебя<br />за стоимость подписки
            </h2>
          </div>

          <div className="compare stagger-group grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Bad Column - Live Team */}
            <div className="col bad stagger-item rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-[#ff5d6c]/[0.08] to-[#140c16]/80 border border-[#ff5d6c]/35 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <h4 className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#ff5d6c] mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5d6c] shadow-[0_0_10px_#ff5d6c]" />
                Живая команда
              </h4>
              <ul className="space-y-3.5">
                {[
                  <><span>500 000 ₽</span> в месяц</>,
                  <>Работает <span>8 часов</span> в день</>,
                  'Болеет, уходит в отпуск',
                  'Выгорает',
                  <>Ведёт <span>десятки других клиентов</span></>,
                  <>Надо <span>искать и собеседовать</span></>,
                  <>Делает по ТЗ — <span>с ошибками</span></>,
                  <>Может <span>уволиться</span> в разгар проекта</>,
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 py-2.5 text-[#cfcfdc] text-sm sm:text-base border-b border-white/[0.06] last:border-b-0">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-[#ff5d6c]/15 border border-[#ff5d6c]/40 text-[#ff5d6c] text-xs font-black">
                      ✕
                    </span>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Good Column - AI Team */}
            <div className="col good stagger-item rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-[#34d399]/[0.09] to-[#0c1816]/80 border border-[#34d399]/40 shadow-[0_16px_45px_-10px_rgba(52,211,153,0.18)] backdrop-blur-xl">
              <h4 className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#34d399] mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]" />
                Твоя AI-команда
              </h4>
              <ul className="space-y-3.5">
                {[
                  <><span>≈ 5 000 ₽</span> на подписки</>,
                  <>Работает <span>24/7</span></>,
                  'Не болеет, не отдыхает',
                  'Не выгорает',
                  <>Работает <span>только на тебя</span></>,
                  <><span>Уже собрана</span> — ничего не ищешь</>,
                  <>Пишет <span>в твоём стиле</span></>,
                  <><span>Никуда не денется</span></>,
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 py-2.5 text-[#cfcfdc] text-sm sm:text-base border-b border-white/[0.06] last:border-b-0">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-[#34d399]/20 border border-[#34d399]/50 text-[#34d399] text-xs font-black">
                      ✓
                    </span>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Perks Grid */}
          <div className="perks stagger-group grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="perk stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-2xl mb-4">
                💸
              </span>
              <b className="block text-white text-lg font-bold mb-1.5">В 100 раз дешевле</b>
              <span className="text-[#9a9ab0] text-sm leading-relaxed block">
                Платишь за инструменты, а не за чужие зарплаты и больничные.
              </span>
            </div>

            <div className="perk stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-2xl mb-4">
                ⏰
              </span>
              <b className="block text-white text-lg font-bold mb-1.5">Круглосуточно</b>
              <span className="text-[#9a9ab0] text-sm leading-relaxed block">
                Не спит, не уходит в отпуск, не пропадает в пятницу вечером.
              </span>
            </div>

            <div className="perk stagger-item p-6 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 transition-all duration-200 hover:-translate-y-1">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-2xl mb-4">
                🙋
              </span>
              <b className="block text-white text-lg font-bold mb-1.5">Только твоя</b>
              <span className="text-[#9a9ab0] text-sm leading-relaxed block">
                У неё нет других клиентов. Весь фокус — на тебе и твоей практике.
              </span>
            </div>
          </div>
        </section>

        {/* ЧТО УПАКУЕТ (ASSETS SECTION) */}
        <section className="py-16 sm:py-24">
          <div className="reveal">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Что тебе упакует AI-команда
            </h2>
            <p className="text-[#9a9ab0] text-base sm:text-lg max-w-2xl mt-3">
              Не конспекты. Готовые продукты, собранные под тебя — на твоих материалах.
            </p>
          </div>

          <div className="assets stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {[
              {
                ico: '🌐',
                title: 'Сайт, который продаёт',
                desc: 'Вместо разработчика. Собран под твою услугу — за вечер, а не за месяц ожидания.',
              },
              {
                ico: '✍️',
                title: 'Контент, который приводит',
                desc: 'Вместо копирайтера. Посты и сообщения в твоём голосе.',
              },
              {
                ico: '🎨',
                title: 'Обложки и визуал',
                desc: 'Вместо дизайнера. Рилсы, YouTube, презентации — с твоим лицом и стилем.',
              },
              {
                ico: '📸',
                title: 'Фото для контента',
                desc: 'Вместо фотографа и фотосессии. Узнаваемые кадры за минуты.',
              },
              {
                ico: '📊',
                title: 'Тесты и квизы',
                desc: 'Воронка и диагностика клиента — твой инструмент, а не чужая платформа.',
              },
              {
                ico: '🤖',
                title: 'Ассистент для рутины',
                desc: 'Документы, саммари сессий, разбор встреч. Часы уходят из твоей недели.',
              },
            ].map((asset, i) => (
              <div
                key={i}
                className="asset stagger-item p-7 rounded-2xl bg-gradient-to-br from-[#7c5cff]/[0.08] via-[#d4af6a]/[0.03] to-[#141424]/60 border border-[#7c5cff]/25 hover:border-[#a78bff] hover:shadow-[0_12px_35px_-8px_rgba(124,92,255,0.25)] transition-all duration-200 hover:-translate-y-1.5"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c5cff]/15 border border-[#7c5cff]/30 text-2xl mb-4">
                  {asset.ico}
                </span>
                <b className="block text-white text-lg font-bold mb-2">{asset.title}</b>
                <span className="text-[#9a9ab0] text-sm leading-relaxed block">{asset.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ПО ВСТРЕЧАМ (PROGRAM SECTION) */}
        <section id="program" className="py-16 sm:py-24">
          <div className="reveal">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Как собирается твоя команда
            </h2>
          </div>

          <div className="grid stagger-group grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/35 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/15 border border-[#7c5cff]/30 mb-3">
                  ВСТРЕЧА 01
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Копирайтер: тексты в твоём голосе</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Публицистика для блога, разговорный стиль для сообщений. Промпты под твою интонацию.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Посты, которые не отличить от твоих
              </span>
            </div>

            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/35 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/15 border border-[#7c5cff]/30 mb-3">
                  ВСТРЕЧА 02
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Дизайнер и фотограф: визуал под тебя</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Фото со своим лицом, обложки рилсов, YouTube, книг и презентаций. Авторское право.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Узнаваемый визуал без фотосессий
              </span>
            </div>

            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/35 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/15 border border-[#7c5cff]/30 mb-3">
                  ВСТРЕЧА 03
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Разработчик: сайт без кода</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Сайт или лендинг под твою услугу, тесты и квизы для клиентов, боты.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Сайт, тест и бот — без подрядчиков
              </span>
            </div>

            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/35 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/15 border border-[#7c5cff]/30 mb-3">
                  ВСТРЕЧА 04
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Ассистент: рутина на автомате</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Транскрибация и саммаризацию сессий и встреч, работа с документами и заметками.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Часы рутины уходят из недели
              </span>
            </div>

            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/35 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#a78bff] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#7c5cff]/15 border border-[#7c5cff]/30 mb-3">
                  ВСТРЕЧА 05
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Маркетолог: система приводит клиентов</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Контент-план → рилс → посты → воронка. Как продолжать делать новое самому.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Рабочая система, а не разрозненные навыки
              </span>
            </div>

            <div className="card stagger-item flex flex-col justify-between p-7 rounded-2xl bg-[#121224] border border-[#7c5cff]/45 transition-all duration-200 hover:-translate-y-1">
              <div>
                <span className="num inline-block text-[#d4af6a] font-extrabold text-xs tracking-wider px-3 py-1 rounded-md bg-[#d4af6a]/15 border border-[#d4af6a]/35 mb-3">
                  БОНУС
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Нейроданные в твоём кабинете</h3>
                <p className="text-[#9a9ab0] text-sm sm:text-base leading-relaxed">
                  Как ЭЭГ-датчики повышают чек и наглядность результатов. Дадим попробовать.
                </p>
              </div>
              <span className="get block mt-5 pt-3.5 border-t border-dashed border-white/10 text-[#d4af6a] text-sm font-semibold">
                → Аргумент для повышения чека
              </span>
            </div>
          </div>
        </section>

        {/* КОМУ (AUDIENCE SECTION) */}
        <section className="py-16 sm:py-24">
          <div className="reveal">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Кому подойдёт
            </h2>
          </div>

          <ul className="list stagger-group space-y-3.5 mt-8">
            {[
              <><b>Психологам и коучам</b> — тем, кто практикует и хочет расти без выгорания</>,
              'Бизнес-консультантам и тренерам по продажам — кому нужна упаковка и контент',
              'Экспертам и наставникам, которые продают знания',
              'Предпринимателям и фрилансерам, кто сам себе маркетинг и отдел разработки',
              'Всем, кто устал делать контент, сайт и документы руками',
            ].map((item, idx) => (
              <li
                key={idx}
                className="stagger-item relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#121224] border border-white/10 hover:border-[#7c5cff]/40 text-[#cfcfdc] text-base sm:text-lg transition-all duration-200 hover:translate-x-1"
              >
                <span className="text-[#a78bff] text-base mt-0.5">◆</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ЦЕНА (JOIN / PRICING SECTION) */}
        <section id="join" className="py-16 sm:py-24">
          <div className="reveal">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Стоимость участия
            </h2>
          </div>

          <div className="pricewrap reveal p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-[#15152a] to-[#0d0d1a] border border-[#7c5cff]/35 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(124,92,255,0.15)] mt-8">
            <div className="price flex items-baseline gap-3 flex-wrap text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              35 000 ₽ <small className="text-base sm:text-xl font-normal text-[#9a9ab0]">/ 2 месяца</small>
            </div>

            <div className="rows divide-y divide-white/10 mt-8">
              <div className="row flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                <span>Формат</span>
                <span className="v font-bold text-white sm:text-right">5 живых онлайн-встреч + записи</span>
              </div>
              <div className="row flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                <span>Результат</span>
                <span className="v font-bold text-white sm:text-right">упакованный сайт, соцсети и материалы</span>
              </div>
              <div className="row flex flex-col sm:flex-row justify-between sm:items-center py-4 text-sm sm:text-base text-[#cfcfdc] gap-1">
                <span>Старт</span>
                <span className="v font-bold text-white sm:text-right">по набору группы</span>
              </div>
            </div>

            {/* Notice box */}
            <div className="notice mt-8 p-5 sm:p-6 rounded-2xl bg-[#d4af6a]/[0.08] border border-[#d4af6a]/30 border-l-4 border-l-[#d4af6a] text-[#dedee8] text-sm sm:text-base leading-relaxed">
              <b className="text-[#d4af6a] font-bold">Что нужно, кроме участия.</b> Чтобы войти в игру, понадобится стартовая сумма на
              подписки нейросетей и токены — <b className="text-white font-bold">около 5 000 ₽</b> на первые шаги. Дальше расходы зависят
              от твоих задач. Платишь напрямую сервисам, а не нам за накрутку.
            </div>

            <div className="mt-8">
              <a
                className="btn inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-gradient-to-r from-[#8a6bff] to-[#6b46f6] hover:from-[#997eff] hover:to-[#7a55fa] text-white font-bold text-lg tracking-wide shadow-[0_8px_32px_-4px_rgba(124,92,255,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_-4px_rgba(124,92,255,0.7)] active:translate-y-0 w-full sm:w-auto"
                href="https://t.me/Andrey_Indigo"
                target="_blank"
                rel="noreferrer"
              >
                Записаться
              </a>
            </div>

            <p className="text-[#9a9ab0] text-sm sm:text-base mt-4">
              Оставь контакт — расскажем, что именно у тебя появится за 2 месяца.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer border-t border-white/10 py-10 sm:py-14 text-center text-[#9a9ab0] text-xs sm:text-sm leading-relaxed">
          Indigo Lab · Доказательная психология · Метод БПСП — AI-инструменты для помогающих практиков.
        </footer>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-group .stagger-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .stagger-group.is-visible .stagger-item {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-group.is-visible .stagger-item:nth-child(1) { transition-delay: 50ms; }
        .stagger-group.is-visible .stagger-item:nth-child(2) { transition-delay: 110ms; }
        .stagger-group.is-visible .stagger-item:nth-child(3) { transition-delay: 170ms; }
        .stagger-group.is-visible .stagger-item:nth-child(4) { transition-delay: 230ms; }
        .stagger-group.is-visible .stagger-item:nth-child(5) { transition-delay: 290ms; }
        .stagger-group.is-visible .stagger-item:nth-child(6) { transition-delay: 350ms; }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .stagger-group .stagger-item {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
