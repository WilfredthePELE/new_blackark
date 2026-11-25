import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, PageRoute } from '../data/siteData';
import { useLocale } from '../context/LocaleContext';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, hash?: string) => void;
}

const BRAND_WORDMARK = 'BlackArk';

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('');
  const [typedCount, setTypedCount] = useState<number>(BRAND_WORDMARK.length);

  // Continuous letter-by-letter writing loop for BlackArk wordmark
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setTypedCount(BRAND_WORDMARK.length);
      return;
    }

    let timeoutId = 0;
    let count = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (count < BRAND_WORDMARK.length) {
        count += 1;
        setTypedCount(count);
        timeoutId = window.setTimeout(tick, 175);
      } else {
        // Hold full wordmark briefly, then reset and write again
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          count = 0;
          setTypedCount(0);
          timeoutId = window.setTimeout(tick, 260);
        }, 1400);
      }
    };

    count = 0;
    setTypedCount(0);
    timeoutId = window.setTimeout(tick, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Scroll-spy for active section indicator
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveHref('');
      return;
    }

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const triggerLine = Math.min(260, window.innerHeight * 0.34);
      let current = '';

      for (const item of NAV_LINKS) {
        const el = document.querySelector(item.href);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine && rect.bottom > 100) {
          current = item.href;
        }
      }

      const ctaEl = document.querySelector('#get-started');
      if (ctaEl) {
        const ctaRect = ctaEl.getBoundingClientRect();
        if (ctaRect.top <= triggerLine) {
          current = '';
        }
      }

      setActiveHref(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [currentPage]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);
    if (currentPage !== 'home') {
      onNavigate('home', href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const visibleBrand = BRAND_WORDMARK.slice(0, typedCount);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || currentPage !== 'home'
          ? 'border-b border-[#242424] bg-[#080808]/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-[#080808]/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-8 px-5 md:px-8">
        {/* Zone 1: Continuously animated handwritten BlackArk wordmark */}
        <a
          href="#home"
          aria-label="BlackArk"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setActiveHref('');
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex min-w-[128px] shrink-0 items-center whitespace-nowrap text-[#f4f4f4]"
        >
          <span className="font-script-brand inline-flex items-center text-[27px] leading-none font-bold">
            <span>{visibleBrand}</span>
            {typedCount === BRAND_WORDMARK.length && (
              <sup className="ml-0.5 font-sans text-[10px] font-semibold align-super">
                ®
              </sup>
            )}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[18px] w-[2px] rounded-full bg-[#ff6601] transition-opacity duration-150"
              style={{
                opacity: typedCount < BRAND_WORDMARK.length ? 1 : 0.45,
              }}
            />
          </span>
        </a>

        {/* Zone 2: Single-line navigation links with active orange underline */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === 'home' && activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative shrink-0 origin-center whitespace-nowrap py-1.5 transition-all duration-200 ${
                  isActive
                    ? 'scale-[1.06] text-[14px] font-medium text-[#f4f4f4]'
                    : 'text-[13px] font-normal text-[#999999] hover:text-[#f4f4f4]'
                }`}
              >
                {t.nav[item.key]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#ff6601] transition-transform duration-200 ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA ("Contact us") + mobile drawer button */}
        <div className="flex shrink-0 items-center gap-3">
          <MagneticButton
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigate('request-demo');
            }}
            className="cursor-pointer whitespace-nowrap shrink-0 rounded-full bg-[#f4f4f4] px-5 py-2.5 text-[13px] font-medium text-[#080808] hover:bg-[#ff6601] hover:text-[#f4f4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6601]"
          >
            {t.nav.cta}
          </MagneticButton>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#242424] bg-[#151515] text-[#f4f4f4] transition-colors lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#242424] bg-[#080808]/96 px-5 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => {
              const isActive = currentPage === 'home' && activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`w-fit py-2 transition-all duration-200 ${
                    isActive
                      ? 'border-b-2 border-[#ff6601] text-[16.5px] font-medium text-[#f4f4f4]'
                      : 'text-[15px] text-[#b8b8b8] hover:text-[#ff6601]'
                  }`}
                >
                  {t.nav[item.key]}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
