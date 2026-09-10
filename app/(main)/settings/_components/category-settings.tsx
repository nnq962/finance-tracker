import {
  ChevronRightIcon,
  HandCoinsIcon,
  ReceiptTextIcon,
} from "lucide-react"

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

export function CategorySettings() {
  return (
    <SettingsSection title="Hạng mục">
      <Card className="gap-0 py-0">
        <CardContent className="px-1">
          <ItemGroup className={settingsGroupClassName}>
            <Item size="sm" className={settingsItemClassName}>
              <ItemMedia variant="icon">
                <ReceiptTextIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Hạng mục chi</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-sm text-muted-foreground">12 mục</span>
                <ChevronRightIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </ItemActions>
            </Item>
            <ItemSeparator className={settingsSeparatorClassName} />
            <Item size="sm" className={settingsItemClassName}>
              <ItemMedia variant="icon">
                <HandCoinsIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Hạng mục thu</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span className="text-sm text-muted-foreground">5 mục</span>
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
