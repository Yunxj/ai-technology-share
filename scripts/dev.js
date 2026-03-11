const { spawn } = require("child_process");
const detect = require("detect-port");

(async () => {
  const port = await detect(7000);
  console.log(`Starting dev server on http://localhost:${port}`);
  console.log(`LAN access: http://<your-ip>:${port}`);
  spawn("npx", ["next", "dev", "-p", String(port), "-H", "0.0.0.0"], {
    stdio: "inherit",
    shell: true,
  });
})();
