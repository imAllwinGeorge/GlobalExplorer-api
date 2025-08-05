import { IpaymentService } from "entities/serviceInterfaces/razorpay-service.interface";
import axios from "axios";
import { config } from "shared/config";

interface RazorpayTransferItem {
  id: string;
  entity: string;
  source: string;
  recipient: string;
  amount: number;
  currency: string;
  notes?: Record<string, string>;
  on_hold: boolean;
  // Add any additional fields from Razorpay's response if needed
  account: string; // Assuming this is present in your response
}
export class RazorpayService implements IpaymentService {
  constructor() {}

  /**
   * Initiates Razorpay Route Transfers from a captured payment.
   * Host's share is kept on hold. Admin's commission is released immediately.
   */
  async createTransferWithHold({
    paymentId,
    hostRazorpayAccountId,
    amountToHost,
    commissionAmount,
    // adminAccountId,
  }: {
    paymentId: string;
    hostRazorpayAccountId: string;
    amountToHost: number; // in rupees
    commissionAmount: number; // in rupees
    // adminAccountId: string;
  }): Promise<{ transferId: string }> {
    console.log("createTransferWithHold");
    try {
      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/transfers`,
        {
          transfers: [
            // {
            //   account: hostRazorpayAccountId,
            //   amount: amountToHost * 100, // convert to paise
            //   currency: "INR",
            //   on_hold: true,
            //   notes: { purpose: "Activity Booking" },
            // },
            // {
            //   account: "acc_QstPAskRoRstaA",
            //   amount: commissionAmount * 100,
            //   currency: "INR",
            //   on_hold: false,
            //   notes: { purpose: "Platform Commission" },
            // },
            {
              account: hostRazorpayAccountId, //Please replace with appropriate ID.
              amount: Math.round(amountToHost * 100),
              currency: "INR",
              notes: {
                purpose: "Activity Booking",
              },
              on_hold: true,
              // on_hold_until: 1671222870,
            },
            {
              account: "acc_QstPAskRoRstaA", //Please replace with appropriate ID.
              amount: Math.round(commissionAmount * 100),
              currency: "INR",
              notes: {
                purpose: "platform commission",
              },
              on_hold: false,
            },
          ],
        },
        {
          auth: {
            username: config.razorpay.RAZORPAY_ID!,
            password: config.razorpay.RAZORPAY_SECRET!,
          },
        },
      );

      // const hostTransfer = response.data.items.find(
      //   (t: any) => t.account === hostRazorpayAccountId,
      // );
      console.log("response transfer: ", response.data);
      if (response) {
        const hostTransfer = (
          response.data.items as RazorpayTransferItem[]
        ).find((t) => t.recipient === hostRazorpayAccountId);

        if (!hostTransfer)
          throw new Error("Transfering money is having some issues.");

        return {
          transferId: hostTransfer?.id,
        };
      } else {
        throw new Error("Transfering money failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Razorpay Error:", error.response.data);
      } else {
        console.error(error);
      }
      throw error; // ✅ Always throws in error case
    }
  }

  async releaseTransfer(transferId: string): Promise<void> {
    try {
      await axios.post(
        `https://api.razorpay.com/v1/transfers/${transferId}/release`,
        {},
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error: unknown) {
      let message = "Unknown error";

      if (
        axios.isAxiosError(error) &&
        error.response?.data?.error?.description
      ) {
        message = error.response.data.error.description;
      } else if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(`Razorpay release failed: ${message}`);
    }
  }

  async getMyAccountId(): Promise<string> {
    const response = await axios.get(
      "https://api.razorpay.com/v1/accounts/Plhg0GQlFe6Jgc",
      {
        auth: {
          username: config.razorpay.RAZORPAY_ID!,
          password: config.razorpay.RAZORPAY_SECRET!,
        },
      },
    );

    console.log("Your account ID is:", response);
    return response.data.id;
  }

  async refundPayment(
    razorpayPaymentId: string,
    amount: number,
  ): Promise<string> {
    try {
      const payload: Record<string, number> = {};
      if (amount) payload.amount = 1000; // Razorpay expects paise
      console.log(razorpayPaymentId, amount);
      const response = await axios.post(
        `https://api.razorpay.com/v1/payments/${razorpayPaymentId}/refund`,
        payload,
        {
          auth: {
            username: config.razorpay.RAZORPAY_ID!,
            password: config.razorpay.RAZORPAY_SECRET!,
          },
        },
      );
      console.log("repayment success");
      return response.data.id; // Razorpay refund ID
    } catch (error: unknown) {
      console.log(error);
      let message = "Unknown error";

      if (
        axios.isAxiosError(error) &&
        error.response?.data?.error?.description
      ) {
        message = error.response.data.error.description;
      } else if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(`Razorpay release failed: ${message}`);
    }
  }
}
