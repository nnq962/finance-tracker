import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const pageWidths = {
  default: "max-w-5xl",
  narrow: "max-w-2xl",
} as const

type PageShellProps = ComponentProps<"main"> & {
  width?: keyof typeof pageWidths
}

export function PageShell({
  width = "default",
  className,
  ...props
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col gap-6",
        pageWidths[width],
        className
      )}
      {...props}
    />
  )
}

export function PageHeader({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("space-y-1 px-1", className)} {...props} />
}

export function PageTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-heading text-[28px] leading-tight font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function PageDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function PageSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return <section className={cn("min-w-0 space-y-2", className)} {...props} />
}
