#!/usr/bin/env node
/**
 * POST a status update back to the ticketing service. HMAC-signed with the
 * per-ticket callback secret supplied in the repository_dispatch payload.
 *
 * Usage:
 *   node scripts/baywest-callback.mjs PR_OPENED
 *   node scripts/baywest-callback.mjs FAILED "error message"
 *   node scripts/baywest-callback.mjs DEPLOYED "https://svn-mcdonald.vercel.app"
 */
import crypto from "node:crypto";
import fs from "node:fs";

const status = process.argv[2];
const extra = process.argv[3];

if (!status) {
  console.error("status argument required");
  process.exit(1);
}

const callbackUrl = process.env.CALLBACK_URL;
const secret = process.env.CALLBACK_SECRET;
const agentRunId = process.env.AGENT_RUN_ID;

if (!callbackUrl || !secret || !agentRunId) {
  console.error("CALLBACK_URL, CALLBACK_SECRET, AGENT_RUN_ID must be set in env");
  process.exit(1);
}

const payload = { agentRunId, status };

if (status === "PR_OPENED") {
  payload.prUrl = process.env.PR_URL;
  if (process.env.PR_NUMBER) payload.prNumber = Number(process.env.PR_NUMBER);
} else if (status === "FAILED") {
  payload.lastError = extra || "Unknown error";
} else if (status === "DEPLOYED") {
  payload.deployedUrl = extra;
} else if (status === "MERGED") {
  if (process.env.PR_URL) payload.prUrl = process.env.PR_URL;
  payload.mergedAt = new Date().toISOString();
}

// Include the agent's final one-line summary if available.
try {
  const summary = fs.readFileSync(".baywest-summary.txt", "utf8").trim();
  if (summary) payload.message = summary;
} catch {
  // optional
}

const body = JSON.stringify(payload);
const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

const res = await fetch(callbackUrl, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-baywest-signature": signature,
  },
  body,
});

console.log(`[baywest-callback] ${status} → ${res.status}`);
if (!res.ok) {
  const text = await res.text().catch(() => "");
  console.error(text);
  process.exit(1);
}
