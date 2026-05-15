import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "2026年6月 改正保険業法のポイントと、代理店が今すべき準備",
  description:
    "令和7年改正保険業法と監督指針を踏まえ、保険代理店が2026年6月までに整えるべき体制・意向把握・募集記録の論点を整理します。",
};

const SOURCES = [
  {
    title: "金融庁：令和7年保険業法改正に係る政令の公布及びパブリックコメント結果",
    href: "https://www.fsa.go.jp/news/r7/hoken/20251219/20251219.html",
  },
  {
    title: "金融庁：令和7年保険業法改正に係る内閣府令等の公布及びパブリックコメント結果",
    href: "https://www.fsa.go.jp/news/r7/hoken/20260330/20260330.html",
  },
  {
    title: "金融庁：令和7年改正保険業法に係る監督指針等の一部改正",
    href: "https://www.fsa.go.jp/news/r7/hoken/20260330-2/20260330-2.html",
  },
  {
    title: "金融庁：保険会社向けの総合的な監督指針 II-4 業務の適切性",
    href: "https://www.fsa.go.jp/common/law/guide/ins/02d.html?gency-sales=&media=",
  },
  {
    title: "金融庁：顧客本位の業務運営に関する原則",
    href: "https://www.fsa.go.jp/policy/kokyakuhoni/kokyakuhoni.html",
  },
] as const;

const PREP_ITEMS = [
  "自社が特定大規模乗合保険募集人等の要件に該当するか確認する",
  "法令等遵守責任者、統括責任者、苦情処理、内部監査、社内通報の運用責任を決める",
  "比較推奨販売で提示した商品、絞込み理由、推奨理由を記録できる形にする",
  "意向把握の初回、変更、最終確認を同じ顧客・契約に紐づける",
  "募集人、拠点、商品別に未記録・期限超過を確認する月次点検を作る",
  "紙、PDF、Excelに分散している記録の保管場所と検索方法を統一する",
] as const;

