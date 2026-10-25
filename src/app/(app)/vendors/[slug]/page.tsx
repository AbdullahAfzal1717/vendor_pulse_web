import { Suspense } from "react";
import { io } from "next/cache";
import { notFound } from "next/navigation";
import { db, snapshots } from "@vendorpulse/db";
import { VendorDetailView } from "@/components/vendor-detail";
import { details, getVendor, vendors, type VendorDetail } from "@/lib/data";

export function generateStaticParams() {
  return vendors.map((vendor) => ({ slug: vendor.slug }));
}

export default function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading vendor…</p>}>
      <VendorBody params={params} />
    </Suspense>
  );
}

async function VendorBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = getVendor(slug);
  const detail = details[slug];
  if (!vendor || !detail) notFound();

  await io();
  const rows = await db.select().from(snapshots);
  const latest = rows
    .filter((row) => row.vendor === slug)
    .sort(
      (a, b) =>
        new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime(),
    )[0];

  const liveDetail: VendorDetail = latest
    ? {
        ...detail,
        metrics: detail.metrics.map(([label, value]) => {
          if (label === "Credits left" && latest.creditsLeft != null) {
            return [label, `$${latest.creditsLeft.toFixed(2)}`];
          }
          if (label === "Usage" && latest.usageAmount != null) {
            return [label, `$${latest.usageAmount.toFixed(2)}`];
          }
          return [label, value];
        }),
      }
    : detail;

  const liveVendor = latest
    ? { ...vendor, syncedLong: new Date(latest.capturedAt).toLocaleString() }
    : vendor;

  return <VendorDetailView vendor={liveVendor} detail={liveDetail} />;
}
