import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="bg-[var(--color-primary)] text-[var(--color-primary-fg)]">
      <div className="container-x py-20 md:py-24 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[var(--color-accent-soft)]">
            BEFORE JUNE 2026
          </p>
          <h2 className="mt-4 text-[28px] md:text-[36px] leading-[1.45] font-bold">
            <span className="block">面談の記憶ではなく、</span>
            <span className="block">説明できる記録が残る</span>
            <span className="block">代理店運営へ。</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.95] text-white/80 max-w-[620px]">
            導入相談・オンラインデモは無料です。現在の記録方法を伺ったうえで、
            6月までに優先して整えるべき範囲と進め方をご提案します。
          </p>
        </div>
        <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
          <LinkButton
            href="/contact?type=demo"
            size="lg"
            className="bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-subtle)]"
          >
            オンラインデモを予約する
            <ArrowRight size={16} />
          </LinkButton>
          <LinkButton
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/10"
          >
            まず無料相談から
          </LinkButton>
          <p className="text-[12px] text-white/60 mt-1">
            営業時間：平日 9:30 - 18:30 ／ 通常2営業日以内に返信
          </p>
        </div>
      </div>
    </section>
  );
}
