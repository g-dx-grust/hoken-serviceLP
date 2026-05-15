import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "お問い合わせ・無料相談",
  description:
    "HOKENA CRM の無料相談、オンラインデモ、補助金活用相談を受け付けています。",
};

const SCALES = [
  "1〜5名",
  "6〜10名",
  "11〜30名",
  "31〜100名",
  "100名以上",
] as const;

const TOPICS = [
  { value: "demo", label: "オンラインデモを希望" },
  { value: "consult", label: "無料相談を希望" },
  { value: "subsidy", label: "補助金活用について相談したい" },
  { value: "document", label: "サービス資料を請求したい" },
  { value: "other", label: "その他" },
] as const;

const CONTACT_EMAIL = "g-dx-hokena@n-grust.co.jp";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=HOKENA%20CRM%20inquiry`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="無料相談・オンラインデモのお申し込み"
        description="現在の記録方法や導入時期を伺い、改正対応に向けて優先すべき範囲を整理します。通常2営業日以内に担当者よりご連絡します。"
      />

      <section className="section">
        <div className="container-x max-w-[820px]">
          <form
            action={CONTACT_MAILTO}
            method="post"
            encType="text/plain"
            className="card p-7 md:p-10 space-y-7"
          >
            <input type="hidden" name="service" value="HOKENA CRM" />
            <Field label="ご相談内容" required>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {TOPICS.map((t) => (
                  <label
                    key={t.value}
                    className="flex items-center gap-2.5 px-4 py-3 border border-[var(--color-border)] rounded-[4px] cursor-pointer hover:bg-[var(--color-bg-subtle)] has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-bg-subtle)]"
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.value}
                      defaultChecked={t.value === "demo"}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="text-[13.5px] text-[var(--color-fg)]">
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="会社名 / 代理店名" required>
                <Input name="company" placeholder="例) 株式会社〇〇保険代理店" />
              </Field>
              <Field label="代理店規模" required>
                <Select name="scale" defaultValue="">
                  <option value="" disabled>
                    選択してください
                  </option>
                  {SCALES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="ご担当者名" required>
                <Input name="name" placeholder="例) 山田 太郎" />
              </Field>
              <Field label="役職">
                <Input name="role" placeholder="例) 代表取締役 / コンプライアンス担当" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="メールアドレス" required>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@your-company.co.jp"
                />
              </Field>
              <Field label="電話番号">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="例) 03-0000-0000"
                />
              </Field>
            </div>

            <Field label="ご相談内容詳細（任意）">
              <textarea
                name="message"
                rows={5}
                placeholder="現在の管理方法、改正対応で不安な点、デモ希望日時などをご記入ください。"
                className="w-full px-3.5 py-3 text-[14px] bg-[var(--color-bg)] border border-[var(--color-border-strong)] rounded-[4px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]"
              />
            </Field>

            <label className="flex items-start gap-3 text-[12.5px] text-[var(--color-fg-muted)] leading-[1.7]">
              <input
                type="checkbox"
                required
                className="mt-1 accent-[var(--color-primary)]"
              />
              <span>
                プライバシーポリシーに同意のうえ、問い合わせ内容を送信します。ご記入いただいた情報は、本件のご連絡およびサービス改善目的にのみ利用します。
              </span>
            </label>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full md:w-auto md:min-w-[280px]">
                入力内容をメールで送る
              </Button>
              <p className="mt-3 text-[12px] leading-[1.75] text-[var(--color-fg-subtle)]">
                メールソフトが開かない場合は、件名を「HOKENA CRM 相談」として
                <a
                  href={CONTACT_MAILTO}
                  className="mx-1 text-[var(--color-primary)] underline underline-offset-4"
                >
                  {CONTACT_EMAIL}
                </a>
                へご連絡ください。お急ぎの場合は 052-715-4177（平日 9:30 - 18:30）までお電話ください。
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block mb-2 text-[12.5px] font-semibold text-[var(--color-fg)]">
        {label}
        {required && (
          <span className="ml-1.5 text-[10px] font-bold tracking-wider text-[var(--color-danger)] align-middle">
            必須
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-11 px-3.5 text-[14px] bg-[var(--color-bg)] border border-[var(--color-border-strong)] rounded-[4px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]"
    />
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
  },
) {
  return (
    <select
      {...props}
      className="w-full h-11 px-3.5 text-[14px] bg-[var(--color-bg)] border border-[var(--color-border-strong)] rounded-[4px] text-[var(--color-fg)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring)]"
    >
      {props.children}
    </select>
  );
}
