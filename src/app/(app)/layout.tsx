import { Suspense } from "react";
import { TopNav } from "@/components/top-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <header className="flex h-16 items-center border-b border-line bg-white px-7 text-lg font-bold tracking-tight text-navy">
            VendorPulse
          </header>
        }
      >
        <TopNav />
      </Suspense>
      <div className="mx-auto w-full max-w-[1080px] px-5 py-8 sm:px-7">{children}</div>
    </div>
  );
}
