import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Báo cáo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Phân tích dòng tiền và xu hướng chi tiêu.
          </p>
        </div>

        <Drawer swipeDirection="down">
          <DrawerTrigger render={<Button variant="secondary">Open Left Drawer</Button>} />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="size-full rounded-2xl bg-muted" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button>Close</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
