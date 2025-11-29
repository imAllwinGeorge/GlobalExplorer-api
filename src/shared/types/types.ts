import { Socket } from "socket.io";
import { IConversationModel } from "../../frameworks/database/mongo/models/conversation.model";
import { ObjectId } from "mongoose";
import { IUserModel } from "../../frameworks/database/mongo/models/user.model";
import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";

export interface Filter {
  search: string | undefined;
  category: string | undefined;
  priceRangeMin: number | undefined;
  distance: number | undefined;
  priceRangeMax: number | undefined;
  lat: number | undefined;
  lng: number | undefined;
}

export interface ConversationResponse extends IConversationModel {
  receiverId: string;
  firstName: string;
  lastName: string;
}

export interface CustomSocket extends Socket {
  userId?: string;
}

export interface ImageGallery {
  _id: ObjectId;
  image: string;
  title: string;
  url?: string;
}

export interface BookingWithUser extends IBookingModal {
  user: Omit<IUserModel, "password">;
}

export type DateFilterType =
  | "single"
  | "today"
  | "yesterday"
  | "range"
  | "week"
  | "month"
  | "year"
  | "all";

export interface SalesFilters {
  dateFilterType: DateFilterType;
  fromDate?: string; // ISO string
  toDate?: string; // ISO string
  minPrice?: number;
  maxPrice?: number;
}

export interface SalesReportQuery {
  filter: SalesFilters;
  limit: number;
  skip: number;
  hostId?: string;
  activityId?: string;
}
