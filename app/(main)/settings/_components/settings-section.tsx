import type { ReactNode } from "react"

import { PageSection } from "@/components/page-shell"

export const settingsItemClassName = "h-12 flex-nowrap py-0"
export const settingsGroupClassName = "gap-0 has-data-[size=sm]:gap-0"
export const settingsSeparatorClassName =
  "my-0 ml-11 data-horizontal:w-[calc(100%_-_2.75rem)]"

export function SettingsSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <PageSection>
      <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </PageSection>
  )
}
