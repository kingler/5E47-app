import { CreditCard } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { payments } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default async function CreatorPayments() {
  const user = (await getCurrentUser())!;
  const mine = payments.filter((p) => p.userId === user.id);
  const succeeded = mine.filter((p) => p.status === "succeeded");
  const pending = mine.filter((p) => p.status === "pending");
  const total = succeeded.reduce((s, p) => s + p.amount, 0);
  const due = pending.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader
        eyebrow="Payments"
        title="Billing & payouts"
        description="Stripe Billing handles residency fees, bookings, equipment, and hospitality. Connect handles payouts when you collaborate as a vendor."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat tone="creator" label="Paid YTD" value={formatCurrency(total)} delta={11.2} />
        <Stat tone="creator" label="Balance due" value={formatCurrency(due)} hint={`${pending.length} open`} />
        <Stat tone="creator" label="Default method" value="•••• 4242" hint="Auto-pay enabled" />
        <Stat tone="creator" label="Tax docs" value="W-9 on file" hint="Stripe Identity" />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader
            title="Transaction history"
            hint="Synced from Stripe"
            action={<CreditCard className="size-4 text-ink-soft" />}
          />
          <Table>
            <THead>
              <tr>
                <TH>Description</TH>
                <TH>Type</TH>
                <TH>Date</TH>
                <TH>Status</TH>
                <TH className="text-right">Amount</TH>
              </tr>
            </THead>
            <tbody>
              {mine.map((p) => (
                <TR key={p.id}>
                  <TD>{p.description}</TD>
                  <TD className="text-ink-muted text-xs">
                    {p.kind.replace("_", " ")}
                  </TD>
                  <TD>{formatDateTime(p.createdAt)}</TD>
                  <TD>
                    <Badge
                      tone={
                        p.status === "succeeded"
                          ? "success"
                          : p.status === "pending"
                            ? "warning"
                            : p.status === "failed"
                              ? "danger"
                              : "neutral"
                      }
                    >
                      {p.status}
                    </Badge>
                  </TD>
                  <TD className="text-right font-medium">
                    {formatCurrency(p.amount)}
                  </TD>
                </TR>
              ))}
              {mine.length === 0 && (
                <TR>
                  <TD className="text-center text-ink-soft py-8">
                    No payments yet.
                  </TD>
                </TR>
              )}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  );
}
