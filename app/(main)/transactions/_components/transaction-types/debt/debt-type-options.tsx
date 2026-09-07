import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const debtTypes = [
  { value: "lend", label: "Cho vay", icon: ArrowUpRightIcon },
  { value: "borrow", label: "Đi vay", icon: ArrowDownLeftIcon },
  { value: "collect", label: "Thu nợ", icon: Undo2Icon },
  { value: "repay", label: "Trả nợ", icon: Redo2Icon },
] as const

export type DebtType = (typeof debtTypes)[number]["value"]

type DebtTypeOptionsProps = {
  value: DebtType
  onValueChange: (value: DebtType) => void
}

export function DebtTypeOptions({
  value,
  onValueChange,
}: DebtTypeOptionsProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-base font-medium">Loại giao dịch</h2>

      <ItemGroup className="grid grid-cols-2 gap-2">
        {debtTypes.map((type) => {
          const Icon = type.icon
          const isSelected = value === type.value

          return (
            <Item
              key={type.value}
              render={<button type="button" />}
              size="sm"
              variant="default"
              aria-pressed={isSelected}
              className="flex-nowrap border-transparent bg-card shadow-sm ring-1 ring-foreground/5 aria-pressed:ring-primary"
              onClick={() => onValueChange(type.value)}
            >
              <ItemMedia
                variant="icon"
                className="rounded-xl bg-muted p-2 group-aria-pressed/item:bg-primary group-aria-pressed/item:text-primary-foreground"
              >
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{type.label}</ItemTitle>
              </ItemContent>
              <ItemActions className="w-4 justify-end">
                {isSelected && <CheckIcon className="size-4" />}
              </ItemActions>
            </Item>
          )
        })}
      </ItemGroup>
    </section>
  )
}
