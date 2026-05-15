import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/shell/logo";
import { residencies, users } from "@/lib/data";
import { bus } from "@/lib/events";
import type { Residency, User } from "@/lib/types";

const HOUSES = [
  { id: "music", label: "Music" },
  { id: "video", label: "Video Production" },
  { id: "masterclass", label: "Masterclass" },
  { id: "founders", label: "Founders" },
] as const;

async function submitApplication(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const house = String(formData.get("house") ?? "");
  const referral = String(formData.get("referral") ?? "").trim();
  const work = String(formData.get("work") ?? "").trim();

  if (!name || !email || !house) {
    redirect("/apply?error=missing");
  }

  const id = `u_app_${Math.random().toString(36).slice(2, 8)}`;
  const newUser: User = {
    id,
    name,
    email,
    role: "creator",
    joinedAt: new Date().toISOString(),
  };
  users.push(newUser);

  const residency: Residency = {
    id: `res_${Math.random().toString(36).slice(2, 8)}`,
    creatorId: id,
    status: "in_review",
    tier: "explorer",
    floor: 4,
    monthlyFee: 800,
  };
  residencies.push(residency);

  bus.emit(
    "creator.applied",
    { applicantId: id, name, email, house, referral, work },
    id,
  );

  redirect("/apply?status=received");
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const params = await searchParams;
  const received = params.status === "received";
  const error = params.error;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-bg/70 border-b border-bg-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-[13px] text-ink-muted hover:text-ink inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>
        </div>
      </header>

      <div className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-6">
            <Lock className="size-3" />
            By invitation or referral · NYC
          </div>

          {received ? (
            <ConfirmationView />
          ) : (
            <>
              <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.0]">
                Tell us who you are
                <br />
                <span className="italic text-ink-muted">and what you're making.</span>
              </h1>
              <p className="mt-8 text-ink-muted max-w-xl">
                We read every application. Membership is intentionally small.
                Replies arrive within ten days.
              </p>

              {error === "missing" && (
                <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                  A name, email, and house are required.
                </div>
              )}

              <form action={submitApplication} className="mt-12 flex flex-col gap-8">
                <Field label="Name" name="name" placeholder="As you'd like to be addressed" required />
                <Field label="Email" name="email" type="email" placeholder="you@where-you-work.com" required />

                <div className="flex flex-col gap-3">
                  <label className="label">Which house</label>
                  <div className="grid grid-cols-2 gap-px bg-bg-border rounded-xl overflow-hidden">
                    {HOUSES.map((h) => (
                      <label
                        key={h.id}
                        className="bg-bg-elev px-5 py-4 cursor-pointer hover:bg-bg-card has-[:checked]:bg-bg-card has-[:checked]:ring-1 has-[:checked]:ring-accent transition-colors"
                      >
                        <input
                          type="radio"
                          name="house"
                          value={h.id}
                          className="sr-only peer"
                          required
                          defaultChecked={h.id === "music"}
                        />
                        <div className="font-serif text-lg">{h.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <Field
                  label="Referral (optional)"
                  name="referral"
                  placeholder="A member who knows your work"
                />

                <div className="flex flex-col gap-3">
                  <label className="label">What are you making right now?</label>
                  <textarea
                    name="work"
                    rows={5}
                    placeholder="A sentence. A paragraph. The shape of the year ahead."
                    className="bg-transparent border-b border-bg-border focus:border-ink-muted focus:outline-none py-3 text-base placeholder:text-ink-soft resize-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-bg-border">
                  <p className="text-xs text-ink-soft max-w-xs">
                    We'll keep this between you and the membership committee.
                  </p>
                  <button
                    type="submit"
                    className="rounded-full bg-accent text-accent-ink px-7 py-3 text-sm font-medium hover:bg-accent-muted shadow-glow"
                  >
                    Submit application
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="label">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border-b border-bg-border focus:border-ink-muted focus:outline-none py-3 text-base placeholder:text-ink-soft transition-colors"
      />
    </div>
  );
}

function ConfirmationView() {
  return (
    <div className="mt-16 text-center">
      <div className="inline-flex items-center justify-center size-16 rounded-full border border-accent/40 bg-accent/10 mb-8">
        <Check className="size-7 text-accent" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
        Application received.
        <br />
        <span className="italic text-ink-muted">Thank you.</span>
      </h1>
      <p className="mt-8 text-ink-muted max-w-md mx-auto">
        The committee meets weekly. You'll hear from us within ten days —
        sooner if a referral is on file.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elev px-6 py-3 text-sm hover:border-ink-soft"
        >
          <ArrowLeft className="size-4" /> Return home
        </Link>
      </div>
    </div>
  );
}
