import { IMessageRepository } from "entities/repositoryInterfaces/chat/IMessage.repository.interface";
import { IGetMessageUsecase } from "entities/usecaseInterfaces/chat/direct-message/get-message.usecase.interface";
import { IMessageModel } from "frameworks/database/mongo/models/message.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMessageUsecase implements IGetMessageUsecase {
  constructor(
    @inject("IMessageRepository")
    private _messageRepository: IMessageRepository,
  ) {}

  async execute(conversationId: string): Promise<IMessageModel[]> {
    const messages = await this._messageRepository.find({ conversationId });

    return messages;
  }
}
