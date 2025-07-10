export interface IGetActivityUsecaseInterface {
  execute(
    limit: number,
    skip: number,
    value: object,
  ): Promise<{ items: object[]; total: number }>;
}
