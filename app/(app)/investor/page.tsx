import Link from "next/link";
import { Download, LineChart, Network } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline, MiniBar } from "@/components/charts/bar";
import { arrSeries, utilizationSeries } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function InvestorOverview() {
  return (
    <>
      <PageHeader
        eyebrow="Investor portal"
        title="5E47 portfolio overview"
        description="Operating, financial, and growth KPIs across the 5E47 creator infrastructure network."
        action={
          <>
            <Button variant="secondary">
              <Download className="size-4" /> Q2 Pack
            </Button>
            <Link
              href="/investor/network"
              className="rounded-xl bg-accent text-accent-ink px-4 py-2 text-sm font-medium hover:bg-accent-muted"
            >
              <Network className="inline size-4 mr-1" /> Network map
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="investor" label="ARR" value="$4.9M" delta={14.2} />
        <Stat tone="investor" label="EBITDA margin" value="18%" delta={2.1} />
        <Stat tone="investor" label="Occupancy" value="92%" delta={1.8} />
        <Stat tone="investor" label="Net retention" value="124%" delta={3.4} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="ARR trajectory"
            hint="Monthly · last 12"
            action={<LineChart className="size-4 text-ink-soft" />}
          />
          <Sparkline data={arrSeries()} tone="investor" height={160} />
        </Card>
        <Card>
          <CardHeader title="Utilization" hint="All floors" />
          <Sparkline data={utilizationSeries()} tone="investor" height={120} />
          <div className="text-xs text-ink-soft mt-2">
            Trending up through the spring slate window.
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card>
          <CardHeader title="Revenue mix" hint="Trailing twelve" />
          <ul className="space-y-2 text-sm">
            {[
              ["Residencies", 42],
              ["Studio bookings", 24],
              ["Sponsorships", 22],
              ["Events", 8],
              ["Hospitality", 4],
            ].map(([k, v]) => (
              <li key={k as string} className="flex items-center gap-3">
                <div className="w-32 text-xs text-ink-soft">{k}</div>
                <div className="flex-1 h-2 rounded-full bg-bg-elev overflow-hidden">
                  <div className="h-full bg-role-investor" style={{ width: `${v}%` }} />
                </div>
                <div className="w-8 text-right text-xs text-ink-muted">{v}%</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Sponsor retention" hint="Renewals last 4 quarters" />
          <MiniBar data={[3, 4, 5, 5, 6, 5, 6, 7]} tone="investor" />
          <div className="text-xs text-ink-soft mt-2">
            6 of 7 renewed at parity or higher in Q2.
          </div>
        </Card>

        <Card>
          <CardHeader title="Expansion" hint="Pipeline" />
          <ul className="text-sm space-y-2">
            {[
              ["NYC · Floor 5", "Live", "success"],
              ["LA · Arts District", "Build-out", "warning"],
              ["Atlanta", "LOI", "info"],
              ["London", "Diligence", "neutral"],
            ].map(([loc, stage, tone]) => (
              <li
                key={loc as string}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
              >
                <span>{loc}</span>
                <Badge tone={tone as "success" | "warning" | "info" | "neutral"}>
                  {stage}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
