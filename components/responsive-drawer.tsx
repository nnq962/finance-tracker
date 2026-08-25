"use client"

import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type ResponsiveDrawerProps = {
  bodyClassName?: string
  children: ReactNode
  closeLabel?: string
  contentClassName?: string
  description?: ReactNode
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete?: (open: boolean) => void
  open: boolean
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
  showCloseButton?: boolean
  showSwipeHandle?: boolean
  title: ReactNode
  trigger?: ReactNode
}

export function ResponsiveDrawer({
  bodyClassName,
  children,
  closeLabel = "Đóng",
  contentClassName,
  description,
  onOpenChange,
  onOpenChangeComplete,
  open,
  primaryAction,
  secondaryAction,
  showCloseButton = false,
  showSwipeHandle = true,
  title,
  trigger,
}: ResponsiveDrawerProps) {
  const defaultCloseAction = showCloseButton ? (
    <DrawerClose
      render={
        <Button size="lg" variant={primaryAction ? "outline" : "default"}>
          {closeLabel}
        </Button>
      }
    />
  ) : null
  const resolvedSecondaryAction = secondaryAction ?? defaultCloseAction
  const hasFooter = Boolean(resolvedSecondaryAction || primaryAction)
  const hasTwoActions = Boolean(resolvedSecondaryAction && primaryAction)

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      showSwipeHandle={showSwipeHandle}
    >
      {trigger}

      <DrawerContent
        className={cn("md:mx-auto md:max-w-2xl", contentClassName)}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && (
            <DrawerDescription>{description}</DrawerDescription>
          )}
        </DrawerHeader>

        <ScrollArea className="flex min-h-0 flex-1 overflow-hidden [&>[data-slot=scroll-area-viewport]]:h-auto [&>[data-slot=scroll-area-viewport]]:min-h-0 [&>[data-slot=scroll-area-viewport]]:flex-auto [&>[data-slot=scroll-area-viewport]]:overscroll-contain">
          <div className={cn("p-4", bodyClassName)}>{children}</div>
        </ScrollArea>

        {hasFooter && (
          <DrawerFooter
            className={cn(
              hasTwoActions && "grid grid-cols-2 gap-2 [&>*]:w-full"
            )}
          >
            {resolvedSecondaryAction}
            {primaryAction}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
