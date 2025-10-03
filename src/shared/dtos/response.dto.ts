import { ObjectId } from "mongoose";

export type ActivityResponseDTO = {
  _id: string;
  activityName: string;
  itenary: string;
  maxCapacity: number;
  categoryId: string;
  pricePerHead: number;
  userId: string;
  street: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  recurrenceDays: string[];
  isActive: boolean;
  location: {
    type?: string;
    coordinates: [number, number];
  };
  images: string[];
  reportingPlace: string;
  reportingTime: string;
  createdAt: string;
  updatedAt: string;
};

export interface UserResponseDTO {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: "user" | "host" | "admin";
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HostResponseDTO {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
  kyc_verified: string;
  isBlocked: boolean;
  isVerified: string;
  reasonForRejection?: string;
  razorpayAccountId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminResponseDTO {
  _id: ObjectId;
  email: string;
  role: "user" | "admin" | "host";
  isBlocked: boolean;
}
