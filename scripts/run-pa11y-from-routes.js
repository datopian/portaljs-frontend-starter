const fs = require("fs");
const { spawn } = require("child_process");

const routes = JSON.parse(fs.readFileSync("public/__routes.json", "utf-8")).routes;
const base = process.env.BASE_URL || "http://localhost:3000";
const urls = routes.map(r => `${base}${r}`);

const tmp = ".pa11yci.runtime.json";
const cfg = JSON.parse(fs.readFileSync(".pa11yci.json", "utf-8"));
cfg.urls = urls;
fs.writeFileSync(tmp, JSON.stringify(cfg, null, 2));

const out = fs.createWriteStream("pa11y-report.ndjson", { flags: "w" });

const child = spawn("npx", ["pa11y-ci", "-c", tmp], { stdio: ["ignore", "pipe", "pipe"], shell: true });
child.stdout.pipe(out);
child.stderr.on("data", d => process.stderr.write(d));

child.on("close", code => {
  fs.unlinkSync(tmp);
  process.exit(code);
});
