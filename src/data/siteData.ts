export type PageRoute = 'home' | 'request-demo' | 'privacy-policy' | 'data-processing';

export const ASSETS = {
  heroVolcanicRidge: '/src/assets/images/hero_volcanic_ridge_1795383950703.jpg',
  heroLaptopVolcanic: '/src/assets/images/hero_laptop_volcanic_1795383950839.jpg',
  heroCvSurveillance: '/src/assets/images/hero_cv_surveillance_1795586515916.jpg',
  platformGlassFounder: '/src/assets/images/platform_glass_founder_1795383950613.jpg',
  approachDarkGlass: '/src/assets/images/approach_dark_glass_1795383949362.jpg',
  integrationsSyncEngine: '/src/assets/images/integrations_sync_engine_1795383950286.jpg',
  agentsObsidianPrism: '/src/assets/images/agents_obsidian_prism_1795383949448.jpg',
  storyEmma: '/src/assets/images/story_portrait_emma_1795383952621.jpg',
  storyDaniel: '/src/assets/images/story_portrait_daniel_1795383950623.jpg',
  storyMaya: '/src/assets/images/story_portrait_maya_1795383949782.jpg',
  faqBotanicalFerns: '/src/assets/images/faq_botanical_ferns_1795383950160.jpg',
} as const;

export const NAV_LINKS = [
  { key: 'platform', href: '#platform' },
  { key: 'integrations', href: '#integrations' },
  { key: 'workflows', href: '#workflows' },
  { key: 'pricing', href: '#pricing' },
  { key: 'stories', href: '#stories' },
  { key: 'faq', href: '#faq' },
] as const;

export const PLATFORM_METRICS = [
  { value: '01', label: 'CONNECTED OPERATIONS LAYER' },
  { value: '04', label: 'SPECIALIST AI OPERATORS' },
  { value: '100%', label: 'YOUR POLICIES, YOUR FINAL SAY' },
];

export interface SandboxWorkflow {
  id: string;
  label: string;
  operator: string;
  orderRef: string;
  customer: string;
  stackTags: string[];
  timeline: Array<{ step: string; detail: string; status: 'done' | 'check' | 'pending' }>;
  policyChecks: string[];
  proposedAction: string;
  confidence: string;
}

