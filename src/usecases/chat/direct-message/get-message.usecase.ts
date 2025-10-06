import { inject, injectable } from "tsyringe";
import { IGetMessageUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/get-message.usecase.interface";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { MessageMapper } from "../../../shared/mappers/message.mapper";
import { MessageResponseDTO } from "../../../shared/dtos/response.dto";

@injectable()
export class GetMessageUsecase implements IGetMessageUsecase {
  constructor(
    @inject("IMessageRepository")
    private _messageRepository: IMessageRepository,

    @inject(MessageMapper)
    private _messageMapper: MessageMapper,
  ) {}

  async execute(conversationId: string): Promise<MessageResponseDTO[]> {
    const messages = await this._messageRepository.find({ conversationId });

    return this._messageMapper.toDTOs(messages);
  }
}
