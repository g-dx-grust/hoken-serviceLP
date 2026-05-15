import Link from "next/link";
import { HokenaLogo } from "@/components/logo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "プロダクト",
    links: [
      { href: "/features", label: "機能一覧" },
      { href: "/pricing", label: "料金・補助金" },
      { href: "/insights/2026-amendment", label: "2026年法改正解説" },
    ],
  },
  {
    title: "サポート",
    links: [
      { href: "/contact", label: "無料相談" },
      { href: "/contact?type=demo", label: "オンラインデモ予約" },
      { href: "/contact?type=document", label: "資料請求" },
    ],
  },
  {
    title: "運営",
    links: [
      { href: "/company", label: "運営会社" },
      { href: "/company#policy", label: "プライバシーポリシー" },
      { href: "/company#terms", label: "利用規約" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <HokenaLogo className="h-8 w-auto" />
            <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--color-fg-muted)]">
              保険代理店のための募集記録・監査対応CRM。<br />
              意向把握、推奨理由、署名証跡を顧客・契約単位で管理。
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-semibold tracking-[0.12em] text-[var(--color-fg-subtle)]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-[var(--color-fg)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[12px] text-[var(--color-fg-subtle)]">
            © {new Date().getFullYear()} 株式会社グラスト（GRUST.inc） All Rights Reserved.
          </p>
          <p className="text-[12px] text-[var(--color-fg-subtle)]">
            お問い合わせ: info@n-grust.co.jp / 052-715-4177
          </p>
        </div>
      </div>
    </footer>
  );
}
