import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
} from 'lucide-react';
import { PageRoute, STACK_PARTNERS } from '../data/siteData';

interface RequestDemoPageProps {
  initialWorkflow?: string;
  initialPlan?: string;
  initialNote?: string;
  onNavigate: (page: PageRoute) => void;
}

const STEPS = [
  { num: '01', title: 'Store & commerce stack' },
  { num: '02', title: 'Workflow scope & calendar slot' },
  { num: '03', title: 'Instant booking confirmation' },
];

const VOLUME_BANDS = [
  '1k – 5k orders / mo',
  '5k – 25k orders / mo',
  '25k – 100k orders / mo',
  '100k+ orders / mo',
];

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '02:00 PM',
  '04:30 PM',
];

const TIMEZONES = [
  'UTC-05:00 · New York',
  'UTC+00:00 · London',
  'UTC+01:00 · Berlin / Paris',
  'UTC+09:00 · Tokyo',
];

export const RequestDemoPage: React.FC<RequestDemoPageProps> = ({
  initialWorkflow = '',
  initialPlan = '',
  initialNote = '',
  onNavigate,
}) => {
  const prefillNote = [
    initialPlan ? `Interested in the ${initialPlan} plan.` : '',
    initialWorkflow ? `Starting workflow: ${initialWorkflow}.` : '',
    initialNote,
  ]
    .filter(Boolean)
    .join(' ');

  const upcomingDays = useMemo(() => {
    const days: Array<{ label: string; iso: string }> = [];
    const cursor = new Date();
    while (days.length < 5) {
      cursor.setDate(cursor.getDate() + 1);
      const dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        days.push({
          label: cursor.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          iso: cursor.toISOString().split('T')[0],
        });
      }
    }
    return days;
  }, []);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    storeUrl: '',
    volumeBand: VOLUME_BANDS[1],
    stack: ['Shopify Plus', 'Gorgias'] as string[],
    selectedDate: upcomingDays[0]?.iso ?? '',
    selectedSlot: TIME_SLOTS[1],
    timezone: TIMEZONES[0],
    automate: prefillNote,
    consent: false,
  });

  const [error, setError] = useState('');
  const [bookingRef] = useState(() =>
    `BA-${Math.floor(100000 + Math.random() * 900000)}`
  );

  const toggleStack = (tool: string) => {
    setForm((prev) => ({
      ...prev,
      stack: prev.stack.includes(tool)
        ? prev.stack.filter((s) => s !== tool)
        : [...prev.stack, tool],
    }));
  };

  const handleNextStep = () => {
    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (!form.company.trim()) {
      setError('Please enter your company name.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError(
        'Please agree to the data processing notice to confirm your session.'
      );
      return;
    }
    setError('');
    setStep(3);
  };

  const handleDownloadIcs = () => {
    const cleanDate = form.selectedDate.replace(/-/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BlackArk//Enterprise Consultation//EN',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@blackark.ai`,
      `DTSTART:${cleanDate}T140000Z`,
      `DTEND:${cleanDate}T143000Z`,
      `SUMMARY:BlackArk Operations Walkthrough — ${form.company}`,
      `DESCRIPTION:Ref ${bookingRef}. Stack: ${form.stack.join(', ')}. ${form.automate}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blackark-contact-${bookingRef}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedDayLabel =
    upcomingDays.find((d) => d.iso === form.selectedDate)?.label ??
    form.selectedDate;

  return (
    <main className="min-h-screen w-full bg-[#080808] px-5 pt-[128px] pb-[120px] md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex w-fit cursor-pointer items-center gap-2 text-[14px] text-[#999999] transition-colors hover:text-[#f4f4f4]"
        >
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Copy & Interactive Step Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between gap-10 lg:col-span-5"
          >
            <div className="flex flex-col gap-5">
              <p className="eyebrow-label text-[#ff6601]">
                A BETTER WAY TO OPERATE
              </p>
              <h1 className="section-headline text-[#f4f4f4]">
                Let’s put your business in motion.
              </h1>
              <p className="text-[16px] leading-[1.6em] text-[#999999]">
                Configure your stack, choose a live session slot with an
                operations engineer, and get an architecture blueprint tailored to
                your order flow.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#242424] pt-8">
              {STEPS.map((s, idx) => {
                const stepNum = (idx + 1) as 1 | 2 | 3;
                const active = step === stepNum;
                const done = step > stepNum;
                return (
                  <div
                    key={s.num}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                      active
                        ? 'border-[#ff6601]/60 bg-[#151515]'
                        : 'border-[#242424] bg-[#0c0c0c]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono-num text-[13px] ${
                          active || done ? 'text-[#ff6601]' : 'text-[#999999]'
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`text-[15px] ${
                          active ? 'text-[#f4f4f4]' : 'text-[#b8b8b8]'
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {done && <CheckCircle2 size={16} className="text-[#ff6601]" />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Multi-Step Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[24px] border border-[#242424] bg-[#151515] p-7 md:p-10 lg:col-span-7"
          >
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#242424] pb-5">
                  <div>
                    <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                      Step 1 · Tell us about your store
                    </h2>
                    <p className="mt-1 text-[14px] text-[#999999]">
                      Your contact details, volume band, and connected systems.
                    </p>
                  </div>
                  <span className="font-mono-num text-[12px] text-[#999999]">
                    1 / 3
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] text-[#b8b8b8]">Full name</span>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="Emma Laurent"
                      className="h-12 rounded-xl border border-[#242424] bg-[#080808] px-4 text-[14px] text-[#f4f4f4] placeholder-[#999999]/60 focus:border-[#ff6601] focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] text-[#b8b8b8]">Work email</span>
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={(e) =>
                        setForm({ ...form, workEmail: e.target.value })
                      }
                      placeholder="emma@formagoods.com"
                      className="h-12 rounded-xl border border-[#242424] bg-[#080808] px-4 text-[14px] text-[#f4f4f4] placeholder-[#999999]/60 focus:border-[#ff6601] focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] text-[#b8b8b8]">Company</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Forma Goods"
                      className="h-12 rounded-xl border border-[#242424] bg-[#080808] px-4 text-[14px] text-[#f4f4f4] placeholder-[#999999]/60 focus:border-[#ff6601] focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] text-[#b8b8b8]">Store URL</span>
                    <input
                      type="url"
                      value={form.storeUrl}
                      onChange={(e) =>
                        setForm({ ...form, storeUrl: e.target.value })
                      }
                      placeholder="https://yourstore.com"
                      className="h-12 rounded-xl border border-[#242424] bg-[#080808] px-4 text-[14px] text-[#f4f4f4] placeholder-[#999999]/60 focus:border-[#ff6601] focus:outline-none"
                    />
                  </label>
                </div>

                {/* Volume Band */}
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] text-[#b8b8b8]">
                    Monthly order volume
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {VOLUME_BANDS.map((band) => (
                      <button
                        key={band}
                        type="button"
                        onClick={() => setForm({ ...form, volumeBand: band })}
                        className={`cursor-pointer rounded-xl border px-3 py-2.5 font-mono-num text-[12px] transition-colors ${
                          form.volumeBand === band
                            ? 'border-[#ff6601] bg-[#080808] text-[#f4f4f4]'
                            : 'border-[#242424] bg-[#080808]/60 text-[#999999] hover:text-[#f4f4f4]'
                        }`}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stack Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] text-[#b8b8b8]">
                    Connected tools (select all that apply)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {STACK_PARTNERS.map((tool) => {
                      const active = form.stack.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleStack(tool)}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors ${
                            active
                              ? 'border-[#f4f4f4] bg-[#f4f4f4] text-[#080808]'
                              : 'border-[#242424] bg-[#080808] text-[#b8b8b8] hover:border-[#3b3b3b]'
                          }`}
                        >
                          {tool}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <p className="text-[13px] text-[#ff6601]" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="mt-1 h-12 w-full cursor-pointer rounded-full bg-[#f4f4f4] text-[14px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4] sm:w-fit sm:px-9"
                >
                  Continue to scheduling →
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#242424] pb-5">
                  <div>
                    <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                      Step 2 · Choose workflow scope & time slot
                    </h2>
                    <p className="mt-1 text-[14px] text-[#999999]">
                      Pick a 30-minute slot with a BlackArk solutions architect.
                    </p>
                  </div>
                  <span className="font-mono-num text-[12px] text-[#999999]">
                    2 / 3
                  </span>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-[13px] text-[#b8b8b8]">
                    <Calendar size={14} className="text-[#ff6601]" />
                    <span>Select date</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {upcomingDays.map((day) => (
                      <button
                        key={day.iso}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, selectedDate: day.iso })
                        }
                        className={`cursor-pointer rounded-xl border px-3 py-2.5 text-[12px] transition-colors ${
                          form.selectedDate === day.iso
                            ? 'border-[#f4f4f4] bg-[#f4f4f4] font-medium text-[#080808]'
                            : 'border-[#242424] bg-[#080808] text-[#b8b8b8] hover:border-[#3b3b3b]'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot & Timezone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-[13px] text-[#b8b8b8]">
                      <Clock size={14} className="text-[#ff6601]" />
                      <span>Select time slot</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm({ ...form, selectedSlot: slot })}
                          className={`cursor-pointer rounded-xl border py-2.5 font-mono-num text-[12px] transition-colors ${
                            form.selectedSlot === slot
                              ? 'border-[#ff6601] bg-[#080808] text-[#f4f4f4]'
                              : 'border-[#242424] bg-[#080808] text-[#999999] hover:text-[#f4f4f4]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] text-[#b8b8b8]">Timezone</span>
                    <select
                      value={form.timezone}
                      onChange={(e) =>
                        setForm({ ...form, timezone: e.target.value })
                      }
                      className="h-12 rounded-xl border border-[#242424] bg-[#080808] px-3 text-[13px] text-[#f4f4f4] focus:border-[#ff6601] focus:outline-none"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-[13px] text-[#b8b8b8]">
                    What would you like to automate?
                  </span>
                  <textarea
                    rows={3}
                    value={form.automate}
                    onChange={(e) =>
                      setForm({ ...form, automate: e.target.value })
                    }
                    placeholder="Order exceptions, customer questions, return approvals..."
                    className="rounded-xl border border-[#242424] bg-[#080808] p-4 text-[14px] text-[#f4f4f4] placeholder-[#999999]/60 focus:border-[#ff6601] focus:outline-none"
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm({ ...form, consent: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 accent-[#ff6601]"
                  />
                  <span className="text-[13px] leading-[1.55em] text-[#999999]">
                    I agree to the processing of my personal data to confirm my
                    booking, as described in the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('privacy-policy')}
                      className="cursor-pointer text-[#f4f4f4] underline"
                    >
                      Privacy Policy
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('data-processing')}
                      className="cursor-pointer text-[#f4f4f4] underline"
                    >
                      Data Processing Notice
                    </button>
                    .
                  </span>
                </label>

                {error && (
                  <p className="text-[13px] text-[#ff6601]" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setStep(1);
                    }}
                    className="h-12 cursor-pointer rounded-full border border-[#3b3b3b] bg-[#080808] px-6 text-[14px] text-[#f4f4f4] transition-colors hover:border-[#f4f4f4]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="h-12 flex-1 cursor-pointer rounded-full bg-[#f4f4f4] px-8 text-[14px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4] sm:flex-none"
                  >
                    Confirm & send
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="flex min-h-[420px] flex-col items-start justify-center gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={36} className="text-[#ff6601]" />
                  <span className="font-mono-num text-[13px] text-[#ff6601]">
                    BOOKING CONFIRMED · {bookingRef}
                  </span>
                </div>

                <h2 className="text-[28px] font-medium tracking-[-0.02em] text-[#f4f4f4]">
                  Your walkthrough is scheduled.
                </h2>

                <p className="max-w-[520px] text-[15px] leading-[1.65em] text-[#999999]">
                  Thank you, {form.fullName}. Calendar details and a pre-session
                  sandbox link have been prepared for{' '}
                  <span className="text-[#f4f4f4]">{form.workEmail}</span>.
                </p>

                <div className="grid w-full grid-cols-1 gap-3 rounded-2xl border border-[#242424] bg-[#080808] p-5 sm:grid-cols-2">
                  <div>
                    <span className="eyebrow-label text-[#999999]">DATE & TIME</span>
                    <p className="mt-1 font-mono-num text-[14px] text-[#f4f4f4]">
                      {selectedDayLabel} · {form.selectedSlot}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#999999]">
                      {form.timezone}
                    </p>
                  </div>
                  <div>
                    <span className="eyebrow-label text-[#999999]">
                      STORE & STACK
                    </span>
                    <p className="mt-1 text-[14px] text-[#f4f4f4]">
                      {form.company} ({form.volumeBand})
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#999999]">
                      {form.stack.length > 0 ? form.stack.join(', ') : 'Custom stack'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-[#3b3b3b] bg-[#080808] px-6 py-3.5 text-[14px] font-medium text-[#f4f4f4] transition-colors hover:border-[#f4f4f4]"
                  >
                    <Download size={15} />
                    <span>Add to calendar (.ics)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="cursor-pointer rounded-full bg-[#f4f4f4] px-7 py-3.5 text-[14px] font-medium text-[#080808] transition-colors hover:bg-[#ff6601] hover:text-[#f4f4f4]"
                  >
                    Return to BlackArk
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};
