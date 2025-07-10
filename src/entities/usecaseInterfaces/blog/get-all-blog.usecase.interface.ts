export interface IGetAllBlogUsecaseInterface {
  execute(
    limit: number,
    skip: number,
    filter: object,
  ): Promise<{ items: object[]; total: number }>;
}
