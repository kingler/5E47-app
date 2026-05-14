import { bookings, studios, userById } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default function StudiosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studios"
        title="Inventory & schedule"
        description="Every reservable resource — studios, stages, edit bays, equipment — with live state."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {studios.map((s) => {
          const upcoming = bookings.filter((b) => b.studioId === s.id).slice(0, 3);
          return (
            <Card key={s.id}>
              <CardHeader
                title={s.name}
                hint={`${s.kind} · Floor ${s.floor} · capacity ${s.capacity}`}
                action={<Badge tone="operator">{formatCurrency(s.hourlyRate)}/hr</Badge>}
              />
              <div className="flex flex-wrap gap-1.5">
                {s.equipment.map((e) => (
                  <span key={e} className="pill text-[10px]">{e}</span>
                ))}
              </div>
              {upcoming.length === 0 ? (
                <div className="text-xs text-ink-soft mt-2">No bookings.</div>
              ) : (
                <Table>
                  <THead>
                    <tr>
                      <TH>Creator</TH>
                      <TH>Window</TH>
                      <TH>Status</TH>
                    </tr>
                  </THead>
                  <tbody>
                    {upcoming.map((b) => (
                      <TR key={b.id}>
                        <TD>{userById(b.creatorId)?.name ?? b.creatorId}</TD>
                        <TD>{formatDateTime(b.startsAt)}</TD>
                        <TD>
                          <Badge
                            tone={
                              b.status === "confirmed"
                                ? "success"
                                : b.status === "pending"
                                  ? "warning"
                                  : "neutral"
                            }
                          >
                            {b.status}
                          </Badge>
                        </TD>
                      </TR>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
