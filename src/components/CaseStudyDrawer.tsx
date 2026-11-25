import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { StoryCaseStudy } from '../data/siteData';

interface CaseStudyDrawerProps {
  story: StoryCaseStudy | null;
  onClose: () => void;
  onRequestDemo: (note: string) => void;
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({
  story,
  onClose,
  onRequestDemo,
}) => {
  useEffect(() => {
    if (!story) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [story, onClose]);

  return (
    <AnimatePresence>
      {story && (
        <div
          className="fixed inset-0 z-[90] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={`${story.company} case study`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-[680px] flex-col justify-between overflow-y-auto border-l border-[#242424] bg-[#080808] p-6 md:p-10"
          >
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#242424] pb-6">
                <div>
                  <p className="eyebrow-label text-[#ff6601]">
                    CASE STUDY · {story.location.toUpperCase()}
                  </p>
                  <h2 className="mt-2 text-[28px] font-medium tracking-[-0.03em] text-[#f4f4f4]">
                    {story.company}
                  </h2>
                  <p className="mt-1 text-[14px] text-[#999999]">
                    {story.name} · {story.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#242424] bg-[#151515] text-[#f4f4f4] transition-colors hover:border-[#3b3b3b] hover:text-[#ff6601]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Portrait + Summary */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-[#242424] sm:col-span-4">
                  <img
                    src={story.portrait}
                    alt={story.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col justify-between gap-4 sm:col-span-8">
                  <p className="text-[15px] leading-[1.65em] text-[#b8b8b8]">
                    {story.summary}
                  </p>
                  <blockquote className="border-t border-[#242424] pt-4 text-[16px] leading-[1.5em] text-[#f4f4f4]">
                    {story.quote}
                  </blockquote>
                </div>
              </div>

              {/* Before vs After Metrics */}
              <div>
                <p className="eyebrow-label mb-3 text-[#999999]">
                  OPERATIONAL IMPACT (BEFORE → AFTER)
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {story.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col justify-between gap-2 rounded-2xl border border-[#242424] bg-[#151515] p-4"
                    >
                      <span className="text-[12px] text-[#999999]">{m.label}</span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono-num text-[12px] text-[#999999] line-through">
                          {m.before}
                        </span>
                        <span className="font-mono-num text-[17px] font-medium text-[#ff6601]">
                          {m.after}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Architecture */}
              <div>
                <p className="eyebrow-label mb-3 text-[#999999]">
                  WORKFLOW ARCHITECTURE
                </p>
                <div className="flex flex-col gap-2.5">
                  {story.workflowSteps.map((step, i) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 rounded-xl border border-[#242424] bg-[#151515] p-4"
                    >
                      <span className="font-mono-num text-[12px] text-[#ff6601]">
                        0{i + 1}
                      </span>
                      <p className="text-[14px] leading-[1.55em] text-[#f4f4f4]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Stack */}
              <div>
                <p className="eyebrow-label mb-2 text-[#999999]">
                  CONNECTED STACK
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[14px] text-[#f4f4f4]">
                  {story.integrations.map((tool, i) => (
                    <React.Fragment key={tool}>
                      <span>{tool}</span>
                      {i < story.integrations.length - 1 && (
                        <span className="text-[#999999]" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#242424] pt-6">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text-[14px] text-[#999999] hover:text-[#f4f4f4]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestDemo(
                    `Interested in workflow setup similar to ${story.company} (${story.integrations.join(', ')}).`
                  );
                }}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[#f4f4f4] px-6 py-3 text-[13px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
              >
                <span>Deploy a similar workflow</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
