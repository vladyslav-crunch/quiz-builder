export function ErrorState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 bg-white/6 p-8 text-white/80 shadow-glow backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-white/40">Error</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-4 leading-7 text-white/65">{message}</p>
    </div>
  );
}
