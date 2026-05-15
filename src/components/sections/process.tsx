const STEPS = [
  {
    no: "01",
    title: "無料相談（30分）",
    body: "現状の業務フロー、記録の保管場所、改正対応の課題を確認。HOKENA CRM で解決できる範囲を率直にお伝えします。",
  },
  {
    no: "02",
    title: "オンラインデモ（60分）",
    body: "代理店の規模・業態に近い流れで、意向把握ウィザードから監査ログ、精算までをご覧いただきます。",
  },
  {
    no: "03",
    title: "トライアル環境（最大4週間）",
    body: "実務に近いデータで操作し、現場が入力できるかを確認。補助金を使う場合は申請準備も並行します。",
  },
  {
    no: "04",
    title: "本番導入・データ移行",
    body: "既存のExcel・CRMからの移行を伴走支援。運用開始直後はチャットと定例で定着を支えます。",
  },
] as const;

export function Process() {
  return (
    <section className="section bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">PROCESS</p>
          <h2 className="mt-4 h-section">
            導入の流れ
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            ご相談から運用開始まで、標準構成なら最短2週間。補助金活用の場合は締切・交付決定のスケジュールに合わせて調整します。
          </p>
        </div>

        <ol className="mt-12 grid md:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {STEPS.map((s) => (
            <li key={s.no} className="bg-[var(--color-bg)] p-6">
              <div className="flex items-baseline gap-3">
                <span className="num text-[13px] font-semibold text-[var(--color-primary)] tracking-wider">
                  STEP {s.no}
                </span>
                <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
              </div>
              <h3 className="mt-5 text-[15px] font-bold text-[var(--color-fg)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.85] text-[var(--color-fg-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
