/**
 * Reports how much of the learner-facing English content has a German entry in
 * lib/i18n/de.ts. Extracts the translatable strings out of lib/routeN.ts (the
 * content source) plus the UI strings wrapped in t("...") across components,
 * then diffs them against the dictionary keys.
 *
 *   node scripts/i18n-coverage.mjs           summary per file
 *   node scripts/i18n-coverage.mjs --missing print every untranslated string
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const showMissing = process.argv.includes("--missing");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(p, out);
    } else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

// Dictionary keys
const deSrc = readFileSync(join(root, "lib/i18n/de.ts"), "utf8");
const keys = new Set([...deSrc.matchAll(/^\s*"((?:[^"\\]|\\.)*)":/gm)].map((m) => m[1].replace(/\\"/g, '"')));

// Content strings from lib/route*.ts — quoted strings that read like prose.
const contentFiles = ["lib/route1.ts", "lib/route2.ts", "lib/route3.ts", "lib/routes.ts"];
const STR = /"((?:[^"\\]|\\.){3,})"/g;
const isProse = (s) =>
  s.includes(" ") &&
  !s.startsWith("r1:") && !s.startsWith("r2:") && !s.startsWith("r3:") &&
  !s.startsWith("http") && !/^[a-z-]+(\s[a-z0-9:[\]/.-]+)+$/.test(s);

const groups = [];
for (const f of contentFiles) {
  const src = readFileSync(join(root, f), "utf8");
  const found = [...src.matchAll(STR)].map((m) => m[1].replace(/\\"/g, '"')).filter(isProse);
  groups.push({ name: f, strings: [...new Set(found)] });
}

// UI strings explicitly wrapped in t("...")
const uiFound = [];
for (const f of walk(join(root, "components")).concat(walk(join(root, "app")))) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)+)"\s*\)/g)) uiFound.push(m[1].replace(/\\"/g, '"'));
}
groups.push({ name: "UI strings (t\"...\")", strings: [...new Set(uiFound)] });

let total = 0;
let done = 0;
for (const g of groups) {
  const missing = g.strings.filter((s) => !keys.has(s));
  total += g.strings.length;
  done += g.strings.length - missing.length;
  const pct = g.strings.length ? Math.round(((g.strings.length - missing.length) / g.strings.length) * 100) : 100;
  console.log(
    `${g.name.padEnd(24)} ${String(g.strings.length - missing.length).padStart(4)}/${String(g.strings.length).padEnd(5)} ${String(pct).padStart(3)}%`,
  );
  if (showMissing) for (const s of missing) console.log(`    · ${s.slice(0, 150)}`);
}
const pct = total ? Math.round((done / total) * 100) : 100;
console.log("-".repeat(46));
console.log(`${"TOTAL".padEnd(24)} ${String(done).padStart(4)}/${String(total).padEnd(5)} ${String(pct).padStart(3)}%`);
