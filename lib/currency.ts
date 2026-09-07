const currencyNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
})

export function formatCurrencyNumber(value: number) {
  return currencyNumberFormatter.format(value)
}

export function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "")

  return digits ? formatCurrencyNumber(Number(digits)) : ""
}

export function parseCurrencyInput(value: string) {
  return Number(value.replace(/\D/g, "")) || 0
}

export function formatCurrency(value: number) {
  return `${formatCurrencyNumber(value)}đ`
}
