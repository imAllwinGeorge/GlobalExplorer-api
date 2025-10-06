import { Socket } from "socket.io";
import { IConversationModel } from "../../frameworks/database/mongo/models/conversation.model";

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
