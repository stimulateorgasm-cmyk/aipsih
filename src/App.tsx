/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Sparkles } from 'lucide-react';
import { VideoLanding } from './components/VideoLanding';
import { MastermindLanding } from './components/MastermindLanding';
import { MiniAppSurvey } from './components/MiniAppSurvey';

type LandingKey = 'video' | 'mastermind' | 'miniapp';

function getInitialLanding(): LandingKey {
  if (typeof window === 'undefined') return 'video';
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page === 'mastermind') return 'mastermind';
  if (page === 'miniapp') return 'miniapp';
  return 'video';
}

export default function App() {
  const [activeLanding, setActiveLanding] = useState<LandingKey>(getInitialLanding);
  const [copied, setCopied] = useState(false);
  const [showExportBar, setShowExportBar] = useState(true);

  const activeFileUrl =
    activeLanding === 'video'
      ? '/video.html'
      : activeLanding === 'miniapp'
        ? '/miniapp.html'
        : '/standalone.html';
  const activeDownloadName =
    activeLanding === 'video'
      ? 'video-index.html'
      : activeLanding === 'miniapp'
        ? 'miniapp-index.html'
        : 'mastermind-index.html';

  const switchLanding = (next: LandingKey) => {
    setActiveLanding(next);
    setCopied(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', next);
      window.history.replaceState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyHtml = async () => {
    try {
      const response = await fetch(activeFileUrl);
      const htmlText = await response.text();
      await navigator.clipboard.writeText(htmlText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadHtml = async () => {
    try {
      const response = await fetch(activeFileUrl);
      const htmlText = await response.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeDownloadName;
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
        className="fixed inset-0 pointer-events-none z-0 print:hidden"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 50% at 50% -10%, rgba(124, 92, 255, 0.18), transparent 75%),
            radial-gradient(circle 600px at 88% 12%, rgba(212, 175, 106, 0.06), transparent),
            radial-gradient(circle 500px at 12% 68%, rgba(124, 92, 255, 0.06), transparent)
          `,
        }}
        aria-hidden="true"
      />

      {/* Laboratory grid backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 print:hidden"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Floating Export & Landing Switcher Bar */}
      {showExportBar && (
        <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a12]/85 border-b border-white/10 px-4 py-2.5 print:hidden">
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7c5cff]/20 text-[#a78bff] border border-[#7c5cff]/40">
                <Sparkles className="w-3 h-3" />
              </span>
              <nav className="flex flex-wrap items-center gap-1.5" aria-label="Выбор лендинга">
                <button
                  type="button"
                  onClick={() => switchLanding('video')}
                  aria-pressed={activeLanding === 'video'}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    activeLanding === 'video'
                      ? 'bg-[#7c5cff]/25 text-white border border-[#7c5cff]/60'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  1. Лендинг про видео
                </button>
                <button
                  type="button"
                  onClick={() => switchLanding('mastermind')}
                  aria-pressed={activeLanding === 'mastermind'}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    activeLanding === 'mastermind'
                      ? 'bg-[#7c5cff]/25 text-white border border-[#7c5cff]/60'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  2. Лендинг мастермайнда
                </button>
                <button
                  type="button"
                  onClick={() => switchLanding('miniapp')}
                  aria-pressed={activeLanding === 'miniapp'}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    activeLanding === 'miniapp'
                      ? 'bg-[#7c5cff]/25 text-white border border-[#7c5cff]/60'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  3. Мини-апп (анкета TG)
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyHtml}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7c5cff] hover:bg-[#8f72ff] text-white font-medium shadow-sm transition active:scale-95 cursor-pointer"
                title="Скопировать чистый HTML для сохранения в index.html"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать index.html'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-medium transition active:scale-95 cursor-pointer"
                title="Скачать готовый HTML"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Скачать .html</span>
              </button>
              <a
                href={activeFileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition"
                title="Открыть автономный HTML"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setShowExportBar(false)}
                className="text-zinc-400 hover:text-white px-1.5 py-1 ml-1 cursor-pointer"
                aria-label="Скрыть панель экспорта"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {activeLanding === 'video' ? (
        <VideoLanding />
      ) : activeLanding === 'miniapp' ? (
        <MiniAppSurvey />
      ) : (
        <MastermindLanding />
      )}

      <style>{`
        .hero-photo {
          position: absolute;
          top: 0;
          right: -40px;
          bottom: 0;
          width: 58%;
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 15%, #000 38%, #000 84%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 8%, #000 72%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 15%, #000 38%, #000 84%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 8%, #000 72%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        .hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          filter: saturate(1.06) contrast(1.06);
        }
        .hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, #0a0a12 0%, rgba(10,10,18,0.5) 18%, transparent 45%, transparent 82%, rgba(10,10,18,0.85) 100%),
            linear-gradient(180deg, rgba(10,10,18,0.6) 0%, transparent 14%, transparent 78%, #0a0a12 100%);
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 26px;
          bottom: 26px;
          width: 2px;
          background: linear-gradient(180deg, #7c5cff 0%, rgba(167,139,255,0.5) 70%, rgba(212,175,106,0.65) 100%);
          box-shadow: 0 0 14px rgba(124,92,255,0.4);
        }
        @media (min-width: 640px) {
          .timeline::before {
            left: 21px;
          }
        }
        @media (max-width: 860px) {
          .hero-photo {
            display: none !important;
          }
        }
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
        .stagger-group.is-visible .stagger-item:nth-child(7) { transition-delay: 410ms; }
        .stagger-group.is-visible .stagger-item:nth-child(8) { transition-delay: 470ms; }
        .stagger-group.is-visible .stagger-item:nth-child(9) { transition-delay: 530ms; }
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
