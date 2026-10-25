"use client";

import { useRouter } from "next/navigation";
import { Severity } from "@/components/ui";
import type { Vendor } from "@/lib/data";

export function VendorTable({ vendors, mode }: { vendors: Vendor[]; mode: "home" | "list" }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr className="bg-[#fbfcfd] text-left text-[11px] font-bold tracking-wide text-muted uppercase">
            <th className="px-4 py-3">Vendor</th>
            {mode === "list" ? <th className="px-4 py-3">Account</th> : null}
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">{mode === "home" ? "Credits / Usage" : "Credits/Usage"}</th>
            <th className="px-4 py-3">Renewal</th>
            {mode === "home" ? <th className="px-4 py-3">Synced</th> : null}
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr
              key={vendor.slug}
              className="cursor-pointer border-t border-line hover:bg-[#fbfdff]"
              onClick={() => router.push(`/vendors/${vendor.slug}`)}
            >
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="flex items-center gap-2.5 font-bold">
                  <span className={`grid h-[26px] w-[26px] place-items-center rounded-[7px] text-[11px] font-extrabold text-white ${vendor.markClass}`}>
                    {vendor.mark}
                  </span>
                  {vendor.name}
                </span>
              </td>
              {mode === "list" ? <td className="px-4 py-3.5 whitespace-nowrap">{vendor.account}</td> : null}
              <td className="px-4 py-3.5 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Severity tone={vendor.tone} />
                  {vendor.status}
                </span>
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap">{mode === "home" ? vendor.homeUsage : vendor.listUsage}</td>
              <td className="px-4 py-3.5 whitespace-nowrap">{vendor.renewal}</td>
              {mode === "home" ? <td className="px-4 py-3.5 whitespace-nowrap text-muted">{vendor.synced}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
