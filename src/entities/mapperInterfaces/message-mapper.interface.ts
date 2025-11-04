import { IMessageModel } from "../../frameworks/database/mongo/models/message.model";
import { MessageResponseDTO } from "../../shared/dtos/response.dto";

export interface IMessageMapper {
  toDTO(message: IMessageModel): MessageResponseDTO;
  toDTOs(entities: IMessageModel[]): MessageResponseDTO[];
}
