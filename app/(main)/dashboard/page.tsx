export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Tổng quan tình hình tài chính của bạn.
        </p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50 md:col-span-2 xl:col-span-1" />
      </div>
      <div className="min-h-80 flex-1 rounded-xl bg-muted/50" />
    </div>
  )
}
