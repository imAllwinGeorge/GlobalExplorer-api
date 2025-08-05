export interface ISocketUserMapRepository {
  setUserSocket(userId: string, socketId: string): Promise<void>;
  getUserSocket(userId: string): Promise<string | null>;
  removeUserSocket(userId: string): Promise<void>;
}
