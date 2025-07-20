export interface IGetMyBlogsUsecase {
  execute(
    id: string,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }>;
}
