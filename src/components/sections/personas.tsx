import { Building2, Network, Store } from "lucide-react";

const PERSONAS = [
  {
    icon: Store,
    tag: "小規模代理店",
    scale: "募集人 1〜5名",
    title: "社長の記憶とExcelで回してきたが、確認作業が追いつかない",
    issue:
      "意向確認は紙、契約一覧はExcel、面談予定は手帳。何から整えるべきかが見えず、改正対応が後回しになっている。",
    after: [
      "意向把握ウィザードで、面談中にそのまま入力・出力",
      "顧客・契約・面談を1つの画面に集約、紙の二重管理を廃止",
      "Larkで募集人と社長が同じ案件状況を確認",
    ],
  },
  {
    icon: Building2,
    tag: "中規模代理店",
    scale: "募集人 6〜30名",
    title: "汎用CRMを入れたが、保険業務に合わずカスタムが膨らむ",
    issue:
      "Salesforce や kintone をカスタマイズしているが、意向把握書・推奨理由・教育履歴の整合がとれず、検査資料を毎回手で作っている。",
    after: [
      "保険募集に必要な項目で、二重入力を減らす",
      "監査ログを条件指定で抽出し、検査前の準備を短縮",
      "募集人ごとの意向把握実施率を月次レポートで可視化",
    ],
  },
  {
    icon: Network,
    tag: "成長フェーズ",
    scale: "複数拠点・採用拡大中",
    title: "拠点ごとに運用がバラつき、コンプラ統制が効かない",
    issue:
      "拠点長ごとにExcelが違い、教育履歴は本社のファイルサーバ。新規採用が増えるほど、統制状況を把握しにくくなる。",
    after: [
      "全拠点共通フォーマットで意向把握・契約・教育履歴を一元化",
      "拠点・募集人・商品別のダッシュボードで統制状況を即把握",
      "退職募集人の対応履歴も当時の状態で参照可能",
    ],
  },
] as const;

export function Personas() {
  return (
    <section className="section bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">USE CASES</p>
          <h2 className="mt-4 h-section">
            導入相談が多いケース
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            規模や成長段階によって、つまずく場所は異なります。まずは近いケースから、整えるべき範囲を確認してください。
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {PERSONAS.map(({ icon: Icon, ...p }) => (
            <article
              key={p.tag}
              className="card p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-[3px]">
                    {p.tag}
                  </span>
                  <span className="text-[11.5px] text-[var(--color-fg-subtle)] num">
                    {p.scale}
                  </span>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-primary)]">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </div>
              </div>
              <h3 className="mt-4 text-[15.5px] font-bold leading-[1.55] text-[var(--color-fg)]">
                {p.title}
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.85] text-[var(--color-fg-muted)]">
                {p.issue}
              </p>

              <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--color-fg-subtle)]">
                  AFTER
                </p>
                <ul className="mt-3 space-y-2">
                  {p.after.map((line) => (
                    <li
                      key={line}
                      className="text-[12.5px] leading-[1.8] text-[var(--color-fg)] flex gap-2.5"
                    >
                      <span className="mt-2 h-1 w-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
