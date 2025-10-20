import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionTone = "default" | "muted" | "accent"

interface PageSectionProps {
  title?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  align?: "start" | "center"
  tone?: SectionTone
  id?: string
  className?: string
  children: ReactNode
}

const toneClassMap: Record<SectionTone, string> = {
  default: "bg-transparent",
  muted: "bg-gradient-to-br from-background/70 via-muted/40 to-background/70",
  accent: "bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10",
}

export function PageSection({
  title,
  description,
  eyebrow,
  align = "start",
  tone = "default",
  id,
  className,
  children,
}: PageSectionProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left"

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 md:py-20",
        toneClassMap[tone],
        className,
      )}
    >
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.2),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_70%)]" />
      </div>

      <div className="container relative z-10">
        {(title || description || eyebrow) && (
          <div className={cn("max-w-3xl space-y-4 mb-12", alignment)}>
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                <span className="bg-gradient-to-r from-foreground via-primary/60 to-foreground bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
