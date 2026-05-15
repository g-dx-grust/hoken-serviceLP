import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Subsidy } from "@/components/sections/subsidy";
import { FinalCta } from "@/components/sections/final-cta";
import { LinkButton } from "@/components/ui/link-button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "料金・補助金",
  description:
    "初期導入費320万円＋月額サポート費。補助金の申請可能性も含め、保険代理店の規模に合わせて導入計画をご提案します。",
};

type Plan = {
  name: string;
  description: string;
  monthlyFrom: string;
  features: readonly string[];
  recommended?: boolean;
};

const PLANS: readonly Plan[] = [
  {
    name: "ライト",
    description: "日常運用を自社で進めたい代理店向け",
    monthlyFrom: "3万円",
    features: [
      "メール・チャットサポート（営業時間内）",
      "FAQ・ナレッジベースアクセス",
      "システムアップデート自動適用",
      "月次利用状況の確認ツール",
    ],
  },
  {
    name: "スタンダード",
    description: "月次の伴走で現場への定着を支援",
    monthlyFrom: "5万円",
    features: [
      "ライトのすべて",
      "月1回オンラインミーティング",
      "設定変更・カスタマイズ対応",
      "月次業績レポートの読み解き支援",
      "補助金申請の初期相談",
    ],
    recommended: true,
  },
  {
    name: "プレミアム",
    description: "専任担当が運用改善まで踏み込む伴走プラン",
    monthlyFrom: "10万円",
    features: [
      "スタンダードのすべて",
      "週1回ミーティング（専任担当）",
      "業務フロー改善の提案・設計",
      "補助金申請書類の作成支援",
      "他システム連携の設計支援",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRICING"
        title="シンプルな2段構成の料金体系"
        description="初期導入費＋月額サポート費の組み合わせです。補助金を使える可能性と、導入後に必要な伴走レベルを初回相談で整理します。"
      />

      {/* 初期導入費 */}
      <section className="section pb-0">
        <div className="container-x">
          <div className="border border-[var(--color-border)] rounded-[6px] overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center">

              {/* ラベル + 金額 */}
              <div className="px-7 py-6 md:px-10 md:py-8 md:border-r border-b md:border-b-0 border-[var(--color-border)] shrink-0">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--color-fg-subtle)] uppercase">
                  Initial Fee
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[28px] font-bold tracking-tight text-[var(--color-fg)] num leading-none">
                    320万円
                  </span>
                  <span className="text-[12px] text-[var(--color-fg-subtle)]">税抜</span>
                </div>
                <p className="mt-2 text-[11.5px] text-[var(--color-fg-subtle)]">
                  システム構築・データ移行・初期設定・操作トレーニング込み
                </p>
              </div>

              {/* IT補助金バッジ + 説明 */}
              <div className="px-7 py-6 md:px-10 md:py-8 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start">
                  <span className="text-[11px] font-semibold tracking-[0.1em] text-[var(--color-accent)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]/50 px-2.5 py-1 rounded-[3px]">
                    補助金活用を確認
                  </span>
                  <span className="text-[11.5px] text-[var(--color-fg-subtle)]">通常枠は最大450万円</span>
                </div>
                <p className="text-[13px] leading-[1.85] text-[var(--color-fg-muted)] max-w-[480px]">
                  デジタル化・AI導入補助金2026や業務改善助成金について、対象経費・要件・申請時期を確認します。
                  採択を保証するものではありませんが、導入計画の整理から支援します。
                </p>
                <div>
                  <LinkButton href="/contact?type=subsidy" variant="outline" className="text-[12.5px]">
                    補助金の活用相談を申し込む
                  </LinkButton>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 月額サポートプラン */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-[520px] mb-10">
            <p className="eyebrow">MONTHLY SUPPORT</p>
            <h2 className="mt-4 h-section">月額サポートプラン</h2>
            <p className="mt-4 text-[13.5px] leading-[1.9] text-[var(--color-fg-muted)]">
              導入後に大切なのは、募集人が入力を続けられることです。
              代理店の規模や現場の習熟度に合わせて、必要な伴走レベルを選べます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-[6px] overflow-hidden">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-[var(--color-bg)] p-7 md:p-8 flex flex-col ${
                  plan.recommended
                    ? "ring-2 ring-[var(--color-primary)] ring-inset relative"
                    : ""
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-px right-6 bg-[var(--color-primary)] text-[var(--color-primary-fg)] text-[11px] font-semibold tracking-[0.1em] px-2.5 py-1">
                    RECOMMENDED
                  </span>
                )}

                <h3 className="text-[22px] font-bold text-[var(--color-fg)]">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.75] text-[var(--color-fg-muted)] min-h-[2.8em]">
                  {plan.description}
                </p>

                <div className="mt-5 pb-5 border-b border-[var(--color-border)]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[22px] font-bold text-[var(--color-fg)] num leading-none">
                      {plan.monthlyFrom}
                    </span>
                    <span className="text-[12.5px] text-[var(--color-fg-subtle)]">〜 / 月</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[var(--color-fg-subtle)]">
                    税抜・詳細はお見積りにてご案内
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 text-[13px] leading-[1.7] text-[var(--color-fg)]"
                    >
                      <Check
                        size={15}
                        className="mt-1 text-[var(--color-primary)] shrink-0"
                        strokeWidth={2.2}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <LinkButton
                    href="/contact?type=demo"
                    variant={plan.recommended ? "primary" : "outline"}
                    className="w-full"
                  >
                    このプランで相談する
                  </LinkButton>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[12px] text-[var(--color-fg-subtle)]">
            ※ 月額の目安は標準的な構成での参考値です。代理店規模・ご要望によって変動します。表示価格は2026年5月時点のものです。
          </p>
        </div>
      </section>

      <Subsidy />
      <FinalCta />
    </>
  );
}
