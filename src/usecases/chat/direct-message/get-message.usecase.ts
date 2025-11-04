import { inject, injectable } from "tsyringe";
import { IGetMessageUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/get-message.usecase.interface";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { MessageResponseDTO } from "../../../shared/dtos/response.dto";
import { IMessageMapper } from "../../../entities/mapperInterfaces/message-mapper.interface";

@injectable()
export class GetMessageUsecase implements IGetMessageUsecase {
  constructor(
    @inject("IMessageRepository")
    private _messageRepository: IMessageRepository,

    @inject("IMessageMapper")
    private _messageMapper: IMessageMapper,
  ) {}

  async execute(conversationId: string): Promise<MessageResponseDTO[]> {
    const messages = await this._messageRepository.find({ conversationId });

    return this._messageMapper.toDTOs(messages);
  }
}
