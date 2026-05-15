"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { HokenaLogo } from "@/components/logo";
import { LinkButton } from "@/components/ui/link-button";

const NAV = [
  { href: "/features", label: "機能" },
  { href: "/pricing", label: "料金・補助金" },
  { href: "/company", label: "運営会社" },
  { href: "/insights/2026-amendment", label: "2026年法改正解説" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="flex h-16 w-full items-center px-5 md:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="HOKENA CRM トップへ"
            className="flex items-center"
          >
            <HokenaLogo className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-7 ml-6 lg:ml-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13.5px] whitespace-nowrap transition-colors ${
                  pathname === item.href
                    ? "text-[var(--color-fg)] font-medium"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LinkButton
              href="/contact"
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex"
            >
              無料相談
            </LinkButton>
            <LinkButton
              href="/contact?type=demo"
              size="sm"
              className="hidden md:inline-flex whitespace-nowrap"
            >
              デモを予約する
            </LinkButton>

            {/* Hamburger button */}
            <button
              type="button"
              aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative grid place-items-center h-9 w-9 rounded-[4px] border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <span
                className={`absolute transition-all duration-200 ${
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                }`}
              >
                <X size={18} strokeWidth={1.8} />
              </span>
              <span
                className={`absolute transition-all duration-200 ${
                  mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                }`}
              >
                <Menu size={18} strokeWidth={1.8} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — fixed overlay, separate from sticky header */}
      {mobileOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            aria-hidden
            className="fixed inset-0 top-16 z-40 bg-[var(--color-fg)]/25 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-x-0 top-16 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-[0_20px_60px_-16px_rgba(12,20,36,0.22)]">

            {/* Nav links */}
            <nav aria-label="モバイルナビゲーション" className="px-5">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center justify-between py-4 text-[14px] border-b border-[var(--color-border)] last:border-0 transition-colors ${
                      active
                        ? "text-[var(--color-primary)] font-semibold"
                        : "text-[var(--color-fg)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className={`shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
                        active
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-fg-subtle)] group-hover:text-[var(--color-primary)]"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA area */}
            <div
              className="px-5 pt-4 pb-6 flex flex-col gap-2.5 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]"
              onClick={() => setMobileOpen(false)}
            >
              <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--color-fg-subtle)] mb-1">
                まず話を聞いてみる
              </p>
              <LinkButton href="/contact?type=demo" className="w-full justify-center">
                デモを予約する
                <ArrowRight size={14} strokeWidth={2} />
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="outline"
                className="w-full justify-center"
              >
                無料相談を申し込む
              </LinkButton>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
