import { PlusIcon, UserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

import {
  loanContacts,
  type LoanContact,
} from "../../_config/loan-contacts"

type LoanContactCardProps = {
  value: LoanContact | null
  onValueChange: (value: LoanContact) => void
  onAddContact?: () => void
  ariaLabel?: string
  tone?: "lend" | "borrow"
}

const toneClassNames = {
  lend: "aria-pressed:border-sky-500 aria-pressed:bg-sky-500/[0.07] aria-pressed:text-sky-600 dark:aria-pressed:border-sky-400 dark:aria-pressed:bg-sky-400/[0.07] dark:aria-pressed:text-sky-400",
  borrow:
    "aria-pressed:border-orange-500 aria-pressed:bg-orange-500/[0.07] aria-pressed:text-orange-600 dark:aria-pressed:border-orange-400 dark:aria-pressed:bg-orange-400/[0.07] dark:aria-pressed:text-orange-400",
} as const

export function LoanContactCard({
  value,
  onValueChange,
  onAddContact,
  ariaLabel = "Chọn người vay",
  tone = "lend",
}: LoanContactCardProps) {
  return (
    <Card>
      <CardContent>
        <div
          role="group"
          aria-label={ariaLabel}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {loanContacts.map((contact) => (
            <Toggle
              key={contact.value}
              variant="outline"
              pressed={value === contact.value}
              onPressedChange={(pressed) => {
                if (pressed) onValueChange(contact.value)
              }}
              aria-label={contact.label}
              className={cn(
                "h-10 w-auto min-w-0 gap-2 rounded-2xl bg-muted/40 px-3 text-foreground hover:bg-muted",
                toneClassNames[tone]
              )}
            >
              <UserRoundIcon className="size-4" aria-hidden="true" />
              <span>{contact.label}</span>
            </Toggle>
          ))}

          <Button
            type="button"
            variant="dash"
            onClick={onAddContact}
            className="h-10 rounded-2xl px-3"
          >
            <PlusIcon data-icon="inline-start" aria-hidden="true" />
            Thêm
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
