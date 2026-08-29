import type { Metadata } from "next"

import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Đăng nhập | Finance Tracker",
  description: "Đăng nhập để tiếp tục quản lý tài chính cá nhân.",
}

export default function Page() {
  return (
    <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-muted/30 px-4 py-[max(1rem,env(safe-area-inset-top))] sm:px-6 md:p-10">
      <div
        aria-hidden="true"
        className="absolute -top-28 -left-24 size-72 rounded-full bg-primary/10 blur-3xl sm:size-96"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-32 size-80 rounded-full bg-violet-500/10 blur-3xl sm:size-[28rem]"
      />

      <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 sm:right-6">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
