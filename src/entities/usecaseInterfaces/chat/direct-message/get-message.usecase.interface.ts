import { MessageResponseDTO } from "../../../../shared/dtos/response.dto";

export interface IGetMessageUsecase {
  execute(conversationId: string): Promise<MessageResponseDTO[]>;
}
