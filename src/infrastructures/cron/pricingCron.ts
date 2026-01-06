import cron from "node-cron";
import { Worker } from "worker_threads";
import path from "path";

export function schedulePricingCron() {
  // Runs every day at 00:00 (server timezone). Adjust if you need specific TZ.
  cron.schedule("0 0 * * *", () => {
    const workerPath = path.resolve(
      __dirname,
      "../../frameworks/workers/pricingWorker.ts",
    );
    const worker = new Worker(workerPath);
    worker.on("message", (msg) => console.log("pricingWorker:", msg));
    worker.on("error", (err) => console.error("pricingWorker error:", err));
    worker.on("exit", (code) => console.log("pricingWorker exit:", code));
  });
}
