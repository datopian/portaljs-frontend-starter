// Generate public/__routes.json with auto-discovered static routes for scanning.

const path = require("path");
const fs = require("fs");

// Load env vars (adjust path if you use .env or .env.local)
require("dotenv").config(); // this loads from .env by default

// If you are using .env.local specifically, you can do:
require("dotenv").config({
  path: path.join(process.cwd(), ".env"),
});

// ---- CONFIG ----
const PAGES_DIR = path.join(process.cwd(), "pages");
const OUT = path.join(process.cwd(), "public", "__routes.json");

const DMS_BASE_URL = process.env.NEXT_PUBLIC_DMS || "";

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

  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (isPageFile(ent.name)) {
        const rel = path.relative(PAGES_DIR, full).replace(/\\/g, "/");
        const r = toRoute(rel);
        if (r) routes.add(r === "/." ? "/" : r);
      }
    }
  }

  walk(dir);
  return Array.from(routes).sort();
}

// ---- CKAN via DMS helpers ----

async function getSampleCkanRoutes() {
  if (!DMS_BASE_URL) {
    console.warn(
      "NEXT_PUBLIC_DMS not set. Skipping CKAN-derived routes from DMS."
    );
    return [];
  }

  try {
    const base = DMS_BASE_URL.replace(/\/+$/, "");
    // Example result: https://api.cloud.portaljs.com/@datopian/api/3/action/package_search?rows=1&fq=state:active
    const url = `${base}/api/3/action/package_search?rows=1&fq=state:active`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // If you ever need an API key with DMS:
        // Authorization: process.env.CKAN_API_KEY || "",
      },
    });

    if (!res.ok) {
      console.warn("CKAN (via DMS) request failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    if (!data.success || !data.result || !data.result.results?.length) {
      console.warn("No datasets returned from CKAN (via DMS).");
      return [];
    }

    const dataset = data.result.results[0];

    const org =
      dataset.organization?.name ||
      dataset.organization?.id ||
      dataset.owner_org;
    const datasetName = dataset.name;
    const firstResource = Array.isArray(dataset.resources)
      ? dataset.resources.find((r) => r && r.id)
      : null;

    if (!org || !datasetName || !firstResource) {
      console.warn(
        "Dataset missing org/datasetName/resource; skipping CKAN-derived routes."
      );
      return [];
    }

    const resourceId = firstResource.id;

    // Your file structure: /[org]/[dataset]/index → route: /org/dataset
    const datasetRoute = `/@${org}/${datasetName}`;
    const resourceRoute = `/@${org}/${datasetName}/r/${resourceId}`;

    return [datasetRoute, resourceRoute];
  } catch (err) {
    console.error("Error while fetching CKAN dataset for routes:", err);
    return [];
  }
}

// ---- MAIN ----

async function main() {
  const staticRoutes = collectRoutes(PAGES_DIR);
  const allRoutesSet = new Set(staticRoutes);

  const ckanRoutes = await getSampleCkanRoutes();
  for (const r of ckanRoutes) {
    allRoutesSet.add(r);
  }

  const finalRoutes = Array.from(allRoutesSet).sort();

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ routes: finalRoutes }, null, 2));

  console.log(`Wrote ${OUT} with ${finalRoutes.length} routes`);
}

main().catch((err) => {
  console.error("Failed to generate routes:", err);
  process.exit(1);
});
