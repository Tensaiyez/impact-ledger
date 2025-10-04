import { KPICards } from "@/components/kpi-cards";
import { DonationsChart } from "@/components/donations-chart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of aid distribution and verification metrics
        </p>
      </div>

      <KPICards />

      <div className="grid gap-8 lg:grid-cols-2">
        <DonationsChart />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New program created</p>
                  <p className="text-sm text-muted-foreground">Emergency Relief Program</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Milestone completed</p>
                  <p className="text-sm text-muted-foreground">Food Distribution Phase 1</p>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New PoD submitted</p>
                  <p className="text-sm text-muted-foreground">Food distribution in Region A</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}