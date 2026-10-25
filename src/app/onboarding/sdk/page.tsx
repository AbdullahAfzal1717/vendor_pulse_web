"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Button, Choice, CodeBlock, Field, Notice, PageTitle } from "@/components/ui";
import { slugify } from "@/lib/data";

const environments = ["Production", "Staging", "Development"] as const;

export default function SdkPage() {
  const router = useRouter();
  const [appName, setAppName] = useState("Acme AI Assistant");
  const [environment, setEnvironment] = useState<(typeof environments)[number]>("Production");

  const snippet = useMemo(
    () =>
      `import { VendorPulse } from "@vendorpulse/sdk";\n\nVendorPulse.init({\n  ingestionKey: process.env.VENDORPULSE_KEY,\n  app: "${slugify(appName)}",\n  env: "${environment.toLowerCase()}"\n});`,
    [appName, environment],
  );

  return (
    <AuthShell wide>
      <PageTitle>Connect your first application</PageTitle>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/onboarding/detect");
        }}
      >
        <Field label="Step 1: Name your application" name="app" value={appName} onChange={(event) => setAppName(event.target.value)} />
        <div className="mb-4">
          <p className="mb-1.5 text-[13px] font-bold">Step 2: Select environment</p>
          <div className="flex flex-wrap gap-2">
            {environments.map((item) => (
              <Choice key={item} selected={environment === item} onClick={() => setEnvironment(item)}>
                {item}
              </Choice>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-1.5 text-[13px] font-bold">Step 3: Install the SDK</p>
          <CodeBlock>npm install @vendorpulse/sdk</CodeBlock>
        </div>
        <div className="mb-4">
          <p className="mb-1.5 text-[13px] font-bold">Step 4: Initialize the SDK</p>
          <CodeBlock>{snippet}</CodeBlock>
        </div>
        <div className="mb-4">
          <Notice>Your vendor API keys stay in your environment. VendorPulse only receives allowed, non-sensitive account and usage data.</Notice>
        </div>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </form>
    </AuthShell>
  );
}
