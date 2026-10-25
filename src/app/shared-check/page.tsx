import { Suspense } from "react";
import { io } from "next/cache";
import { db, snapshots } from "@vendorpulse/db";
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
        Checklist: {snapshot.vendor} credits {snapshot.creditsLeft}
      </p>
      <h2 className="mt-8 text-lg font-semibold">Saved readings</h2>
      <Suspense
        fallback={
          <p className="mt-3 text-sm text-muted">Loading saved readings...</p>
        }
      >
        <SavedReadings />
      </Suspense>
    </main>
  );
}

async function SavedReadings() {
  await io();
  const rows = await db.select().from(snapshots);

  if (rows.length === 0) {
    return <p className="mt-3 text-sm text-muted">No readings saved yet.</p>;
  }

  return (
    <ul className="mt-3 space-y-2 text-sm">
      {rows.map((row) => (
        <li key={row.id}>
          {row.vendor} credits {row.creditsLeft}
        </li>
      ))}
    </ul>
  );
}
