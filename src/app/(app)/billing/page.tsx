import { Card, PageTitle } from "@/components/ui";
import { invoices, upcomingBills } from "@/lib/data";

export default function BillingPage() {
  return (
    <>
      <PageTitle>Billing & Renewals</PageTitle>
      <h2 className="mt-6 mb-2.5 text-[15px] font-semibold">Upcoming</h2>
      <Card className="overflow-hidden">
        {upcomingBills.map((line) => (
          <p key={line} className="border-b border-line px-4 py-3.5 text-sm last:border-b-0">
            {line}
          </p>
        ))}
      </Card>
      <h2 className="mt-6 mb-2.5 text-[15px] font-semibold">Recent invoices</h2>
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr className="bg-[#fbfcfd] text-left text-[11px] font-bold tracking-wide text-muted uppercase">
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((row) => (
              <tr key={row[1]} className="border-t border-line">
                <td className="px-4 py-3.5">{row[0]}</td>
                <td className="px-4 py-3.5">{row[1]}</td>
                <td className="px-4 py-3.5">{row[2]}</td>
                <td className="px-4 py-3.5">
                  <span className="rounded-full bg-good-soft px-2 py-1 text-xs font-bold text-good">Paid</span>
                </td>
                <td className="px-4 py-3.5">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
