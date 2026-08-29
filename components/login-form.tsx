"use client"

import { useState } from "react"
import {
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  MailIcon,
  ShieldCheckIcon,
  WalletCardsIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <div className="flex flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
          <WalletCardsIcon className="size-6" aria-hidden="true" />
        </div>
        <p className="mt-3 text-lg font-semibold tracking-tight">
          Finance Tracker
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Tài chính của bạn, rõ ràng hơn mỗi ngày
        </p>
      </div>

      <Card className="bg-card/85 shadow-xl ring-border/70 backdrop-blur-xl supports-[backdrop-filter]:bg-card/75">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Chào mừng trở lại</CardTitle>
          <CardDescription>
            Nhập email và mật khẩu để tiếp tục quản lý tài chính.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup className="h-12">
                  <InputGroupAddon align="inline-start">
                    <MailIcon aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="ban@example.com"
                    required
                  />
                </InputGroup>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <InputGroup className="h-12">
                  <InputGroupAddon align="inline-start">
                    <LockKeyholeIcon aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-sm"
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                    >
                      {showPassword ? (
                        <EyeOffIcon aria-hidden="true" />
                      ) : (
                        <EyeIcon aria-hidden="true" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <Button type="submit" size="xl">
                  Đăng nhập
                </Button>
                <FieldSeparator>hoặc</FieldSeparator>
                <Button variant="outline" type="button" size="lg">
                  Đăng nhập bằng Google
                </Button>
                <FieldDescription className="text-center">
                  Chưa có tài khoản? <a href="#">Đăng ký</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
        <ShieldCheckIcon className="size-4" aria-hidden="true" />
        Dữ liệu đăng nhập của bạn luôn được bảo vệ
      </p>
    </div>
  )
}
