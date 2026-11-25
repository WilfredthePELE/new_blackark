import React, { createContext, useContext, useState } from 'react';

export type SupportedLang = 'EN' | 'FR' | 'DE' | 'JA';
export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY';

interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  rate: number;
  locale: string;
}

export const CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', rate: 152, locale: 'ja-JP' },
};

export interface Translations {
  nav: {
    platform: string;
    approach: string;
    integrations: string;
    agents: string;
    workflows: string;
    pricing: string;
    stories: string;
    faq: string;
    cta: string;
  };
  hero: {
    overline: string;
    headline: string;
    subheadline: string;
    cta: string;
  };
  sections: {
    platformTitle: string;
    approachTitle: string;
    integrationsTitle: string;
    operatorsTitle: string;
    workflowsTitle: string;
    pricingTitle: string;
    storiesTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaEyebrow: string;
  };
  pricing: {
    monthly: string;
    yearly: string;
    saveBadge: string;
    perMonth: string;
    billedMonthly: string;
    billedYearly: string;
    finePrint: string;
  };
  footer: {
    newsletterTitle: string;
    newsletterSub: string;
    subscribe: string;
    tagline: string;
  };
}

const TRANSLATIONS: Record<SupportedLang, Translations> = {
  EN: {
    nav: {
      platform: 'Platform',
      approach: 'Approach',
      integrations: 'Integrations',
      agents: 'Agents',
      workflows: 'Workflows',
      pricing: 'Pricing',
      stories: 'Stories',
      faq: 'FAQ',
      cta: 'Contact us',
    },
    hero: {
      overline: 'Intelligence behind every order',
      headline: 'Less busywork. More business in motion.',
      subheadline: 'An AI operations layer for the next generation of commerce.',
      cta: 'Contact us',
    },
    sections: {
      platformTitle:
        'brings orders, customers, and operations into one intelligent flow.',
      approachTitle:
        'Your team has better things to do than connect the dots.',
      integrationsTitle: 'One quiet engine. Your entire commerce world.',
      operatorsTitle: 'A little intelligence. At every step of the order.',
      workflowsTitle: 'Start with the work you do every day.',
      pricingTitle: 'A plan for your next chapter.',
      storiesTitle: 'Less friction. More room to grow.',
      faqTitle: 'Answers to the questions that come up most.',
      ctaEyebrow: 'LESS FRICTION. MORE FORWARD.',
      ctaTitle: 'Your next chapter. Already in motion.',
    },
    pricing: {
      monthly: 'Monthly',
      yearly: 'Yearly',
      saveBadge: 'Save 20%',
      perMonth: '/ month',
      billedMonthly: 'Billed monthly. Cancel anytime.',
      billedYearly: 'Billed yearly. Cancel anytime.',
      finePrint:
        'All plans include human approval controls. Yearly plans are billed upfront.',
    },
    footer: {
      newsletterTitle: 'A quieter inbox. A smarter store.',
      newsletterSub: 'Occasional ideas on commerce, AI, and better ways to work.',
      subscribe: 'Subscribe',
      tagline: 'Commerce, in its flow.',
    },
  },
  FR: {
    nav: {
      platform: 'Plateforme',
      approach: 'Approche',
      integrations: 'Intégrations',
      agents: 'Agents',
      workflows: 'Flux',
      pricing: 'Tarifs',
      stories: 'Récits',
      faq: 'FAQ',
      cta: 'Nous contacter',
    },
    hero: {
      overline: 'L’intelligence derrière chaque commande',
      headline: 'Moins de tâches répétitives. Plus de croissance.',
      subheadline: 'Une couche opérationnelle IA pour le commerce moderne.',
      cta: 'Nous contacter',
    },
    sections: {
      platformTitle:
        'réunit commandes, support client et opérations dans un seul flux intelligent.',
      approachTitle:
        'Votre équipe mérite mieux que de jongler entre les onglets.',
      integrationsTitle: 'Un moteur discret. Tout votre écosystème commerce.',
      operatorsTitle: 'Une intelligence précise à chaque étape.',
      workflowsTitle: 'Commencez par les tâches du quotidien.',
      pricingTitle: 'Un forfait pour votre prochaine étape.',
      storiesTitle: 'Moins de friction. Plus d’élan.',
      faqTitle: 'Réponses aux questions les plus fréquentes.',
      ctaEyebrow: 'MOINS DE FRICTION. PLUS D’ÉLAN.',
      ctaTitle: 'Votre prochain chapitre est déjà en marche.',
    },
    pricing: {
      monthly: 'Mensuel',
      yearly: 'Annuel',
      saveBadge: '-20 %',
      perMonth: '/ mois',
      billedMonthly: 'Facturation mensuelle. Annulable à tout moment.',
      billedYearly: 'Facturation annuelle. Annulable à tout moment.',
      finePrint:
        'Tous les forfaits incluent la validation humaine. Facturation annuelle d’avance.',
    },
    footer: {
      newsletterTitle: 'Une boîte plus calme. Une boutique plus agile.',
      newsletterSub: 'Idées occasionnelles sur le commerce et l’IA opérationnelle.',
      subscribe: 'S’abonner',
      tagline: 'Le commerce, dans son flux.',
    },
  },
  DE: {
    nav: {
      platform: 'Plattform',
      approach: 'Ansatz',
      integrations: 'Integrationen',
      agents: 'Agenten',
      workflows: 'Workflows',
      pricing: 'Preise',
      stories: 'Referenzen',
      faq: 'FAQ',
      cta: 'Kontakt',
    },
    hero: {
      overline: 'Intelligenz hinter jeder Bestellung',
      headline: 'Weniger Routinearbeit. Mehr Geschäft in Bewegung.',
      subheadline: 'Die KI-Betriebsebene für modernen E-Commerce.',
      cta: 'Kontakt',
    },
    sections: {
      platformTitle:
        'verbindet Bestellungen, Kundensupport und Operations in einem intelligenten Flow.',
      approachTitle:
        'Ihr Team hat Wichtigeres zu tun, als Punkte zu verbinden.',
      integrationsTitle: 'Ein ruhiger Kern. Ihre gesamte Commerce-Welt.',
      operatorsTitle: 'Präzise Intelligenz bei jedem Bestellschritt.',
      workflowsTitle: 'Starten Sie mit den täglichen Abläufen.',
      pricingTitle: 'Ein Plan für Ihr nächstes Kapitel.',
      storiesTitle: 'Weniger Reibung. Mehr Wachstum.',
      faqTitle: 'Antworten auf die häufigsten Fragen.',
      ctaEyebrow: 'WENIGER REIBUNG. MEHR VORTRIEB.',
      ctaTitle: 'Ihr nächstes Kapitel ist bereits in Bewegung.',
    },
    pricing: {
      monthly: 'Monatlich',
      yearly: 'Jährlich',
      saveBadge: '20 % sparen',
      perMonth: '/ Monat',
      billedMonthly: 'Monatlich kündbar.',
      billedYearly: 'Jährliche Abrechnung. Jederzeit kündbar.',
      finePrint:
        'Alle Tarife enthalten menschliche Freigabekontrollen.',
    },
    footer: {
      newsletterTitle: 'Ein ruhigeres Postfach. Ein smarterer Store.',
      newsletterSub: 'Impulse zu E-Commerce, KI und klaren Prozessen.',
      subscribe: 'Abonnieren',
      tagline: 'Commerce im Fluss.',
    },
  },
  JA: {
    nav: {
      platform: 'プラットフォーム',
      approach: 'アプローチ',
      integrations: '連携',
      agents: 'エージェント',
      workflows: 'ワークフロー',
      pricing: '料金',
      stories: '導入事例',
      faq: 'FAQ',
      cta: 'お問い合わせ',
    },
    hero: {
      overline: 'すべての注文に、静かな知性を',
      headline: '煩雑な手作業を減らし、ビジネスを前へ。',
      subheadline: '次世代コマースのためのAIオペレーション基盤。',
      cta: 'お問い合わせ',
    },
    sections: {
      platformTitle:
        'は注文・サポート・店舗運用をひとつのインテリジェントな流れに統合します。',
      approachTitle: 'チームは手作業ではなく、顧客体験に集中できます。',
      integrationsTitle: '静かな統合エンジン。コマース全体を同期。',
      operatorsTitle: '注文のあらゆる工程に、確かな知性を。',
      workflowsTitle: '日々の業務から、小さく始める。',
      pricingTitle: '次の成長フェーズに合わせたプラン。',
      storiesTitle: '摩擦を減らし、成長の余白を。',
      faqTitle: 'よくあるご質問への回答。',
      ctaEyebrow: 'LESS FRICTION. MORE FORWARD.',
      ctaTitle: '次のステージは、すでに動き出しています。',
    },
    pricing: {
      monthly: '月払い',
      yearly: '年払い',
      saveBadge: '20% OFF',
      perMonth: '/ 月',
      billedMonthly: '毎月請求・いつでも解約可能。',
      billedYearly: '年間一括請求・いつでも解約可能。',
      finePrint: 'すべてのプランに人間による承認フローが含まれます。',
    },
    footer: {
      newsletterTitle: '静かな受信箱、スマートなストア運用。',
      newsletterSub: 'コマースとAI運用に関する最新知見をお届けします。',
      subscribe: '登録する',
      tagline: 'Commerce, in its flow.',
    },
  },
};

interface LocaleContextValue {
  lang: SupportedLang;
  setLang: (l: SupportedLang) => void;
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  t: Translations;
  formatPrice: (usdAmount: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<SupportedLang>('EN');
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');

  const formatPrice = (usdAmount: number) => {
    const cfg = CURRENCIES[currency];
    const converted = Math.round(usdAmount * cfg.rate);
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency: cfg.code,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <LocaleContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        t: TRANSLATIONS[lang],
        formatPrice,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
};
