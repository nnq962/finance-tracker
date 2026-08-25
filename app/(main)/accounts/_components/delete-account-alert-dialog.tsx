"use client"

import { Trash2Icon } from "lucide-react"

import { HoldToDeleteButton } from "./hold-to-delete-button"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Account } from "@/types/account"

type DeleteAccountAlertDialogProps = {
  account: Account | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountAlertDialog({
  account,
  open,
  onOpenChange,
}: DeleteAccountAlertDialogProps) {
  const isSavingsAccount = account?.purpose === "savings"
  const accountLabel = isSavingsAccount ? "sổ tiết kiệm" : "tài khoản"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Xóa {accountLabel} này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {account
              ? `${isSavingsAccount ? "Sổ tiết kiệm" : "Tài khoản"} “${account.name}” và toàn bộ lịch sử giao dịch liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.`
              : "Tài khoản và toàn bộ lịch sử giao dịch liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Hủy</AlertDialogCancel>
          <HoldToDeleteButton
            accountLabel={accountLabel}
            onConfirm={() => onOpenChange(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
