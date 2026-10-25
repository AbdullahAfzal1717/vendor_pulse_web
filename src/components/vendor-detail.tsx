"use client";

import { useState } from "react";
import { Button, Card, Notice, PageTitle } from "@/components/ui";
import type { Vendor, VendorDetail } from "@/lib/data";

const riskClass = {
  critical: "border-[#f4d3d5] bg-risk-soft text-[#7e2b32]",
  watch: "border-[#f3e2b8] bg-amber-soft text-[#7a5410]",
  healthy: "border-[#c9eadc] bg-good-soft text-[#1d5c45]",
  manual: "border-line bg-[#f6f7f8] text-[#3e4a55]",
};

export function VendorDetailView({ vendor, detail }: { vendor: Vendor; detail: VendorDetail }) {
  const [synced, setSynced] = useState(vendor.syncedLong);
  const [refreshed, setRefreshed] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  return (
    <>
      <PageTitle>
        {vendor.name} — {vendor.detailAccount}
      </PageTitle>
      <p className="mt-2 text-[13px] text-muted">Connection: {detail.connection}</p>
      <p className="text-[13px] text-muted">Last synced: {synced}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {detail.metrics.map(([label, value]) => (
          <Card key={label} className="px-4 py-4">
            <p className="mb-1.5 text-xs text-muted">{label}</p>
            <p className="text-[22px] font-bold tracking-tight">{value}</p>
          </Card>
        ))}
      </div>

      <div className={`mt-4 rounded-[10px] border px-4 py-4 ${riskClass[detail.riskTone]}`}>
        <strong className="mb-1 block">Risk: {detail.risk}</strong>
        <p className="text-[13.5px] leading-relaxed">{detail.riskText}</p>
      </div>

      {detail.trend ? (
        <Card className="mt-4 px-4 pt-4 pb-2">
          <h2 className="text-base font-semibold">Usage trend</h2>
          <div className="mt-4 flex h-[92px] items-end gap-2 border-b border-line">
            {detail.trend.map((height, index) => (
              <i key={index} className="flex-1 rounded-t" style={{ height: `${height}%`, background: "linear-gradient(#8eb6f0, #3977d6)" }} />
            ))}
          </div>
          <p className="py-2.5 text-xs text-muted">Last 30 days</p>
        </Card>
      ) : null}

      <h2 className="mt-5 mb-2.5 text-[15px] font-semibold">Account information</h2>
      <Card className="px-4">
        {detail.info.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-line py-3 text-[13.5px] last:border-b-0">
            <span className="text-muted">{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            setSynced("just now");
            setRefreshed(true);
          }}
        >
          {refreshed ? "Synced just now" : "Refresh now"}
        </Button>
        <Button href="/alerts">Configure alert</Button>
        <Button onClick={() => setDisconnected(true)}>Disconnect</Button>
      </div>
      {disconnected ? (
        <div className="mt-3.5">
          <Notice>Disconnected. VendorPulse will stop receiving snapshots for this account. The vendor API key was never stored here.</Notice>
        </div>
      ) : null}
    </>
  );
}
