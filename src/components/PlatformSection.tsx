import React from 'react';
import { motion } from 'motion/react';
import { APPROACH_TABS, ASSETS, PLATFORM_METRICS } from '../data/siteData';
import { useLocale } from '../context/LocaleContext';

export const PlatformSection: React.FC = () => {
  const { t } = useLocale();

  return (
    <section
      id="platform"
      className="relative w-full scroll-mt-[84px] bg-[#080808] px-5 pt-[110px] pb-[100px] md:px-8 md:pt-[136px] md:pb-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16">
        {/* Asymmetric Header Split */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="lg:w-[30%] lg:shrink-0">
            <p className="text-[13px] font-medium text-[#999999]">01. Platform</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col gap-5"
          >
            <h2 className="section-headline max-w-[1000px] text-[#f4f4f4]">
              Great commerce feels effortless.{' '}
              <span className="font-script-brand text-[1.15em] font-bold">
                BlackArk
              </span>{' '}
              {t.sections.platformTitle}
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.65em] text-[#999999]">
              Less switching tabs. Fewer loose ends. A connected way to handle the
              work behind every purchase, with your team in control.
            </p>
          </motion.div>
        </div>

        {/* 3-Column Metrics Strip */}
        <div className="grid grid-cols-1 gap-8 border-y border-[#242424] py-10 md:grid-cols-3 md:gap-0">
          {PLATFORM_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`flex flex-col justify-between gap-3 md:px-8 ${
                idx === 0 ? 'md:pl-0' : 'md:border-l md:border-[#242424]'
              }`}
            >
              <span className="text-[12px] tracking-[0.06em] text-[#999999] uppercase">
                {metric.label}
              </span>
              <span className="font-mono-num text-[48px] leading-none font-normal tracking-[-0.04em] text-[#f4f4f4] md:text-[64px]">
                {metric.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Full-Width Glass Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative aspect-[16/9] max-h-[680px] w-full overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515]"
        >
          <img
            src={ASSETS.platformGlassFounder}
            alt="BlackArk glass dashboard with a photorealistic commerce operator"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,8,8,0.05) 0%, rgba(8,8,8,0.2) 60%, rgba(8,8,8,0.78) 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-4 md:inset-x-10 md:bottom-8">
            <p className="max-w-[460px] text-[15px] text-[#f4f4f4]">
              Order routing, customer context, and policy checks unified in one quiet layer.
            </p>
            <span className="text-[12px] text-[#b8b8b8]">Human approval active</span>
          </div>
        </motion.div>

        {/* Quiet 4-Column Operational Pillars (replaces heavy Approach box stack) */}
        <div className="grid grid-cols-1 gap-8 border-t border-[#242424] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH_TABS.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <span className="font-mono-num text-[12px] text-[#ff6601]">
                {item.number}
              </span>
              <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.6em] text-[#999999]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
