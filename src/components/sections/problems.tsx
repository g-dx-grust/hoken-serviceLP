import { AlertTriangle, FileWarning, ClipboardX } from "lucide-react";

const ITEMS = [
  {
    icon: AlertTriangle,
    title: ["面談メモだけでは、", "推奨理由を説明しきれない"],
    body: "商品を提示した理由、比較した代替案、顧客の意向が変わった経緯。検査や苦情対応で確認されるのは、結果だけでなくそこに至るプロセスです。Excel・口頭・記憶に頼るほど、後から説明する負担が大きくなります。",
  },
  {
    icon: FileWarning,
    title: ["汎用CRMでは、", "保険募集の記録が分断される"],
    body: "Salesforce や HubSpot は営業管理には強くても、意向把握書面・推奨理由・募集人ごとの教育履歴まで自然につながるとは限りません。現場は二重入力になり、管理者は監査資料を手作業で集めることになります。",
  },
  {
    icon: ClipboardX,
    title: ["紙・PDF・Excelの混在は、", "探せないリスクになる"],
    body: "意向確認書は紙、契約一覧はExcel、教育履歴はファイルサーバ。記録が分かれているほど、必要な時に必要な範囲を出せません。退職した募集人の対応履歴も含め、顧客・契約単位で追える状態が必要です。",
  },
] as const;

export function Problems() {
  return (
    <section className="section bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">CHALLENGES</p>
          <h2 className="mt-4 h-section">
            <span className="block">6月までに、募集記録を</span>
            <span className="block">
              「後から説明できる形」へ変える<span className="inline-block">必要があります</span>
            </span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            代理店に求められるのは
            「やっています」という口頭説明ではなく、いつ・誰が・何を比較し・なぜ推奨したかを
            <strong className="text-[var(--color-fg)] font-semibold">第三者が後から追える状態</strong>
            にすることです。多くの代理店が、ここで作業負荷と記録漏れに悩んでいます。
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title.join("")} className="bg-[var(--color-bg)] p-7 md:p-8">
              <Icon size={22} className="text-[var(--color-primary)]" strokeWidth={1.6} />
              <h3 className="mt-5 text-[16px] font-bold leading-[1.55] text-[var(--color-fg)]">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.9] text-[var(--color-fg-muted)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
