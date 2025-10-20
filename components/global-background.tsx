export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" aria-hidden />
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.18) 0, transparent 55%), radial-gradient(circle at 80% 10%, rgba(236, 72, 153, 0.16) 0, transparent 50%), radial-gradient(circle at 10% 80%, rgba(34, 197, 94, 0.18) 0, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0,rgba(255,255,255,0.08)_40%,transparent_75%)] mix-blend-overlay" aria-hidden />
      <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 right-[10%] h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="absolute top-1/3 left-[15%] h-[18rem] w-[18rem] rounded-full bg-secondary/20 blur-[120px]" aria-hidden />
    </div>
  )
}
