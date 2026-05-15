import { Check, Minus, X } from "lucide-react";

const ROWS: {
  label: string;
  excel: "ok" | "partial" | "ng";
  generic: "ok" | "partial" | "ng";
  hokena: "ok" | "partial" | "ng";
  note?: string;
}[] = [
  {
    label: "意向把握プロセスの構造化記録",
    excel: "ng",
    generic: "partial",
    hokena: "ok",
  },
  {
    label: "推奨理由・代替案比較の一元管理",
    excel: "ng",
    generic: "ng",
    hokena: "ok",
  },
  {
    label: "電子署名・本人確認の組み込み",
    excel: "ng",
    generic: "partial",
    hokena: "ok",
    note: "標準機能で運用可能",
  },
  {
    label: "募集人ごとの教育・コンプラ履歴",
    excel: "partial",
    generic: "partial",
    hokena: "ok",
  },
  {
    label: "監査ログの長期保全",
    excel: "ng",
    generic: "partial",
    hokena: "ok",
  },
  {
    label: "保険会社の手数料CSV取込・精算",
    excel: "partial",
    generic: "ng",
    hokena: "ok",
    note: "主要フォーマットに対応",
  },
  {
    label: "Lark / メールでの業務通知",
    excel: "ng",
    generic: "partial",
    hokena: "ok",
  },
  {
    label: "導入・運用の習得難易度",
    excel: "ok",
    generic: "ng",
    hokena: "partial",
    note: "初期2週間の伴走付き",
  },
];

function Mark({ value }: { value: "ok" | "partial" | "ng" }) {
  if (value === "ok") {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
        aria-label="対応"
      >
        <Check size={13} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)]"
        aria-label="一部対応"
      >
        <Minus size={13} strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-muted)] text-[var(--color-fg-subtle)]"
      aria-label="非対応"
    >
      <X size={13} strokeWidth={2.5} />
    </span>
  );
}

export function Comparison() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">COMPARISON</p>
          <h2 className="mt-4 h-section">
            Excel運用、汎用CRM、HOKENA CRM の違い
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            既存の運用で残る手作業と、HOKENA CRM で一元化できる範囲を整理しました。
          </p>
        </div>

        <div className="mt-12 overflow-x-auto border border-[var(--color-border)] rounded-[6px]">
          <table className="w-full text-[13.5px] num">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                <th
                  scope="col"
                  className="text-left p-4 font-semibold text-[12px] tracking-[0.08em] text-[var(--color-fg-subtle)]"
                >
                  項目
                </th>
                <th
                  scope="col"
                  className="text-center p-4 font-semibold text-[13px] text-[var(--color-fg-muted)] min-w-[120px]"
                >
                  Excel・紙
                </th>
                <th
                  scope="col"
                  className="text-center p-4 font-semibold text-[13px] text-[var(--color-fg-muted)] min-w-[120px]"
                >
                  汎用CRM
                </th>
                <th
                  scope="col"
                  className="text-center p-4 font-semibold text-[13px] text-[var(--color-primary)] bg-[var(--color-bg)] min-w-[140px]"
                >
                  HOKENA CRM
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-[var(--color-bg)]" : "bg-[var(--color-bg-subtle)]/40"}
                >
                  <td className="p-4 text-[var(--color-fg)] border-b border-[var(--color-border)]">
                    <div className="font-medium">{row.label}</div>
                    {row.note && (
                      <div className="mt-1 text-[11.5px] text-[var(--color-fg-subtle)]">
                        {row.note}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center border-b border-[var(--color-border)]">
                    <Mark value={row.excel} />
                  </td>
                  <td className="p-4 text-center border-b border-[var(--color-border)]">
                    <Mark value={row.generic} />
                  </td>
                  <td className="p-4 text-center border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                    <Mark value={row.hokena} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[12px] text-[var(--color-fg-subtle)]">
          ※ 上記は2026年5月時点の各種一般的なツール・運用との比較を示すものであり、特定製品との優劣を断定するものではありません。
        </p>
      </div>
    </section>
  );
}
