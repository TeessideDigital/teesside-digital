// Checks the Content-Security-Policy in netlify.toml against the built site.
//
// The policy allows inline scripts only by hash. This reads every HTML file in
// dist/, hashes each inline script that the browser would execute, and compares
// the set with the hashes in netlify.toml. It exits with an error when they
// differ, and prints the hashes the policy needs.
//
// Run after a build:  node tools/csp-hashes.mjs
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
const dist = join(root, "dist");
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : [join(dir, entry.name)],
  );

// Data blocks such as JSON-LD are never executed, so the policy ignores them.
const executable = (attributes) => {
  const type = /type="([^"]*)"/.exec(attributes)?.[1];
  return !type || type === "module" || type === "text/javascript";
};

const found = new Map();
for (const file of walk(dist).filter((name) => name.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attributes, body] = match;
    if (/\ssrc=/.test(attributes) || !body.trim() || !executable(attributes))
      continue;
    const hash = `sha256-${createHash("sha256").update(body).digest("base64")}`;
    if (!found.has(hash)) found.set(hash, body.trim().slice(0, 60));
  }
}

const policy =
  /Content-Security-Policy\s*=\s*"([^"]*)"/.exec(
    readFileSync(join(root, "netlify.toml"), "utf8"),
  )?.[1] ?? "";
const allowed = new Set(policy.match(/sha256-[A-Za-z0-9+/=]+/g) ?? []);
const missing = [...found.keys()].filter((hash) => !allowed.has(hash));
const unused = [...allowed].filter((hash) => !found.has(hash));

console.log(`Inline scripts in the build: ${found.size}`);
for (const [hash, start] of found) console.log(`  '${hash}'  ${start}`);
if (missing.length || unused.length) {
  if (missing.length)
    console.error(`\nNot allowed by netlify.toml:\n  ${missing.join("\n  ")}`);
  if (unused.length)
    console.error(`\nIn netlify.toml but not in the build:\n  ${unused.join("\n  ")}`);
  process.exit(1);
}
console.log("\nThe policy in netlify.toml matches the build.");
