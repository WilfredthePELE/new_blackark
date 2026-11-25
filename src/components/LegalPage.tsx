import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute } from '../data/siteData';

interface LegalPageProps {
  type: 'privacy-policy' | 'data-processing';
  onNavigate: (page: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy-policy';

  return (
    <main className="min-h-screen w-full bg-[#080808] px-5 pt-[132px] pb-[120px] md:px-8">
      <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex w-fit cursor-pointer items-center gap-2 text-[14px] text-[#999999] transition-colors hover:text-[#f4f4f4]"
        >
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </button>

        <div className="flex flex-col gap-4 border-b border-[#242424] pb-8">
          <p className="eyebrow-label text-[#ff6601]">LEGAL NOTICE</p>
          <h1 className="section-headline text-[#f4f4f4]">
            {isPrivacy ? 'Privacy Policy' : 'Data Processing Notice'}
          </h1>
          <p className="text-[14px] text-[#999999]">Last updated: 2026</p>
        </div>

        <div className="flex flex-col gap-7 text-[15px] leading-[1.7em] text-[#b8b8b8]">
          {isPrivacy ? (
            <>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  1. Information you share
                </h2>
                <p>
                  When you contact us or subscribe to product updates, BlackArk
                  collects the business contact details you submit—such as your name,
                  work email, company name, storefront URL, and workflow notes.
                </p>
              </section>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  2. How details are used
                </h2>
                <p>
                  Contact request details are used solely to review your commerce
                  workflow needs and respond to your inquiry. Newsletter updates are
                  sent only when separately subscribed and can be unsubscribed at
                  any time.
                </p>
              </section>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  3. Human control and sensitive records
                </h2>
                <p>
                  Please do not submit passwords, payment card details, or end
                  customer records through the public contact form. All
                  automated operator workflows operate under rules and approval
                  thresholds configured by your team.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  1. Scope of processing
                </h2>
                <p>
                  BlackArk acts as an operational orchestration layer connecting your
                  storefront, customer support inbox, and fulfillment systems
                  according to policies defined by your workspace administrators.
                </p>
              </section>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  2. Approval boundaries
                </h2>
                <p>
                  Operators prepare drafts, policy checks, and routing actions
                  within clear boundaries. Sensitive, unusual, or high-value actions
                  are escalated to human reviewers before execution.
                </p>
              </section>
              <section className="flex flex-col gap-2">
                <h2 className="text-[19px] font-medium text-[#f4f4f4]">
                  3. Retention & deletion
                </h2>
                <p>
                  Operational context is retained only as long as required to
                  support active workflows and auditability, and can be exported or
                  removed upon written request.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
