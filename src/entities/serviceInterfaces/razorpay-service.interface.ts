export interface IpaymentService {
  createTransferWithHold(data: {
    paymentId: string;
    hostRazorpayAccountId: string;
    amountToHost: number;
    commissionAmount: number;
    // adminAccountId: string;
  }): Promise<{ transferId: string }>;

  releaseTransfer(transferId: string): Promise<void>;

  getMyAccountId(): Promise<string>;
}
