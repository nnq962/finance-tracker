"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"
import {
  ArrowLeftRightIcon,
  ChartNoAxesCombinedIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  WalletCardsIcon,
  type LucideIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    label: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Tài khoản",
    href: "/accounts",
    icon: WalletCardsIcon,
  },
  {
    label: "Giao dịch",
    href: "/transactions",
    icon: ArrowLeftRightIcon,
  },
  {
    label: "Báo cáo",
    href: "/reports",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    label: "Cài đặt",
    href: "/settings",
    icon: Settings2Icon,
  },
]

const springTransition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.65,
} as const

export function MobileBottomNav() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const navRef = useRef<HTMLDivElement>(null)
  const [activePill, setActivePill] = useState<{
    x: number
    width: number
  } | null>(null)
  const matchedIndex = navItems.findIndex(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`)
  )
  const activeIndex = matchedIndex === -1 ? 0 : matchedIndex

  useLayoutEffect(() => {
    const nav = navRef.current
    const activeItem = nav?.querySelector<HTMLElement>(
      `[data-nav-index="${activeIndex}"]`
    )

    if (!nav || !activeItem) return

    const updatePillPosition = () => {
      setActivePill({
        x: activeItem.offsetLeft + 4,
        width: activeItem.offsetWidth - 8,
      })
    }

    updatePillPosition()

    const resizeObserver = new ResizeObserver(updatePillPosition)
    resizeObserver.observe(nav)

    return () => resizeObserver.disconnect()
  }, [activeIndex])

  return (
    <nav
      aria-label="Điều hướng chính"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div
        ref={navRef}
        className="pointer-events-auto relative mx-auto grid w-full max-w-md grid-cols-5 gap-1 rounded-[1.75rem] border border-border/70 bg-background/90 p-1.5 shadow-[0_-4px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75 dark:shadow-[0_-4px_30px_rgba(0,0,0,0.35)]"
      >
        {activePill && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ x: activePill.x, width: activePill.width }}
            transition={
              shouldReduceMotion ? { duration: 0 } : springTransition
            }
            className="pointer-events-none absolute inset-y-2 left-0 rounded-[1rem] bg-primary/10 ring-1 ring-primary/10"
          />
        )}

        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = index === activeIndex

          return (
            <Link
              key={item.href}
              href={item.href}
              data-nav-index={index}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "relative z-10 h-14 min-w-0 flex-col gap-0.5 overflow-hidden rounded-[1.25rem] px-1 text-center text-[10px] leading-none font-medium hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring/50",
                isActive
                  ? "text-primary hover:bg-transparent hover:text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  y: isActive ? -1 : 0,
                  scale: isActive ? 1.06 : 1,
                }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : springTransition
                }
                className="relative z-10 flex"
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.25 : 2} />
              </motion.span>
              <span className="relative z-10 block w-full truncate text-center">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
