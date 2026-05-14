import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { MiniBar, Sparkline } from "@/components/charts/bar";
import {
  arrSeries,
  bookingsByDay,
  utilizationSeries,
} from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Operational intelligence"
        description="Utilization, engagement, retention, and revenue — across the entire facility."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="operator" label="ARR" value="$4.9M" delta={14.2} />
        <Stat tone="operator" label="Occupancy" value="92%" delta={1.8} />
        <Stat tone="operator" label="Creator retention" value="88%" delta={3.4} />
        <Stat tone="operator" label="Avg session" value="3h 12m" delta={4.1} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader title="ARR growth" hint="Monthly, last 12" />
          <Sparkline data={arrSeries()} tone="operator" height={140} />
        </Card>
        <Card>
          <CardHeader title="Bookings this week" />
          <MiniBar data={bookingsByDay()} tone="operator" />
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader title="Utilization curve" hint="Floors aggregated" />
          <Sparkline data={utilizationSeries()} tone="operator" height={140} />
        </Card>
        <Card>
          <CardHeader title="Support load" hint="Tickets per week" />
          <MiniBar data={[7, 5, 9, 4, 6, 3, 5]} tone="operator" />
        </Card>
      </div>
    </>
  );
}
