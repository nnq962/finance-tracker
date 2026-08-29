import { AccountTypeIcon } from "@/components/account-type-icon"
import { InstitutionLogo } from "@/components/institution-logo"
import { getInstitution } from "@/lib/financial-institutions"
import { cn } from "@/lib/utils"
import type { Account } from "@/types/account"

type AccountIconProps = {
  account: Account
  className?: string
}

export function AccountIcon({ account, className }: AccountIconProps) {
  const institution =
    account.type !== "cash" && account.institutionId
      ? getInstitution(
          account.type === "wallet" ? "e-wallet" : "bank",
          account.institutionId
        )
      : undefined

  if (institution) {
    return (
      <InstitutionLogo
        institution={institution}
        className={cn(
          "size-7 rounded-lg border border-border/70 bg-white/60 p-1 dark:bg-white/90",
          className
        )}
      />
    )
  }

  return <AccountTypeIcon type={account.type} className={className} />
}
