export type Tone = "critical" | "warning" | "healthy" | "neutral";

export type Vendor = {
  slug: string;
  name: string;
  account: string;
  detailAccount: string;
  status: "Risky" | "Watch" | "Healthy" | "Manual";
  tone: Tone;
  homeUsage: string;
  listUsage: string;
  renewal: string;
  synced: string;
  syncedLong: string;
  category: "AI" | "Payments" | "Email" | "Hosting" | "Database";
  mark: string;
  markClass: string;
  connection: "sdk" | "manual";
};

export type VendorDetail = {
  connection: string;
  metrics: [string, string][];
  risk: string;
  riskTone: "critical" | "watch" | "healthy" | "manual";
  riskText: string;
  trend?: number[];
  info: [string, string][];
};

export const vendors: Vendor[] = [
  {
    slug: "openai",
    name: "OpenAI",
    account: "Acme AI Org",
    detailAccount: "Acme AI Organization",
    status: "Risky",
    tone: "critical",
    homeUsage: "$38.20 remaining",
    listUsage: "$38.20 left",
    renewal: "Nov 1",
    synced: "6m ago",
    syncedLong: "6 minutes ago",
    category: "AI",
    mark: "O",
    markClass: "bg-[#131c25]",
    connection: "sdk",
  },
  {
    slug: "stripe",
    name: "Stripe",
    account: "Acme Payments",
    detailAccount: "Acme Payments",
    status: "Watch",
    tone: "warning",
    homeUsage: "Invoice due",
    listUsage: "Invoice due",
    renewal: "Nov 1",
    synced: "22m ago",
    syncedLong: "22 minutes ago",
    category: "Payments",
    mark: "S",
    markClass: "bg-[#635bff]",
    connection: "sdk",
  },
  {
    slug: "sendgrid",
    name: "SendGrid",
    account: "Acme Email",
    detailAccount: "Acme Email",
    status: "Watch",
    tone: "warning",
    homeUsage: "78% used",
    listUsage: "78% used",
    renewal: "Nov 15",
    synced: "18m ago",
    syncedLong: "18 minutes ago",
    category: "Email",
    mark: "S",
    markClass: "bg-[#1a9fce]",
    connection: "sdk",
  },
  {
    slug: "vercel",
    name: "Vercel",
    account: "Acme Hosting",
    detailAccount: "Acme Hosting",
    status: "Healthy",
    tone: "healthy",
    homeUsage: "$18.40 this month",
    listUsage: "Healthy",
    renewal: "Nov 28",
    synced: "31m ago",
    syncedLong: "31 minutes ago",
    category: "Hosting",
    mark: "V",
    markClass: "bg-[#242424]",
    connection: "sdk",
  },
  {
    slug: "supabase",
    name: "Supabase",
    account: "Acme Database",
    detailAccount: "Acme Database",
    status: "Manual",
    tone: "neutral",
    homeUsage: "Not connected",
    listUsage: "Manual entry",
    renewal: "Unknown",
    synced: "Manual",
    syncedLong: "Manual",
    category: "Database",
    mark: "S",
    markClass: "bg-[#3ecf8e] text-[#083023]",
    connection: "manual",
  },
];

export const details: Record<string, VendorDetail> = {
  openai: {
    connection: "SDK-fetched using local API key",
    metrics: [
      ["Credits left", "$38.20"],
      ["Usage", "$161.80"],
      ["Burn rate", "$9.55/day"],
      ["Projected", "4 days"],
    ],
    risk: "Critical",
    riskTone: "critical",
    riskText: "Your current usage rate may exhaust remaining credits before renewal.",
    trend: [18, 24, 28, 36, 44, 52, 61, 70, 78, 86, 93, 100],
    info: [
      ["Plan", "Pro"],
      ["Billing period", "Oct 1 – Oct 31"],
      ["Renewal date", "Nov 1"],
      ["Data source", "Vendor-reported, fetched locally by SDK"],
    ],
  },
  stripe: {
    connection: "SDK-fetched using local API key",
    metrics: [
      ["Upcoming invoice", "$249.00"],
      ["Due", "Nov 1"],
      ["Time left", "3 days"],
      ["Renewal", "Nov 1"],
    ],
    risk: "Watch",
    riskTone: "watch",
    riskText: "A Stripe invoice for $249.00 is due in 3 days.",
    info: [
      ["Renewal date", "Nov 1"],
      ["Data source", "Vendor-reported, fetched locally by SDK"],
    ],
  },
  sendgrid: {
    connection: "SDK-fetched using local API key",
    metrics: [
      ["Used", "78%"],
      ["Sent", "42,600"],
      ["Allowance", "55,000"],
      ["Remaining", "12,400"],
    ],
    risk: "Watch",
    riskTone: "watch",
    riskText: "SendGrid usage is at 78% of the monthly allowance. 12,400 emails remain.",
    info: [
      ["Renewal date", "Nov 15"],
      ["Data source", "Vendor-reported, fetched locally by SDK"],
    ],
  },
  vercel: {
    connection: "SDK-fetched using local API key",
    metrics: [
      ["This month", "$18.40"],
      ["Status", "Healthy"],
      ["Renewal", "Nov 28"],
      ["Last synced", "31m ago"],
    ],
    risk: "Healthy",
    riskTone: "healthy",
    riskText: "Nothing on this account needs attention right now.",
    info: [
      ["Renewal date", "Nov 28"],
      ["Data source", "Vendor-reported, fetched locally by SDK"],
    ],
  },
  supabase: {
    connection: "Manual entry",
    metrics: [
      ["Status", "Manual"],
      ["Credits / usage", "Not connected"],
      ["Renewal", "Unknown"],
      ["Source", "Manual"],
    ],
    risk: "Manual",
    riskTone: "manual",
    riskText: "This vendor is tracked by hand. VendorPulse does not call its API and does not store a vendor credential.",
    info: [
      ["Renewal date", "Unknown"],
      ["Data source", "Manual entry"],
    ],
  },
};

export const filters = ["All", "Connected", "Manual", "Risky", "AI", "Payments", "Email"] as const;

export type VendorFilter = (typeof filters)[number];

export function filterVendors(filter: string) {
  return vendors.filter((vendor) => {
    if (filter === "Connected") return vendor.connection === "sdk";
    if (filter === "Manual") return vendor.connection === "manual";
    if (filter === "Risky") return vendor.status === "Risky";
    if (filter === "AI" || filter === "Payments" || filter === "Email") return vendor.category === filter;
    return true;
  });
}

export function getVendor(slug: string) {
  return vendors.find((vendor) => vendor.slug === slug);
}

export const upcomingBills = [
  "Stripe invoice due Nov 1 — $249.00",
  "OpenAI renewal Nov 1",
  "SendGrid renewal Nov 15",
  "Vercel renewal Nov 28",
];

export const invoices = [
  ["Stripe", "INV-0092", "$249.00", "Oct 1"],
  ["OpenAI", "INV-0088", "$161.80", "Oct 1"],
  ["SendGrid", "INV-0075", "$19.95", "Sep 15"],
];

export const team = [
  ["founder@acme.ai", "Admin"],
  ["dev@acme.ai", "Engineer"],
  ["ops@acme.ai", "Viewer"],
];

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "app";
}
