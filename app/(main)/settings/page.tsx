import {
  PageDescription,
  PageHeader,
  PageShell,
  PageTitle,
} from "@/components/page-shell"

import { AccountSettings } from "./_components/account-settings"
import { CategorySettings } from "./_components/category-settings"
import { NotificationSettings } from "./_components/notification-settings"
import { ProUpgradeCard } from "./_components/pro-upgrade-card"
import { ThemeSettings } from "./_components/theme-settings"
import { UserAccountSettings } from "./_components/user-account-settings"

export default function SettingsPage() {
  return (
    <PageShell>
      <PageHeader>
        <PageTitle>Cài đặt</PageTitle>
        <PageDescription>
          Cá nhân hóa trải nghiệm của bạn
        </PageDescription>
      </PageHeader>

      <UserAccountSettings />
      <ProUpgradeCard />
      <ThemeSettings />
      <CategorySettings />
      <AccountSettings />
      <NotificationSettings />

      <footer className="pt-2 text-center text-sm text-muted-foreground">
        Finance Tracker · Phiên bản v1.0.0
      </footer>
    </PageShell>
  )
}