export const SANDBOX_WORKFLOWS: SandboxWorkflow[] = [
  {
    id: 'exception',
    label: 'Order Exception Triage',
    operator: 'Order Agent',
    orderRef: 'ORD-28419 · $412.00',
    customer: 'H. Lindqvist · Stockholm',
    stackTags: ['Shopify Plus', 'ShipBob', 'NetSuite'],
    timeline: [
      { step: '09:14 UTC · Webhook received', detail: 'Carrier scan stalled 52h at Malmö sorting hub', status: 'done' },
      { step: '09:14 UTC · Policy cross-check', detail: 'VIP express threshold (> $350) triggered automatic reship eligibility', status: 'check' },
      { step: '09:15 UTC · Action staged', detail: 'Priority replacement SKU-4412 staged at EU-North warehouse', status: 'pending' },
    ],
    policyChecks: ['Express SLA breach verified', 'Stock confirmed in EU-North (14 units)', 'Human sign-off required > $300'],
    proposedAction: 'Dispatch replacement order #28419-R via DHL Express & notify customer',
    confidence: 'Policy Match 99.4%',
  },
  {
    id: 'vip-support',
    label: 'VIP Support Draft',
    operator: 'Support Agent',
    orderRef: 'TCK-9104 · LTV $3,840',
    customer: 'M. Takahashi · Tokyo',
    stackTags: ['Gorgias', 'Shopify Plus', 'Klaviyo'],
    timeline: [
      { step: '11:02 UTC · Thread ingested', detail: 'Customer requested size exchange before gift delivery Friday', status: 'done' },
      { step: '11:02 UTC · Context merged', detail: 'Fetched order #7721, VIP tier status, and local Tokyo inventory', status: 'check' },
      { step: '11:03 UTC · Reply drafted', detail: 'Personalized Japanese & English response prepared with prepaid label', status: 'pending' },
    ],
    policyChecks: ['VIP tier complimentary courier approved', 'Friday delivery cutoff feasible', 'Tone calibrated to brand guide'],
    proposedAction: 'Send bilingual VIP reply & trigger instant exchange reservation',
    confidence: 'Policy Match 98.9%',
  },
  {
    id: 'return',
    label: 'Automated Return Approval',
    operator: 'Returns Agent',
    orderRef: 'RMA-4408 · $185.00',
    customer: 'C. Vance · London',
    stackTags: ['Shopify Plus', 'Gorgias', 'NetSuite'],
    timeline: [
      { step: '13:40 UTC · Return submitted', detail: 'Customer initiated return on day 14 of 30-day window', status: 'done' },
      { step: '13:40 UTC · Condition & margin check', detail: 'Item eligible for store credit bonus (+10%) or direct refund', status: 'check' },
      { step: '13:41 UTC · Resolution ready', detail: 'Credit note & UK Royal Mail label staged for one-click approval', status: 'pending' },
    ],
    policyChecks: ['Within 30-day return window (Day 14)', 'SKU eligible for restock', 'Zero prior abuse flags'],
    proposedAction: 'Issue return label + offer instant $203.50 store credit option',
    confidence: 'Policy Match 100%',
  },
  {
    id: 'inventory',
    label: 'Inventory Reorder Alert',
    operator: 'Insights Agent',
    orderRef: 'SKU-8820 · Merino Overshirt',
    customer: 'Global Supply · US & EU',
    stackTags: ['NetSuite', 'ShipBob', 'Shopify Plus'],
    timeline: [
      { step: '06:00 UTC · Velocity scan', detail: '7-day sell-through surged +44% after seasonal campaign', status: 'done' },
      { step: '06:00 UTC · Lead time model', detail: '11 days remaining stock vs 18-day supplier production lead time', status: 'check' },
      { step: '06:01 UTC · PO draft staged', detail: 'Purchase order for 650 units across Size M/L prepared', status: 'pending' },
    ],
    policyChecks: ['Safety stock buffer breached (11d < 18d)', 'Supplier MOQ satisfied (650 units)', 'Cashflow cap within Q4 budget'],
    proposedAction: 'Submit PO #4192 to Tier-1 supplier & rebalance 80 units to US-West',
    confidence: 'Forecast Accuracy 96.8%',
  },
];

export const APPROACH_TABS = [
  {
    id: '01',
    number: '01',
    title: 'Scattered conversations',
    description: 'Bring customer context into the same conversation.',
    previewEyebrow: 'UNIFIED THREADS',
    previewSignal: 'Order #2841 · Shipment delay inquiry merged with carrier tracking',
    hueRotation: '0deg',
  },
  {
    id: '02',
    number: '02',
    title: 'Disconnected tools',
    description: 'Keep your storefront, inbox, and back office in sync.',
    previewEyebrow: 'SHARED STATE',
    previewSignal: 'Storefront · Helpdesk · ERP synchronized in real time',
    hueRotation: '12deg',
  },
  {
    id: '03',
    number: '03',
    title: 'Repetitive decisions',
    description: 'Turn familiar requests into consistent next steps.',
    previewEyebrow: 'POLICY-DRIVEN',
    previewSignal: 'Return window verified · Exchange draft queued for approval',
    hueRotation: '-10deg',
  },
  {
    id: '04',
    number: '04',
    title: 'Invisible bottlenecks',
    description: 'Know what needs attention before it slows you down.',
    previewEyebrow: 'PROACTIVE SIGNAL',
    previewSignal: '3 high-priority fulfillment exceptions surfaced early',
    hueRotation: '20deg',
  },
];

export const COMPOSER_PROMPTS = [
  'What needs my attention today?',
  'Bring my orders into one view.',
  'Help me connect the next step.',
];

export const STACK_PARTNERS = [
  'Shopify Plus',
  'Gorgias',
  'NetSuite',
  'Klaviyo',
  'ShipBob',
];

