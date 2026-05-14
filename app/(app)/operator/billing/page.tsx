import { payments, userById } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default function OperatorBilling() {
  const succeeded = payments.filter((p) => p.status === "succeeded");
  const failed = payments.filter((p) => p.status === "failed");
  const overdue = payments.filter((p) => p.status === "pending");
  const ar = succeeded.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader
        eyebrow="Billing oversight"
        title="Revenue, AR & AP"
        description="Stripe Billing, Connect, Tax, and Identity unified into one revenue plane."
      />

      <div className="grid grid-cols-4 gap-3">
        <Stat tone="operator" label="Collected" value={formatCurrency(ar)} delta={11.4} />
        <Stat tone="operator" label="Open invoices" value={overdue.length} hint={formatCurrency(overdue.reduce((s, p) => s + p.amount, 0))} />
        <Stat tone="operator" label="Failed" value={failed.length} delta={-0.4} />
        <Stat tone="operator" label="Net MRR" value="$184k" delta={6.2} />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="Recent transactions" hint="Filtered: all payers" />
          <Table>
            <THead>
              <tr>
                <TH>Payer</TH>
                <TH>Description</TH>
                <TH>Kind</TH>
                <TH>Date</TH>
                <TH>Status</TH>
                <TH className="text-right">Amount</TH>
              </tr>
            </THead>
            <tbody>
              {payments.map((p) => (
                <TR key={p.id}>
                  <TD>{userById(p.userId)?.name ?? p.userId}</TD>
                  <TD>{p.description}</TD>
                  <TD className="text-xs text-ink-soft">{p.kind.replace("_", " ")}</TD>
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
                  <TD className="text-right font-medium">{formatCurrency(p.amount)}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  );
}
