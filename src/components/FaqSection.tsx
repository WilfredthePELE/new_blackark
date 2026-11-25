import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import {
  ASSETS,
  FAQ_CATEGORIES,
  FaqCategory,
  WORKFLOW_CARDS,
} from '../data/siteData';
import { useLocale } from '../context/LocaleContext';

interface FaqSectionProps {
  onContactClick: (prefillNote?: string) => void;
}

const CATEGORIES: FaqCategory[] = [
  'General',
  'Agents & workflows',
  'Privacy & control',
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const { t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('General');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim().toLowerCase();

  const matchingWorkflows = useMemo(() => {
    if (!trimmedQuery) return [];
    return WORKFLOW_CARDS.filter(
      (wf) =>
        wf.title.toLowerCase().includes(trimmedQuery) ||
        wf.description.toLowerCase().includes(trimmedQuery) ||
        wf.detail.toLowerCase().includes(trimmedQuery)
    );
  }, [trimmedQuery]);

  const displayedFaqs = useMemo(() => {
    if (!trimmedQuery) {
      return FAQ_CATEGORIES[activeCategory].map((item) => ({
        ...item,
        category: activeCategory,
      }));
    }
    const all: Array<{ question: string; answer: string; category: FaqCategory }> =
      [];
    for (const cat of CATEGORIES) {
      for (const item of FAQ_CATEGORIES[cat]) {
        if (
          item.question.toLowerCase().includes(trimmedQuery) ||
          item.answer.toLowerCase().includes(trimmedQuery)
        ) {
          all.push({ ...item, category: cat });
        }
      }
    }
    return all;
  }, [activeCategory, trimmedQuery]);

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    setOpenIndex(0);
  };

  return (
    <section
      id="faq"
      className="relative w-full scroll-mt-[84px] overflow-hidden bg-[#080808] px-5 py-[120px] md:px-8 md:py-[150px]"
    >
      {/* Botanical Ferns Parallax Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={ASSETS.faqBotanicalFerns}
          alt="Dark forest green ferns and moss on weathered roots"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #080808 0%, rgba(8,8,8,0.68) 25%, rgba(8,8,8,0.72) 75%, #080808 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Heading, Search, Tabs, Got Questions Box */}
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div className="flex flex-col gap-6">
            <p className="text-[13px] font-medium text-[#b8b8b8]">
              06. Questions
            </p>
            <h2 className="section-headline text-[#f4f4f4]">
              {t.sections.faqTitle}
            </h2>

            {/* Instant Search Across Workflows & FAQs */}
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#999999]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenIndex(0);
                }}
                placeholder="Search workflows, security, or FAQs..."
                aria-label="Search workflows and frequently asked questions"
                className="h-12 w-full rounded-full border border-[#242424] bg-[#151515]/90 pr-10 pl-10 text-[14px] text-[#f4f4f4] placeholder-[#999999] backdrop-blur-md focus:border-[#ff6601] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-[#999999] hover:text-[#f4f4f4]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Tabs (hidden/muted only when actively searching) */}
            {!trimmedQuery && (
              <div
                role="tablist"
                aria-label="FAQ categories"
                className="flex flex-wrap gap-2"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategoryChange(cat)}
                      className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'border-[#f4f4f4] bg-[#f4f4f4] text-[#080808]'
                          : 'border-[#242424] bg-[#151515]/85 text-[#b8b8b8] hover:border-[#3b3b3b] hover:text-[#f4f4f4]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Got questions? Card */}
          <div className="flex flex-col items-start gap-4 rounded-[24px] border border-[#242424] bg-[#151515]/88 p-7 backdrop-blur-md">
            <h3 className="text-[22px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
              Got questions?
            </h3>
            <p className="text-[15px] leading-[1.6em] text-[#b8b8b8]">
              Tell us what your team is working on. We’ll help you find a starting
              point.
            </p>
            <button
              type="button"
              onClick={() => onContactClick()}
              className="mt-1 cursor-pointer whitespace-nowrap rounded-full bg-[#f4f4f4] px-6 py-3 text-[13px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
            >
              Let’s talk
            </button>
          </div>
        </div>

        {/* Right Column: Matching Workflows + Accordion Questions */}
        <div className="flex flex-col gap-3.5 lg:col-span-7">
          {trimmedQuery && matchingWorkflows.length > 0 && (
            <div className="mb-2 flex flex-col gap-2.5 rounded-[24px] border border-[#242424] bg-[#151515]/92 p-5 backdrop-blur-md">
              <span className="eyebrow-label text-[#ff6601]">
                MATCHING WORKFLOWS ({matchingWorkflows.length})
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {matchingWorkflows.map((wf) => (
                  <button
                    key={wf.flowId}
                    type="button"
                    onClick={() =>
                      onContactClick(`Starting workflow: ${wf.title}.`)
                    }
                    className="cursor-pointer rounded-2xl border border-[#242424] bg-[#080808]/80 p-4 text-left transition-colors hover:border-[#ff6601]/60"
                  >
                    <p className="font-mono-num text-[11px] text-[#999999]">
                      {wf.flowId}
                    </p>
                    <p className="mt-1 text-[15px] font-medium text-[#f4f4f4]">
                      {wf.title}
                    </p>
                    <p className="mt-1 text-[13px] text-[#999999]">
                      {wf.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayedFaqs.length === 0 ? (
            <div className="flex flex-col items-start gap-3 rounded-[24px] border border-[#242424] bg-[#151515]/90 p-8 backdrop-blur-md">
              <p className="text-[16px] font-medium text-[#f4f4f4]">
                No matching questions or workflows found for “{query}”.
              </p>
              <p className="text-[14px] text-[#999999]">
                Try searching for “Shopify”, “approval”, “SOC 2”, or “returns”.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-1 cursor-pointer text-[13px] font-medium text-[#ff6601] hover:underline"
              >
                Reset search
              </button>
            </div>
          ) : (
            displayedFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={`${item.category}-${item.question}`}
                  className="overflow-hidden rounded-[24px] border border-[#242424] bg-[#151515]/92 backdrop-blur-md transition-colors hover:border-[#3b3b3b]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-7 py-7 text-left"
                  >
                    <div className="flex flex-col gap-1">
                      {trimmedQuery && (
                        <span className="eyebrow-label text-[#ff6601]">
                          {item.category}
                        </span>
                      )}
                      <span className="text-[16px] font-medium text-[#f4f4f4]">
                        {item.question}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#999999]"
                    >
                      <span className="h-[1.5px] w-3.5 bg-current" />
                      <span
                        className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-300 ${
                          isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-7 text-[15px] leading-[1.65em] text-[#999999]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
