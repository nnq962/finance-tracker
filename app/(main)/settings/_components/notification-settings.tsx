import {
  BellRingIcon,
  CalendarClockIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  CrownIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

import {
  SettingsSection,
  settingsGroupClassName,
  settingsItemClassName,
  settingsSeparatorClassName,
} from "./settings-section"

function ProBadge() {
  return (
    <Badge
      variant="outline"
      className="border-amber-300/70 bg-amber-100 text-amber-800 shadow-xs dark:border-amber-700/70 dark:bg-amber-950/60 dark:text-amber-300"
    >
      <CrownIcon data-icon="inline-start" className="fill-current" />
      PRO
    </Badge>
  )
}

export function NotificationSettings() {
  return (
    <SettingsSection title="Thông báo & nhắc nhở">
      <Card className="gap-0 py-0">
        <CardContent className="px-1">
          <ItemGroup className={settingsGroupClassName}>
            <Item size="sm" className={settingsItemClassName}>
              <ItemMedia variant="icon">
                <BellRingIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Nhắc ghi chép
                  <ProBadge />
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-sm text-muted-foreground">20:00</span>
                <ChevronRightIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </ItemActions>
            </Item>
            <ItemSeparator className={settingsSeparatorClassName} />
            <Item size="sm" className={settingsItemClassName}>
              <ItemMedia variant="icon">
                <CircleDollarSignIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Khoản vay và nợ
                  <ProBadge />
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </ItemActions>
            </Item>
            <ItemSeparator className={settingsSeparatorClassName} />
            <Item size="sm" className={settingsItemClassName}>
              <ItemMedia variant="icon">
                <CalendarClockIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Đáo hạn tiết kiệm
                  <ProBadge />
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
