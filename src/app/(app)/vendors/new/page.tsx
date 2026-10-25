"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Choice, Field, PageTitle } from "@/components/ui";

const categories = ["Database", "Auth", "Hosting", "Other"];

export default function NewVendorPage() {
  const router = useRouter();
  const [category, setCategory] = useState("Database");

  return (
    <div className="max-w-[640px]">
      <PageTitle>Add vendor manually</PageTitle>
      <Card className="mt-5 px-5 py-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/vendors?saved=1");
          }}
        >
          <Field label="Vendor name" name="name" defaultValue="Supabase" />
          <div className="mb-4">
            <p className="mb-1.5 text-[13px] font-bold">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <Choice key={item} selected={category === item} onClick={() => setCategory(item)}>
                  {item}
                </Choice>
              ))}
            </div>
          </div>
          <Field label="Plan / subscription" name="plan" defaultValue="Pro" />
          <Field label="Monthly cost" name="cost" defaultValue="25" />
          <Field label="Renewal date" name="renewal" type="date" defaultValue="2026-11-12" />
          <Field label="Owner" name="owner" defaultValue="Founder" />
          <Button type="submit" variant="primary">
            Save vendor
          </Button>
        </form>
      </Card>
    </div>
  );
}
