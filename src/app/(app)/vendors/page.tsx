import { Suspense } from "react";
import { VendorList } from "@/components/vendor-list";

export default function VendorsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading vendors…</p>}>
      <VendorList />
    </Suspense>
  );
}
