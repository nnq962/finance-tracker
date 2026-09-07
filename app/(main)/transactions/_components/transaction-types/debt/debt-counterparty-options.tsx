"use client"

import { useMemo, useState } from "react"
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatCurrency } from "@/lib/currency"

import type { DebtType } from "./debt-type-options"

type Debt = {
  id: string
  createdAt: string
  note: string
  remaining: number
}

type Counterparty = {
  id: string
  name: string
  initials: string
  phone: string
  receivables: Debt[]
  payables: Debt[]
}

export type DebtSelection = {
  debtId: string
  note: string
  personId: string
  personName: string
  remaining: number
}

const counterparties: Counterparty[] = [
  {
    id: "nguyen-van-an",
    name: "Nguyễn Văn An",
    initials: "NA",
    phone: "0901 234 567",
    receivables: [
      {
        id: "an-2026-08-12",
        createdAt: "12/08/2026",
        note: "Tiền sửa xe",
        remaining: 3_000_000,
      },
      {
        id: "an-2026-09-01",
        createdAt: "01/09/2026",
        note: "Chi tiêu cá nhân",
        remaining: 2_000_000,
      },
    ],
    payables: [],
  },
  {
    id: "tran-minh",
    name: "Trần Minh",
    initials: "TM",
    phone: "0988 456 789",
    receivables: [
      {
        id: "minh-2026-08-20",
        createdAt: "20/08/2026",
        note: "Mua điện thoại",
        remaining: 2_500_000,
      },
    ],
    payables: [],
  },
  {
    id: "le-thu-lan",
    name: "Lê Thu Lan",
    initials: "LL",
    phone: "0932 111 246",
    receivables: [],
    payables: [
      {
        id: "lan-2026-07-15",
        createdAt: "15/07/2026",
        note: "Đóng học phí",
        remaining: 8_000_000,
      },
    ],
  },
  {
    id: "pham-quang-huy",
    name: "Phạm Quang Huy",
    initials: "PH",
    phone: "0918 765 432",
    receivables: [],
    payables: [
      {
        id: "huy-2026-08-28",
        createdAt: "28/08/2026",
        note: "Tiền đặt cọc",
        remaining: 4_000_000,
      },
    ],
  },
]

const modeContent: Record<
  DebtType,
  {
    description: string
    emptyTitle: string
    question: string
    searchPlaceholder: string
    sheetDescription: string
    sheetTitle: string
  }
> = {
  lend: {
    question: "Bạn cho ai vay?",
    description: "Chọn người nhận khoản vay.",
    sheetTitle: "Chọn người vay",
    sheetDescription: "Tìm trong danh sách hoặc thêm một người mới.",
    searchPlaceholder: "Tìm theo tên hoặc số điện thoại...",
    emptyTitle: "Không tìm thấy người phù hợp",
  },
  borrow: {
    question: "Bạn vay của ai?",
    description: "Chọn người cho bạn vay.",
    sheetTitle: "Chọn người cho vay",
    sheetDescription: "Tìm trong danh sách hoặc thêm một người mới.",
    searchPlaceholder: "Tìm theo tên hoặc số điện thoại...",
    emptyTitle: "Không tìm thấy người phù hợp",
  },
  collect: {
    question: "Bạn thu tiền từ ai?",
    description: "Chọn người và khoản nợ cần thu.",
    sheetTitle: "Chọn người đang nợ bạn",
    sheetDescription: "Danh sách chỉ hiển thị những người còn khoản phải thu.",
    searchPlaceholder: "Tìm người đang nợ bạn...",
    emptyTitle: "Không có khoản phải thu phù hợp",
  },
  repay: {
    question: "Bạn trả tiền cho ai?",
    description: "Chọn người và khoản nợ cần trả.",
    sheetTitle: "Chọn người bạn đang nợ",
    sheetDescription: "Danh sách chỉ hiển thị những người còn khoản phải trả.",
    searchPlaceholder: "Tìm người bạn đang nợ...",
    emptyTitle: "Không có khoản phải trả phù hợp",
  },
}

function getDebts(person: Counterparty, mode: DebtType) {
  return mode === "collect" ? person.receivables : person.payables
}

function getTotalDebt(person: Counterparty, mode: DebtType) {
  return getDebts(person, mode).reduce(
    (total, debt) => total + debt.remaining,
    0
  )
}

function getPersonDescription(person: Counterparty, mode: DebtType) {
  if (mode === "collect") {
    return `Đang nợ bạn ${formatCurrency(getTotalDebt(person, mode))}`
  }

  if (mode === "repay") {
    return `Bạn đang nợ ${formatCurrency(getTotalDebt(person, mode))}`
  }

  return person.phone
}

function CounterpartySummary({
  selectedDebt,
  selectedPerson,
}: {
  selectedDebt?: Debt
  selectedPerson?: Counterparty
}) {
  return (
    <>
      <ItemMedia>
        {selectedPerson ? (
          <Avatar size="lg">
            <AvatarFallback>{selectedPerson.initials}</AvatarFallback>
          </Avatar>
        ) : (
          <UsersIcon />
        )}
      </ItemMedia>
      <ItemContent className="min-w-0">
        <ItemTitle>
          {selectedPerson ? selectedPerson.name : "Chọn người liên quan"}
        </ItemTitle>
        <ItemDescription>
          {selectedDebt
            ? `${selectedDebt.note} · Còn ${formatCurrency(selectedDebt.remaining)}`
            : selectedPerson
              ? selectedPerson.phone
              : "Chạm để mở danh sách"}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon />
      </ItemActions>
    </>
  )
}

