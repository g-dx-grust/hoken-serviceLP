type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="container-x py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 h-display">{title}</h1>
        {description && (
          <p className="mt-5 max-w-[720px] text-[14.5px] leading-[1.95] text-[var(--color-fg-muted)]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
