// src/workers/pricingWorker.ts
import "reflect-metadata";
import { parentPort } from "worker_threads";
import mongoose from "mongoose";
import pLimit from "p-limit";
import { AvailabilityModel } from "../database/mongo/models/availability.model";
import {
  ActivityModel,
  IActivityModel,
} from "../database/mongo/models/activity.model";
import { PricingService } from "../../interfaceAdapters/services/pricing-service";
import { PricingHistoryModel } from "../database/mongo/models/pricing-history.model";
import { config } from "../../shared/config";

// DB_URL should be provided through env
const MONGO = config.mongoDB.MONGODB_URI!;
const pricingService = new PricingService();

async function connect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO, {
      /* use your options */
    });
  }
}

function addDays(d: Date, days: number) {
  const c = new Date(d);
  c.setUTCDate(c.getUTCDate() + days);
  return c;
}

async function processActivity(activity: IActivityModel) {
  const today = new Date();
  const start = new Date(today.toISOString().slice(0, 10)); // midnight UTC localize as needed
  const end = addDays(start, 9); // next 10 days inclusive

  // fetch availability documents for this activity in date range, sorted
  const slots = await AvailabilityModel.find({
    activityId: activity._id,
    date: { $gte: start, $lte: end },
  })
    .sort({ date: 1 })
    .lean();

  if (!slots || slots.length === 0) return;

  // map by date index so prev/current/next easily accessible
  for (let i = 0; i < slots.length; i++) {
    const prev = slots[i - 1] ?? null;
    const cur = slots[i];
    const next = slots[i + 1] ?? null;

    // compute load factors (booked seats ratio)
    const factors: number[] = [];
    if (prev && prev.totalSeats > 0)
      factors.push((prev.totalSeats - prev.availableSeats) / prev.totalSeats);
    if (cur && cur.totalSeats > 0)
      factors.push((cur.totalSeats - cur.availableSeats) / cur.totalSeats);
    if (next && next.totalSeats > 0)
      factors.push((next.totalSeats - next.availableSeats) / next.totalSeats);

    if (factors.length === 0) continue;

    const avgLoadRatio = factors.reduce((a, b) => a + b, 0) / factors.length;
    const avgLoadPercent = avgLoadRatio * 100;

    const factor = pricingService.computeFactorFromAvgLoad(avgLoadPercent);
    if (factor === 0) {
      // no increase — skip updating price (we're not decreasing in your spec)
      continue;
    }

    const basePrice = activity.basePrice ?? activity.pricePerHead ?? 0;
    const maxDynamicPercentage = activity.maxDynamicPercentage ?? 0;
    const newPrice = pricingService.computeNewPrice(
      basePrice,
      maxDynamicPercentage,
      factor,
    );

    // Only update if price is different
    const oldPrice = cur.price ?? basePrice;
    if (newPrice !== oldPrice) {
      // Update availability doc price
      await AvailabilityModel.updateOne(
        { _id: cur._id },
        { $set: { price: newPrice } },
      );

      // Log pricing history (optional)
      await PricingHistoryModel.create({
        activityId: activity._id,
        date: cur.date,
        oldPrice,
        newPrice,
        basePrice,
        factor,
        maxDynamicPercentage,
        reason: [`AVG_LOAD_${Math.round(avgLoadPercent)}`],
      });
    }
  }
}
console.log("Worker started at", new Date().toISOString());
async function run() {
  try {
    await connect();

    // fetch all activities with dynamicPricingEnabled true
    const cursor = ActivityModel.find({ dynamicPricingEnabled: true }).cursor();
    const limit = pLimit(5); // 5 activities processed concurrently
    const jobs: Promise<void>[] = [];

    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      const activity = doc;
      jobs.push(limit(() => processActivity(activity)));
    }

    await Promise.all(jobs);
    parentPort?.postMessage({ status: "ok" });
    await mongoose.disconnect();
  } catch (err) {
    parentPort?.postMessage({ status: "error", error: String(err) });
    try {
      await mongoose.disconnect();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {}
    process.exit(1);
  }
}

run();
