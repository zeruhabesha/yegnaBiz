import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type HeroPattern = "grid" | "aurora" | "none"

interface PageHeroProps {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  actions?: ReactNode
  align?: "start" | "center"
  backgroundImage?: string
  pattern?: HeroPattern
  className?: string
}

const patternClassMap: Record<HeroPattern, string> = {
  none: "",
  grid: "bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0,_rgba(255,255,255,0)_60%)]",
  aurora:
    "bg-[radial-gradient(circle_at_20%_30%,rgba(79,70,229,0.25),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.25),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.22),transparent_60%)]",
}

export function PageHero({
  title,
  description,
  eyebrow,
  actions,
  align = "center",
  backgroundImage,
  pattern = "aurora",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 md:py-24 border-b border-white/5",
        backgroundImage ? "" : "bg-gradient-to-br from-primary/10 via-background to-secondary/10",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-70",
          patternClassMap[pattern],
          backgroundImage && "bg-cover bg-center",
        )}
        style={backgroundImage ? { backgroundImage: `linear-gradient(120deg, rgba(10, 10, 25, 0.8), rgba(10, 10, 25, 0.6)), url('${backgroundImage}')` } : undefined}
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/60 to-background/70 backdrop-blur-md" aria-hidden />

      <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 right-1/5 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <div className="container relative z-10">
        <div
          className={cn(
            "mx-auto max-w-4xl space-y-6",
            align === "center" ? "text-center" : "text-left",
          )}
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
              {eyebrow}
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent">{title}</span>
            </h1>
            {description && (
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">{description}</p>
            )}
          </div>

          {actions && <div className={cn("flex flex-wrap gap-4", align === "center" ? "justify-center" : "justify-start")}>{actions}</div>}
        </div>
      </div>
    </section>
  )
}
