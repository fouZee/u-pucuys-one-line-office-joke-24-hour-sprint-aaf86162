// One-Line Office Joke: 24-Hour Sprint — make.fun entry.
//
// Writes a single original one-line office joke to /output/entry.txt.
// Deterministic: no randomness, no network, no dependencies — Node stdlib only.
// The joke must be 1-200 UTF-8 characters, a single line, and land as a
// joke about office life on first read.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The joke. Original, written for this bounty: the setup is the most
// passive-aggressive phrase in office email ("per my last email"), and the
// punchline automates it — the out-of-office reply keeps the snark working
// while its owner is on holiday.
const JOKE =
  "I set my out-of-office reply to 'per my last email', so the passive aggression keeps working while I'm on holiday.";

// The grader reads /output/entry.txt; allow an OUTPUT_DIR override for local runs.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  const text = JOKE.trim();

  if (text.length === 0 || text.length > 200) {
    throw new Error(`Joke must be 1-200 characters, got ${text.length}.`);
  }
  if (text.includes("\n")) {
    throw new Error("Joke must be a single line.");
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
  console.log(`Wrote ${text.length} characters to ${outputPath}`);
}

main();
