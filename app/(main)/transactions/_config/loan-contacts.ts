export const loanContacts = [
  { value: "ba-tin", label: "Bá Tín" },
  { value: "duc-duy", label: "Đức Duy" },
  { value: "huyen-cheng", label: "Huyền Ch" },
] as const

export type LoanContact = (typeof loanContacts)[number]["value"]
