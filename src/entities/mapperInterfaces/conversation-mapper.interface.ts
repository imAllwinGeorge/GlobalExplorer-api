import { IConversationModel } from "../../frameworks/database/mongo/models/conversation.model";
import { ConversationResponseDTO } from "../../shared/dtos/response.dto";
import { ConversationResponse } from "../../shared/types/types";

export interface IConversationMapper {
  toDTO(conversation: IConversationModel): ConversationResponseDTO;
  toDTOs(
    entities: IConversationModel[],
    userMap: Map<
      string,
      {
        _id: string;
        firstName: string;
        lastName: string;
      }
    >,
    selfUserId: string,
  ): ConversationResponse[];
}
