"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VendorTable } from "@/components/vendor-table";
import { Button, PageTitle } from "@/components/ui";
import { filterVendors, filters, type VendorFilter } from "@/lib/data";

export function VendorList() {
  const params = useSearchParams();
  const requested = params.get("filter") ?? "All";
  const filter = (filters as readonly string[]).includes(requested) ? (requested as VendorFilter) : "All";
  const saved = params.get("saved") === "1";

  return (
    <>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <PageTitle>Vendors</PageTitle>
        <Button href="/vendors/new" variant="primary">
          Add vendor manually
        </Button>
      </div>
      {saved ? (
        <p className="mb-3.5 rounded-lg bg-good-soft px-3 py-2.5 text-[13px] text-[#1d5c45]">
          Vendor saved. API keys stay in your environment; this entry is manual.
        </p>
      ) : null}
      <div className="mb-3.5 flex flex-wrap gap-2">
        {filters.map((item) => (
          <Link
            key={item}
            href={item === "All" ? "/vendors" : `/vendors?filter=${item}`}
            className={`rounded-full border px-3 py-1.5 text-[12.5px] ${filter === item ? "border-[#9dbce7] bg-blue-soft text-blue" : "border-line bg-white text-muted hover:border-[#9dbce7] hover:bg-blue-soft hover:text-blue"}`}
          >
            {item}
          </Link>
        ))}
      </div>
      <VendorTable vendors={filterVendors(filter)} mode="list" />
    </>
  );
}
