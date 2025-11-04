import { IBookingModal } from "../../frameworks/database/mongo/models/booking.model";
import { BookingResponseDTO } from "../../shared/dtos/response.dto";

export interface IBookingMapper {
  toDTO(booking: IBookingModal): BookingResponseDTO;
  toDTOs(entities: IBookingModal[]): BookingResponseDTO[];
}
