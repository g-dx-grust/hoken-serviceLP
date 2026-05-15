import {
  Users,
  ClipboardCheck,
  FileText,
  CalendarDays,
  Calculator,
  BarChart3,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "顧客管理",
    body: "世帯・契約・面談履歴を顧客単位で整理。家族構成や既契約も同じ画面で確認。",
  },
  {
    icon: ClipboardCheck,
    title: "意向把握ウィザード",
    body: "現状把握から推奨理由まで面談順に入力。比較・変更の経緯も記録。",
  },
  {
    icon: FileText,
    title: "契約・申込管理",
    body: "申込から成立・継続・解約までを管理。書類アップロードと電子署名に対応。",
  },
  {
    icon: CalendarDays,
    title: "面談カレンダー",
    body: "募集人ごとの予定と記録状況を可視化。Lark/Googleカレンダーと連携。",
  },
  {
    icon: Calculator,
    title: "決算・精算管理",
    body: "保険会社別の手数料CSVを取り込み、募集人別・代理店別の精算明細を作成。",
  },
  {
    icon: BarChart3,
    title: "レポート",
    body: "活動量、意向把握の完了率、契約推移を月次で確認。",
  },
  {
    icon: ShieldCheck,
    title: "監査ログ",
    body: "全操作・全閲覧を記録。期間・利用者・対象を絞ってCSV出力可能。",
  },
  {
    icon: MessageSquare,
    title: "SaaS連携",
    body: "面談リマインド、署名依頼、承認通知を普段使いのチャットへ通知。",
  },
] as const;

export function FeaturesGrid() {
  return (
    <section className="section bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
      <div className="container-x">
        <div className="max-w-[760px]">
          <p className="eyebrow">FEATURES</p>
          <h2 className="mt-4 h-section">
            保険代理店の毎日に必要な機能だけを、迷わず使える粒度で。
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            入力、確認、承認、出力までを同じ流れにまとめ、現場の二重入力と管理者の確認作業を減らします。
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[var(--color-bg)] p-6">
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-[var(--color-primary)]"
              />
              <h3 className="mt-4 text-[14.5px] font-semibold text-[var(--color-fg)]">
                {title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.85] text-[var(--color-fg-muted)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
