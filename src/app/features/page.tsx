import type { Metadata } from "next";
import {
  BarChart3,
  CalendarDays,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { BrowserFrame } from "@/components/browser-frame";
import { PageHeader } from "@/components/page-header";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { Solution } from "@/components/sections/solution";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "機能",
  description:
    "意向把握ウィザード、契約管理、監査ログ、チャット通知など、保険代理店の募集記録を一元化する機能を紹介します。",
};

const FEATURE_DETAILS = [
  {
    icon: Users,
    title: "顧客管理",
    lead: "世帯・契約・面談履歴を顧客単位でまとめ、募集人が次に確認すべき情報を同じ画面で追えるようにします。",
    screen: "/screens/customers.png",
    url: "hokena-crm.app/customers",
    points: [
      "家族構成、既契約、面談履歴を時系列で整理",
      "顧客ごとの未対応タスクや更新期限を一覧化",
      "退職した募集人の対応履歴も引き継ぎ可能",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "意向把握ウィザード",
    lead: "面談中に質問、比較、推奨理由を順番に入力でき、後から管理者が確認できる記録として残します。",
    screen: "/screens/intention-wizard.png",
    url: "hokena-crm.app/intentions/new",
    points: [
      "現状把握から最終意向までをガイド形式で入力",
      "推奨理由、代替案、意向変更の理由を構造化",
      "面談後のPDF出力と電子署名フローへ接続",
    ],
  },
  {
    icon: FileText,
    title: "契約・申込管理",
    lead: "申込、成立、継続、解約までの状態を統一し、書類と対応履歴を契約単位で管理します。",
    screen: "/screens/contracts.png",
    url: "hokena-crm.app/contracts",
    points: [
      "保険会社、商品、募集人、ステータスで絞り込み",
      "申込書、意向確認書、本人確認資料を契約に添付",
      "更新・保全・解約の対応漏れを期限で検知",
    ],
  },
  {
    icon: CalendarDays,
    title: "面談カレンダー",
    lead: "募集人ごとの面談予定と実施履歴をつなぎ、予定だけで終わらない営業活動管理にします。",
    screen: "/screens/calendar.png",
    url: "hokena-crm.app/calendar",
    points: [
      "顧客、案件、意向把握記録を予定へ紐づけ",
      "Lark、Google カレンダーとの連携に対応",
      "面談後の未記録案件を管理者が確認",
    ],
  },
  {
    icon: Calculator,
    title: "決算・精算管理",
    lead: "保険会社ごとの手数料CSVを取り込み、募集人別・代理店別の精算明細を作成します。",
    screen: "/screens/settlement.png",
    url: "hokena-crm.app/settlement",
    points: [
      "保険会社別のCSV形式差分を取込設定で吸収",
      "募集人別、拠点別、商品別の手数料を集計",
      "精算根拠を契約データと照合できる状態で保管",
    ],
  },
  {
    icon: BarChart3,
    title: "レポート",
    lead: "活動量、意向把握の実施率、契約推移を月次で可視化し、属人的な感覚から管理指標へ移します。",
    screen: "/screens/reports.png",
    url: "hokena-crm.app/reports",
    points: [
      "募集人別の面談数、記録完了率、契約件数を表示",
      "未対応、期限超過、書類不足の件数を追跡",
      "月次会議や検査前確認に使えるCSV出力",
    ],
  },
  {
    icon: ShieldCheck,
    title: "監査ログ",
    lead: "閲覧、編集、出力、署名依頼などの操作を記録し、期間・利用者・対象で絞り込めるようにします。持ち出し記録簿への登録も確認できます。",
    screen: "/screens/carry-out-logs.png",
    url: "hokena-crm.app/carry-out-logs",
    points: [
      "誰が、いつ、どの顧客・契約を操作したかを保存",
      "管理者権限の操作やCSV出力もログ対象に含める設計",
      "検査・苦情対応時に必要な範囲を抽出",
    ],
  },
  {
    icon: MessageSquare,
    title: "SaaS連携",
    lead: "Larkをはじめとする業務SaaSとつなぎ、面談リマインドや承認依頼、署名依頼をチャット通知に乗せて確認漏れを減らします。",
    screen: "/screens/lark.png",
    url: "hokena-crm.app/lark",
    points: [
      "Lark / Slack / Teams など普段使いのチャットに通知を出し分け",
      "承認待ち、署名待ち、期限超過をチャットで通知",
      "通知先や承認ルートを運用に合わせて管理",
    ],
  },
] as const;

function FeatureDetailSections() {
  return (
    <section className="border-y border-[var(--color-border)]">
      {FEATURE_DETAILS.map(({ icon: Icon, ...feature }, index) => (
        <div
          key={feature.title}
          className={
            index % 2 === 0
              ? "bg-[var(--color-bg)]"
              : "bg-[var(--color-bg-subtle)]"
          }
        >
          <div
            className={`container-x grid gap-10 py-16 md:py-20 md:grid-cols-2 md:items-center lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] ${
              index > 0 ? "border-t border-[var(--color-border)]" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "md:order-2 min-w-0" : "min-w-0"}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-primary)]">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="text-[12px] font-semibold tracking-[0.14em] text-[var(--color-primary)]">
                  FEATURE {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="mt-6 h-section">{feature.title}</h2>
              <p className="mt-5 text-[14px] leading-[1.95] text-[var(--color-fg-muted)]">
                {feature.lead}
              </p>
              <ul className="mt-7 grid gap-3">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[13.5px] leading-[1.85] text-[var(--color-fg)]"
                  >
                    <CheckCircle2
                      size={17}
                      strokeWidth={1.8}
                      className="mt-[5px] shrink-0 text-[var(--color-success)]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={index % 2 === 1 ? "md:order-1 min-w-0" : "min-w-0"}>
              <BrowserFrame
                src={feature.screen}
                alt={`${feature.title}の画面`}
                url={feature.url}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="FEATURES"
        title="保険業務に最適化された、迷わない機能群"
        description="意向把握、契約、署名、監査ログ、精算までを同じ顧客・契約データにつなげます。二重入力を減らし、管理者が後から確認できる状態を作ります。"
      />
      <Solution />
      <FeaturesGrid />
      <FeatureDetailSections />
      <FinalCta />
    </>
  );
}
