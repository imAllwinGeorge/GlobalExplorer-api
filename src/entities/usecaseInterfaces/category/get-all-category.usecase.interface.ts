export interface IGetAllCategoryUsecaseInterface {
  execute(
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }>;
}