export default function AmendmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="INSIGHTS"
        title="2026年6月 改正保険業法のポイントと、代理店が今すべき準備"
        description="顧客本位の業務運営の徹底、意向把握義務の厳格化、推奨理由・代替案比較の記録化。施行までに代理店が整えるべき業務記録の論点を整理します。"
      />
      <article className="section">
        <div className="container-x max-w-[820px]">
          <p className="text-[12px] font-semibold tracking-[0.12em] text-[var(--color-fg-subtle)]">
            最終更新：2026年5月15日
          </p>

          <section className="mt-8 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 md:p-7">
            <h2 className="text-[18px] font-bold leading-[1.55] text-[var(--color-fg)]">
              この記事の要点
            </h2>
            <ul className="mt-4 grid gap-3 text-[14px] leading-[1.9] text-[var(--color-fg)]">
              <li>・令和7年改正保険業法の施行日は、令和8年（2026年）6月1日です。</li>
              <li>・改正の中心は、大規模乗合代理店の体制整備、兼業管理、保険会社側の管理強化、過度な便宜供与禁止です。</li>
              <li>・一方で、代理店実務では比較推奨販売、意向把握、募集記録を後から説明できる状態に整えることが重要になります。</li>
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="h-section">1. 何が変わるのか</h2>
            <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              金融庁の公表資料によると、令和7年改正保険業法は、保険金不正請求事案や保険料調整行為などを背景に、
              保険代理店と保険会社の管理体制をより実効的にする方向で整備されています。特に、一定規模以上の乗合代理店については、
              法令等遵守責任者や統括責任者の設置、苦情処理体制、内部監査・社内通報等の体制整備が主要な論点になります。
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              これは「新しい商品説明を一枚追加すればよい」という話ではありません。誰が、どの顧客に、どの商品を、どの理由で提示し、
              どのような確認を経て契約に至ったのかを、組織として確認・改善できる状態に近づけることが求められます。
            </p>
          </section>
          <section className="mt-14">
            <h2 className="h-section">2. いつから対応が必要か</h2>
            <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              施行日は2026年6月1日です。金融庁は、令和7年改正保険業法に係る政令、内閣府令等、監督指針の適用日について、
              いずれも同日からの施行・適用を公表しています。
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              実務上は、施行日に合わせて帳票だけを差し替えるのでは間に合いません。顧客対応、募集人教育、管理者レビュー、
              苦情対応、内部監査のどこで記録を残すかを先に決め、数週間から数か月の試行期間で現場の入力漏れや検索性を確認しておく必要があります。
            </p>
          </section>
          <section className="mt-14">
            <h2 className="h-section">
              3. 代理店実務で押さえたい3つの記録
            </h2>
            <div className="mt-6 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
              {[
                {
                  title: "顧客本位の確認",
                  body: "顧客の意向、比較した選択肢、推奨理由を同じ流れで確認し、後から説明できる状態にします。",
                },
                {
                  title: "意向把握の継続記録",
                  body: "顧客の当初意向、比較検討、意向変更、最終確認をつなげ、推奨理由を説明できる記録にします。",
                },
                {
                  title: "募集記録の保全",
                  body: "募集人ごとの活動、説明、承認、出力、署名依頼を後から確認できるよう、分散した記録を一元化します。",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--color-bg)] p-5">
                  <h3 className="text-[15px] font-bold leading-[1.5] text-[var(--color-fg)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.85] text-[var(--color-fg-muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] leading-[1.9] text-[var(--color-fg-subtle)]">
              なお、上記は代理店実務で押さえるべき運用論点として整理したものです。令和7年改正保険業法そのものの条文上の中心論点は、
              金融庁公表資料に記載された体制整備義務や過度な便宜供与禁止等です。
            </p>
          </section>
          <section className="mt-14">
            <h2 className="h-section">4. 代理店が6月までにやるべきこと</h2>
            <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              まずは、自社がどの規模・業態に該当するかを確認したうえで、すべてを一度に作り替えるのではなく、
              検査・苦情対応・管理者レビューで説明が必要になる記録から整えていくのが現実的です。
            </p>
            <ul className="mt-6 grid gap-3">
              {PREP_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-[var(--color-border)] pb-3 text-[14px] leading-[1.85] text-[var(--color-fg)] last:border-b-0"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-14">
            <h2 className="h-section">5. HOKENA CRMで対応できること</h2>
            <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              HOKENA CRM は、保険代理店の現場業務を大きく変えずに、記録が残る運用へ移行するためのCRMです。
              意向把握ウィザード、顧客・契約管理、監査ログ、電子署名、レポートを同じ顧客・契約データに紐づけ、
              「入力したのに探せない」「担当者しか経緯が分からない」という状態を減らします。
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              管理者は、募集人別の記録完了率、未対応案件、期限超過、CSV出力履歴を確認できます。これにより、
              施行日直前の一時対応ではなく、月次点検や教育の中で継続的に改善できる体制を作りやすくなります。
            </p>
          </section>
          <section className="mt-14 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 md:p-7">
            <h2 className="text-[18px] font-bold leading-[1.55] text-[var(--color-fg)]">
              6. 免責：本記事は法的助言ではありません
            </h2>
            <p className="mt-4 text-[13.5px] leading-[1.95] text-[var(--color-fg-muted)]">
              本記事は2026年5月15日時点の公開情報に基づく一般的な整理であり、特定の代理店・保険募集人に対する法的助言ではありません。
              最終的な対応要否、対象範囲、帳票・記録の保存方法、監督指針の解釈については、所属保険会社、所管当局、顧問弁護士等にご確認ください。
            </p>
          </section>
          <section className="mt-14 border-t border-[var(--color-border)] pt-8">
            <h2 className="text-[16px] font-bold leading-[1.55] text-[var(--color-fg)]">
              参考資料
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] leading-[1.75] text-[var(--color-primary)] underline underline-offset-4"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
      <FinalCta />
    </>
  );
}
