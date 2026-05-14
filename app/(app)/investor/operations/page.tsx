import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { MiniBar, Sparkline } from "@/components/charts/bar";
import { bookingsByDay, utilizationSeries } from "@/lib/data";

export default function OperationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Building-level KPIs"
        description="Utilization, retention, NPS, support load — the leading indicators behind the financials."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="investor" label="Occupancy" value="92%" delta={1.8} />
        <Stat tone="investor" label="Creator NPS" value="71" delta={4.6} />
        <Stat tone="investor" label="Sponsor NPS" value="68" delta={2.1} />
        <Stat tone="investor" label="Support FCR" value="89%" delta={1.2} />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader title="Utilization curve" hint="Floors aggregated" />
          <Sparkline data={utilizationSeries()} tone="investor" height={140} />
        </Card>
        <Card>
          <CardHeader title="Bookings · this week" />
          <MiniBar data={bookingsByDay()} tone="investor" />
        </Card>
      </div>
    </>
  );
}
