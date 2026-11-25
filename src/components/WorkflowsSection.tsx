import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { AI_OPERATORS, WORKFLOW_CARDS } from '../data/siteData';
import { LiquidGradientCanvas } from './LiquidGradientCanvas';
import { useLocale } from '../context/LocaleContext';

interface WorkflowsSectionProps {
  onSelectWorkflow: (workflowTitle: string) => void;
}

export const WorkflowsSection: React.FC<WorkflowsSectionProps> = ({
  onSelectWorkflow,
}) => {
  const { t } = useLocale();
  const [view, setView] = useState<'operators' | 'workflows'>('operators');
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  return (
    <section
      id="workflows"
      className="relative w-full scroll-mt-[84px] overflow-hidden bg-[#080808] px-5 py-[110px] md:px-8 md:py-[136px]"
    >
      {/* Ambient Liquid Gradient Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
        <LiquidGradientCanvas intensity={0.9} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12">
        {/* Heading + Clean Segmented Toggle */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="flex max-w-[760px] flex-col gap-3"
          >
            <p className="text-[13px] font-medium text-[#b8b8b8]">
              03. Operators & Workflows
            </p>
            <h2 className="section-headline text-[#f4f4f4]">
              {view === 'operators'
                ? t.sections.operatorsTitle
                : t.sections.workflowsTitle}
            </h2>
          </motion.div>

          <div
            role="tablist"
            aria-label="Capabilities view"
            className="flex items-center gap-1 rounded-full border border-[#242424] bg-[#151515]/90 p-1 backdrop-blur-md"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === 'operators'}
              onClick={() => setView('operators')}
              className={`cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                view === 'operators'
                  ? 'bg-[#f4f4f4] text-[#080808]'
                  : 'text-[#999999] hover:text-[#f4f4f4]'
              }`}
            >
              AI Operators
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'workflows'}
              onClick={() => setView('workflows')}
              className={`cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
                view === 'workflows'
                  ? 'bg-[#f4f4f4] text-[#080808]'
                  : 'text-[#999999] hover:text-[#f4f4f4]'
              }`}
            >
              Daily Workflows
            </button>
          </div>
        </div>

        {/* View 1: 4 AI Operators (clean hairline cards, zero nested boxes) */}
        {view === 'operators' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {AI_OPERATORS.map((op, idx) => (
              <motion.article
                key={op.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="flex flex-col justify-between gap-8 rounded-[24px] border border-[#242424] bg-[#080808]/85 p-7 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-[12px] text-[#999999]">{op.eyebrow}</span>
                  <h3 className="text-[24px] font-medium tracking-[-0.025em] text-[#f4f4f4]">
                    {op.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6em] text-[#999999]">
                    {op.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-t border-[#242424] pt-4 text-[13px]">
                  <span className="font-mono-num text-[#ff6601]">
                    {op.statusCode}
                  </span>
                  <span className="text-[#b8b8b8]">{op.statusText}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View 2: 6 Daily Workflows (clean typography cards, click to inspect) */}
        {view === 'workflows' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW_CARDS.map((flow, idx) => {
              const isSelected = selectedFlow === flow.flowId;
              return (
                <motion.article
                  key={flow.flowId}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  onClick={() =>
                    setSelectedFlow((prev) =>
                      prev === flow.flowId ? null : flow.flowId
                    )
                  }
                  className={`group flex cursor-pointer flex-col justify-between gap-5 rounded-[24px] border p-7 backdrop-blur-xl transition-colors duration-200 ${
                    isSelected
                      ? 'border-[#ff6601]/60 bg-[#080808]/95'
                      : 'border-[#242424] bg-[#080808]/82 hover:border-[#3b3b3b]'
                  }`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-num text-[12px] text-[#999999]">
                        {flow.flowId}
                      </span>
                      <ArrowUpRight
                        size={17}
                        className="text-[#999999] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff6601]"
                      />
                    </div>
                    <h3 className="text-[21px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                      {flow.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6em] text-[#999999]">
                      {flow.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="border-t border-[#242424] pt-4">
                      <p className="text-[13px] leading-[1.6em] text-[#b8b8b8]">
                        {flow.detail}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectWorkflow(flow.title);
                        }}
                        className="mt-3 cursor-pointer text-[13px] font-medium text-[#ff6601] hover:underline"
                      >
                        Contact us about this workflow →
                      </button>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
