import { VendorTable } from "@/components/vendor-table";
import { Button, Card, PageTitle, Severity } from "@/components/ui";
import { vendors } from "@/lib/data";

const attention = [
  {
    tone: "critical" as const,
    title: "OpenAI credits may run out in 4 days",
    meta: ["Remaining: $38.20", "Current burn rate: $9.55/day", "Last synced: 6 minutes ago"],
    href: "/vendors/openai",
    label: "View OpenAI",
  },
  {
    tone: "warning" as const,
    title: "Stripe invoice due in 3 days",
    meta: ["Upcoming invoice: $249.00", "Last synced: 22 minutes ago"],
    href: "/vendors/stripe",
    label: "View Stripe",
  },
  {
    tone: "warning" as const,
    title: "SendGrid usage is at 78% of monthly allowance",
    meta: ["Remaining: 12,400 emails", "Last synced: 18 minutes ago"],
    href: "/vendors/sendgrid",
    label: "View SendGrid",
  },
];

export default function HomePage() {
  return (
    <>
      <PageTitle>What needs attention?</PageTitle>
      <Card className="mt-6 overflow-hidden">
        {attention.map((item) => (
          <div key={item.title} className="grid grid-cols-[12px_1fr] items-center gap-3.5 border-b border-line px-4 py-4 last:border-b-0 sm:grid-cols-[12px_1fr_auto]">
            <Severity tone={item.tone} />
            <div>
              <p className="mb-1 text-[14.5px] font-bold">{item.title}</p>
              <p className="flex flex-wrap gap-x-3.5 gap-y-1 text-[12.5px] text-muted">
                {item.meta.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
            <Button href={item.href} className="col-start-2 sm:col-start-auto">
              {item.label}
            </Button>
          </div>
        ))}
      </Card>
      <h2 className="mt-7 mb-2.5 text-[15px] font-semibold">All vendors</h2>
      <VendorTable vendors={vendors} mode="home" />
    </>
  );
}
