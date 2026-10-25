"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Button, Card, PageTitle } from "@/components/ui";

const services = [
  {
    name: "OpenAI",
    detected: "Detected package/configuration: OPENAI_API_KEY",
    available: "Data available: usage, credits/billing where supported",
  },
  {
    name: "Stripe",
    detected: "Detected configuration: STRIPE_SECRET_KEY",
    available: "Data available: invoices, subscriptions, balance",
  },
  {
    name: "SendGrid",
    detected: "Detected configuration: SENDGRID_API_KEY",
    available: "Data available: credit balance",
  },
];

export default function DetectPage() {
  const router = useRouter();
  const [choices, setChoices] = useState<Record<string, "connected" | "skipped" | undefined>>({});

  return (
    <AuthShell wide>
      <PageTitle>We found possible external services</PageTitle>
      <p className="mt-2 mb-4 text-[13px] leading-relaxed text-muted">
        VendorPulse can check whether your existing API keys can access account information. Your keys remain in your project.
      </p>
      <Card className="mb-4">
        {services.map((service) => (
          <div key={service.name} className="flex flex-col items-start justify-between gap-3 border-b border-line px-4 py-4 last:border-b-0 sm:flex-row sm:items-center">
            <div>
              <b>{service.name}</b>
              <p className="text-[13px] text-muted">{service.detected}</p>
              <p className="text-[13px] text-muted">{service.available}</p>
            </div>
            {choices[service.name] ? (
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${choices[service.name] === "connected" ? "bg-good-soft text-good" : "bg-[#f0f2f4] text-muted"}`}>
                {choices[service.name] === "connected" ? "Connected" : "Skipped"}
              </span>
            ) : (
              <div className="flex gap-2">
                <Button variant="primary" onClick={() => setChoices((current) => ({ ...current, [service.name]: "connected" }))}>
                  Connect
                </Button>
                <Button onClick={() => setChoices((current) => ({ ...current, [service.name]: "skipped" }))}>Skip</Button>
              </div>
            )}
          </div>
        ))}
      </Card>
      <Button variant="primary" onClick={() => router.push("/home")}>
        Continue
      </Button>
    </AuthShell>
  );
}
