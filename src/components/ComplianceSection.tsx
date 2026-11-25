import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { COMPLIANCE_REGIONS, TRUST_CONTROLS } from '../data/siteData';

export const ComplianceSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(COMPLIANCE_REGIONS[0].id);
  const activeRegion =
    COMPLIANCE_REGIONS.find((r) => r.id === selectedId) ?? COMPLIANCE_REGIONS[0];

  return (
    <section
      aria-label="Enterprise compliance and regional residency"
      className="w-full border-t border-[#242424] bg-[#080808] px-5 py-16 md:px-8"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#ff6601]" />
            <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
              Enterprise security & regional data residency
            </h2>
          </div>

          <div
            role="group"
            aria-label="Data residency region"
            className="flex flex-wrap items-center gap-1 rounded-full border border-[#242424] bg-[#151515] p-1"
          >
            {COMPLIANCE_REGIONS.map((reg) => {
              const isSelected = reg.id === selectedId;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => setSelectedId(reg.id)}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#f4f4f4] text-[#080808]'
                      : 'text-[#999999] hover:text-[#f4f4f4]'
                  }`}
                >
                  {reg.region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Single-Row Standards + Selected Region Details */}
        <div className="grid grid-cols-1 gap-6 border-t border-[#242424] pt-7 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_CONTROLS.map((ctrl) => (
            <div key={ctrl.title} className="flex flex-col gap-1">
              <span className="text-[14px] font-medium text-[#f4f4f4]">
                {ctrl.title}
              </span>
              <span className="text-[13px] leading-[1.5em] text-[#999999]">
                {ctrl.detail}
              </span>
            </div>
          ))}

          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-[#242424] lg:pl-6">
            <span className="font-mono-num text-[13px] text-[#ff6601]">
              {activeRegion.datacenter}
            </span>
            <span className="text-[13px] text-[#b8b8b8]">
              {activeRegion.residency} · {activeRegion.latency}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
