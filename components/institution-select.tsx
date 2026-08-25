"use client"

import { useId, useMemo, useState } from "react"
import { Plus } from "lucide-react"

import { InstitutionLogo } from "@/components/institution-logo"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  getInstitutionsByType,
  type FinancialInstitution,
  type InstitutionType,
} from "@/lib/financial-institutions"
import { cn } from "@/lib/utils"

export const CUSTOM_INSTITUTION_VALUE = "other"

const institutionNameCollator = new Intl.Collator("vi-VN", {
  sensitivity: "base",
  numeric: true,
})

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("vi-VN")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function startsWithWord(value: string, query: string) {
  return value.split(" ").some((word) => word.startsWith(query))
}

function scoreInstitution(
  institution: FinancialInstitution,
  rawSearch: string
) {
  const search = normalizeSearchValue(rawSearch)

  if (!search) return 1

  const shortName = normalizeSearchValue(institution.shortName ?? "")
  const keywords = (institution.keywords ?? []).map(normalizeSearchValue)
  const compactSearch = search.replaceAll(" ", "")
  const compactShortName = shortName.replaceAll(" ", "")
  const compactKeywords = keywords.map((keyword) =>
    keyword.replaceAll(" ", "")
  )

  if (compactShortName === compactSearch) return 100
  if (compactShortName.startsWith(compactSearch)) return 90
  if (startsWithWord(shortName, search)) return 85
  if (compactShortName.includes(compactSearch)) return 70
  if (
    keywords.some((keyword) => keyword === search) ||
    compactKeywords.some((keyword) => keyword === compactSearch)
  ) {
    return 60
  }
  if (
    keywords.some(
      (keyword) =>
        keyword.startsWith(search) || startsWithWord(keyword, search)
    ) ||
    compactKeywords.some((keyword) => keyword.startsWith(compactSearch))
  ) {
    return 50
  }
  if (
    keywords.some((keyword) => keyword.includes(search)) ||
    compactKeywords.some((keyword) => keyword.includes(compactSearch))
  ) {
    return 30
  }

  return 0
}

function getCustomInstitution(type: InstitutionType): FinancialInstitution {
  const isBank = type === "bank"

  return {
    id: CUSTOM_INSTITUTION_VALUE,
    name: isBank ? "Ngân hàng khác" : "Ví điện tử khác",
    shortName: isBank ? "Ngân hàng khác" : "Ví điện tử khác",
    type,
    logo: "",
    keywords: ["khác", "other", "custom"],
  }
}

type InstitutionSelectProps = {
  type: InstitutionType
  value: string
  onValueChange: (value: string) => void
  id?: string
  name?: string
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  required?: boolean
  allowCustom?: boolean
  className?: string
}

export function InstitutionSelect({
  type,
  value,
  onValueChange,
  id,
  name,
  placeholder,
  searchPlaceholder,
  disabled = false,
  required = false,
  allowCustom = false,
  className,
}: InstitutionSelectProps) {
  const [search, setSearch] = useState("")
  const generatedId = useId()
  const typeLabel = type === "bank" ? "ngân hàng" : "ví điện tử"
  const institutions = useMemo(() => {
    const sortedInstitutions = [...getInstitutionsByType(type)].sort(
      (first, second) =>
        institutionNameCollator.compare(
          first.shortName ?? first.name,
          second.shortName ?? second.name
        )
    )

    return allowCustom
      ? [...sortedInstitutions, getCustomInstitution(type)]
      : sortedInstitutions
  }, [allowCustom, type])
  const selectedInstitution =
    institutions.find((institution) => institution.id === value) ?? null
  const visibleInstitutions = useMemo(() => {
    if (!normalizeSearchValue(search)) return institutions

    return institutions
      .map((institution) => ({
        institution,
        score: scoreInstitution(institution, search),
      }))
      .filter(({ score }) => score > 0)
      .sort(
        (first, second) =>
          second.score - first.score ||
          institutionNameCollator.compare(
            first.institution.shortName ?? first.institution.name,
            second.institution.shortName ?? second.institution.name
          )
      )
      .map(({ institution }) => institution)
  }, [institutions, search])

  return (
    <Combobox
      items={institutions}
      filteredItems={visibleInstitutions}
      value={selectedInstitution}
      onValueChange={(institution) =>
        onValueChange(institution?.id ?? "")
      }
      itemToStringLabel={(institution) =>
        institution.shortName ?? institution.name
      }
      itemToStringValue={(institution) => institution.id}
      isItemEqualToValue={(institution, selectedValue) =>
        institution.id === selectedValue.id
      }
      filter={null}
      onInputValueChange={(inputValue, eventDetails) => {
        if (eventDetails.reason === "input-change") {
          setSearch(inputValue)
        }
      }}
      onOpenChange={(open) => {
        if (!open) setSearch("")
      }}
      name={name}
      required={required}
      disabled={disabled}
    >
      <ComboboxInput
        id={id ?? generatedId}
        placeholder={
          searchPlaceholder ?? placeholder ?? `Tìm và chọn ${typeLabel}`
        }
        aria-label={id ? undefined : placeholder ?? `Chọn ${typeLabel}`}
        className={cn("w-full", className)}
      />
      <ComboboxContent>
        <ComboboxEmpty>Không tìm thấy {typeLabel}.</ComboboxEmpty>
        <ComboboxList>
          {(institution: FinancialInstitution) => (
            <ComboboxItem key={institution.id} value={institution}>
              {institution.id === CUSTOM_INSTITUTION_VALUE ? (
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              ) : (
                <InstitutionLogo institution={institution} />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate">
                  {institution.shortName ?? institution.name}
                </span>
                {institution.shortName &&
                  institution.shortName !== institution.name && (
                    <span className="block truncate text-xs font-normal text-muted-foreground">
                      {institution.name}
                    </span>
                  )}
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
