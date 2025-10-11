import { BookingResponseDTO } from "../../../shared/dtos/response.dto";

export interface IBookActivityUsecase {
  execute(data: object): Promise<BookingResponseDTO>;
}
