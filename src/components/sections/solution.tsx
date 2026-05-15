import { BrowserFrame } from "@/components/browser-frame";
import { ListChecks, ScrollText, FileSignature } from "lucide-react";

const PILLARS = [
  {
    no: "01",
    icon: ListChecks,
    title: ["面談の流れに沿って、", "意向と推奨理由を残す"],
    body: "現状の保障、家族構成、優先順位、代替案の比較を、面談順に入力できます。チェックだけで終わらせず、推奨理由や意向変更の経緯まで顧客・契約に紐づけて保存します。",
    points: [
      "意向確認書面のPDF出力",
      "代替案・推奨理由の記録テンプレート",
      "意向変更履歴をタイムラインで保持",
    ],
    screen: {
      videoWebm: "/demo/intention-wizard.webm",
      videoMp4: "/demo/intention-wizard.mp4",
      videoPoster: "/demo/intention-wizard-poster.jpg",
      url: "hokena-crm.app/intentions/new",
      alt: "意向把握ウィザード画面",
    },
  },
  {
    no: "02",
    icon: ScrollText,
    title: ["監査ログを自動で残し、", "必要な範囲をすぐ出せる"],
    body: "誰が、いつ、どの顧客・契約を作成、編集、閲覧、出力したかを記録します。退職した募集人の対応履歴も追えるため、検査・苦情・相続対応の確認作業を短縮できます。",
    points: [
      "編集・閲覧・出力すべての操作ログ",
      "顧客単位・募集人単位で履歴を抽出",
      "保管期間に対応した長期保全設計",
    ],
    screen: {
      videoWebm: "/demo/contracts.webm",
      videoMp4: "/demo/contracts.mp4",
      videoPoster: "/demo/contracts-poster.jpg",
      url: "hokena-crm.app/contracts",
      alt: "契約管理・履歴保全画面",
    },
  },
  {
    no: "03",
    icon: FileSignature,
    title: ["電子署名で、", "確認書類の回収漏れを減らす"],
    body: "意向確認書や申込書類の署名依頼、署名時刻、端末情報を記録できます。店頭でのタブレット署名だけでなく、来店前後のリモート署名にも対応し、紙の回収・スキャン作業を減らします。",
    points: [
      "署名証跡の改ざん検知ハッシュ",
      "リモート署名（メール/SMS送信）",
      "チャット・メールでの署名依頼通知",
    ],
    screen: {
      videoWebm: "/demo/intentions.webm",
      videoMp4: "/demo/intentions.mp4",
      videoPoster: "/demo/intentions-poster.jpg",
      url: "hokena-crm.app/intentions",
      alt: "意向確認・電子署名画面",
    },
  },
] as const;

export function Solution() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="max-w-[780px]">
          <p className="eyebrow">SOLUTION</p>
          <h2 className="mt-4 h-section">
            HOKENA CRM が整える、3つの募集記録
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            現場の面談フローは大きく変えずに、属人的になりやすい「意向把握・推奨理由・募集記録」を
            顧客・契約データとして残せるようにします。
          </p>
        </div>

        <div className="mt-14 space-y-20 md:space-y-28">
          {PILLARS.map(({ no, icon: Icon, title, body, points, screen }, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={no}
                className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                <div
                  className={`md:col-span-5 min-w-0 ${reverse ? "md:order-2" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="num text-[13px] font-semibold text-[var(--color-primary)] tracking-wider">
                      {no}
                    </span>
                    <span className="h-px w-10 bg-[var(--color-border-strong)]" />
                  </div>
                  <Icon
                    size={26}
                    strokeWidth={1.4}
                    className="mt-5 text-[var(--color-primary)]"
                  />
                  <h3 className="mt-5 text-[20px] md:text-[22px] font-bold leading-[1.5] text-[var(--color-fg)]">
                    {title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.95] text-[var(--color-fg-muted)]">
                    {body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-l border-[var(--color-border-strong)] pl-5">
                    {points.map((p) => (
                      <li
                        key={p}
                        className="text-[13px] leading-[1.8] text-[var(--color-fg)]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`md:col-span-7 min-w-0 ${reverse ? "md:order-1" : ""}`}
                >
                  <BrowserFrame
                    videoWebm={screen.videoWebm}
                    videoMp4={screen.videoMp4}
                    videoPoster={screen.videoPoster}
                    alt={screen.alt}
                    url={screen.url}
                  />
                  <p className="mt-3 text-[11.5px] text-[var(--color-fg-subtle)]">
                    {screen.alt} ／ デモ動画
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
