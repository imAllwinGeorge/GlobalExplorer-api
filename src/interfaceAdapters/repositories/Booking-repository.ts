import {
  BookingModel,
  IBookingModal,
} from "frameworks/database/mongo/models/booking.model";
import { BaseRepository } from "./base.repository";
import { IBookingRepositoryInterface } from "entities/repositoryInterfaces/booking/booking-repository.interface";

export class BookingRepository
  extends BaseRepository<IBookingModal>
  implements IBookingRepositoryInterface
{
  constructor() {
    super(BookingModel);
  }
}
