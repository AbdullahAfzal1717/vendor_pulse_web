"use client";

import { useState } from "react";
import { Button, Card, PageTitle } from "@/components/ui";
import { team } from "@/lib/data";

export default function SettingsPage() {
  const [keyNote, setKeyNote] = useState("");
  const [deleteAsk, setDeleteAsk] = useState(false);
  const [deleteNote, setDeleteNote] = useState("");

  return (
    <div className="max-w-[640px]">
      <PageTitle>Settings</PageTitle>
      {keyNote ? <p className="mt-4 rounded-lg bg-good-soft px-3 py-2.5 text-[13px] text-[#1d5c45]">{keyNote}</p> : null}
      {deleteNote ? <p className="mt-4 rounded-lg bg-good-soft px-3 py-2.5 text-[13px] text-[#1d5c45]">{deleteNote}</p> : null}

      <h2 className="mt-6 mb-2 text-base font-semibold">Team</h2>
      <Card>
        {team.map(([email, role]) => (
          <div key={email} className="flex items-center justify-between border-b border-line px-4 py-3.5 text-sm last:border-b-0">
            <span>{email}</span>
            <b>{role}</b>
          </div>
        ))}
      </Card>

      <h2 className="mt-6 mb-2 text-base font-semibold">Notifications</h2>
      <Card>
        <p className="border-b border-line px-4 py-3.5 text-sm">
          Email alerts: <b>Enabled</b>
        </p>
        <p className="border-b border-line px-4 py-3.5 text-sm">
          Slack alerts: <b>Connected</b>
        </p>
        <p className="px-4 py-3.5 text-sm">
          Webhook alerts: <b>Not configured</b>
        </p>
      </Card>

      <h2 className="mt-6 mb-2 text-base font-semibold">SDK</h2>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-sm">
          <span>
            Ingestion key: <b>vp_live_••••••••••••</b>
          </span>
          <Button
            onClick={() =>
              setKeyNote("Key rotated. The full ingestion key is not shown here. Update VENDORPULSE_KEY in your environment.")
            }
          >
            Rotate key
          </Button>
        </div>
      </Card>

      <h2 className="mt-6 mb-2 text-base font-semibold">Data</h2>
      <Card>
        <p className="border-b border-line px-4 py-3.5 text-sm">
          Detailed sync history retention: <b>30 days</b>
        </p>
        <div className="px-4 py-3.5">
          <Button onClick={() => setDeleteAsk(true)}>Delete workspace data</Button>
          {deleteAsk ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-muted">Delete all workspace data? This cannot be undone.</span>
              <Button
                onClick={() => {
                  setDeleteAsk(false);
                  setDeleteNote("Workspace data deleted from this preview.");
                }}
              >
                Confirm delete
              </Button>
              <Button onClick={() => setDeleteAsk(false)}>Cancel</Button>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
