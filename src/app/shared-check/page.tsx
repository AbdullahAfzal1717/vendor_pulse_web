import { parseSnapshot } from "@vendorpulse/shared";

const snapshot = parseSnapshot({
  vendor: "openai",
  accountName: "Acme AI Organization",
  capturedAt: "2026-10-25T12:00:00.000Z",
  source: "sdk",
  creditsLeft: 38.2,
  usageAmount: 161.8,
  usageUnit: "usd",
  renewalDate: "2026-11-01",
});

export default function SharedCheckPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 py-16">
      <h1 className="text-[28px] font-semibold tracking-tight">
        Shared package
      </h1>
      <p className="mt-4 text-sm text-muted">
        {snapshot.vendor} credits {snapshot.creditsLeft}
      </p>
    </main>
  );
}
