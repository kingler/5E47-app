import { Fingerprint, KeyRound, QrCode, Smartphone } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { accessEvents } from "@/lib/data";
import { PageHeader, SectionTitle } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";

export default async function CreatorAccess() {
  const user = (await getCurrentUser())!;
  const events = accessEvents.filter((a) => a.userId === user.id);

  return (
    <>
      <PageHeader
        eyebrow="Facility access"
        title="Credentials & access log"
        description="Mobile credentials, QR guest passes, and your full tap history."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card>
          <CardHeader title="Mobile credential" hint="Tap on the reader" />
          <div className="rounded-2xl bg-gradient-to-br from-role-creator/30 to-bg-elev border border-bg-border p-5 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <Badge tone="creator">5E47 · Resident</Badge>
              <Smartphone className="size-4 text-ink-muted" />
            </div>
            <div className="mt-6 font-mono text-lg tracking-widest">
              ••• ••• ••• 4742
            </div>
            <div className="mt-1 text-xs text-ink-soft">{user.name}</div>
            <div className="mt-4 text-[11px] text-ink-soft">
              Floors 4 · 5 · 6 · 7 (resident areas)
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button className="surface-soft p-3 text-xs flex flex-col items-center gap-1">
              <QrCode className="size-4 text-accent" />
              Guest pass
            </button>
            <button className="surface-soft p-3 text-xs flex flex-col items-center gap-1">
              <Fingerprint className="size-4 text-accent" />
              Biometric
            </button>
            <button className="surface-soft p-3 text-xs flex flex-col items-center gap-1">
              <KeyRound className="size-4 text-accent" />
              Backup PIN
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent access events"
            hint="Live from Kisi / Openpath edge readers"
          />
          {events.length === 0 ? (
            <div className="text-sm text-ink-soft text-center py-6">
              No taps yet.
            </div>
          ) : (
            <ul className="flex flex-col">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between border-b border-bg-border last:border-0 py-3"
                >
                  <div>
                    <div className="text-sm font-medium">{e.doorName}</div>
                    <div className="text-xs text-ink-soft">
                      Floor {e.floor} · {e.credential} · {relativeTime(e.at)}
                    </div>
                  </div>
                  <Badge
                    tone={
                      e.outcome === "granted"
                        ? "success"
                        : e.outcome === "denied"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {e.outcome}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <SectionTitle hint="Where you can go right now">Your entitlements</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            ["Floor 7", "Recording studios · vocal booth"],
            ["Floor 6", "AI Studio · LED volume · edit bays"],
            ["Floor 5", "Listening lounge · member lockers"],
            ["Floor 4", "Business & deal floor"],
          ].map(([f, d]) => (
            <div key={f} className="surface-soft p-4">
              <div className="text-sm font-medium">{f}</div>
              <div className="text-xs text-ink-soft mt-1">{d}</div>
              <Badge tone="success" className="mt-3">
                Permitted
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
