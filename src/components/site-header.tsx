import Link from "next/link";
import { HokenaLogo } from "@/components/logo";
import { LinkButton } from "@/components/ui/link-button";

const NAV = [
  { href: "/features", label: "機能" },
  { href: "/pricing", label: "料金・補助金" },
  { href: "/company", label: "運営会社" },
  { href: "/insights/2026-amendment", label: "2026年法改正解説" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-border)]">
      <div className="flex h-16 w-full items-center px-5 md:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="HOKENA CRM トップへ"
          className="flex items-center"
        >
          <HokenaLogo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 ml-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LinkButton href="/contact" variant="outline" size="sm">
            無料相談
          </LinkButton>
          <LinkButton href="/contact?type=demo" size="sm" className="hidden sm:inline-flex">
            デモを予約する
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
