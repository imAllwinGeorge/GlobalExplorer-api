import { IBookingModal } from "frameworks/database/mongo/models/booking.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

export type IBookingRepositoryInterface =
  IBaseRepositoryInterface<IBookingModal>;
