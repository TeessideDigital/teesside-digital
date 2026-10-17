// Checks every internal link, anchor and asset in the built site.
//
// Reads each HTML file in dist/, and for every link to this site confirms the
// page exists and, for a link with #anchor, that the page has that id. Also
// confirms every src and href that names a file exists. Exits with an error on
// any problem, and lists external links for review.
//
// Run after a build:  node tools/check-links.mjs
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
const dist = join(root, "dist");
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const pages = walk(dist).filter((file) => file.endsWith(".html"));
const route = (file) =>
  "/" + relative(dist, file).split(sep).join("/").replace(/index\.html$/, "");

const ids = new Map();
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  ids.set(route(file), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const problems = [];
const external = new Set();
let checked = 0;
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const from = route(file);
  for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (/^(mailto|tel):/.test(href)) continue;
    if (/^https?:/.test(href)) {
      external.add(href);
      continue;
    }
    checked += 1;
    const [path, hash] = href.split("#");
    const target = path === "" ? from : path;
    const targetIds = ids.get(target);
    if (!targetIds && !existsSync(join(dist, target))) {
      problems.push(`${from}: no page for ${href}`);
      continue;
    }
    if (hash && targetIds && !targetIds.has(hash))
      problems.push(`${from}: no #${hash} on ${target}`);
  }
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    if (asset.endsWith("/")) continue;
    if (!existsSync(join(dist, asset))) problems.push(`${from}: missing file ${asset}`);
  }
}

console.log(`Internal links checked: ${checked}`);
console.log(`External links: ${[...external].join(", ") || "none"}`);
if (problems.length) {
  console.error(`\nProblems:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("Every internal link, anchor and file resolves.");
