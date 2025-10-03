export interface IHostEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "host";
  kyc_idProof: string;
  kyc_addressProof: string;
  kyc_panCard: string;
  kyc_verified: string;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  registrationCertificate: string;
  safetyCertificate: string;
  insurance: string;
  license: string;
  isBlocked: boolean;
  isVerified: string;
  reasonForRejection?: string;
  razorpayAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}
