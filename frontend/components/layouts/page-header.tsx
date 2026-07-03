export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
        {label}
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-white/65">{description}</p>
    </div>
  );
}
