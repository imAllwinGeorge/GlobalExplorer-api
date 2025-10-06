import { ConversationResponseDTO } from "../../../../shared/dtos/response.dto";

export interface IMarkReadMessageUsecase {
  execute(
    conversationId: string,
    userId: string,
  ): Promise<ConversationResponseDTO>;
}
