// Generate public/__routes.json with auto-discovered static routes for scanning.

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(process.cwd(), "pages");
const OUT = path.join(process.cwd(), "public", "__routes.json");

const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);

function isPageFile(file) {
  return exts.has(path.extname(file));
}

function toRoute(relPath) {
  const noExt = relPath.replace(/\.(t|j)sx?$/, "");
  // remove trailing "index"
  let route = noExt.replace(/\/index$/, "");

  // ignore special pages and folders
  if (path.basename(route).startsWith("_")) return null;
  if (route.startsWith("api/")) return null;
  if (route.includes("[")) return null;

  // convert backslashes to forward slashes
  route = route.replace(/\\/g, "/");

  if (route === "" || route === "index") return "/";

  return "/" + route;
}

function collectRoutes(dir) {
  const routes = new Set();
  function walk(d, prefix = "") {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(d, ent.name);
      const rel = path.relative(PAGES_DIR, full).replace(/\\/g, "/");
      if (ent.isDirectory()) {
        walk(full, path.join(prefix, ent.name));
      } else if (isPageFile(ent.name)) {
        const r = toRoute(rel);
        if (r) routes.add(r === "/." ? "/" : r);
      }
    }
  }
  walk(dir);

  return Array.from(routes).sort();
}

const routes = collectRoutes(PAGES_DIR);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ routes }, null, 2));
console.log(`Wrote ${OUT} with ${routes.length} routes`);
