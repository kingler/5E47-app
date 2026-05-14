import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/charts/bar";

export default function SponsorReports() {
  return (
    <>
      <PageHeader
        eyebrow="Reports"
        title="ROI & sponsorship deliverables"
        description="Quarterly reports auto-generated from the analytics warehouse — exports include raw data + executive summary."
        action={
          <Button variant="primary">
            <Download className="size-4" /> Q2 PDF
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="sponsor" label="Earned media value" value="$1.42M" delta={11.4} />
        <Stat tone="sponsor" label="Brand mentions" value="4,820" delta={7.2} />
        <Stat tone="sponsor" label="First-look pickups" value="3" hint="of 5 eligible" />
        <Stat tone="sponsor" label="Avg engagement" value="6.8%" delta={1.4} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader title="Quarter-over-quarter" hint="Engagement index" />
          <Sparkline data={[42, 48, 52, 57, 63, 68, 74, 81, 85, 92, 96, 102]} tone="sponsor" height={140} />
        </Card>
        <Card>
          <CardHeader title="Deliverables checklist" />
          <ul className="text-sm space-y-2">
            {[
              ["Creator activations", "12 / 14"],
              ["Branded content drops", "9 / 10"],
              ["Live events", "3 / 3"],
              ["Press appearances", "5 / 6"],
              ["Asset library handoff", "Pending Q3"],
            ].map(([k, v]) => (
              <li
                key={k}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
              >
                <span>{k}</span>
                <span className="text-xs text-ink-soft">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
