import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { APPROACH_TABS, ASSETS } from '../data/siteData';
import { useLocale } from '../context/LocaleContext';

export const ApproachSection: React.FC = () => {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % APPROACH_TABS.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeTab = APPROACH_TABS[activeIndex];

  return (
    <section
      id="approach"
      className="relative w-full scroll-mt-[84px] bg-[#080808] px-5 py-[100px] md:px-8 md:py-[130px]"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-[820px] flex-col items-center gap-4 text-center"
        >
          <p className="eyebrow-label text-[#999999]">02 / A BETTER WAY TO WORK</p>
          <h2 className="section-headline text-[#f4f4f4]">
            {t.sections.approachTitle}
          </h2>
        </motion.div>

        {/* Timed Feature Tabs + Dark Smoked Glass Visual */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-12"
        >
          {/* Left: 4 Timed Feature Tabs */}
          <div className="flex flex-col justify-between gap-3 lg:col-span-6">
            {APPROACH_TABS.map((tab, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex w-full cursor-pointer flex-col gap-2.5 overflow-hidden rounded-[20px] border p-6 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#ff6601] ${
                    isActive
                      ? 'border-[#3b3b3b] bg-[#151515]'
                      : 'border-[#242424] bg-[#0c0c0c] hover:border-[#3b3b3b] hover:bg-[#151515]/70'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono-num text-[13px] transition-colors ${
                          isActive ? 'text-[#ff6601]' : 'text-[#999999]'
                        }`}
                      >
                        {tab.number}
                      </span>
                      <span className="text-[19px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                        {tab.title}
                      </span>
                    </div>
                    <span
                      className={`eyebrow-label transition-opacity ${
                        isActive ? 'text-[#ff6601] opacity-100' : 'text-[#999999] opacity-0'
                      }`}
                    >
                      ACTIVE
                    </span>
                  </div>

                  <p className="pl-8 text-[15px] leading-[1.6em] text-[#999999]">
                    {tab.description}
                  </p>

                  {/* Bottom hairline timer track */}
                  <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-[#242424]">
                    {isActive && (
                      <motion.div
                        key={`progress-${activeIndex}-${paused}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0.5 : 1 }}
                        transition={{ duration: paused ? 0.2 : 4.8, ease: 'linear' }}
                        style={{ transformOrigin: 'left' }}
                        className="h-full w-full bg-[#ff6601]"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Smoked-Glass Visual Showcase */}
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515] p-6 lg:col-span-6 lg:min-h-0 lg:p-8">
            {/* Ambient warm ember glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-45 blur-3xl transition-all duration-700"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,102,1,0.45) 0%, rgba(255,34,0,0.18) 45%, transparent 72%)',
                transform: `translate(${activeIndex * -18}px, ${activeIndex * 14}px)`,
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="eyebrow-label text-[#999999]">{activeTab.previewEyebrow}</span>
              <span className="font-mono-num text-[12px] text-[#b8b8b8]">
                {activeTab.number} / 04
              </span>
            </div>

            <div className="relative z-10 my-6 flex flex-1 items-center justify-center">
              <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#242424] bg-[#080808]">
                <img
                  src={ASSETS.approachDarkGlass}
                  alt="Smoked glass operations monolith illustration"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-all duration-700"
                  style={{
                    filter: `hue-rotate(${activeTab.hueRotation}) contrast(1.06)`,
                    transform: `scale(${1.02 + activeIndex * 0.025})`,
                  }}
                />
              </div>
            </div>

            <div className="relative z-10 rounded-xl border border-[#242424] bg-[#080808]/85 px-4 py-3.5 backdrop-blur-md">
              <p className="text-[13px] text-[#f4f4f4]">{activeTab.previewSignal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
