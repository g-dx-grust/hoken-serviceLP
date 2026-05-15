import { LinkButton } from "@/components/ui/link-button";
import { BrowserFrame } from "@/components/browser-frame";
import { ShieldCheck, ArrowRight } from "lucide-react";

const AMENDMENT_DATE = new Date("2026-06-01T00:00:00+09:00");

function daysUntil(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function Hero() {
  const days = daysUntil(AMENDMENT_DATE);

  return (
    <section className="relative bg-[var(--color-bg)] border-b border-[var(--color-border)] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="container-x relative pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 border border-[var(--color-border-strong)] bg-[var(--color-bg)] rounded-[4px] px-2.5 py-1">
              <ShieldCheck size={14} className="text-[var(--color-primary)]" />
              <span className="text-[12px] font-medium tracking-wide text-[var(--color-fg-muted)]">
                2026年6月施行 改正保険業法・監督指針への準備を支援
              </span>
            </div>

            <h1 className="mt-7 h-display">
              2026年6月、意向把握はもう
              <br className="hidden md:block" />
              <span className="text-[var(--color-primary)]">「記憶」では守れない。</span>
            </h1>

            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.95] text-[var(--color-fg-muted)] max-w-[640px]">
              意向把握、比較推奨、推奨理由、署名証跡。
              <br />
              HOKENA CRM は、面談の流れを変えずに、
              <br className="hidden md:block" />
              後から説明できる募集記録を残すためのCRMです。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/contact?type=demo" size="lg">
                オンラインデモを予約する
                <ArrowRight size={16} />
              </LinkButton>
              <LinkButton href="/contact" variant="outline" size="lg">
                無料相談を申し込む
              </LinkButton>
            </div>

            {/* Compact compliance strip */}
            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-[var(--color-border)] pt-5">
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[var(--color-fg-subtle)]">
                  REGULATORY DEADLINE
                </p>
                <p className="mt-1 num">
                  <span className="text-[28px] font-bold text-[var(--color-fg)] leading-none">
                    {days}
                  </span>
                  <span className="text-[12px] font-medium text-[var(--color-fg-muted)] ml-1.5">
                    日
                  </span>
                </p>
              </div>
              <div className="h-10 w-px bg-[var(--color-border)]" />
              <p className="text-[12px] leading-[1.7] text-[var(--color-fg-muted)]">
                改正保険業法・監督指針の施行まで
                <br />
                施行日: 2026年6月1日
              </p>
            </div>
          </div>

          {/* Right: demo video */}
          <div className="md:col-span-6">
            <BrowserFrame
              videoWebm="/demo/hero-demo.webm"
              videoMp4="/demo/hero-demo.mp4"
              videoPoster="/demo/hero-demo-poster.jpg"
              alt="HOKENA CRM 操作デモ — ダッシュボード・顧客・意向把握・契約の流れ"
              url="hokena-crm.app"
            />
            <div className="mt-3 flex items-center justify-between text-[11.5px] text-[var(--color-fg-subtle)]">
              <span>ダッシュボード → 顧客 → 意向把握 → 契約 の実際の操作フロー</span>
              <span className="num">デモ動画</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
