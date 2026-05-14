import { ShieldCheck } from "lucide-react";
import { accessEvents, userById } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { relativeTime } from "@/lib/utils";

export default function OperatorAccess() {
  const granted = accessEvents.filter((e) => e.outcome === "granted").length;
  const denied = accessEvents.filter((e) => e.outcome === "denied").length;
  const escorted = accessEvents.filter((e) => e.outcome === "escorted").length;
  return (
    <>
      <PageHeader
        eyebrow="Access control"
        title="Smart access fabric"
        description="Live integration with Kisi / Openpath / Brivo / HID. Permissions, taps, anomalies, and lockdown controls."
        action={
          <button className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-2 text-sm hover:bg-red-500/20">
            Initiate lockdown
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-3">
        <Stat tone="operator" label="Granted today" value={granted} delta={3.4} />
        <Stat tone="operator" label="Denied" value={denied} hint="Investigate" />
        <Stat tone="operator" label="Escorted" value={escorted} hint="VIP / guest passes" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Tap log"
            hint="All credential events"
            action={<ShieldCheck className="size-4 text-ink-soft" />}
          />
          <Table>
            <THead>
              <tr>
                <TH>Person</TH>
                <TH>Door</TH>
                <TH>Floor</TH>
                <TH>Credential</TH>
                <TH>Outcome</TH>
                <TH>When</TH>
              </tr>
            </THead>
            <tbody>
              {accessEvents.map((e) => {
                const u = userById(e.userId);
                return (
                  <TR key={e.id}>
                    <TD>{u?.name ?? e.userId}</TD>
                    <TD>{e.doorName}</TD>
                    <TD>{e.floor}</TD>
                    <TD className="capitalize">{e.credential}</TD>
                    <TD>
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
                    </TD>
                    <TD className="text-xs text-ink-soft">{relativeTime(e.at)}</TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader title="Floor policy" hint="Role → entitlement" />
          <ul className="text-sm flex flex-col gap-2">
            {[
              ["Creator", "Assigned floors + bookings"],
              ["Sponsor", "Event-only / escorted"],
              ["Investor", "Dashboard / scheduled visit"],
              ["VIP", "Private entrance"],
              ["Operator", "Full access"],
            ].map(([role, rule]) => (
              <li
                key={role}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
              >
                <span className="font-medium">{role}</span>
                <span className="text-xs text-ink-soft">{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
