"use client"

import {
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react"
import {
  ArrowUpRightIcon,
  BellIcon,
  CheckIcon,
  CoinsIcon,
  EyeOffIcon,
  Globe2Icon,
  LaptopIcon,
  LogOutIcon,
  MoonIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type ThemeValue = "light" | "dark" | "system"

const themeOptions: {
  value: ThemeValue
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}[] = [
  {
    value: "light",
    label: "Sáng",
    description: "Luôn dùng nền sáng",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Tối",
    description: "Dịu mắt vào ban đêm",
    icon: MoonIcon,
  },
  {
    value: "system",
    label: "Hệ thống",
    description: "Theo thiết bị của bạn",
    icon: LaptopIcon,
  },
]

type SettingsRowProps = {
  icon: ReactNode
  title: string
  description?: string
  action: ReactNode
}

const subscribeToMountedState = () => () => undefined

function useMounted() {
  return useSyncExternalStore(
    subscribeToMountedState,
    () => true,
    () => false
  )
}

function SettingsRow({
  icon,
  title,
  description,
  action,
}: SettingsRowProps) {
  return (
    <div className="flex min-h-16 items-center gap-3 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground [&_svg]:size-4.5">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium">{title}</p>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  )
}

export function SettingsContent() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [hideBalances, setHideBalances] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const selectedTheme = mounted
    ? ((theme ?? "system") as ThemeValue)
    : null

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-center gap-4">
              <Avatar className="size-14">
                <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-lg font-semibold">
                    Finance User
                  </p>
                  <Badge variant="secondary">Miễn phí</Badge>
                </div>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  finance.user@example.com
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Không gian tài chính cá nhân
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative bg-gradient-to-br from-primary/15 via-card to-violet-500/10 ring-primary/15">
            <CardHeader>
              <div className="mb-1 flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <SparklesIcon className="size-5" aria-hidden="true" />
              </div>
              <CardTitle>Nâng cấp lên Pro</CardTitle>
              <CardDescription>
                Mở khóa toàn bộ công cụ để quản lý tài chính sâu hơn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {[
                  "Không giới hạn tài khoản",
                  "Báo cáo và phân tích nâng cao",
                  "Sao lưu dữ liệu tự động",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button type="button" size="lg" className="w-full">
                Nâng cấp ngay
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
              <CardDescription>
                Chọn giao diện phù hợp với môi trường sử dụng.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 sm:gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isSelected = selectedTheme === option.value

                return (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    aria-pressed={isSelected}
                    aria-label={`${option.label}: ${option.description}`}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "h-auto min-w-0 flex-col gap-2 rounded-3xl px-2 py-4",
                      isSelected &&
                        "border-primary/40 bg-primary/5 text-primary ring-2 ring-primary/10 hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground",
                        isSelected && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="truncate">{option.label}</span>
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="py-4">
              <CardTitle>Tùy chọn ứng dụng</CardTitle>
              <CardDescription>
                Cá nhân hóa cách ứng dụng hiển thị và nhắc nhở.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="px-0">
              <SettingsRow
                icon={<BellIcon />}
                title="Thông báo nhắc giao dịch"
                description="Nhắc bạn cập nhật thu chi mỗi ngày"
                action={
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    aria-label="Bật thông báo nhắc giao dịch"
                  />
                }
              />
              <Separator className="ml-16 data-horizontal:w-auto" />
              <SettingsRow
                icon={<EyeOffIcon />}
                title="Ẩn số dư"
                description="Che số tiền khi mở ứng dụng"
                action={
                  <Switch
                    checked={hideBalances}
                    onCheckedChange={setHideBalances}
                    aria-label="Ẩn số dư"
                  />
                }
              />
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="py-4">
              <CardTitle>Thông tin ứng dụng</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="px-0">
              <SettingsRow
                icon={<CoinsIcon />}
                title="Tiền tệ mặc định"
                action={
                  <span className="text-sm font-medium text-muted-foreground">
                    VND (₫)
                  </span>
                }
              />
              <Separator className="ml-16 data-horizontal:w-auto" />
              <SettingsRow
                icon={<Globe2Icon />}
                title="Ngôn ngữ"
                action={
                  <span className="text-sm font-medium text-muted-foreground">
                    Tiếng Việt
                  </span>
                }
              />
              <Separator className="ml-16 data-horizontal:w-auto" />
              <SettingsRow
                icon={<ShieldCheckIcon />}
                title="Phiên bản"
                action={
                  <span className="text-sm font-medium text-muted-foreground">
                    1.0.0
                  </span>
                }
              />
            </CardContent>
          </Card>

          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="w-full"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOutIcon data-icon="inline-start" />
            Đăng xuất
          </Button>
        </div>
      </div>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
              <LogOutIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Đăng xuất khỏi tài khoản?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ cần đăng nhập lại để tiếp tục quản lý dữ liệu tài chính.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ở lại</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => setLogoutOpen(false)}
            >
              Đăng xuất
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
