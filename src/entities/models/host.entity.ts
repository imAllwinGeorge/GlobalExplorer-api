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
  registractionCertificate: string;
  safetyCertificate: string;
  insurance: string;
  license: string;
  isBlocked: boolean;
  isApproved: boolean;
  reasonForRejection: string;
  createdAt: Date;
  updatedAt: Date;
}
