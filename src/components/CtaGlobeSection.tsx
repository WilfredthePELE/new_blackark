import React from 'react';
import { motion } from 'motion/react';
import { AtomicGlobeCanvas } from './AtomicGlobeCanvas';
import { MagneticButton } from './MagneticButton';
import { useLocale } from '../context/LocaleContext';

interface CtaGlobeSectionProps {
  onRequestDemo: () => void;
}

export const CtaGlobeSection: React.FC<CtaGlobeSectionProps> = ({
  onRequestDemo,
}) => {
  const { t } = useLocale();

  return (
    <section
      id="get-started"
      className="relative flex min-h-[680px] w-full items-center justify-center overflow-hidden bg-[#080808] px-5 py-[160px] md:min-h-[780px] md:px-8"
    >
      {/* Interactive Atomic Globe */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
        <div className="aspect-[1.16/1] h-full max-h-[760px] w-full max-w-[880px]">
          <AtomicGlobeCanvas />
        </div>
      </div>

      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none relative z-10 flex max-w-[780px] flex-col items-center gap-6 text-center"
      >
        <p className="text-[13px] font-medium text-[#b8b8b8]">
          {t.sections.ctaEyebrow}
        </p>
        <h2 className="section-headline text-[#f4f4f4]">
          {t.sections.ctaTitle}
        </h2>

        <MagneticButton
          type="button"
          onClick={onRequestDemo}
          className="pointer-events-auto mt-2 cursor-pointer whitespace-nowrap rounded-full bg-[#f4f4f4] px-8 py-4 text-[14px] font-medium text-[#080808] hover:bg-[#ff6601] hover:text-[#f4f4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6601]"
        >
          {t.hero.cta}
        </MagneticButton>
      </motion.div>
    </section>
  );
};
