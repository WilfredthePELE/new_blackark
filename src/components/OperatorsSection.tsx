import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AI_OPERATORS, ASSETS } from '../data/siteData';
import { useLocale } from '../context/LocaleContext';

export const OperatorsSection: React.FC = () => {
  const { t } = useLocale();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0.25);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(1);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setProgress(Math.min(1, Math.max(0.25, 0.25 + ratio * 0.75)));
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = window.innerWidth >= 768 ? 744 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      id="agents"
      className="relative w-full scroll-mt-[84px] bg-[#080808] px-5 pt-[110px] pb-[130px] md:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-[820px] flex-col items-center gap-4 text-center"
        >
          <p className="eyebrow-label text-[#999999]">04 / MEET YOUR NEW OPERATORS</p>
          <h2 className="section-headline text-[#f4f4f4]">
            {t.sections.operatorsTitle}
          </h2>
        </motion.div>

        {/* Horizontal Gallery */}
        <div className="flex w-full flex-col items-center gap-7">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto py-4"
          >
            {AI_OPERATORS.map((op, idx) => (
              <motion.article
                key={op.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                className="flex w-full shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515] p-6 md:w-[720px] md:flex-row md:gap-8 md:p-7"
              >
                {/* Left Copy + Live Status Box */}
                <div className="flex flex-1 flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="eyebrow-label text-[#999999]">{op.eyebrow}</span>
                    <h3 className="text-[28px] font-medium tracking-[-0.03em] text-[#f4f4f4]">
                      {op.title}
                    </h3>
                    <p className="eyebrow-label text-[#b8b8b8]">{op.tagline}</p>
                    <p className="mt-1 max-w-[380px] text-[15px] leading-[1.6em] text-[#999999]">
                      {op.description}
                    </p>
                  </div>

                  {/* Operator Queue Card */}
                  <div className="rounded-2xl border border-[#242424] bg-[#080808] p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="eyebrow-label text-[#999999]">{op.statusCode}</span>
                      <span className="font-mono-num text-[11px] text-[#ff6601]">QUEUE</span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-[#f4f4f4]">{op.statusText}</p>
                  </div>
                </div>

                {/* Right Visual Tile */}
                <div className="relative mt-6 aspect-square w-full shrink-0 overflow-hidden rounded-[18px] border border-[#242424] bg-[#080808] md:mt-0 md:w-[250px]">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 60% 35%, ${op.accentTint}, transparent 70%)`,
                    }}
                  />
                  <img
                    src={ASSETS.agentsObsidianPrism}
                    alt={`${op.title} obsidian prism visualization`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                    style={{
                      transform: `rotate(${idx * 90}deg) scale(1.06)`,
                    }}
                  />
                </div>
              </motion.article>
            ))}
          </div>

          {/* Progress Bar + Scroll Arrows */}
          <div className="flex w-full max-w-[560px] items-center gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous operator"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#242424] bg-[#151515] text-[#f4f4f4] transition-colors hover:border-[#3b3b3b] hover:text-[#ff6601]"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#3b3b3b]">
              <div
                className="h-full rounded-full bg-[#f4f4f4] transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next operator"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#242424] bg-[#151515] text-[#f4f4f4] transition-colors hover:border-[#3b3b3b] hover:text-[#ff6601]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
