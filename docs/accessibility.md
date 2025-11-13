# Accessibility CI (WCAG 2.2 AA)

Automated accessibility checks run in **GitHub Actions** to enforce **WCAG 2.2 AA** compliance.
Pull requests fail automatically when **serious or critical** violations are detected.

---

## Overview

| Tool                      | Purpose                                                  |
| ------------------------- | -------------------------------------------------------- |
| **Playwright + axe-core** | Runs in-browser checks for serious/critical WCAG issues. |
| **Pa11y CI**              | Crawls all static routes using headless Chromium.        |
| **Lighthouse CI**         | Ensures overall accessibility score ≥ **0.95**.          |

---

## How it works

### 1. Route Discovery

`npm run generate:routes`
Scans `/pages` and writes `public/__routes.json`, skipping dynamic and API routes.
This file is used by all a11y tools to know which pages to test.

---

### 2. Tests

#### **Playwright + axe-core**

**File:** `tests/a11y.spec.ts`
Runs end-to-end accessibility scans using `@axe-core/playwright`.

* Only fails CI on **serious** or **critical** violations.
* Uses headless Chromium.
* Generates detailed reports under `playwright-report/`.

#### **Pa11y CI**

**Files:** `.pa11yci.json`, `scripts/run-pa11y-from-routes.js`
Runs accessibility scans for every route listed in `__routes.json`.

**Config highlights:**

```json
{
  "standard": "WCAG2AA",
  "timeout": 60000,
  "wait": 1000,
  "level": "error",
  "chromeLaunchConfig": {
    "args": ["--no-sandbox", "--disable-setuid-sandbox"]
  }
}
```

* Enforces WCAG 2.2 AA.
* Waits for full page load before testing.
* CI-safe Chrome flags (Chrome run securely in headless mode inside CI environments where sandboxing isn’t supported)
* Writes output to `pa11y-report.ndjson`.

#### **Lighthouse CI**

**Files:** `.lighthouserc.base.json`, `scripts/run-lhci-from-routes.js`
Builds a runtime config from the same routes and runs `lhci autorun`.

**Config highlights:**

```json
{
  "categories:accessibility": ["error", { "minScore": 0.95 }],
  "upload": { "target": "filesystem", "outputDir": "./lhci-report" }
}
```

* Enforces minimum accessibility score of **0.95**.
* Saves reports to `./lhci-report/`.

---

### 3. GitHub Actions Workflow

**File:** `.github/workflows/accessibility.yml`
Triggered on PRs and pushes to `main`.

**Pipeline:**

```
build → generate routes → start server
→ Playwright → Pa11y → Lighthouse
→ upload reports
```

#### **Generated Artifacts**

After all checks finish, the workflow uploads the following folders/files to the GitHub Action run:

| Artifact              | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| `playwright-report/`  | Browser-level accessibility scan results (HTML + JSON).     |
| `pa11y-report.ndjson` | Pa11y CI results for all routes, used for deeper analysis.  |
| `lhci-report/`        | Lighthouse HTML reports with accessibility scores per page. |

Artifacts are automatically available for download in the **GitHub Actions “Artifacts” section** under each workflow run.

---

## Run locally

```bash
# 1. Build and start
npm run build && npm run start

# 2. Generate routes
npm run generate:routes

# 3. Run checks
npx playwright test
npm run test:pa11y
npm run test:lhci
```

---

## Key scripts

| File                               | Purpose                                           |
| ---------------------------------- | ------------------------------------------------- |
| `scripts/generate-routes.js`       | Scans `/pages` and writes `public/__routes.json`. |
| `scripts/run-pa11y-from-routes.js` | Runs Pa11y CI for each route.                     |
| `scripts/run-lhci-from-routes.js`  | Runs Lighthouse CI and checks score ≥ 0.95.       |

---

## Env vars

Must be set locally or in GitHub Actions:

```bash
BASE_URL=http://localhost:3000
NEXT_PUBLIC_DMS=https://api.cloud.portaljs.com
NEXT_PUBLIC_ORG=datopian
```

---

**Result:**
Every PR and push runs Playwright, Pa11y, and Lighthouse against all routes.
The pipeline fails if WCAG 2.2 AA violations or scores below 0.95 are detected.
Full HTML/JSON/NDJSON reports are automatically uploaded as GitHub Action artifacts for review.

---

## References

* [WCAG 2.2 Quick Ref](https://www.w3.org/WAI/WCAG22/quickref/)
* [axe-core rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
* [Pa11y CI](https://github.com/pa11y/pa11y-ci)
* [Playwright a11y guide](https://playwright.dev/docs/accessibility-testing)
* [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

