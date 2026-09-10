import {
  ChartNoAxesCombinedIcon,
  CheckIcon,
  ChevronRightIcon,
  CrownIcon,
  ImagesIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ProUpgradeCard() {
  return (
    <Card className="relative isolate gap-0 overflow-hidden border border-transparent bg-linear-to-br from-slate-950 via-blue-950 to-sky-900 bg-clip-padding py-0 text-white shadow-lg shadow-black/10 ring-1 ring-white/10 ring-inset dark:shadow-black/30">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-16 size-48 rounded-full bg-sky-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 size-44 rounded-full bg-cyan-400/15 blur-3xl"
      />

      <CardContent className="relative space-y-5 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-white">
              Finance Tracker Pro
            </h2>
            <p className="max-w-md text-sm leading-6 text-slate-300">
              Nâng cấp Pro để trải nghiệm sớm các tính năng AI.
            </p>
          </div>
          <Badge className="border border-sky-200/20 bg-sky-300/15 text-sky-100">
            <CrownIcon data-icon="inline-start" className="fill-current" />
            PRO
          </Badge>
        </div>

        <ul className="grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-sky-200">
              <ChartNoAxesCombinedIcon className="size-3.5" aria-hidden="true" />
            </span>
            Báo cáo chuyên sâu
          </li>
          <li className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-sky-200">
              <ImagesIcon className="size-3.5" aria-hidden="true" />
            </span>
            Đính kèm không giới hạn
          </li>
        </ul>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full bg-white text-zinc-950 shadow-sm hover:bg-zinc-100"
        >
          <CheckIcon data-icon="inline-start" />
          Khám phá gói Pro
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  )
}
