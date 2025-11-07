import {
  BookingResponseDTO,
  UserResponseDTO,
} from "../../../shared/dtos/response.dto";

export interface IQRVerificationUsecase {
  execute(token: string): Promise<{
    booking: BookingResponseDTO;
    user: UserResponseDTO;
  }>;
}
