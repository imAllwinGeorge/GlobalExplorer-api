import { IConversationModel } from "../../frameworks/database/mongo/models/conversation.model";

export function extractUserIds(
  conversations: IConversationModel[],
  currentUserId: string,
) {
  const ids = new Set<string>();
  for (const convo of conversations) {
    for (const userId of convo.participants) {
      if (userId !== currentUserId) ids.add(userId);
    }
  }

  return Array.from(ids);
}
