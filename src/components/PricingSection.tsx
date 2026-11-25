import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { PRICING_TIERS } from '../data/siteData';
import {
  CURRENCIES,
  SupportedCurrency,
  useLocale,
} from '../context/LocaleContext';
import { MagneticButton } from './MagneticButton';
import { RoiCalculator } from './RoiCalculator';

interface PricingSectionProps {
  onSelectPlan: (
    planName: string,
    billing: 'Monthly' | 'Yearly',
    extraNote?: string
  ) => void;
}

const CURRENCY_KEYS: SupportedCurrency[] = ['USD', 'EUR', 'GBP', 'JPY'];

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
}) => {
  const { currency, setCurrency, formatPrice, t } = useLocale();
  const [annual, setAnnual] = useState(false);
  const [showRoi, setShowRoi] = useState(false);

  return (
    <section
      id="pricing"
      className="relative w-full scroll-mt-[84px] bg-[#080808] px-5 pt-[110px] pb-[90px] md:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10">
        <p className="text-[13px] font-medium text-[#999999]">04. Pricing</p>

        {/* Heading + Currency + Monthly/Yearly Switch */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="section-headline text-[#f4f4f4]">
            {t.sections.pricingTitle}
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Currency selector"
              className="flex h-11 items-center gap-1 rounded-full border border-[#242424] bg-[#151515] p-1"
            >
              {CURRENCY_KEYS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 font-mono-num text-[12px] transition-colors ${
                    currency === code
                      ? 'bg-[#242424] text-[#f4f4f4]'
                      : 'text-[#999999] hover:text-[#f4f4f4]'
                  }`}
                >
                  {CURRENCIES[code].symbol} {code}
                </button>
              ))}
            </div>

            <div
              role="group"
              aria-label="Billing interval"
              className="flex h-11 items-center gap-1 rounded-full border border-[#242424] bg-[#151515] p-1"
            >
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                  !annual
                    ? 'bg-[#f4f4f4] text-[#080808]'
                    : 'text-[#999999] hover:text-[#f4f4f4]'
                }`}
              >
                {t.pricing.monthly}
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                  annual
                    ? 'bg-[#f4f4f4] text-[#080808]'
                    : 'text-[#999999] hover:text-[#f4f4f4]'
                }`}
              >
                <span>{t.pricing.yearly}</span>
                <span className="text-[11px] font-medium text-[#ff6601]">
                  {t.pricing.saveBadge}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Pricing Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PRICING_TIERS.map((tier, idx) => {
            const usdPrice = annual
              ? Math.round(tier.monthlyPrice * 0.8)
              : tier.monthlyPrice;

            return (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className={`relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[24px] border p-7 ${
                  tier.featured
                    ? 'border-[#ff6601]/45'
                    : 'border-[#242424] bg-[#151515]'
                }`}
                style={
                  tier.featured
                    ? {
                        background:
                          'linear-gradient(165deg, rgba(255,102,1,0.2) 0%, rgba(255,34,0,0.1) 30%, #151515 72%)',
                      }
                    : undefined
                }
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[20px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="text-[12px] font-medium text-[#ff6601]">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-7 flex items-baseline gap-2">
                    <span className="font-mono-num text-[42px] leading-none font-normal tracking-[-0.04em] text-[#f4f4f4]">
                      {formatPrice(usdPrice)}
                    </span>
                    <span className="text-[14px] text-[#999999]">
                      {t.pricing.perMonth}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] text-[#999999]">
                    {annual ? t.pricing.billedYearly : t.pricing.billedMonthly}
                  </p>

                  <p className="mt-6 text-[15px] leading-[1.55em] text-[#b8b8b8]">
                    {tier.description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3 border-t border-[#242424] pt-6">
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-[14px] text-[#f4f4f4]"
                      >
                        <Check
                          size={14}
                          className={
                            tier.featured ? 'text-[#ff6601]' : 'text-[#999999]'
                          }
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <MagneticButton
                  type="button"
                  onClick={() =>
                    onSelectPlan(tier.name, annual ? 'Yearly' : 'Monthly')
                  }
                  className={`mt-8 w-full cursor-pointer whitespace-nowrap rounded-full py-3.5 text-[14px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6601] ${
                    tier.featured
                      ? 'bg-[#f4f4f4] text-[#080808] hover:bg-[#ff6601] hover:text-[#f4f4f4]'
                      : 'border border-[#3b3b3b] bg-[#080808] text-[#f4f4f4] hover:border-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#080808]'
                  }`}
                >
                  {tier.ctaLabel}
                </MagneticButton>
              </motion.article>
            );
          })}
        </div>

        {/* Fine Print + Optional Expandable ROI Estimator */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#242424] pt-6">
          <p className="text-[13px] text-[#999999]">
            {t.pricing.finePrint} Prices displayed in {currency}.
          </p>

          <button
            type="button"
            aria-expanded={showRoi}
            onClick={() => setShowRoi((v) => !v)}
            className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#f4f4f4] transition-colors hover:text-[#ff6601]"
          >
            <span>{showRoi ? 'Hide ROI calculator' : 'Estimate operational ROI'}</span>
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${
                showRoi ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {showRoi && (
          <RoiCalculator
            onSelectTier={(tierName, note) =>
              onSelectPlan(tierName, annual ? 'Yearly' : 'Monthly', note)
            }
          />
        )}
      </div>
    </section>
  );
};
