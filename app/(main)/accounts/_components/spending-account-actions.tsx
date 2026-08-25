import { Button } from "@/components/ui/button"
import {
  PauseIcon,
  PencilIcon,
  Trash2Icon,
  WalletCardsIcon,
} from "lucide-react"

type SpendingAccountActionsProps = {
  isInactive: boolean
  onAdjustBalance: () => void
  onDelete: () => void
  onEdit: () => void
  onStopUsing: () => void
}

export function SpendingAccountActions({
  isInactive,
  onAdjustBalance,
  onDelete,
  onEdit,
  onStopUsing,
}: SpendingAccountActionsProps) {
  return (
    <div className="grid gap-2">
      <Button
        size="lg"
        variant="ghost"
        className="w-full justify-start"
        onClick={onAdjustBalance}
      >
        <WalletCardsIcon />
        Điều chỉnh số dư
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="w-full justify-start"
        onClick={onEdit}
      >
        <PencilIcon />
        Chỉnh sửa
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="w-full justify-start"
        disabled={isInactive}
        onClick={onStopUsing}
      >
        <PauseIcon />
        {isInactive ? "Đã ngừng sử dụng" : "Ngừng sử dụng"}
      </Button>
      <Button
        size="lg"
        variant="destructive"
        className="w-full justify-start bg-transparent dark:bg-transparent"
        onClick={onDelete}
      >
        <Trash2Icon />
        Xóa tài khoản chi tiêu
      </Button>
    </div>
  )
}
