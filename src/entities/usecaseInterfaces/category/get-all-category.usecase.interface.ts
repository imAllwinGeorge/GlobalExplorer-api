export interface IGetAllCategoryUsecase {
  execute(
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }>;
}
