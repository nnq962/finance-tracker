import { AccountSettings } from "./_components/account-settings"
import { CategorySettings } from "./_components/category-settings"
import { NotificationSettings } from "./_components/notification-settings"
import { ProUpgradeCard } from "./_components/pro-upgrade-card"
import { ThemeSettings } from "./_components/theme-settings"
import { UserAccountSettings } from "./_components/user-account-settings"

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <header className="space-y-1 px-1 pt-1">
        <h1 className="font-heading text-[28px] leading-tight font-semibold tracking-tight">
          Cài đặt
        </h1>
        <p className="text-sm text-muted-foreground">
          Cá nhân hóa trải nghiệm của bạn
        </p>
      </header>

      <UserAccountSettings />
      <ProUpgradeCard />
      <ThemeSettings />
      <CategorySettings />
      <AccountSettings />
      <NotificationSettings />

      <footer className="pt-1 text-center text-sm text-muted-foreground">
        Finance Tracker · Phiên bản v1.0.0
      </footer>
    </main>
  )
}