export const AI_OPERATORS = [
  {
    eyebrow: 'Order operations',
    title: 'Order agent',
    tagline: 'From checkout to doorstep',
    description: 'Route new orders, spot exceptions, and keep fulfillment moving.',
    statusCode: 'Order #2841',
    statusText: 'Ready for fulfillment',
    accentTint: 'rgba(255, 102, 1, 0.22)',
  },
  {
    eyebrow: 'Customer support',
    title: 'Support agent',
    tagline: 'Every conversation, in context',
    description: 'Prepare helpful answers with the order history already in view.',
    statusCode: 'Customer question',
    statusText: 'Reply prepared for review',
    accentTint: 'rgba(255, 149, 0, 0.2)',
  },
  {
    eyebrow: 'Returns & resolutions',
    title: 'Returns agent',
    tagline: 'Clear rules. Faster resolutions',
    description: 'Check return policies and prepare the right resolution for review.',
    statusCode: 'Return request',
    statusText: 'Policy checked · Ready',
    accentTint: 'rgba(255, 34, 0, 0.2)',
  },
  {
    eyebrow: 'Store intelligence',
    title: 'Insights agent',
    tagline: 'Daily signal, no spreadsheet',
    description: 'Turn everyday activity into a clear picture of what needs attention.',
    statusCode: 'Daily store brief',
    statusText: 'Next priority surfaced',
    accentTint: 'rgba(184, 184, 184, 0.16)',
  },
];

export const WORKFLOW_CARDS = [
  {
    flowId: '01',
    title: 'Customer questions',
    description: 'A thoughtful reply, ready for your review.',
    detail:
      'Reads incoming support messages alongside live order, shipping, and loyalty records, then prepares a clear draft aligned with your tone.',
  },
  {
    flowId: '02',
    title: 'Order exceptions',
    description: 'Catch the orders that need a second look.',
    detail:
      'Flags address mismatches, split-warehouse delays, and stalled carrier scans before customers have to ask where their parcel is.',
  },
  {
    flowId: '03',
    title: 'Return requests',
    description: 'Make the next step clear for everyone.',
    detail:
      'Evaluates eligibility against your return window and item condition rules, then queues an exchange or refund for one-click sign-off.',
  },
  {
    flowId: '04',
    title: 'Inventory alerts',
    description: 'Stay one step ahead of running low.',
    detail:
      'Tracks sell-through velocity across SKUs and alerts purchasing when lead times intersect upcoming demand.',
  },
  {
    flowId: '05',
    title: 'Payment follow-ups',
    description: 'Keep outstanding payments in view.',
    detail:
      'Monitors failed renewals, pending B2B invoices, and partial captures with polite, policy-approved reminders.',
  },
  {
    flowId: '06',
    title: 'Daily store brief',
    description: 'Your store’s day, without the spreadsheet.',
    detail:
      'Delivers one concise morning summary of order volume, open exceptions, and support priorities ready for your team.',
  },
];

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  featured: boolean;
  badge?: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'launch',
    name: 'Launch',
    monthlyPrice: 50,
    featured: false,
    description: 'A focused start for a growing store.',
    features: [
      '1 connected store',
      '2 active workflows',
      '1,000 actions / month',
      '2 team members',
      'Email support',
    ],
    ctaLabel: 'Choose Launch',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 150,
    featured: true,
    badge: 'Most popular',
    description: 'More momentum. Less manual work.',
    features: [
      '3 connected stores',
      '10 active workflows',
      '5,000 actions / month',
      '10 team members',
      'Priority support',
    ],
    ctaLabel: 'Choose Growth',
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: 350,
    featured: false,
    description: 'Connected operations at a bigger scale.',
    features: [
      '10 connected stores',
      'Unlimited workflows',
      '20,000 actions / month',
      'Unlimited team members',
      'Custom integrations',
    ],
    ctaLabel: 'Choose Scale',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 750,
    featured: false,
    description: 'A dedicated layer for complex commerce.',
    features: [
      'Unlimited stores',
      'Unlimited workflows',
      '50,000 actions / month',
      'Advanced roles & SSO',
      'Dedicated success partner',
    ],
    ctaLabel: 'Choose Enterprise',
  },
];

export interface StoryCaseStudy {
  id: string;
  eyebrow: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  portrait: string;
  summary: string;
  metrics: Array<{ label: string; before: string; after: string }>;
  workflowSteps: string[];
  integrations: string[];
}

