#!/usr/bin/env node
/**
 * Baywest autonomous agent runner — svn-mcdonald-site-demo edition.
 *
 * Reads the repository_dispatch `client_payload` from the GitHub event
 * file (GITHUB_EVENT_PATH) and drives the Claude Agent SDK to implement
 * the change in the checked-out repo. The Actions workflow then runs
 * lint + build, opens a PR, and enables auto-merge.
 *
 * We read the event file directly rather than via an env var because
 * multi-line JSON injected into a workflow env is fragile and truncates
 * on some runners.
 *
 * Guardrails:
 *   - Edits only files matching safePaths globs from the payload
 *   - Rejects edits to blockedPaths
 *   - Rejects adding dependencies (agent cannot run npm add)
 */
import { query } from "@anthropic-ai/claude-agent-sdk";
import fs from "node:fs";

function loadPayload() {
  // Preferred: raw GitHub event file. Always set on Actions runners.
  const evtPath = process.env.GITHUB_EVENT_PATH;
  if (evtPath && fs.existsSync(evtPath)) {
    try {
      const event = JSON.parse(fs.readFileSync(evtPath, "utf8"));
      if (event && event.client_payload && typeof event.client_payload === "object") {
        return event.client_payload;
      }
    } catch (err) {
      console.error("[baywest-agent] failed to parse GITHUB_EVENT_PATH:", err);
    }
  }
  // Fallback: env var (local testing).
  if (process.env.TICKET_PAYLOAD) {
    try {
      return JSON.parse(process.env.TICKET_PAYLOAD);
    } catch (err) {
      console.error("[baywest-agent] TICKET_PAYLOAD set but not valid JSON:", err);
    }
  }
  return null;
}

const payload = loadPayload();
if (!payload || !payload.humanId) {
  console.error(
    "[baywest-agent] could not read dispatch payload. " +
      "Expected GITHUB_EVENT_PATH with client_payload.humanId set.",
  );
  process.exit(1);
}

const {
  humanId,
  subject,
  description,
  verdict,
  safePaths = [],
  blockedPaths = [],
} = payload;

console.log(`[baywest-agent] ${humanId} — ${subject}`);
console.log(`[baywest-agent] plan: ${verdict?.plan ?? "(none)"}`);

const systemPrompt = `You are implementing a small, approved change on the SVN McDonald & Company website.

REPO LAYOUT (svn-mcdonald-site-demo):
- Vite + React + TypeScript SPA.
- Team members' bios live in src/data/teamMembers.ts (a TS data file — edit the bio string on the matching member object).
- Locations: src/data/locations.ts. Closed deals: src/data/closedDeals.ts.
- Pages are under src/pages/ (React components).
- Shared components under src/components/.
- Static assets + team photos under public/ and bio_pics/.
- Tailwind v4 with classes inline on JSX.

TICKET: ${humanId}
SUBJECT: ${subject}

DESCRIPTION:
${description}

APPROVED PLAN (from triage):
${verdict?.plan ?? ""}

RULES:
- Edit only files that match these allowlist globs: ${safePaths.join(", ")}
- NEVER edit: ${blockedPaths.join(", ")}
- NEVER add npm dependencies or modify package.json / package-lock.json.
- Keep the total diff under 40 lines.
- Stop as soon as the change is complete. Do not refactor adjacent code.
- Do not run git commits — the workflow handles that.

When editing a bio string in teamMembers.ts, preserve existing escaping and paragraph breaks ("\\n\\n"). Match tone and length of existing bios.

Use Read, Glob, Grep, and Edit. Use Bash ONLY to run \`npm run lint\` or \`npm run build\` to verify your change. Respond at the end with a one-line summary of what you did.`;

const userPrompt = `Implement the ticket. Keep changes minimal. When done, respond with a one-line summary.`;

const result = await query({
  prompt: userPrompt,
  options: {
    systemPrompt,
    permissionMode: "bypassPermissions",
    allowedTools: ["Read", "Glob", "Grep", "Edit", "Bash"],
    model: "claude-sonnet-4-6",
    maxTurns: 20,
  },
});

// Drain the async iterator; surface any final assistant text to logs + summary file.
let lastText = "";
for await (const message of result) {
  if (message.type === "assistant" && message.message?.content) {
    for (const block of message.message.content) {
      if (block.type === "text") lastText = block.text;
    }
  }
}

console.log(`[baywest-agent] done: ${lastText}`);
fs.writeFileSync(".baywest-summary.txt", lastText, "utf8");
