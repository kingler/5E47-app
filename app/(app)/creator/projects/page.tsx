import { getCurrentUser } from "@/lib/auth";
import { projects, userById } from "@/lib/data";
import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";

export default async function CreatorProjects() {
  const user = (await getCurrentUser())!;
  const mine = projects.filter((p) => p.creatorId === user.id);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Your slate"
        description="Track everything from concept to shipped. Sponsor-attached projects sync with the sponsor portal."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mine.map((p) => (
          <Card key={p.id}>
            <CardHeader
              title={p.title}
              hint={`Updated ${relativeTime(p.updatedAt)}`}
              action={
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
              }
            />
            <div className="text-xs text-ink-soft">
              {p.collaborators.length} collaborator{p.collaborators.length === 1 ? "" : "s"}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {p.collaborators.map((c) => {
                const u = userById(c);
                return (
                  <span key={c} className="pill">
                    {u?.name ?? c}
                  </span>
                );
              })}
              {p.greenlit && <Badge tone="accent">Greenlit</Badge>}
              {p.sponsorId && <Badge tone="sponsor">Sponsored</Badge>}
            </div>
          </Card>
        ))}
        {mine.length === 0 && (
          <div className="surface p-8 text-center text-ink-soft text-sm md:col-span-3">
            You haven't started any projects yet.
          </div>
        )}
      </div>
    </>
  );
}
