import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">That page is not in VendorPulse</h1>
        <p className="mt-2 text-sm text-muted">The vendor or screen you asked for is not part of this preview.</p>
        <div className="mt-5">
          <Button href="/home" variant="primary">
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
