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

export interface ActivityDTO {
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
  location: {
    type?: string;
    coordinates: [number, number];
  };
  images: string[];
  reportingPlace: string;
  reportingTime: string;
}

export interface BlogDTO {
  userId: string;
  title: string;
  author: string;
  introduction: string;
  sections: {
    sectionTitle: string;
    content: string;
    image: string;
  }[];
  image: string;
}

export interface BookingDTO {
  userId: string;
  activityId: string;
  activityTitle: string;
  date: Date;
  participantCount: number;
  pricePerParticipant: number;
  razorpayPaymentId?: string;
  razporpayOrderId?: string;
  rezorpaySignatue?: string;
  hostId: string;
  razorpayTransferId?: string;
  holdUntilDate: Date;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
}

export interface MessageDTO {
  senderId: string;
  receiverId: string;
  content: string;
}
