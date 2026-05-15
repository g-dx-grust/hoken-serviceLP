import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "運営会社",
  description: "HOKENA CRM を提供する株式会社グラスト（GRUST.inc）について。",
};

const COMPANY_INFO = [
  { label: "会社名", value: "株式会社グラスト（GRUST.inc）" },
  { label: "代表者", value: "山岡 純也" },
  { label: "設立", value: "2020年4月" },
  { label: "本社所在地", value: "〒460-0017 愛知県名古屋市中区松原3丁目2-8 MATSUBARA 328 Building 5F" },
  { label: "TEL / FAX", value: "052-715-4177 / 052-715-4188" },
  { label: "メール", value: "info@n-grust.co.jp" },
  { label: "ウェブサイト", value: "https://grust.jp" },
  { label: "事業内容", value: "業務システムの企画・開発・運用、DX推進支援" },
  { label: "提供プロダクト・サービス", value: "G-DX / Lark導入支援 / HOKENA CRM" },
  { label: "お問い合わせ", value: "本サイトお問い合わせフォームよりご連絡ください" },
];

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="COMPANY"
        title="運営会社"
        description="HOKENA CRM は、株式会社グラスト（GRUST.inc）が企画・開発・運用しています。"
      />

      <section className="section">
        <div className="container-x max-w-[860px]">
          <div className="card">
            <dl className="divide-y divide-[var(--color-border)]">
              {COMPANY_INFO.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 px-6 py-5"
                >
                  <dt className="text-[12.5px] font-semibold tracking-wide text-[var(--color-fg-subtle)]">
                    {row.label}
                  </dt>
                  <dd className="md:col-span-3 text-[14px] text-[var(--color-fg)]">
                    {row.value.startsWith("https://") ? (
                      <a
                        href={row.value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        {row.value.replace("https://", "")}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="policy" className="mt-16 scroll-mt-24">
            <h2 className="h-section">プライバシーポリシー</h2>
            <p className="mt-4 text-[14px] leading-[1.95] text-[var(--color-fg-muted)]">
              お問い合わせ時に取得した会社名、氏名、連絡先、相談内容は、HOKENA CRM に関するご連絡、
              資料送付、導入相談、サービス改善の目的で利用します。本人の同意なく第三者へ提供することはありません。
              開示・訂正・利用停止等をご希望の場合は、上記メールアドレスまでご連絡ください。
            </p>
          </div>

          <div id="terms" className="mt-12 scroll-mt-24">
            <h2 className="h-section">利用規約</h2>
            <p className="mt-4 text-[14px] leading-[1.95] text-[var(--color-fg-muted)]">
              HOKENA CRM サービスの利用規約は、ご契約時に別途締結する利用契約書に定めるところによります。
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
