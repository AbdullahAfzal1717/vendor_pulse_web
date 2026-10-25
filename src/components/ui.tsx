import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import type { Tone } from "@/lib/data";

const buttonClass = {
  primary:
    "inline-flex items-center rounded-lg border border-blue bg-blue px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#2d66be]",
  secondary:
    "inline-flex items-center rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-navy hover:border-[#aec3da] hover:bg-[#f8fbff]",
};

export function Button({
  href,
  variant = "secondary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const classes = `${buttonClass[variant]} disabled:cursor-default disabled:opacity-60 ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function AuthShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-7">
      <div className={`w-full rounded-xl border border-line bg-white px-6 py-8 sm:px-9 ${wide ? "max-w-[680px]" : "max-w-[520px]"}`}>
        <p className="mb-7 text-lg font-bold tracking-tight text-navy">VendorPulse</p>
        {children}
      </div>
    </main>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-[28px] leading-tight font-semibold tracking-tight">{children}</h1>;
}

export function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-bold">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-lg border border-[#d9e0e7] bg-white px-3 py-2.5 text-ink outline-none focus:border-blue focus:ring-4 focus:ring-blue-soft"
        {...props}
      />
    </div>
  );
}

export function Choice({
  selected,
  children,
  onClick,
}: {
  selected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-[13px] ${selected ? "border-blue bg-blue-soft text-blue" : "border-line bg-white text-muted"}`}
    >
      {children}
    </button>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-[#172331] px-4 py-3.5 font-mono text-[12.5px] leading-7 whitespace-pre text-[#d5e4f2]">{children}</pre>;
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-lg bg-[#f0f6ff] px-3.5 py-3 text-[13px] leading-relaxed text-[#365b87]">{children}</div>;
}

export function Severity({ tone }: { tone: Tone }) {
  const color = {
    critical: "bg-risk",
    warning: "bg-[#e0a322]",
    healthy: "bg-good",
    neutral: "bg-[#b0b7bf]",
  }[tone];
  return <i className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-white ${className}`}>{children}</div>;
}
