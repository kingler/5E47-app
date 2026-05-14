import { getCurrentUser } from "@/lib/auth";
import { campaigns } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { formatCompact, formatCurrency, formatDate } from "@/lib/utils";

export default async function CampaignsPage() {
  const user = (await getCurrentUser())!;
  const mine = campaigns.filter((c) => c.sponsorOrgId === user.organizationId);

  return (
    <>
      <PageHeader
        eyebrow="Campaigns"
        title="Activations & contracts"
        description="Stripe-billed sponsorship contracts attached to creator slates."
      />

      <Card>
        <CardHeader title="All campaigns" hint={`${mine.length} total`} />
        <Table>
          <THead>
            <tr>
              <TH>Campaign</TH>
              <TH>Window</TH>
              <TH>Status</TH>
              <TH className="text-right">Budget</TH>
              <TH className="text-right">Spent</TH>
              <TH className="text-right">Impressions</TH>
              <TH className="text-right">Creators</TH>
            </tr>
          </THead>
          <tbody>
            {mine.map((c) => (
              <TR key={c.id}>
                <TD className="font-medium">{c.name}</TD>
                <TD className="text-xs text-ink-soft">
                  {formatDate(c.startsAt)} → {formatDate(c.endsAt)}
                </TD>
                <TD>
                  <Badge
                    tone={
                      c.status === "active"
                        ? "success"
                        : c.status === "wrap"
                          ? "warning"
                          : c.status === "completed"
                            ? "neutral"
                            : "info"
                    }
                  >
                    {c.status}
                  </Badge>
                </TD>
                <TD className="text-right">{formatCurrency(c.budget)}</TD>
                <TD className="text-right">{formatCurrency(c.spent)}</TD>
                <TD className="text-right">{formatCompact(c.impressions)}</TD>
                <TD className="text-right">{c.creatorReach}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
