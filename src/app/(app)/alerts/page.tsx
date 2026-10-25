"use client";

import { useState } from "react";
import { Button, Card, Field, PageTitle, Severity } from "@/components/ui";

type AlertState = "open" | "Acknowledged" | "Muted";

const startingAlerts = [
  {
    id: "openai",
    tone: "critical" as const,
    title: "OpenAI credits may run out in 4 days",
    meta: [
      ["Remaining credits", "$38.20"],
      ["Current burn rate", "$9.55/day"],
      ["Source", "SDK-fetched vendor data"],
    ],
    href: "/vendors/openai",
    canMute: true,
  },
  {
    id: "sendgrid",
    tone: "warning" as const,
    title: "SendGrid usage approaching monthly allowance",
    meta: [
      ["Used", "42,600 / 55,000 emails"],
      ["Source", "SDK-fetched vendor data"],
    ],
    href: "/vendors/sendgrid",
    canMute: false,
  },
];

export default function AlertsPage() {
  const [showRule, setShowRule] = useState(false);
  const [saved, setSaved] = useState(false);
  const [states, setStates] = useState<Record<string, AlertState>>({ openai: "open", sendgrid: "open" });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <PageTitle>Alerts</PageTitle>
        <Button
          variant="primary"
          onClick={() => {
            setSaved(false);
            setShowRule((open) => !open);
          }}
        >
          Create alert rule
        </Button>
      </div>
      {saved ? <p className="mb-3.5 rounded-lg bg-good-soft px-3 py-2.5 text-[13px] text-[#1d5c45]">Alert rule saved for this workspace.</p> : null}
      {showRule ? (
        <Card className="mb-4 px-4 py-4">
          <h2 className="mb-3 text-base font-semibold">Create alert rule</h2>
          <form
            className="flex flex-wrap items-end gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setShowRule(false);
              setSaved(true);
            }}
          >
            <div className="min-w-[180px] flex-1">
              <Field label="Metric" name="metric" defaultValue="Credit balance" />
            </div>
            <div className="min-w-[180px] flex-1">
              <Field label="Threshold" name="threshold" defaultValue="Below $20" />
            </div>
            <Button type="submit" variant="primary" className="mb-4">
              Save rule
            </Button>
          </form>
        </Card>
      ) : null}
      <Card className="overflow-hidden">
        {startingAlerts.map((alert) => {
          const state = states[alert.id];
          return (
            <div key={alert.id} className={`grid grid-cols-[12px_1fr] items-center gap-3.5 border-b border-line px-4 py-4 last:border-b-0 sm:grid-cols-[12px_1fr_auto] ${state === "Muted" ? "opacity-55" : ""}`}>
              <Severity tone={alert.tone} />
              <div>
                <p className="mb-1 text-[14.5px] font-bold">
                  {alert.title}{" "}
                  {state !== "open" ? (
                    <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${state === "Muted" ? "bg-[#f0f2f4] text-muted" : "bg-amber-soft text-amber"}`}>{state}</span>
                  ) : null}
                </p>
                <p className="flex flex-wrap gap-x-3.5 gap-y-1 text-[12.5px] text-muted">
                  {alert.meta.map(([label, value]) => (
                    <span key={label}>
                      {label}: <b className="text-ink">{value}</b>
                    </span>
                  ))}
                </p>
              </div>
              <div className="col-start-2 flex flex-wrap gap-2 sm:col-start-auto">
                <Button href={alert.href}>View vendor</Button>
                <Button disabled={state !== "open"} onClick={() => setStates((current) => ({ ...current, [alert.id]: "Acknowledged" }))}>
                  Acknowledge
                </Button>
                {alert.canMute ? (
                  <Button disabled={state !== "open"} onClick={() => setStates((current) => ({ ...current, [alert.id]: "Muted" }))}>
                    Mute
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
}
