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
        <DrawerHeader className="pb-4">
          <DrawerTitle>{title}</DrawerTitle>
          {description && (
            <DrawerDescription>{description}</DrawerDescription>
          )}
        </DrawerHeader>

        <div
          className={cn(
            "flex-1 overflow-y-auto px-4 pb-2",
            !hasFooter && "pb-4",
            bodyClassName
          )}
        >
          {children}
        </div>

        {hasFooter && (
          <DrawerFooter
            className={cn(
              "pt-4",
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
