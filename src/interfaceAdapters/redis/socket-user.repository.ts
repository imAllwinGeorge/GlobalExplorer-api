import { injectable } from "tsyringe";
import { ISocketUserMapRepository } from "../../entities/repositoryInterfaces/redis/socket-user.repository";
import { redisClient } from "../../frameworks/cache/redis.connect";

@injectable()
export class RedisSocketUserRepository implements ISocketUserMapRepository {
  private readonly prefix = "socket:user:";

  private getKey(userId: string): string {
    return `${this.prefix}${userId}`;
  }

  async setUserSocket(userId: string, socketId: string): Promise<void> {
    await redisClient.set(this.getKey(userId), socketId);
  }

  async getUserSocket(userId: string): Promise<string | null> {
    return await redisClient.get(this.getKey(userId));
  }

  async removeUserSocket(userId: string): Promise<void> {
    await redisClient.del(this.getKey(userId));
  }
}
