import "express-session";

declare module "express-session" {
  interface SessionData {
    userData?: {
      firstName?: string;
      lastName?: string;
      name?: string;
      email: string;
      password: string;
      phoneNumber: string;
      role: "host" | "user" | "admin";
      otp: string;
      kyc_idProof?: string;
      kyc_addressProof?: string;
      kyc_panCard?: string;
      accountHolderName?: string;
      accountNumber?: string;
      ifsc?: string;
      branch?: string;
      registrationCertificate?: string;
      license?: string;
      insurance?: string;
      safetyCertificate?: string;
    };
  }
}
