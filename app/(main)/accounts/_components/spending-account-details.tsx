import { Button } from "@/components/ui/button"
import {
  PauseIcon,
  PencilIcon,
  Trash2Icon,
  WalletCardsIcon,
} from "lucide-react"

export function SpendingAccountDetails() {
  return (
    <div className="grid gap-2">
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <WalletCardsIcon />
        Điều chỉnh số dư
      </Button>
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <PencilIcon />
        Chỉnh sửa
      </Button>
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <PauseIcon />
        Ngưng sử dụng
      </Button>
      <Button
        size="lg"
        variant="destructive"
        className="w-full justify-start"
      >
        <Trash2Icon />
        Xóa tài khoản chi tiêu
      </Button>
    </div>
  )
}
