import { PageHeader } from "@/components/ui/section";
import { Card, CardHeader } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { MiniBar, Sparkline } from "@/components/charts/bar";
import { arrSeries } from "@/lib/data";

export default function FinancialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financials"
        title="P&L, cash, runway"
        description="Reported numbers, ledger-attached, sourced from Stripe + GL warehouse."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat tone="investor" label="Revenue (TTM)" value="$4.9M" delta={14.2} />
        <Stat tone="investor" label="Gross margin" value="62%" delta={1.6} />
        <Stat tone="investor" label="Operating cash" value="$3.1M" hint="Run-rate 14mo" />
        <Stat tone="investor" label="Burn (net)" value="$220k/mo" delta={-4.4} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue · 12mo" />
          <Sparkline data={arrSeries()} tone="investor" height={160} />
        </Card>
        <Card>
          <CardHeader title="OpEx mix" hint="Latest month" />
          <MiniBar data={[42, 28, 14, 9, 7]} tone="investor" />
          <div className="grid grid-cols-5 text-[10px] text-ink-soft mt-1">
            {["People", "Lease", "Tech", "G&A", "Other"].map((d) => (
              <span key={d} className="text-center">{d}</span>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
