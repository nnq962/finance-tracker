import { ChevronRightIcon, WalletCardsIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import {
  SettingsSection,
  settingsItemClassName,
} from "./settings-section"

export function AccountSettings() {
  return (
    <SettingsSection title="Tài khoản tài chính">
      <Card className="gap-0 py-0">
        <CardContent className="px-1">
          <Item size="sm" className={settingsItemClassName}>
            <ItemMedia variant="icon">
              <WalletCardsIcon aria-hidden="true" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Tài khoản chi tiêu</ItemTitle>
            </ItemContent>
            <ItemActions>
              <span className="text-sm text-muted-foreground">
                3 tài khoản
              </span>
              <ChevronRightIcon
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </ItemActions>
          </Item>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