export const STORIES: StoryCaseStudy[] = [
  {
    id: 'forma-goods',
    eyebrow: 'A CLEARER DAY, FROM THE FIRST ORDER.',
    quote:
      '“Our mornings used to start with five tabs and a list of exceptions. Now we have one clear view of what needs us — and more time for the customers who do.”',
    name: 'Emma Laurent',
    role: 'Founder, Forma Goods',
    company: 'Forma Goods',
    location: 'Paris & London',
    portrait: ASSETS.storyEmma,
    summary:
      'Forma Goods unified multi-currency storefront orders, European 3PL fulfillment exceptions, and bilingual customer support into one daily approval queue.',
    metrics: [
      { label: 'Morning exception triage', before: '3.5 hrs / day', after: '14 mins / day' },
      { label: 'First-response SLA', before: '6h 20m', after: '18 mins' },
      { label: 'Approval accuracy', before: 'Manual audit', after: '99.4% policy match' },
    ],
    workflowSteps: [
      'Ingest Shopify Plus order & ShipBob warehouse scan events continuously',
      'Order Agent isolates customs holds and address mismatches automatically',
      'Support Agent stages French/English customer updates for single-click sign-off',
    ],
    integrations: ['Shopify Plus', 'Gorgias', 'ShipBob', 'Klaviyo'],
  },
  {
    id: 'fieldwork-supply',
    eyebrow: 'A SMALL TEAM. A STRONGER RHYTHM.',
    quote:
      '“The biggest difference is how calm the day feels. Orders keep moving, the team knows what matters, and nothing important gets lost between tools.”',
    name: 'Daniel Hayes',
    role: 'Operations Lead, Fieldwork Supply',
    company: 'Fieldwork Supply',
    location: 'Portland & Berlin',
    portrait: ASSETS.storyDaniel,
    summary:
      'Fieldwork Supply connected NetSuite inventory ledgers with high-volume wholesale and D2C fulfillment so a 6-person operations team runs global logistics without spreadsheet reconciliation.',
    metrics: [
      { label: 'Stockout lead-time alerts', before: 'Weekly CSV', after: 'Real-time signal' },
      { label: 'Order exception backlog', before: '140+ / week', after: 'Zero carryover' },
      { label: 'Team hours reclaimed', before: '0 hrs', after: '32 hrs / week' },
    ],
    workflowSteps: [
      'Insights Agent tracks SKU sell-through velocity across US & EU hubs',
      'Low-stock thresholds trigger staged NetSuite purchase order drafts',
      'Operations Lead approves supplier reorders and inter-warehouse transfers in seconds',
    ],
    integrations: ['NetSuite', 'Shopify Plus', 'ShipBob'],
  },
  {
    id: 'common-thread',
    eyebrow: 'MORE CONTEXT. BETTER CONVERSATIONS.',
    quote:
      '“We spend less time looking for the story behind an order. The context is already there, so every reply feels more thoughtful and more human.”',
    name: 'Maya Bennett',
    role: 'Customer Experience Director, Common Thread',
    company: 'Common Thread',
    location: 'New York & Tokyo',
    portrait: ASSETS.storyMaya,
    summary:
      'Common Thread paired Returns Agent and Support Agent across 40,000 monthly orders so VIP exchanges, return windows, and loyalty credits resolve in one unified workspace.',
    metrics: [
      { label: 'Return resolution speed', before: '48 hours', after: '12 minutes' },
      { label: 'Exchange retention rate', before: '28%', after: '61%' },
      { label: 'CSAT score', before: '4.3 / 5', after: '4.9 / 5' },
    ],
    workflowSteps: [
      'Returns Agent evaluates item eligibility, margin rules, and return window',
      'Presents store-credit exchange incentives alongside refund options',
      'Support Agent attaches carrier tracking & loyalty balance for human review',
    ],
    integrations: ['Shopify Plus', 'Gorgias', 'Klaviyo', 'NetSuite'],
  },
];

export type FaqCategory = 'General' | 'Agents & workflows' | 'Privacy & control';

export const FAQ_CATEGORIES: Record<
  FaqCategory,
  Array<{ question: string; answer: string }>
