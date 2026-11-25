import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Check, ShieldAlert } from 'lucide-react';
import {
  COMPOSER_PROMPTS,
  SANDBOX_WORKFLOWS,
  STACK_PARTNERS,
} from '../data/siteData';
import { useLocale } from '../context/LocaleContext';

const SAMPLE_RESPONSES: Record<string, string> = {
  'What needs my attention today?':
    '2 orders flagged for address verification (#2841, #2844), 4 support replies drafted for review, and 1 low-stock SKU alert.',
  'Bring my orders into one view.':
    'Unified 148 active orders across Shopify Plus, ShipBob fulfillment, and NetSuite — 98.6% on schedule.',
  'Help me connect the next step.':
    'Return request #4408 matches your 30-day policy. Exchange draft prepared and waiting for team sign-off.',
};

export const IntegrationsSection: React.FC = () => {
  const { t } = useLocale();
  const [promptIdx, setPromptIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);
  const [activeStack, setActiveStack] = useState<string>('Shopify Plus');
  const [activeFlowId, setActiveFlowId] = useState<string>(SANDBOX_WORKFLOWS[0].id);
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'escalated'>>({});

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPromptIdx((prev) => (prev + 1) % COMPOSER_PROMPTS.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  const currentSuggestion = COMPOSER_PROMPTS[promptIdx];
  const activeFlow =
    SANDBOX_WORKFLOWS.find((w) => w.id === activeFlowId) ?? SANDBOX_WORKFLOWS[0];
  const currentDecision = decisions[activeFlow.id];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim() || currentSuggestion;
    setSubmittedPrompt(query);
    setInputValue('');
  };

  const replyText = submittedPrompt
    ? SAMPLE_RESPONSES[submittedPrompt] ||
      `Synced with ${activeStack} and prepared a policy-checked action for “${submittedPrompt}”.`
    : null;

  return (
    <section
      id="integrations"
      className="relative w-full scroll-mt-[84px] border-t border-[#242424] bg-[#080808] px-5 py-[110px] md:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="text-[13px] font-medium text-[#999999]">
              02. Live Operations Sandbox
            </p>
            <h2 className="section-headline text-[#f4f4f4]">
              {t.sections.integrationsTitle}
            </h2>
          </div>

          {/* Clean Stack Selector */}
          <div
            role="group"
            aria-label="Connected commerce stack"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[#242424] bg-[#151515] p-1"
          >
            {STACK_PARTNERS.map((partner) => {
              const selected = partner === activeStack;
              return (
                <button
                  key={partner}
                  type="button"
                  onClick={() => setActiveStack(partner)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 text-[12px] font-medium transition-colors ${
                    selected
                      ? 'bg-[#f4f4f4] text-[#080808]'
                      : 'text-[#999999] hover:text-[#f4f4f4]'
                  }`}
                >
                  {partner}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Single Clean Interactive Sandbox Surface (no nested bordered boxes) */}
        <div className="overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515]">
          {/* Workflow Selector Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242424] px-6 py-4 md:px-8">
            <div
              role="tablist"
              aria-label="Workflow simulations"
              className="flex flex-wrap gap-2"
            >
              {SANDBOX_WORKFLOWS.map((wf) => {
                const isActive = wf.id === activeFlow.id;
                return (
                  <button
                    key={wf.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFlowId(wf.id)}
                    className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#f4f4f4] text-[#080808]'
                        : 'text-[#999999] hover:text-[#f4f4f4]'
                    }`}
                  >
                    {wf.label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono-num text-[12px] text-[#ff6601]">
              {activeStack} · {activeFlow.confidence}
            </span>
          </div>

          {/* Timeline + Decision Split separated cleanly by hairline divider */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Concise Event Timeline */}
            <div className="flex flex-col gap-5 p-6 md:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <span className="font-mono-num text-[#f4f4f4]">
                  {activeFlow.orderRef}
                </span>
                <span className="text-[#999999]">
                  {activeFlow.operator} · {activeFlow.customer}
                </span>
              </div>

              <div className="flex flex-col divide-y divide-[#242424]">
                {activeFlow.timeline.map((item, idx) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="font-mono-num mt-0.5 text-[12px] text-[#ff6601]">
                      0{idx + 1}
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-[#f4f4f4]">
                        {item.step}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#999999]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Policy Check & Human Approval */}
            <div className="flex flex-col justify-between gap-6 border-t border-[#242424] bg-[#0c0c0c]/40 p-6 md:p-8 lg:col-span-5 lg:border-t-0 lg:border-l">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[12px] text-[#999999]">Proposed action</span>
                  <p className="mt-1.5 text-[16px] leading-[1.5em] text-[#f4f4f4]">
                    {activeFlow.proposedAction}
                  </p>
                </div>

                <ul className="flex flex-col gap-2 border-t border-[#242424] pt-4">
                  {activeFlow.policyChecks.map((chk) => (
                    <li
                      key={chk}
                      className="flex items-center gap-2 text-[13px] text-[#b8b8b8]"
                    >
                      <Check size={14} className="shrink-0 text-[#ff6601]" />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentDecision ? (
                <div className="flex items-center justify-between border-t border-[#242424] pt-4 text-[13px]">
                  <span className="text-[#f4f4f4]">
                    {currentDecision === 'approved'
                      ? `Approved and synced to ${activeStack}`
                      : 'Escalated to lead operator'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDecisions((prev) => {
                        const next = { ...prev };
                        delete next[activeFlow.id];
                        return next;
                      })
                    }
                    className="cursor-pointer text-[#ff6601] hover:underline"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setDecisions((p) => ({ ...p, [activeFlow.id]: 'approved' }))
                    }
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#f4f4f4] px-5 py-2.5 text-[13px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
                  >
                    <Check size={14} />
                    <span>Approve action</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDecisions((p) => ({ ...p, [activeFlow.id]: 'escalated' }))
                    }
                    className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#3b3b3b] px-5 py-2.5 text-[13px] font-medium text-[#b8b8b8] transition-colors hover:border-[#f4f4f4] hover:text-[#f4f4f4]"
                  >
                    <ShieldAlert size={14} />
                    <span>Escalate</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quiet BlackArk AI Command Prompt Bar */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 border-t border-[#242424] px-6 py-4 md:px-8"
          >
            <div className="flex items-center gap-4">
              <span className="font-script-brand shrink-0 text-[20px] font-bold text-[#f4f4f4]">
                BlackArk AI
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentSuggestion}
                aria-label="Ask BlackArk AI"
                className="flex-1 bg-transparent py-1.5 text-[14px] text-[#f4f4f4] placeholder-[#999999] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit prompt"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f4f4f4] text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
              >
                <ArrowUp size={15} />
              </button>
            </div>

            {replyText && (
              <p className="text-[13px] text-[#b8b8b8]">
                <span className="mr-2 font-medium text-[#ff6601]">Result:</span>
                {replyText}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
