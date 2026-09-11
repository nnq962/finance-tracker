"use client"

import type { ComponentProps, ReactNode } from "react"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type AppSheetProps = Omit<ComponentProps<typeof Sheet>, "children"> & {
  trigger: ComponentProps<typeof SheetTrigger>["render"]
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  contentClassName?: string
  bodyClassName?: string
  backLabel?: string
  shiftPage?: boolean
}

export function AppSheet({
  trigger,
  title,
  description,
  children,
  contentClassName,
  bodyClassName,
  backLabel = "Quay lại",
  shiftPage = true,
  ...sheetProps
}: AppSheetProps) {
  return (
    <Sheet {...sheetProps}>
      <SheetTrigger
        data-page-shift-trigger={shiftPage ? "" : undefined}
        render={trigger}
      />

      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-full! bg-background! duration-500! ease-[cubic-bezier(0.4,0,0.2,1)]! data-starting-style:opacity-100! data-ending-style:opacity-100! data-[side=right]:data-starting-style:translate-x-full! data-[side=right]:data-ending-style:translate-x-full! sm:max-w-none!",
          contentClassName
        )}
      >
        <SheetHeader className="relative flex-row items-center justify-center gap-0 p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
          <SheetClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                className="absolute left-2 size-11"
                aria-label={backLabel}
              />
            }
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
          </SheetClose>
          <SheetTitle className="text-center text-sm">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="sr-only">
              {description}
            </SheetDescription>
          ) : null}
        </SheetHeader>

        {children ? (
          <div className={cn("flex-1 overflow-y-auto p-4", bodyClassName)}>
            {children}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