> = {
  General: [
    {
      question: 'What is BlackArk?',
      answer:
        'BlackArk brings orders, support, returns, and reporting into a shared AI commerce workflow, with your team in control.',
    },
    {
      question: 'Where should I start?',
      answer:
        'Start with one repetitive task with clear rules, such as preparing order-status replies. Then expand when the workflow works for your team.',
    },
    {
      question: 'Do I need technical knowledge?',
      answer:
        'The experience is designed around understandable steps and clear policies. Your team defines what should happen and what needs approval.',
    },
    {
      question: 'Will I need to replace my tools?',
      answer:
        'BlackArk is designed as a layer across your existing stack. Tell us which tools you use when you contact us.',
    },
    {
      question: 'What happens after I send a request?',
      answer:
        'Your request is sent to the team for review. We’ll use the details you provide to discuss your workflow and next steps.',
    },
  ],
  'Agents & workflows': [
    {
      question: 'What does an AI operator do?',
      answer:
        'Each operator focuses on a clear part of commerce: orders, support, returns, or reporting. It brings context together and prepares the next step.',
    },
    {
      question: 'Can I start with just one workflow?',
      answer:
        'Yes. Choose a frequent, well-defined task first. Expand the scope as your team reviews the results and refines its rules.',
    },
    {
      question: 'Who decides when an action needs approval?',
      answer:
        'Your team does. Define the policies and escalation points for each workflow before it runs.',
    },
    {
      question: 'Can operators work together?',
      answer:
        'Workflows can connect related steps, so order context can inform a support reply or a return review.',
    },
    {
      question: 'How do we choose the first workflow?',
      answer:
        'Start with a task that happens often, has clear inputs, and creates measurable busywork. We can discuss it when you get in touch.',
    },
  ],
  'Privacy & control': [
    {
      question: 'Does my team stay in control?',
      answer:
        'Yes. The operating model is built around your rules, review points, and decisions about what can happen automatically.',
    },
    {
      question: 'Will an agent make every decision on its own?',
      answer:
        'No. Sensitive, unusual, or unclear cases should be routed to a person according to the workflow policies you define.',
    },
    {
      question: 'What information should I share in the contact form?',
      answer:
        'Share business contact details and a short description of your workflow. Do not include passwords, payment details, or customer records.',
    },
    {
      question: 'Can I review a workflow before expanding it?',
      answer:
        'That is the recommended approach: start small, review outcomes, and adjust the rules before adding more steps.',
    },
    {
      question: 'How will my request details be used?',
      answer:
        'The details in this form are used to respond to your inquiry. Newsletter updates are a separate, optional subscription.',
    },
  ],
};

export interface ComplianceRegion {
  id: string;
  region: string;
  datacenter: string;
  latency: string;
  residency: string;
  encryption: string;
}

export const COMPLIANCE_REGIONS: ComplianceRegion[] = [
  {
    id: 'us',
    region: 'North America (US)',
    datacenter: 'Virginia · us-east-1',
    latency: '14 ms',
    residency: 'Strict US data isolation',
    encryption: 'AES-256-GCM · TLS 1.3',
  },
  {
    id: 'eu',
    region: 'Europe (EU)',
    datacenter: 'Frankfurt · eu-central-1',
    latency: '18 ms',
    residency: 'GDPR EU-only residency',
    encryption: 'AES-256-GCM · Customer-managed keys',
  },
  {
    id: 'apac',
    region: 'Asia-Pacific (APAC)',
    datacenter: 'Tokyo · ap-northeast-1',
    latency: '16 ms',
    residency: 'APAC regional boundary',
    encryption: 'AES-256-GCM · TLS 1.3',
  },
];

export const TRUST_CONTROLS = [
  { title: 'SOC 2 Type II', detail: 'Independently audited continuous operational security controls.' },
  { title: 'GDPR & CCPA', detail: 'Data minimization, right-to-erasure pipelines, and EU DPA coverage.' },
  { title: 'ISO / IEC 27001', detail: 'Certified information security management across all infrastructure.' },
  { title: '99.99% Uptime SLA', detail: 'Multi-region active-active failover with real-time policy audit logs.' },
];
