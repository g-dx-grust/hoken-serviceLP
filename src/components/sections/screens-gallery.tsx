import { BrowserFrame } from "@/components/browser-frame";

const SCREENS = [
  {
    name: "customers",
    url: "hokena-crm.app/customers",
    title: "顧客管理",
    body: "世帯・契約・面談履歴を顧客単位で時系列に確認",
  },
  {
    name: "calendar",
    url: "hokena-crm.app/calendar",
    title: "面談カレンダー",
    body: "募集人ごとの面談予定と記録状況をカレンダーで管理",
  },
  {
    name: "reports",
    url: "hokena-crm.app/reports",
    title: "レポート",
    body: "活動量、記録完了率、契約推移を月次で確認",
  },
  {
    name: "settlement",
    url: "hokena-crm.app/settlement",
    title: "決算・精算管理",
    body: "保険会社別の手数料CSVを取り込み、精算根拠を残す",
  },
] as const;

export function ScreensGallery() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">SCREENS</p>
          <h2 className="mt-4 h-section">
            画面で確認できる、HOKENA CRM の業務動線
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            毎日の入力・確認・出力を、募集人と管理者が同じ画面で追えるようにしています。
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-7 md:gap-10">
          {SCREENS.map((s) => (
            <article key={s.name}>
              <BrowserFrame
                videoWebm={`/demo/${s.name}.webm`}
                videoMp4={`/demo/${s.name}.mp4`}
                videoPoster={`/demo/${s.name}-poster.jpg`}
                alt={s.title}
                url={s.url}
              />
              <div className="mt-4">
                <h3 className="text-[15px] font-bold text-[var(--color-fg)]">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.85] text-[var(--color-fg-muted)]">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
