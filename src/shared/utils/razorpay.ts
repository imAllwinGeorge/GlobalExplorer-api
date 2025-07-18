import Razorpay from "razorpay";
import { config } from "shared/config";

export const razorpay = new Razorpay({
  key_id: config.razorpay.RAZORPAY_ID,
  key_secret: config.razorpay.RAZORPAY_SECRET,
});
