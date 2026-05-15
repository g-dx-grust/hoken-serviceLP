const FAQS = [
  {
    q: "改正保険業法の施行までに本当に間に合いますか？",
    a: "標準構成であれば、初回相談から最短2週間で運用開始できるケースがあります。補助金申請を併用する場合は締切・交付決定に合わせた調整が必要なため、まず現在の記録状況と導入範囲を確認します。",
  },
  {
    q: "既存のExcelや他CRMからのデータ移行はできますか？",
    a: "顧客台帳・契約一覧・面談履歴のExcel移行に対応しています。汎用CRM（Salesforce, kintone, HubSpot 等）はCSVエクスポートをもとに移行範囲を確認します。初期データ移行は導入支援に含まれます。",
  },
  {
    q: "意向把握書面の様式は、当社独自のものを使いたいのですが",
    a: "標準テンプレートに加え、貴社の様式に合わせたカスタムテンプレートを作成できます。所属する保険会社が指定する様式がある場合も対応します。",
  },
  {
    q: "監査ログはどのくらいの期間保管されますか？",
    a: "標準では7年保管を前提に設計しています。より長い保管期間が必要な場合はオプションで調整できます。退職した募集人の対応履歴も、当時の状態のまま参照できます。",
  },
  {
    q: "Lark を使っていない代理店でも導入できますか？",
    a: "はい。Lark連携はオプションで、メール通知・ブラウザ通知のみでもご利用いただけます。Google Workspace との連携にも対応しています。",
  },
  {
    q: "補助金の申請は自社で行う必要がありますか？",
    a: "制度の選定、対象経費の整理、申請に必要な導入計画の作成を支援します。業務改善助成金など労務要件が関わる制度は、必要に応じて専門家の確認をご案内します。",
  },
];

export function Faq() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 h-section">よくある質問</h2>
        </div>

        <div className="mt-10 max-w-[860px] divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                <span className="text-[14.5px] font-semibold text-[var(--color-fg)] leading-[1.6]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 w-5 h-5 inline-flex items-center justify-center text-[var(--color-fg-muted)] group-open:rotate-45 transition-transform"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[13.5px] leading-[1.95] text-[var(--color-fg-muted)] pr-12">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
