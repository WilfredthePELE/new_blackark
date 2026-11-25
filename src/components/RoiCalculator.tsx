import React, { useMemo, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { MagneticButton } from './MagneticButton';

interface RoiCalculatorProps {
  onSelectTier: (tierName: string, note: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onSelectTier }) => {
  const { formatPrice } = useLocale();
  const [monthlyOrders, setMonthlyOrders] = useState(8500);
  const [supportTickets, setSupportTickets] = useState(1400);
  const [avgMinutes, setAvgMinutes] = useState(8);
  const [teamSize, setTeamSize] = useState(6);

  const calc = useMemo(() => {
    // 68% of routine triage/drafts automated with human sign-off
    const monthlyActions = Math.round(monthlyOrders * 0.25 + supportTickets * 0.85);
    const weeklyHoursSaved = Math.max(
      4,
      Math.round(((monthlyActions * avgMinutes * 0.68) / 60 / 4.33) * 10) / 10
    );
    // Conservative blended ops cost $36/hr USD
    const annualUsdSavings = Math.round(weeklyHoursSaved * 52 * 36 + teamSize * 1200);

    let recommendedTier = 'Launch';
    if (monthlyActions > 20000 || teamSize > 15) {
      recommendedTier = 'Enterprise';
    } else if (monthlyActions > 5000 || teamSize > 10) {
      recommendedTier = 'Scale';
    } else if (monthlyActions > 1000 || teamSize > 2) {
      recommendedTier = 'Growth';
    }

    return {
      monthlyActions,
      weeklyHoursSaved,
      annualUsdSavings,
      recommendedTier,
    };
  }, [monthlyOrders, supportTickets, avgMinutes, teamSize]);

  return (
    <div className="mt-6 rounded-[24px] border border-[#242424] bg-[#151515] p-6 md:p-9">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Controls */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div>
            <p className="eyebrow-label text-[#ff6601]">ROI & SCALE CALCULATOR</p>
            <h3 className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
              Estimate operational time and cost reclaimed.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Monthly Orders */}
            <label className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#b8b8b8]">Monthly orders</span>
                <span className="font-mono-num text-[#f4f4f4]">
                  {monthlyOrders.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={60000}
                step={500}
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#ff6601]"
              />
            </label>

            {/* Support Tickets */}
            <label className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#b8b8b8]">Support tickets / month</span>
                <span className="font-mono-num text-[#f4f4f4]">
                  {supportTickets.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={15000}
                step={100}
                value={supportTickets}
                onChange={(e) => setSupportTickets(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#ff6601]"
              />
            </label>

            {/* Avg Resolution Time */}
            <label className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#b8b8b8]">Avg manual handling time</span>
                <span className="font-mono-num text-[#f4f4f4]">
                  {avgMinutes} min
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={20}
                step={1}
                value={avgMinutes}
                onChange={(e) => setAvgMinutes(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#ff6601]"
              />
            </label>

            {/* Team Size */}
            <label className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#b8b8b8]">Operations team size</span>
                <span className="font-mono-num text-[#f4f4f4]">
                  {teamSize} {teamSize === 1 ? 'member' : 'members'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={35}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#ff6601]"
              />
            </label>
          </div>
        </div>

        {/* Right: Output Summary */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#242424] bg-[#080808] p-6 lg:col-span-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <span className="eyebrow-label text-[#999999]">HOURS RECLAIMED</span>
              <span className="font-mono-num text-[32px] leading-tight text-[#f4f4f4]">
                {calc.weeklyHoursSaved} hrs
              </span>
              <span className="text-[12px] text-[#999999]">per week</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="eyebrow-label text-[#999999]">EST. ANNUAL SAVINGS</span>
              <span className="font-mono-num text-[32px] leading-tight text-[#ff6601]">
                {formatPrice(calc.annualUsdSavings)}
              </span>
              <span className="text-[12px] text-[#999999]">projected impact</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#242424] pt-5">
            <div>
              <span className="eyebrow-label text-[#999999]">RECOMMENDED TIER</span>
              <p className="mt-1 text-[18px] font-medium text-[#f4f4f4]">
                BlackArk {calc.recommendedTier}{' '}
                <span className="font-mono-num text-[12px] text-[#999999]">
                  (~{calc.monthlyActions.toLocaleString()} actions/mo)
                </span>
              </p>
            </div>

            <MagneticButton
              type="button"
              onClick={() =>
                onSelectTier(
                  calc.recommendedTier,
                  `ROI estimate: ${monthlyOrders.toLocaleString()} orders/mo, ${supportTickets.toLocaleString()} tickets/mo, ${teamSize} operators.`
                )
              }
              className="cursor-pointer whitespace-nowrap rounded-full bg-[#f4f4f4] px-6 py-3 text-[13px] font-medium text-[#080808] hover:bg-[#ff6601] hover:text-[#f4f4f4]"
            >
              Start with {calc.recommendedTier}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};
