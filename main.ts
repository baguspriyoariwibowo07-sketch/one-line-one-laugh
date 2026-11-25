// One Line, One Laugh — attention-seeking microwave
// Mechanism: the field is saturated with appliance jokes about broken or
// over-eager gadgets, but this one is fresh — the microwave beeps not for
// function but for attention. It beeps when the food is ready (its job), and
// it beeps when I walk past (its need): it wants to be noticed, it still exists.
// The humour is the unexpected second beep — an appliance with an ego.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My microwave beeps when the food is ready. It also beeps when I walk past, just to remind me it still exists.";

function validate(line: string): void {
  if (LINE.length !== 109) {
    throw new Error(`Pinned length mismatch: expected 109, got ${LINE.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be blank");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line length ${line.length} out of range 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be exactly one line");
  }
}

function main(): void {
  validate(LINE);

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  writeFileSync(target, LINE, "utf-8");

  const onDisk = readFileSync(target, "utf-8");
  validate(onDisk);
  if (onDisk !== LINE) {
    throw new Error("On-disk entry.txt does not equal the authored line");
  }
}

main();
