"use client";

import { useRouter } from "next/navigation";
import { AuthShell, Button, Field, PageTitle } from "@/components/ui";

export default function SignInPage() {
  const router = useRouter();

  return (
    <AuthShell>
      <PageTitle>Sign in</PageTitle>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/home");
        }}
      >
        <Field label="Email" name="email" type="email" defaultValue="founder@acme.ai" />
        <Field label="Password" name="password" type="password" defaultValue="password" />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary">
            Sign in
          </Button>
          <p className="text-[13px] text-muted">
            Need a workspace?{" "}
            <button type="button" className="font-semibold text-blue" onClick={() => router.push("/")}>
              Create one
            </button>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
