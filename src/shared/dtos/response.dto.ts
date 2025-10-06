import { ObjectId } from "mongoose";

interface BaseEntitiy {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface ReviewResponseDTO {
  _id: ObjectId;
  entityId: string;
  userId:
    | string
    | {
        _id: ObjectId;
        firstName: string;
        lastName: string;
      };
  ratiing: number;
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogResponseDTO extends BaseEntitiy {
  _id: ObjectId;
  userId: string; // Author's user ID
  title: string; // Blog title
  author: string; // Author name (redundant but useful for fast access)
  introduction: string; // Short intro or preview text
  sections: BlogSection[]; // Multiple sections in the blog
  image: string; // Main or introduction image
  views: number; // Number of views
  likes: string[]; // Array of userIds who liked it
}

export interface BlogSection {
  sectionTitle: string; // Title of the section
  content: string; // Body content (Markdown or HTML)
  image: string; // Optional image for the section
}

export interface BookingResponseDTO {
  _id: ObjectId;
  userId: string;
  activityId: string;
  activityTitle: string;
  date: Date;
  participantCount: number;
  pricePerParticipant: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  razorpayPaymentId?: string;
  razporpayOrderId?: string;
  razorpaySignatue?: string;
  bookingStatus: "pending" | "cancelled" | "completed";
  hostId: string;
  isCancelled: boolean;
  cancellationReason?: string;
  isRefunded: boolean;
  refundId?: string;
  refundAmount?: number;
  refundStatus?: "initialized" | "completed" | "failed";
  razorpayTransferId?: string;
  isReleased: boolean;
  holdUntilDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponseDTO extends BaseEntitiy {
  categoryName: string;
  description: string;
  isActive: boolean;
}

export interface ConversationResponseDTO extends BaseEntitiy {
  participants: string[];
  lastMessage: string;
  lastSender: string;
  lastMessageAt: Date;
  unreadCount: Record<string, number>;
}

export interface MessageResponseDTO extends BaseEntitiy {
  conversationId: string | ObjectId;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  sentAt: Date;
}

export interface NotificationResponseDTO extends BaseEntitiy {
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
}
