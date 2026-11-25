import React, { useState } from 'react';
import { PageRoute } from '../data/siteData';
import {
  CURRENCIES,
  SupportedCurrency,
  SupportedLang,
  useLocale,
} from '../context/LocaleContext';

interface FooterProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
}

const LANGS: SupportedLang[] = ['EN', 'FR', 'DE', 'JA'];
const CURRENCY_KEYS: SupportedCurrency[] = ['USD', 'EUR', 'GBP', 'JPY'];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, setLang, currency, setCurrency, t } = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const footerProductLinks = [
    { label: t.nav.platform, href: '#platform' },
    { label: t.nav.integrations, href: '#integrations' },
    { label: t.nav.workflows, href: '#workflows' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.stories, href: '#stories' },
    { label: t.nav.faq, href: '#faq' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('subscribed');
    setErrorMsg('');
    setEmail('');
  };

  const handleAnchor = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate('home', href);
  };

  return (
    <footer className="w-full border-t border-[#242424] bg-[#080808] px-5 pt-20 pb-8 md:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <div className="flex flex-col gap-3">
              <span className="eyebrow-label mb-1 text-[#999999]">NAVIGATION</span>
              {footerProductLinks.slice(0, 4).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="text-[14px] text-[#b8b8b8] transition-colors hover:text-[#f4f4f4]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow-label mb-1 text-[#999999]">EXPLORE</span>
              {footerProductLinks.slice(4).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="text-[14px] text-[#b8b8b8] transition-colors hover:text-[#f4f4f4]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow-label mb-1 text-[#999999]">LEGAL</span>
              <button
                type="button"
                onClick={() => onNavigate('privacy-policy')}
                className="cursor-pointer text-left text-[14px] text-[#b8b8b8] transition-colors hover:text-[#f4f4f4]"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onNavigate('data-processing')}
                className="cursor-pointer text-left text-[14px] text-[#b8b8b8] transition-colors hover:text-[#f4f4f4]"
              >
                Data Processing
              </button>
              <button
                type="button"
                onClick={() => onNavigate('request-demo')}
                className="cursor-pointer text-left text-[14px] text-[#ff6601] transition-colors hover:underline"
              >
                {t.nav.cta}
              </button>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4 rounded-[24px] border border-[#242424] bg-[#151515] p-7 lg:col-span-6">
            <h3 className="text-[22px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
              {t.footer.newsletterTitle}
            </h3>
            <p className="text-[15px] text-[#999999]">
              {t.footer.newsletterSub}
            </p>

            <form
              onSubmit={handleSubscribe}
              noValidate
              className="mt-2 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="name@company.com"
                aria-label="Work email for newsletter"
                className="h-12 flex-1 rounded-full border border-[#3b3b3b] bg-[#080808] px-5 text-[14px] text-[#f4f4f4] placeholder-[#999999] focus:border-[#ff6601] focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 cursor-pointer whitespace-nowrap rounded-full bg-[#f4f4f4] px-7 text-[14px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
              >
                {t.footer.subscribe}
              </button>
            </form>

            {status === 'error' && (
              <p className="text-[13px] text-[#ff6601]" role="alert">
                {errorMsg}
              </p>
            )}
            {status === 'subscribed' && (
              <p className="text-[13px] text-[#f4f4f4]" role="status">
                Subscribed. We’ll share occasional updates on commerce operations.
              </p>
            )}

            <p className="text-[12px] text-[#999999]">
              Subscribe for product news. Unsubscribe whenever you like.
            </p>
          </div>
        </div>

        {/* Metadata + Global Locale/Currency Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#242424] pt-6 text-[13px] text-[#999999]">
          <div className="flex items-center">
            <span>
              © 2026{' '}
              <span className="font-script-brand text-[18px] font-bold text-[#f4f4f4]">
                BlackArk
              </span>
            </span>
          </div>

          {/* Language & Currency Switchers */}
          <div className="flex flex-wrap items-center gap-4">
            <div
              role="group"
              aria-label="Language selector"
              className="flex items-center gap-1 rounded-full border border-[#242424] bg-[#151515] p-1"
            >
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`cursor-pointer rounded-full px-2.5 py-1 font-mono-num text-[11px] transition-colors ${
                    lang === l
                      ? 'bg-[#f4f4f4] text-[#080808]'
                      : 'text-[#999999] hover:text-[#f4f4f4]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div
              role="group"
              aria-label="Footer currency selector"
              className="flex items-center gap-1 rounded-full border border-[#242424] bg-[#151515] p-1"
            >
              {CURRENCY_KEYS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`cursor-pointer rounded-full px-2.5 py-1 font-mono-num text-[11px] transition-colors ${
                    currency === c
                      ? 'bg-[#242424] text-[#f4f4f4]'
                      : 'text-[#999999] hover:text-[#f4f4f4]'
                  }`}
                >
                  {CURRENCIES[c].symbol} {c}
                </button>
              ))}
            </div>
          </div>

          <span>{t.footer.tagline}</span>
        </div>

        {/* Monumental Wordmark */}
        <div className="w-full overflow-hidden pt-4 pb-2 select-none">
          <p className="font-script-brand text-center text-[clamp(4.2rem,20vw,18rem)] leading-[0.95] font-bold text-[#f4f4f4]">
            BlackArk<sup className="ml-1 font-sans text-[0.22em] font-semibold align-super">®</sup>
          </p>
        </div>
      </div>
    </footer>
  );
};
