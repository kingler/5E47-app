import { Activity, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TH, TR, TD } from "@/components/ui/table";
import { ALL_AGENTS } from "@/lib/agents/registry";
import { scarcityReport, churnSignals } from "@/lib/agents/predictive";
import { RecommendationControl } from "@/components/agents/recommendation-control";
import { bus } from "@/lib/events";
import { relativeTime } from "@/lib/utils";

export default function AgentConsolePage() {
  const report = scarcityReport();
  const churn = churnSignals();
  const recentAgentEvents = bus
    .recent(40)
    .filter((e) => e.type.startsWith("agent.") || e.type === "scarcity.recomputed")
    .slice(0, 8);

  return (
    <>
      <PageHeader
        eyebrow="Agent operations"
        title="Sam & the subagents"
        description="The multi-agent system that runs 5E47 — orchestration, day-to-day operations, and the predictive layer that holds the scarcity band."
        action={
          <Badge tone="operator">
            <Activity className="size-3 text-emerald-400" /> System {report.overall.inBand ? "in band" : "out of band"}
          </Badge>
        }
      />

      {/* Predictive headline */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          tone="operator"
          label="Occupancy"
          value={`${(report.overall.occupancy * 100).toFixed(1)}%`}
          hint={`Target ${report.overall.band.low * 100}–${report.overall.band.high * 100}% · ${report.overall.active}/${report.overall.cap}`}
        />
        <Stat tone="operator" label="Exclusivity index" value={`${report.overall.exclusivityIndex}/100`} />
        <Stat tone="operator" label="Brand heat" value={`${report.overall.brandHeat}/100`} hint="Marketing momentum" />
        <Stat
          tone="operator"
          label="Pricing signal"
          value={`×${report.pricing.multiplier.toFixed(3)}`}
          hint="Bounded 1.00–1.25"
        />
      </div>

      {/* Recommendation */}
      <div className="mt-6">
        <Card>
          <CardHeader
            title="Cycle recommendation"
            hint="Sam recommends; the committee ratifies. Admissions & pricing are never auto-applied."
            action={<Badge tone="accent">{report.recommendation.action.toUpperCase()}</Badge>}
          />
          <p className="text-sm text-ink-muted">{report.recommendation.rationale}</p>
          <p className="text-xs text-ink-soft">{report.pricing.note}</p>
          <div className="pt-2">
            <RecommendationControl action={report.recommendation.action} />
          </div>
        </Card>
      </div>

      {/* Scarcity by House */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Scarcity by House" hint="Occupancy vs. cap, waitlist pressure, demand forecast" />
          <Table>
            <THead>
              <tr>
                <TH>House</TH>
                <TH>Occupancy</TH>
                <TH>Waitlist</TH>
                <TH>Exclusivity</TH>
                <TH>Forecast</TH>
                <TH>Action</TH>
              </tr>
            </THead>
            <tbody>
              {report.houses.map((h) => (
                <TR key={h.house}>
                  <TD>
                    <div className="font-medium">{h.label}</div>
                    <div className="text-xs text-ink-soft">{h.active}/{h.cap} · {h.openSlots} open</div>
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-bg-elev overflow-hidden">
                        <div
                          className="h-full bg-role-operator"
                          style={{ width: `${Math.min(100, h.occupancy * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums">{(h.occupancy * 100).toFixed(0)}%</span>
                    </div>
                  </TD>
                  <TD>
                    <div>{h.waitlist}</div>
                    <div className="text-xs text-ink-soft">{h.waitlistPressure}/slot</div>
                  </TD>
                  <TD className="tabular-nums">{h.exclusivityIndex}</TD>
                  <TD className="tabular-nums">{h.forecastNextCycle}</TD>
                  <TD>
                    <Badge
                      tone={
                        h.recommendation.action === "admit"
                          ? "info"
                          : h.recommendation.action === "raise"
                            ? "accent"
                            : "neutral"
                      }
                    >
                      {h.recommendation.action}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader title="Churn watch" hint="Members needing attention" />
          <div className="flex flex-col gap-2">
            {churn.map((c) => (
              <div
                key={c.userId}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="text-sm truncate">{c.name}</div>
                  <div className="text-[11px] text-ink-soft truncate">{c.reason}</div>
                </div>
                <Badge tone={c.risk >= 60 ? "danger" : c.risk >= 40 ? "warning" : "success"}>
                  {c.risk}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Agent roster */}
      <div className="mt-6">
        <Card>
          <CardHeader title="Agent roster" hint="Sam orchestrates; each subagent owns a Business Model Canvas block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ALL_AGENTS.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-4 flex flex-col gap-2 ${
                  a.kind === "orchestrator"
                    ? "border-accent/30 bg-accent/[0.04]"
                    : "border-bg-border bg-bg-elev"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className={`size-4 ${a.kind === "orchestrator" ? "text-accent" : "text-ink-soft"}`} />
                    <span className="text-sm font-medium">{a.name}</span>
                  </div>
                  <span className="size-1.5 rounded-full bg-emerald-400" title="online" />
                </div>
                <div className="text-[11px] text-ink-soft">{a.title}</div>
                <div className="text-[11px] text-ink-muted leading-snug">{a.description}</div>
                <Badge tone="neutral" className="self-start mt-1">{a.canvasBlock}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Live delegation trace */}
      <div className="mt-6">
        <Card>
          <CardHeader title="Live delegation trace" hint="Recent agent activity (audited domain events)" />
          {recentAgentEvents.length === 0 ? (
            <div className="text-sm text-ink-soft py-4 text-center">
              No agent activity yet — start a conversation in the Concierge to see Sam delegate here.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentAgentEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elev px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge tone="accent">{e.type.replace("agent.", "")}</Badge>
                    <span className="text-ink-muted truncate">
                      {typeof e.payload === "object" && e.payload
                        ? JSON.stringify(e.payload).slice(0, 80)
                        : String(e.payload)}
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-soft shrink-0">{relativeTime(e.at)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
