import { IMessageModel } from "frameworks/database/mongo/models/message.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IMessageRepository = IBaseRepository<IMessageModel>;
