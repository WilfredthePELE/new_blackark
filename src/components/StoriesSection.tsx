import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ASSETS, STORIES, StoryCaseStudy } from '../data/siteData';
import { useLocale } from '../context/LocaleContext';
import { CaseStudyDrawer } from './CaseStudyDrawer';

interface StoriesSectionProps {
  onRequestDemoWithNote: (note: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  onRequestDemoWithNote,
}) => {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState<StoryCaseStudy | null>(
    null
  );
  const story = STORIES[index];

  const prev = () => setIndex((i) => (i - 1 + STORIES.length) % STORIES.length);
  const next = () => setIndex((i) => (i + 1) % STORIES.length);

  return (
    <section
      id="stories"
      className="relative w-full scroll-mt-[84px] bg-[#080808] px-5 py-[100px] md:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium text-[#999999]">05. Stories</p>
          <h2 className="section-headline text-[#f4f4f4]">
            {t.sections.storiesTitle}
          </h2>
        </div>

        {/* Clean Carousel Card */}
        <div className="relative overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515] p-6 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <button
                type="button"
                onClick={() => setActiveCaseStudy(story)}
                className="group relative block aspect-[3/4] max-h-[400px] w-full cursor-pointer overflow-hidden rounded-[18px] border border-[#242424] bg-[#080808] text-left"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={story.name}
                    src={story.portrait}
                    alt={`${story.name}, ${story.role}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                  <span className="text-[12px] text-[#f4f4f4]">
                    {story.location}
                  </span>
                </div>
              </button>
            </div>

            <div className="flex h-full flex-col justify-between gap-8 lg:col-span-8 lg:pl-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[13px] font-medium text-[#ff6601]">
                  {story.company}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous customer story"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#3b3b3b] bg-[#080808] text-[#f4f4f4] transition-colors hover:border-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#080808]"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next customer story"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#3b3b3b] bg-[#080808] text-[#f4f4f4] transition-colors hover:border-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#080808]"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={story.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-7"
                >
                  <blockquote className="text-[22px] leading-[1.35em] font-normal tracking-[-0.025em] text-[#f4f4f4] md:text-[30px]">
                    {story.quote}
                  </blockquote>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#242424] pt-5">
                    <div>
                      <p className="text-[16px] font-medium text-[#f4f4f4]">
                        {story.name}
                      </p>
                      <p className="text-[14px] text-[#999999]">{story.role}</p>
                    </div>

                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        onClick={() => setActiveCaseStudy(story)}
                        className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-[#ff6601] hover:underline"
                      >
                        <span>Read case study</span>
                        <ArrowUpRight size={15} />
                      </button>
                      <span className="font-mono-num text-[12px] text-[#999999]">
                        0{index + 1} / 0{STORIES.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Minimal Proof Row */}
        <div className="grid grid-cols-1 items-center gap-8 border-y border-[#242424] py-9 lg:grid-cols-12">
          <div className="flex items-center gap-5 lg:col-span-6">
            <div className="flex -space-x-3">
              {[ASSETS.storyEmma, ASSETS.storyDaniel, ASSETS.storyMaya].map(
                (src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Customer portrait ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full border-2 border-[#080808] object-cover object-top"
                  />
                )
              )}
            </div>
            <div>
              <p className="text-[16px] font-normal text-[#f4f4f4]">
                Better days. Shared by better teams.
              </p>
              <p className="text-[13px] text-[#999999]">
                4.9 / 5 average team rating
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 lg:col-span-3 lg:border-l lg:border-[#242424] lg:px-8">
            <span className="font-mono-num text-[42px] leading-none tracking-[-0.04em] text-[#f4f4f4]">
              98%
            </span>
            <p className="text-[14px] text-[#999999]">
              Teams feeling more in control
            </p>
          </div>

          <div className="flex flex-col gap-1 lg:col-span-3 lg:border-l lg:border-[#242424] lg:px-8">
            <span className="font-mono-num text-[42px] leading-none tracking-[-0.04em] text-[#f4f4f4]">
              400+
            </span>
            <p className="text-[14px] text-[#999999]">
              Stores moving forward together
            </p>
          </div>
        </div>
      </div>

      <CaseStudyDrawer
        story={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onRequestDemo={onRequestDemoWithNote}
      />
    </section>
  );
};
