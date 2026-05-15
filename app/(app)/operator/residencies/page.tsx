import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { residencies, userById } from "@/lib/data";
import { bus } from "@/lib/events";
import { can } from "@/lib/rbac";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ResidencyStatus } from "@/lib/types";

async function updateStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ResidencyStatus;
  const res = residencies.find((r) => r.id === id);
  if (!res) return;
  res.status = status;
  if (status === "approved" || status === "active") {
    bus.emit("creator.approved", { residencyId: id, creatorId: res.creatorId });
  }
  redirect("/operator/residencies");
}

export default async function ResidenciesPage() {
  const user = (await getCurrentUser())!;
  const canApprove = can(user.role, "residency.approve");

  return (
    <>
      <PageHeader
        eyebrow="Residencies"
        title="Applicants & active members"
        description="Approve applications, manage tiers, and rotate residencies across floors."
      />
      <Card>
        <CardHeader title="All residencies" hint={`${residencies.length} total`} />
        <Table>
          <THead>
            <tr>
              <TH>Creator</TH>
              <TH>Tier</TH>
              <TH>Floor</TH>
              <TH>Window</TH>
              <TH>Fee</TH>
              <TH>Status</TH>
              <TH className="text-right">Actions</TH>
            </tr>
          </THead>
          <tbody>
            {residencies.map((r) => {
              const c = userById(r.creatorId);
              return (
                <TR key={r.id}>
                  <TD>
                    <div className="font-medium">{c?.name ?? r.creatorId}</div>
                    <div className="text-xs text-ink-soft">{c?.email}</div>
                  </TD>
                  <TD className="capitalize">{r.tier}</TD>
                  <TD>{r.floor}</TD>
                  <TD className="text-xs text-ink-muted">
                    {r.startsAt ? formatDate(r.startsAt) : "—"}
                    {" → "}
                    {r.endsAt ? formatDate(r.endsAt) : "—"}
                  </TD>
                  <TD>{formatCurrency(r.monthlyFee)}/mo</TD>
                  <TD>
                    <Badge
                      tone={
                        r.status === "active" || r.status === "approved"
                          ? "success"
                          : r.status === "in_review"
                            ? "warning"
                            : r.status === "rejected"
                              ? "danger"
                              : "neutral"
                      }
                    >
                      {r.status.replace("_", " ")}
                    </Badge>
                  </TD>
                  <TD className="text-right">
                    {canApprove && (r.status === "in_review" || r.status === "applied") ? (
                      <div className="flex justify-end gap-2">
                        <form action={updateStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="approved" />
                          <Button type="submit" variant="primary" size="sm">
                            Approve
                          </Button>
                        </form>
                        <form action={updateStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value="rejected" />
                          <Button type="submit" variant="danger" size="sm">
                            Reject
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-xs text-ink-soft">—</span>
                    )}
                  </TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
