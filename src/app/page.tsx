"use client";

import { useRouter } from "next/navigation";
import { AuthShell, Button, Field, PageTitle } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthShell>
      <PageTitle>Create your workspace</PageTitle>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/onboarding/sdk");
        }}
      >
        <Field label="Company / workspace name" name="workspace" defaultValue="Acme AI" />
        <Field label="Email" name="email" type="email" defaultValue="founder@acme.ai" />
        <Field label="Password" name="password" type="password" defaultValue="password" />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary">
            Create workspace
          </Button>
          <p className="text-[13px] text-muted">
            Already have an account?{" "}
            <button type="button" className="font-semibold text-blue" onClick={() => router.push("/sign-in")}>
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
