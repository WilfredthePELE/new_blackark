import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { MagneticButton } from './MagneticButton';
import { ComputerVisionVideo } from './ComputerVisionVideo';

interface HeroSectionProps {
  onRequestDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestDemo }) => {
  const { t } = useLocale();
  const [videoPaused, setVideoPaused] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#080808] px-5 pt-[112px] pb-16 md:px-8 md:pt-[124px] md:pb-20"
    >
      {/* Full-Bleed Tech, Computer Vision & Optical Surveillance Video Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ComputerVisionVideo paused={videoPaused} />

        {/* Measured readability scrim: protects left typography while showcasing live CV floor on right */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.82) 42%, rgba(8,8,8,0.32) 78%, rgba(8,8,8,0.45) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,8,8,0.65) 0%, rgba(8,8,8,0) 24%, rgba(8,8,8,0) 76%, #080808 100%)',
          }}
        />
      </div>

      {/* Foreground Editorial Proposition */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-[660px] flex-col items-start gap-6"
        >
          <p className="text-[13px] font-medium text-[#ff6601]">
            {t.hero.overline}
          </p>

          <h1 className="hero-headline text-[#f4f4f4]">{t.hero.headline}</h1>

          <p className="max-w-[500px] text-[16px] leading-[1.65em] text-[#b8b8b8] md:text-[17px]">
            {t.hero.subheadline}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-6">
            <MagneticButton
              type="button"
              onClick={onRequestDemo}
              className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-[#f4f4f4] px-7 py-3.5 text-[14px] font-medium text-[#080808] hover:bg-[#ff6601] hover:text-[#f4f4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6601]"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight size={15} />
            </MagneticButton>

            <a
              href="#integrations"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#integrations')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[14px] font-medium text-[#f4f4f4]/85 transition-colors hover:text-[#ff6601]"
            >
              See live sandbox →
            </a>
          </div>
        </motion.div>

        {/* Bottom Hairline Strip + Video Playback Control */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-[#242424] pt-7">
          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            <div>
              <p className="font-mono-num text-[24px] text-[#f4f4f4] md:text-[28px]">
                01
              </p>
              <p className="mt-1 text-[12px] text-[#b8b8b8]">
                Unified operations layer
              </p>
            </div>
            <div>
              <p className="font-mono-num text-[24px] text-[#f4f4f4] md:text-[28px]">
                04
              </p>
              <p className="mt-1 text-[12px] text-[#b8b8b8]">
                Specialist AI operators
              </p>
            </div>
            <div>
              <p className="font-mono-num text-[24px] text-[#ff6601] md:text-[28px]">
                100%
              </p>
              <p className="mt-1 text-[12px] text-[#b8b8b8]">
                Human sign-off control
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVideoPaused((p) => !p)}
            aria-label={videoPaused ? 'Play optical feed' : 'Pause optical feed'}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#3b3b3b] bg-[#080808]/80 px-4 py-2 text-[12px] font-medium text-[#f4f4f4] backdrop-blur-md transition-colors hover:border-[#ff6601] hover:text-[#ff6601]"
          >
            {videoPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{videoPaused ? 'Play feed' : 'Pause feed'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
