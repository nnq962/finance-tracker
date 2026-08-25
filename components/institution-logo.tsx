"use client"

import Image from "next/image"
import { useState } from "react"
import { Building2, WalletCards } from "lucide-react"

import type { FinancialInstitution } from "@/lib/financial-institutions"
import { cn } from "@/lib/utils"

type InstitutionLogoProps = {
  institution: FinancialInstitution
  className?: string
}

export function InstitutionLogo({
  institution,
  className,
}: InstitutionLogoProps) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null)
  const showFallback = failedLogo === institution.logo
  const FallbackIcon = institution.type === "bank" ? Building2 : WalletCards

  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white dark:bg-white/90",
        className
      )}
    >
      {showFallback ? (
        <FallbackIcon className="size-4 text-muted-foreground" aria-hidden="true" />
      ) : (
        <Image
          src={institution.logo}
          alt=""
          width={40}
          height={40}
          className="size-full object-contain"
          onError={() => setFailedLogo(institution.logo)}
        />
      )}
    </span>
  )
}