type DebtCounterpartyOptionsProps = {
  mode: DebtType
  onDebtSelectionChange: (selection: DebtSelection | null) => void
}

export function DebtCounterpartyOptions({
  mode,
  onDebtSelectionChange,
}: DebtCounterpartyOptionsProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null)
  const [selectedDebtId, setSelectedDebtId] = useState<string | null>(null)
  const [sheetPersonId, setSheetPersonId] = useState<string | null>(null)
  const content = modeContent[mode]
  const isSettlement = mode === "collect" || mode === "repay"

  const visiblePeople = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi")

    return counterparties.filter((person) => {
      if (isSettlement && getDebts(person, mode).length === 0) return false

      if (!normalizedQuery) return true

      return `${person.name} ${person.phone}`
        .toLocaleLowerCase("vi")
        .includes(normalizedQuery)
    })
  }, [isSettlement, mode, query])

  const selectedPerson = counterparties.find(
    (person) => person.id === selectedPersonId
  )
  const selectedDebt = selectedPerson
    ? getDebts(selectedPerson, mode).find((debt) => debt.id === selectedDebtId)
    : undefined
  const sheetPerson = counterparties.find(
    (person) => person.id === sheetPersonId
  )

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (nextOpen) {
      setQuery("")
      setSheetPersonId(null)
    }
  }

  function selectPerson(person: Counterparty) {
    if (isSettlement) {
      setSheetPersonId(person.id)
      setQuery("")
      return
    }

    setSelectedPersonId(person.id)
    setSelectedDebtId(null)
    onDebtSelectionChange(null)
    setOpen(false)
  }

  function selectDebt(debt: Debt) {
    if (!sheetPerson) return

    setSelectedPersonId(sheetPerson.id)
    setSelectedDebtId(debt.id)
    onDebtSelectionChange({
      debtId: debt.id,
      note: debt.note,
      personId: sheetPerson.id,
      personName: sheetPerson.name,
      remaining: debt.remaining,
    })
    setOpen(false)
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="font-heading text-base font-medium">
          {content.question}
        </h2>
        {/* <p className="text-sm text-muted-foreground">{content.description}</p> */}
      </div>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <Card size="sm">
          <SheetTrigger
            render={
              <Item
                render={<button type="button" />}
                className="flex-nowrap"
              />
            }
          >
            <CounterpartySummary
              selectedPerson={selectedPerson}
              selectedDebt={selectedDebt}
            />
          </SheetTrigger>
        </Card>

        <SheetContent side="bottom" className="max-h-[85svh]">
          <SheetHeader>
            {sheetPerson && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit"
                onClick={() => setSheetPersonId(null)}
              >
                <ArrowLeftIcon data-icon="inline-start" />
                Quay lại
              </Button>
            )}
            <SheetTitle>
              {sheetPerson ? "Chọn khoản nợ" : content.sheetTitle}
            </SheetTitle>
            <SheetDescription>
              {sheetPerson
                ? `${sheetPerson.name} có ${getDebts(sheetPerson, mode).length} khoản đang mở.`
                : content.sheetDescription}
            </SheetDescription>
          </SheetHeader>

          <div className="overflow-y-auto px-6 pb-6">
            {sheetPerson ? (
              <ItemGroup>
                {getDebts(sheetPerson, mode).map((debt) => (
                  <Item
                    key={debt.id}
                    render={<button type="button" />}
                    variant="outline"
                    className="flex-nowrap"
                    onClick={() => selectDebt(debt)}
                  >
                    <ItemMedia variant="icon">
                      <CalendarDaysIcon />
                    </ItemMedia>
                    <ItemContent className="min-w-0">
                      <ItemTitle>{debt.note}</ItemTitle>
                      <ItemDescription>
                        Vay ngày {debt.createdAt}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Badge variant="secondary">
                        Còn {formatCurrency(debt.remaining)}
                      </Badge>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            ) : (
              <div className="space-y-4">
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    value={query}
                    placeholder={content.searchPlaceholder}
                    aria-label={content.searchPlaceholder}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </InputGroup>

                {!isSettlement && (
                  <Button type="button" variant="outline" className="w-full">
                    <PlusIcon data-icon="inline-start" />
                    Thêm người mới
                  </Button>
                )}

                {visiblePeople.length > 0 ? (
                  <ItemGroup>
                    {visiblePeople.map((person) => (
                      <Item
                        key={person.id}
                        render={<button type="button" />}
                        variant="outline"
                        className="flex-nowrap"
                        onClick={() => selectPerson(person)}
                      >
                        <ItemMedia>
                          <Avatar size="lg">
                            <AvatarFallback>{person.initials}</AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent className="min-w-0">
                          <ItemTitle>{person.name}</ItemTitle>
                          <ItemDescription>
                            {getPersonDescription(person, mode)}
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <ChevronRightIcon />
                        </ItemActions>
                      </Item>
                    ))}
                  </ItemGroup>
                ) : (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <UsersIcon />
                      </EmptyMedia>
                      <EmptyTitle>{content.emptyTitle}</EmptyTitle>
                      <EmptyDescription>
                        Thử tìm bằng tên hoặc số điện thoại khác.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
