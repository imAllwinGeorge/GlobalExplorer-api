import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/IMessage.repository.interface";
import {
  IMessageModel,
  MessageModel,
} from "../../../frameworks/database/mongo/models/message.model";
import { BaseRepository } from "../base.repository";

import { injectable } from "tsyringe";

@injectable()
export class MessageRepository
  extends BaseRepository<IMessageModel>
  implements IMessageRepository
{
  constructor() {
    super(MessageModel);
  }
}
