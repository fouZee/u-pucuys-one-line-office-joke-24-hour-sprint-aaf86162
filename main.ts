// One-Line Office Joke: 24-Hour Sprint — make.fun entry.
//
// Writes a single original one-line office joke to /output/entry.txt.
// Deterministic: no randomness, no network, no dependencies — Node stdlib only.
// The joke must be 1-200 UTF-8 characters, a single line, and land as a
// joke about office life on first read.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The joke. Original, written for this bounty: the setup is the most
// dreaded team ritual in office life (replying-all to a huge thread), and
// the punchline is that the only thing the team built was resentment.
const JOKE =
  "Our team-building exercise was replying-all to a 47-person email chain; we built nothing but resentment.";

// The grader reads /output/entry.txt; allow an OUTPUT_DIR override for local runs.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  const text = JOKE;

  if (text.length === 0 || text.length > 200) {
    throw new Error(`Joke must be 1-200 characters, got ${text.length}.`);
  }
  if (text !== text.trim()) {
    throw new Error("Joke must not have leading or trailing whitespace.");
  }
  if (text.includes("\n")) {
    throw new Error("Joke must be a single line.");
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");

  // Write-back verification: the file must read back exactly what we wrote.
  const back = readFileSync(outputPath, "utf8");
  if (back !== text) {
    throw new Error("Write-back verification failed: entry.txt does not match the joke.");
  }
  console.log(`Wrote ${text.length} characters to ${outputPath}`);
}

main();
