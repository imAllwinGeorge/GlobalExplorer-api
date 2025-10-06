import { BookingDTO } from "../../../shared/dtos/Auth.dto";

export interface ICreateOrderUsecase {
  execute(data: BookingDTO): Promise<object>;
}
