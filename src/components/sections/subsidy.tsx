import { LinkButton } from "@/components/ui/link-button";

const SUBSIDIES = [
  {
    name: "デジタル化・AI導入補助金2026（通常枠）",
    summary:
      "中小企業・小規模事業者のITツール導入を支援する制度です。HOKENA CRM の導入費・クラウド利用料・導入関連費について、通常枠で申請できる可能性を確認します。",
    rate: "1/2 〜 2/3",
    cap: "最大 450万円",
    cycle: "締切回ごと",
    bullets: [
      "中小企業・小規模事業者が対象",
      "ソフトウェア、クラウド利用料、導入関連費を確認",
      "申請前の要件整理から導入計画まで支援",
    ],
  },
  {
    name: "業務改善助成金",
    summary:
      "事業場内最低賃金の引上げと、生産性向上に資する設備投資等を支援する制度です。代理店の状況に応じて、CRM導入を業務効率化の投資として検討します。",
    rate: "要件により変動",
    cap: "最大 600万円",
    cycle: "年度内実施",
    bullets: [
      "事業場内最低賃金の引上げが要件",
      "交付決定前の発注・契約は対象外",
      "都道府県労働局への事前相談が必要",
    ],
  },
] as const;

export function Subsidy() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">SUBSIDY</p>
          <h2 className="mt-4 h-section">
            <span className="block">補助金を使えるか、</span>
            <span className="block">初回相談で整理します</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            制度ごとに対象経費、申請時期、賃上げ要件が異なります。代理店の規模・導入時期・投資内容を確認し、
            使える可能性のある制度と進め方を具体的にご案内します。
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-[6px] overflow-hidden">
          {SUBSIDIES.map((s) => (
            <div key={s.name} className="bg-[var(--color-bg)] p-7 md:p-8">
              <h3 className="text-[16px] font-bold text-[var(--color-fg)]">
                {s.name}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.85] text-[var(--color-fg-muted)]">
                {s.summary}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-[var(--color-border)] py-4">
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.1em] text-[var(--color-fg-subtle)]">
                    補助率
                  </dt>
                  <dd className="mt-1 num text-[15px] font-bold text-[var(--color-fg)]">
                    {s.rate}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.1em] text-[var(--color-fg-subtle)]">
                    上限
                  </dt>
                  <dd className="mt-1 num text-[15px] font-bold text-[var(--color-fg)]">
                    {s.cap}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.1em] text-[var(--color-fg-subtle)]">
                    期間
                  </dt>
                  <dd className="mt-1 num text-[15px] font-bold text-[var(--color-fg)]">
                    {s.cycle}
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-[12.5px] leading-[1.8] text-[var(--color-fg)] flex gap-2.5"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <LinkButton href="/pricing" variant="outline">
            料金プランと補助金活用例を見る
          </LinkButton>
          <LinkButton href="/contact?type=subsidy" variant="ghost">
            補助金の活用相談を申し込む
          </LinkButton>
        </div>

        <p className="mt-6 text-[12px] text-[var(--color-fg-subtle)]">
          ※ 補助金の対象判定・採択を保証するものではありません。申請前に各制度の公募要領・採択要件を確認します。
        </p>
      </div>
    </section>
  );
}
