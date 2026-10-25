import { Suspense } from "react";
import { notFound } from "next/navigation";
import { VendorDetailView } from "@/components/vendor-detail";
import { details, getVendor, vendors } from "@/lib/data";

export function generateStaticParams() {
  return vendors.map((vendor) => ({ slug: vendor.slug }));
}

export default function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
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
  return <VendorDetailView vendor={vendor} detail={detail} />;
}
