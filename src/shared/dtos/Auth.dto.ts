export interface SignupDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "user" | "admin" | "host";
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
}

export interface LoginUserDTO {
  email: string;
  password: string;
  role: "user" | "admin" | "host";
}

export interface GoogleUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "user";
}

export interface HostSignupDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  kyc_idProof: string;
  kyc_addressProof: string;
  kyc_panCard: string;
  accountHolderName: string;
  accountNumber: string;
  branch: string;
  ifsc: string;
  role: "host";
  registrationCertificate: string;
  safetyCertificate: string;
  insurance: string;
  license: string;
}
