"use client"

import {
  useSyncExternalStore,
} from "react"
import { MonitorCogIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { SlidingIndicator } from "@/components/sliding-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSlidingIndicator } from "@/hooks/use-sliding-indicator"

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
  const activeIndex = hasHydrated
    ? themes.findIndex(({ value }) => value === theme)
    : -1
  const { indicatorRef, itemRefs, moveTo } =
    useSlidingIndicator<HTMLButtonElement>({ activeIndex })

  return (
    <SettingsSection title="Giao diện">
      <Card className="gap-0 py-2">
        <CardContent className="px-2">
          <div
            className="relative grid grid-cols-3 gap-1.5"
            role="group"
            aria-label="Chọn giao diện"
          >
            <SlidingIndicator
              ref={indicatorRef}
              className="inset-y-0 rounded-2xl bg-primary"
            />
            {themes.map(({ value, label, icon: Icon }, index) => {
              const isSelected = activeIndex === index

              return (
                <Button
                  key={value}
                  ref={(element) => {
                    itemRefs.current[index] = element
                  }}
                  type="button"
                  variant="ghost"
                  size="default"
                  aria-pressed={isSelected}
                  onClick={() => {
                    moveTo(index)
                    setTheme(value)
                  }}
                  className={
                    isSelected
                      ? "relative z-10 min-w-0 px-2 text-primary-foreground hover:bg-transparent hover:text-primary-foreground"
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
