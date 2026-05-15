import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hokena-crm.jp"),
  title: {
    default: "HOKENA CRM｜保険代理店の募集記録・監査対応CRM",
    template: "%s｜HOKENA CRM",
  },
  description:
    "意向把握、推奨理由、契約書類、監査ログを顧客・契約単位で一元管理。2026年6月施行の改正保険業法に向けた体制整備を支援します。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "HOKENA CRM",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
