const currencyNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number) {
  return `${currencyNumberFormatter.format(value)}đ`
}
