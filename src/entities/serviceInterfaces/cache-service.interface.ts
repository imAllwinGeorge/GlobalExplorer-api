export interface ICacheService {
  get(cacheKey: string): Promise<object | null>;

  set(cacheKey: string, value: object, time: number): Promise<void>;

  del(cachekey: string): Promise<void>;

  delByPattern(pattern: string): Promise<void>;
}
