"use client"

import { useId, useMemo, useRef, useState } from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import { InstitutionLogo } from "@/components/institution-logo"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  getInstitution,
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

  const shortName = normalizeSearchValue(
    institution.shortName ?? institution.name
  )
  const id = normalizeSearchValue(institution.id)
  const name = normalizeSearchValue(institution.name)
  const keywords = (institution.keywords ?? []).map(normalizeSearchValue)

  if (shortName === search || id === search) return 100
  if (keywords.some((keyword) => keyword === search)) return 95
  if (shortName.startsWith(search)) return 90
  if (startsWithWord(shortName, search)) return 85
  if (id.startsWith(search)) return 80
  if (keywords.some((keyword) => keyword.startsWith(search))) return 75
  if (keywords.some((keyword) => startsWithWord(keyword, search))) return 70
  if (name.startsWith(search)) return 60
  if (startsWithWord(name, search)) return 40
  if (shortName.includes(search) || id.includes(search)) return 30
  if (
    name.includes(search) ||
    keywords.some((keyword) => keyword.includes(search))
  ) {
    return 20
  }

  return 0
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
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const generatedId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const commandListRef = useRef<HTMLDivElement>(null)
  const institutions = useMemo(
    () =>
      [...getInstitutionsByType(type)].sort((first, second) =>
        institutionNameCollator.compare(
          first.shortName ?? first.name,
          second.shortName ?? second.name
        )
      ),
    [type]
  )
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
  const selectedInstitution = getInstitution(type, value)
  const isCustom = allowCustom && value === CUSTOM_INSTITUTION_VALUE
  const typeLabel = type === "bank" ? "ngân hàng" : "ví điện tử"
  const normalizedSearch = normalizeSearchValue(search)
  const customSearchValue = normalizeSearchValue(
    type === "bank"
      ? "khác other custom ngân hàng"
      : "khác other custom ví điện tử"
  )
  const showCustomOption =
    allowCustom &&
    (!normalizedSearch || customSearchValue.includes(normalizedSearch))
  const selectedLabel = isCustom
    ? type === "bank"
      ? "Ngân hàng khác"
      : "Ví điện tử khác"
    : selectedInstitution?.shortName ?? selectedInstitution?.name

  function selectValue(nextValue: string) {
    onValueChange(nextValue)
    setSearch("")
    setOpen(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setSearch("")
      return
    }

    requestAnimationFrame(() => commandListRef.current?.scrollTo({ top: 0 }))
  }

  function handleSearchChange(nextSearch: string) {
    setSearch(nextSearch)
    requestAnimationFrame(() => commandListRef.current?.scrollTo({ top: 0 }))
  }

  return (
    <div className={cn("relative min-w-0", className)}>
      <Button
        ref={triggerRef}
        id={id ?? generatedId}
        type="button"
        variant="outline"
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-required={required}
        disabled={disabled}
        className="w-full min-w-0 justify-between font-normal"
        onClick={() => setOpen(true)}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selectedInstitution && (
            <InstitutionLogo
              institution={selectedInstitution}
              className="size-5"
            />
          )}
          <span
            className={cn(
              "truncate",
              !selectedLabel && "text-muted-foreground"
            )}
          >
            {selectedLabel ?? placeholder ?? `Chọn ${typeLabel}`}
          </span>
        </span>
        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title={type === "bank" ? "Chọn ngân hàng" : "Chọn ví điện tử"}
        description={`Tìm kiếm và chọn ${typeLabel} cho tài khoản.`}
        className="sm:max-w-lg"
      >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder ?? `Tìm ${typeLabel}...`}
              value={search}
              onValueChange={handleSearchChange}
            />
            <CommandList ref={commandListRef}>
              <CommandEmpty>Không tìm thấy {typeLabel}.</CommandEmpty>
              <CommandGroup
                heading={type === "bank" ? "Ngân hàng" : "Ví điện tử"}
              >
                {visibleInstitutions.map((institution) => (
                  <CommandItem
                    key={institution.id}
                    value={institution.id}
                    data-checked={value === institution.id}
                    onSelect={() => selectValue(institution.id)}
                  >
                    <InstitutionLogo institution={institution} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {institution.shortName ?? institution.name}
                      </span>
                      {institution.shortName && (
                        <span className="block truncate text-xs text-muted-foreground">
                          {institution.name}
                        </span>
                      )}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {showCustomOption && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      value={CUSTOM_INSTITUTION_VALUE}
                      data-checked={isCustom}
                      onSelect={() => selectValue(CUSTOM_INSTITUTION_VALUE)}
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Plus className="size-4" />
                      </span>
                      {type === "bank"
                        ? "Ngân hàng khác"
                        : "Ví điện tử khác"}
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
      </CommandDialog>

      {name && (
        <input
          className="pointer-events-none absolute size-px opacity-0"
          tabIndex={-1}
          aria-label={`Giá trị ${typeLabel} đã chọn`}
          name={name}
          value={value}
          required={required}
          onChange={() => undefined}
          onInvalid={() => triggerRef.current?.focus()}
        />
      )}
    </div>
  )
}
