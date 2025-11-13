const fs = require("fs");
const { spawn } = require("child_process");

const baseCfg = JSON.parse(fs.readFileSync(".lighthouserc.base.json", "utf-8"));
const base = process.env.BASE_URL || "http://localhost:3000";
const routes = JSON.parse(fs.readFileSync("public/__routes.json", "utf-8")).routes;

const urls = routes.map((r) => `${base}${r}`);

const final = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 1,
      startServerCommand: null,
      staticDistDir: null,
      settings: {
        chromeFlags: "--headless --no-sandbox",
      },
    },
    assert: baseCfg.ci.assert,
    upload: baseCfg.ci.upload,
  },
};

fs.writeFileSync(".lighthouserc.json", JSON.stringify(final, null, 2));

const child = spawn("npx", ["lhci", "autorun", "--config=.lighthouserc.json"], {
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => process.exit(code));
