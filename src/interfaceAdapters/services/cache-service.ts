import { ICacheService } from "entities/serviceInterfaces/cache-service.interface";
import { redisClient } from "frameworks/cache/redis.connect";

export class CacheService implements ICacheService {
  private _redisClient;
  constructor() {
    this._redisClient = redisClient;
  }

  async set(cacheKey: string, value: object, time: number): Promise<void> {
    await this._redisClient.setEx(cacheKey, time, JSON.stringify(value));
  }

  async get(cacheKey: string): Promise<object | null> {
    const data = await this._redisClient.get(cacheKey);
    return data ? JSON.parse(data) : null;
  }

  async del(cachekey: string): Promise<void> {
    await this._redisClient.del(cachekey);
  }

  async delByPattern(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await this._redisClient.del(keys);
    }
  }
}
