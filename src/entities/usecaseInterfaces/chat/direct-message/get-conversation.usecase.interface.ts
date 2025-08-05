import { ConversationResponse } from "shared/types/types";

export interface IGetConversationUsecase {
  execute(id: string): Promise<ConversationResponse[]>;
}
