"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type AppDrawerProps = Omit<ComponentProps<typeof Drawer>, "children"> & {
  trigger?: ComponentProps<typeof DrawerTrigger>["render"];
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
};

export function AppDrawer({
  trigger,
  title,
  description,
  children,
  footer,
  contentClassName,
  bodyClassName,
  headerClassName,
  footerClassName,
  showSwipeHandle = true,
  ...drawerProps
}: AppDrawerProps) {
  return (
    <Drawer showSwipeHandle={showSwipeHandle} {...drawerProps}>
      {trigger ? <DrawerTrigger render={trigger} /> : null}

      <DrawerContent
        className={cn(
          "mx-auto max-w-lg [--drawer-content-width:calc(100%_-_1rem)]",
          contentClassName,
        )}
      >
        <DrawerHeader className={cn("pb-4", headerClassName)}>
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : null}
        </DrawerHeader>

        <div className={cn("flex-1 overflow-y-auto p-4", bodyClassName)}>
          {children}
        </div>

        {footer ? (
          <DrawerFooter className={cn("flex-row pt-4", footerClassName)}>
            {footer}
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
