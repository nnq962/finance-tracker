import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function SlidingIndicator({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 opacity-0 transition-[transform,width,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}
