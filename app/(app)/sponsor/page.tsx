import Link from "next/link";
import { Megaphone, Sparkles, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { campaigns, organizations, projects, userById } from "@/lib/data";
import { PageHeader, SectionTitle } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/charts/bar";
import { formatCompact, formatCurrency, relativeTime } from "@/lib/utils";

export default async function SponsorOverview() {
  const user = (await getCurrentUser())!;
  const myCampaigns = campaigns.filter(
    (c) => c.sponsorOrgId === user.organizationId,
  );
  const org = organizations.find((o) => o.id === user.organizationId);

  const totalBudget = myCampaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpent = myCampaigns.reduce((s, c) => s + c.spent, 0);
  const totalImpressions = myCampaigns.reduce((s, c) => s + c.impressions, 0);
  const totalReach = myCampaigns.reduce((s, c) => s + c.creatorReach, 0);

  const sponsoredProjects = projects.filter(
    (p) => p.sponsorId === user.organizationId,
  );

  return (
    <>
      <PageHeader
        eyebrow={org?.name ?? "Sponsor"}
        title="Activation command center"
        description="Campaigns, creator engagement, asset pipeline, and ROI in one view."
        action={
          <Link
            href="/sponsor/campaigns"
            className="rounded-xl bg-accent text-accent-ink px-4 py-2 text-sm font-medium hover:bg-accent-muted"
          >
            New campaign
          </Link>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="sponsor" label="Budget allocated" value={formatCurrency(totalBudget)} hint={`${myCampaigns.length} campaigns`} />
        <Stat tone="sponsor" label="Spent" value={formatCurrency(totalSpent)} delta={6.4} />
        <Stat tone="sponsor" label="Impressions" value={formatCompact(totalImpressions)} delta={12.7} />
        <Stat tone="sponsor" label="Creator reach" value={totalReach} delta={3.1} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Campaigns"
            hint="Active & wrap"
            action={<Megaphone className="size-4 text-ink-soft" />}
          />
          <div className="flex flex-col gap-3">
            {myCampaigns.map((c) => {
              const pct = Math.round((c.spent / c.budget) * 100);
              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-bg-border bg-bg-elev p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-ink-soft">
                        {formatCurrency(c.spent)} of {formatCurrency(c.budget)} · {pct}%
                      </div>
                    </div>
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
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-bg-card overflow-hidden">
                    <div
                      className="h-full bg-role-sponsor"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 text-xs">
                    <div>
                      <div className="text-ink-soft">Impressions</div>
                      <div className="font-medium">{formatCompact(c.impressions)}</div>
                    </div>
                    <div>
                      <div className="text-ink-soft">Creators</div>
                      <div className="font-medium">{c.creatorReach}</div>
                    </div>
                    <div>
                      <div className="text-ink-soft">Assets</div>
                      <div className="font-medium">{c.assets}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            {myCampaigns.length === 0 && (
              <div className="text-sm text-ink-soft text-center py-6">
                No campaigns yet.
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Engagement curve"
            hint="Trailing impressions"
            action={<Sparkles className="size-4 text-accent" />}
          />
          <Sparkline
            data={[120, 140, 180, 220, 260, 240, 310, 360, 400, 460, 520, 590]}
            tone="sponsor"
            height={140}
          />
          <div className="mt-3 text-xs text-ink-soft">
            Strong week-over-week growth — driven by the Spring Slate.
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardHeader
            title="Sponsored projects"
            hint="First-look attached"
            action={<Users className="size-4 text-ink-soft" />}
          />
          <ul className="flex flex-col">
            {sponsoredProjects.map((p) => {
              const c = userById(p.creatorId);
              return (
                <li
                  key={p.id}
                  className="flex items-center justify-between border-b border-bg-border last:border-0 py-2.5"
                >
                  <div>
                    <div className="text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-ink-soft">
                      {c?.name} · updated {relativeTime(p.updatedAt)}
                    </div>
                  </div>
                  <Badge
                    tone={
                      p.status === "in_production"
                        ? "info"
                        : p.status === "review"
                          ? "warning"
                          : p.status === "shipped"
                            ? "success"
                            : "neutral"
                    }
                  >
                    {p.status.replace("_", " ")}
                  </Badge>
                </li>
              );
            })}
            {sponsoredProjects.length === 0 && (
              <li className="text-sm text-ink-soft py-4 text-center">
                No projects attached.
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Creator demographics" hint="Reached audience" />
          <ul className="space-y-2 text-sm">
            {[
              ["Music", 38],
              ["Film & TV", 24],
              ["Podcast", 18],
              ["Visual / Photo", 12],
              ["Other", 8],
            ].map(([label, pct]) => (
              <li key={label as string} className="flex items-center gap-3">
                <div className="w-24 text-xs text-ink-soft">{label}</div>
                <div className="flex-1 h-2 rounded-full bg-bg-elev overflow-hidden">
                  <div
                    className="h-full bg-role-sponsor"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-10 text-right text-xs text-ink-muted">{pct}%</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
