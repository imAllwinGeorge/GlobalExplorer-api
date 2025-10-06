import { inject, injectable } from "tsyringe";
import { IGetConversationUsecase } from "../../../entities/usecaseInterfaces/chat/direct-message/get-conversation.usecase.interface";
import { IConversationRepository } from "../../../entities/repositoryInterfaces/chat/Conversation.repository.interface";
import { IUserRepository } from "../../../entities/repositoryInterfaces/users/user-repository.interface";
import { IHostRepository } from "../../../entities/repositoryInterfaces/users/host-repository.interface";
import { ConversationMapper } from "../../../shared/mappers/conversation.mapper";
import { ConversationResponse } from "../../../shared/types/types";
import { extractUserIds } from "../../../shared/utils/extractUserIds";

@injectable()
export class GetConversationUsecase implements IGetConversationUsecase {
  constructor(
    @inject("IConversationRepository")
    private _conversationRepository: IConversationRepository,

    @inject("IUserRepository")
    private _userRepository: IUserRepository,

    @inject("IHostRepository")
    private _hostRepository: IHostRepository,

    @inject(ConversationMapper)
    private _conversationMapper: ConversationMapper,
  ) {}

  async execute(selfUserId: string): Promise<ConversationResponse[]> {
    const conversations =
      await this._conversationRepository.findAllConverations(selfUserId);

    // Extract other user IDs only
    const otherUserIds = extractUserIds(conversations, selfUserId);

    // Fetch both users and hosts
    const users = await this._userRepository.find({
      _id: { $in: otherUserIds },
    });
    const hosts = await this._hostRepository.find({
      _id: { $in: otherUserIds },
    });

    // Map userId -> { _id, firstName, lastName }
    const userMap = new Map<
      string,
      { _id: string; firstName: string; lastName: string }
    >();

    [...users, ...hosts].forEach((user) => {
      userMap.set(user._id.toString(), {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });

    return this._conversationMapper.toDTOs(conversations, userMap, selfUserId);
  }
}
