import { ActivityResponseDTO } from "../../../shared/dtos/response.dto";

export interface IGetActivityDetailsUsecase {
  execute(id: string): Promise<{
    activity: ActivityResponseDTO;
    razorpayAccountId: string;
    availability: {
      date: string;
      availableSeats: number;
    }[];
  }>;
}
