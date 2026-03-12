const { spawn } = require("child_process");
const os = require("os");
const detect = require("detect-port");

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

(async () => {
  const port = await detect(7000);
  const ip = getLocalIP();
  console.log(`Starting dev server on http://localhost:${port}`);
  console.log(`LAN access: http://${ip}:${port}`);
  spawn("npx", ["next", "dev", "-p", String(port), "-H", "0.0.0.0"], {
    stdio: "inherit",
    shell: true,
  });
})();
