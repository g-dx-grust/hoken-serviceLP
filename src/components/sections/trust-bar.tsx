import Image from "next/image";

type LogoItem = {
  name: string;
  src: string | null;
  href: string;
};

type BadgeItem = {
  name: string;
  href: string;
  label: string;
  caption: string;
};

/**
 * トラストバー: 連携保険会社・連携ツール・補助金バッジ。
 * ロゴは公式配布または Wikimedia Commons 上でライセンス確認できた素材のみを採用。
 */
const INSURERS: LogoItem[] = [
  {
    name: "日本生命",
    src: "/logos/insurers/nippon-life.svg",
    href: "https://www.nissay.co.jp/",
  },
  {
    name: "第一生命",
    src: "/logos/insurers/dai-ichi-life.svg",
    href: "https://www.dai-ichi-life.co.jp/",
  },
  {
    name: "明治安田生命",
    src: "/logos/insurers/meiji-yasuda-life.svg",
    href: "https://www.meijiyasuda.co.jp/",
  },
  {
    name: "東京海上日動",
    src: "/logos/insurers/tokio-marine-nichido.svg",
    href: "https://www.tokiomarine-nichido.co.jp/",
  },
  {
    name: "SOMPOホールディングス",
    src: "/logos/insurers/sompo-holdings.svg",
    href: "https://www.sompo-hd.com/",
  },
  {
    name: "MS&ADインシュアランス",
    src: "/logos/insurers/ms-ad-insurance.svg",
    href: "https://www.ms-ad-hd.com/",
  },
];

const TOOLS: LogoItem[] = [
  {
    name: "Lark",
    src: "/logos/tools/Lark.png",
    href: "https://www.larksuite.com/",
  },
  {
    name: "Google Workspace",
    src: "/logos/tools/google-workspace.svg",
    href: "https://workspace.google.com/",
  },
  {
    name: "Microsoft 365",
    src: "/logos/tools/microsoft-365.svg",
    href: "https://www.microsoft365.com/",
  },
  {
    name: "Slack",
    src: "/logos/tools/slack.svg",
    href: "https://slack.com/",
  },
];

const BADGES: BadgeItem[] = [
  {
    name: "デジタル化・AI導入補助金2026",
    href: "https://it-shien.smrj.go.jp/",
    label: "デジタル化・AI導入補助金2026",
    caption: "通常枠の要件確認",
  },
  {
    name: "業務改善助成金",
    href: "https://www.mhlw.go.jp/seisakunitsuite/joseikin_shoureikin/index.html",
    label: "業務改善助成金",
    caption: "該当可否を確認",
  },
];

function SectionLabel({ en, jp }: { en: string; jp: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--color-fg-subtle)]">
      <span aria-hidden className="hidden sm:block h-px w-10 bg-[var(--color-border)]" />
      <span className="font-semibold tracking-[0.18em]">{en}</span>
      <span aria-hidden className="text-[var(--color-border-strong)]">/</span>
      <span className="tracking-wider">{jp}</span>
      <span aria-hidden className="hidden sm:block h-px w-10 bg-[var(--color-border)]" />
    </div>
  );
}

function InsurerMark({ item }: { item: LogoItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} 公式サイト`}
      className="flex items-center justify-center h-16 px-4 bg-[var(--color-bg)] grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition"
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={item.name}
          width={180}
          height={58}
          className="max-h-9 w-auto object-contain"
        />
      ) : (
        <span className="num text-[12.5px] font-bold tracking-[0.18em] text-[var(--color-fg-muted)] whitespace-nowrap">
          {item.name}
        </span>
      )}
    </a>
  );
}

function ToolMark({ item }: { item: LogoItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} 公式サイト`}
      className="flex items-center justify-center h-14 min-w-[160px] px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[4px] hover:border-[var(--color-border-strong)] transition"
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={item.name}
          width={160}
          height={44}
          className="max-h-8 w-auto object-contain"
        />
      ) : (
        <span className="text-[13px] font-semibold tracking-[0.06em] text-[var(--color-fg)] whitespace-nowrap">
          {item.name}
        </span>
      )}
    </a>
  );
}

function BadgeMark({ item }: { item: BadgeItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} 公式サイト`}
      className="group inline-flex items-center gap-3 h-12 pl-3 pr-5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[4px] hover:border-[var(--color-border-strong)] transition"
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center h-8 px-2 rounded-[3px] bg-[var(--color-primary)] text-[var(--color-primary-fg)] text-[10px] font-bold tracking-[0.14em]"
      >
        SUBSIDY
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[13px] font-semibold text-[var(--color-fg)]">
          {item.label}
        </span>
        <span className="text-[10.5px] tracking-[0.06em] text-[var(--color-fg-subtle)]">
          {item.caption}
        </span>
      </span>
    </a>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="container-x py-12 md:py-14 space-y-12">
        {/* 1. 連携保険会社 */}
        <div>
          <SectionLabel
            en="INSURANCE COMPANY INTEGRATIONS"
            jp="主要保険会社の手数料CSV・書面様式を確認"
          />
          <div className="mt-6 mx-auto max-w-[1080px] grid grid-cols-3 md:grid-cols-6 border border-[var(--color-border)] divide-x divide-[var(--color-border)] bg-[var(--color-bg)]">
            {INSURERS.map((item) => (
              <InsurerMark key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* 2. 連携ツール */}
        <div>
          <SectionLabel
            en="TOOL INTEGRATIONS"
            jp="普段使いの SaaS へ通知・予定を連携"
          />
          <div className="mt-6 mx-auto max-w-[1080px] flex flex-wrap items-center justify-center gap-3">
            {TOOLS.map((item) => (
              <ToolMark key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* 3. 補助金 */}
        <div>
          <SectionLabel
            en="SUBSIDY PROGRAMS"
            jp="申請可能性を確認する補助金・助成金"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {BADGES.map((item) => (
              <BadgeMark key={item.name} item={item} />
            ))}
          </div>
        </div>

        <p className="text-[11px] text-[var(--color-fg-subtle)] text-center max-w-[860px] mx-auto leading-relaxed">
          ※ 掲載ロゴは対応データ・通知連携の確認対象を示すもので、各社による推奨・提携を意味するものではありません。
        </p>
      </div>
    </section>
  );
}
