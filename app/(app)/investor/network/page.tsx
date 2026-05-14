import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NODES = [
  { city: "New York", state: "Live", floors: 6, residents: 210, arr: "$4.9M", tone: "success" as const },
  { city: "Los Angeles", state: "Build-out", floors: 4, residents: 0, arr: "—", tone: "warning" as const },
  { city: "Atlanta", state: "LOI", floors: 3, residents: 0, arr: "—", tone: "info" as const },
  { city: "Austin", state: "Diligence", floors: 2, residents: 0, arr: "—", tone: "neutral" as const },
  { city: "London", state: "Diligence", floors: 5, residents: 0, arr: "—", tone: "neutral" as const },
  { city: "Tokyo", state: "Concept", floors: 4, residents: 0, arr: "—", tone: "neutral" as const },
];

export default function NetworkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Network"
        title="Multi-city creator infrastructure"
        description="Every node runs on the same platform — same RBAC, same payments, same analytics surface."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {NODES.map((n) => (
          <Card key={n.city}>
            <CardHeader title={n.city} hint={`${n.floors} floors`} action={<Badge tone={n.tone}>{n.state}</Badge>} />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-ink-soft">Residents</div>
                <div className="text-lg font-semibold">{n.residents}</div>
              </div>
              <div>
                <div className="text-xs text-ink-soft">ARR</div>
                <div className="text-lg font-semibold">{n.arr}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
