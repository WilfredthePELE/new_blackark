/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PageRoute } from './data/siteData';
import { LocaleProvider } from './context/LocaleContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlatformSection } from './components/PlatformSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { WorkflowsSection } from './components/WorkflowsSection';
import { PricingSection } from './components/PricingSection';
import { StoriesSection } from './components/StoriesSection';
import { FaqSection } from './components/FaqSection';
import { CtaGlobeSection } from './components/CtaGlobeSection';
import { Footer } from './components/Footer';
import { RequestDemoPage } from './components/RequestDemoPage';
import { LegalPage } from './components/LegalPage';

export default function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const navigate = (nextPage: PageRoute, hash?: string) => {
    setPage(nextPage);
    if (nextPage === 'home' && hash) {
      window.setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      home: 'BlackArk — AI Operations for Ecommerce',
      'request-demo': 'Contact Us — BlackArk AI for Commerce',
      'privacy-policy': 'Privacy Policy — BlackArk',
      'data-processing': 'Data Processing Notice — BlackArk',
    };
    document.title = titles[page];
  }, [page]);

  const handleOpenDemo = (opts?: {
    plan?: string;
    workflow?: string;
    note?: string;
  }) => {
    setSelectedPlan(opts?.plan ?? '');
    setSelectedWorkflow(opts?.workflow ?? '');
    setSelectedNote(opts?.note ?? '');
    navigate('request-demo');
  };

  return (
    <LocaleProvider>
      <div className="min-h-screen w-full bg-[#080808] text-[#f4f4f4]">
        <Navbar currentPage={page} onNavigate={navigate} />

        {page === 'home' && (
          <main>
            <HeroSection onRequestDemo={() => handleOpenDemo()} />
            <PlatformSection />
            <IntegrationsSection />
            <WorkflowsSection
              onSelectWorkflow={(workflow) => handleOpenDemo({ workflow })}
            />
            <PricingSection
              onSelectPlan={(planName, billing, extraNote) =>
                handleOpenDemo({
                  plan: `${planName} (${billing})`,
                  note: extraNote,
                })
              }
            />
            <StoriesSection
              onRequestDemoWithNote={(note) => handleOpenDemo({ note })}
            />
            <FaqSection
              onContactClick={(note) =>
                handleOpenDemo(note ? { note } : undefined)
              }
            />
            <CtaGlobeSection onRequestDemo={() => handleOpenDemo()} />
          </main>
        )}

        {page === 'request-demo' && (
          <RequestDemoPage
            initialPlan={selectedPlan}
            initialWorkflow={selectedWorkflow}
            initialNote={selectedNote}
            onNavigate={navigate}
          />
        )}

        {(page === 'privacy-policy' || page === 'data-processing') && (
          <LegalPage type={page} onNavigate={navigate} />
        )}

        <Footer onNavigate={navigate} />
      </div>
    </LocaleProvider>
  );
}
