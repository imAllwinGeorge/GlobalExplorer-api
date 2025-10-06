import {
  ConversationResponseDTO,
  MessageResponseDTO,
} from "../../../../shared/dtos/response.dto";

export interface ISendDirectMessageUsecase {
  execute(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<{
    message: MessageResponseDTO;
    conversation: ConversationResponseDTO;
  }>;
}
