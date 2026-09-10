import { ChevronRightIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { SettingsSection } from "./settings-section"

export function UserAccountSettings() {
  return (
    <SettingsSection title="Tài khoản của tôi">
      <Card className="gap-0 py-0">
        <div
          aria-hidden="true"
          className="relative h-14 overflow-hidden bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500"
        >
          <span className="absolute -top-10 right-4 size-24 rounded-full border border-white/20 bg-white/10" />
          <span className="absolute -right-8 -bottom-14 size-28 rounded-full border border-white/15" />
        </div>

        <CardContent className="relative px-4 pb-4">
          <div className="-mt-7 flex items-end justify-between gap-3">
            <Avatar className="size-16 ring-4 ring-card">
              <AvatarFallback className="bg-slate-950 text-lg font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
                NQ
              </AvatarFallback>
            </Avatar>

            <Badge variant="secondary" className="mb-1">
              Free
            </Badge>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold">
                Nguyễn Ngọc Quyết
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                nguyenngocquyet@gmail.com
              </p>
            </div>

            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </span>
          </div>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
