"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react"
import { MonitorCogIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { SettingsSection } from "./settings-section"

const themes = [
  { value: "system", label: "Hệ thống", icon: MonitorCogIcon },
  { value: "light", label: "Sáng", icon: SunIcon },
  { value: "dark", label: "Tối", icon: MoonIcon },
] as const

const subscribeToHydration = () => () => undefined

function useHasHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
}

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const hasHydrated = useHasHydrated()
  const pillRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const initializedRef = useRef(false)
  const activeIndex = hasHydrated
    ? themes.findIndex(({ value }) => value === theme)
    : -1

  const movePill = useCallback((index: number, animate: boolean) => {
    const tab = tabRefs.current[index]
    const pill = pillRef.current

    if (!tab || !pill) return

    const move = () => {
      pill.style.transform = `translate3d(${tab.offsetLeft}px, 0, 0)`
      pill.style.width = `${tab.offsetWidth}px`
      pill.style.opacity = "1"
    }

    if (animate) {
      move()
      return
    }

    const previousTransition = pill.style.transition
    pill.style.transition = "none"
    move()
    void pill.offsetWidth
    pill.style.transition = previousTransition
  }, [])

  useEffect(() => {
    if (activeIndex < 0) return

    const frame = window.requestAnimationFrame(() => {
      movePill(activeIndex, initializedRef.current)
      initializedRef.current = true
    })
    const handleResize = () => movePill(activeIndex, false)

    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", handleResize)
    }
  }, [activeIndex, movePill])

  return (
    <SettingsSection title="Giao diện">
      <Card className="gap-0 py-2">
        <CardContent className="px-2">
          <div
            className="relative grid grid-cols-3 gap-1.5"
            role="group"
            aria-label="Chọn giao diện"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 rounded-2xl bg-secondary opacity-0 transition-[transform,width,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
            />
            {themes.map(({ value, label, icon: Icon }, index) => {
              const isSelected = activeIndex === index

              return (
                <Button
                  key={value}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  variant="ghost"
                  size="default"
                  aria-pressed={isSelected}
                  onClick={() => {
                    movePill(index, true)
                    setTheme(value)
                  }}
                  className={
                    isSelected
                      ? "relative z-10 min-w-0 px-2 text-foreground hover:bg-transparent"
                      : "relative z-10 min-w-0 px-2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                  }
                >
                  <Icon aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
