import { Button } from "@/components/ui/button"
import {
  CheckIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

export function SavingsAccountDetails() {
  return (
    <div className="grid gap-2">
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <PlusIcon />
        Gửi thêm
      </Button>
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <MinusIcon />
        Rút một phần
      </Button>
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <CheckIcon />
        Tất toán
      </Button>
      <Button size="lg" variant="ghost" className="w-full justify-start">
        <PencilIcon />
        Chỉnh sửa
      </Button>
      <Button
        size="lg"
        variant="destructive"
        className="w-full justify-start"
      >
        <Trash2Icon />
        Xóa sổ tiết kiệm
      </Button>
    </div>
  )
}
