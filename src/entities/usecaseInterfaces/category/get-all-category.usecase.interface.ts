export interface IGetAllCategoryUsecase {
  execute(
    limit: number,
    skip: number,
    search: string,
  ): Promise<{ items: object[]; total: number }>;
}
