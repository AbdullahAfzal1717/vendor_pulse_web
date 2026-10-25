"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Home" },
  { href: "/vendors", label: "Vendors" },
  { href: "/alerts", label: "Alerts" },
  { href: "/billing", label: "Billing" },
  { href: "/settings", label: "Settings" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-wrap items-center gap-x-7 gap-y-2 border-b border-line bg-white px-5 sm:px-7">
      <Link href="/home" className="text-lg font-bold tracking-tight text-navy">
        VendorPulse
      </Link>
      <nav className="flex flex-wrap gap-1">
        {links.map((link) => {
          const active = link.href === "/vendors" ? pathname.startsWith("/vendors") : pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${active ? "bg-blue-soft text-navy" : "text-muted hover:bg-blue-soft hover:text-navy"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
