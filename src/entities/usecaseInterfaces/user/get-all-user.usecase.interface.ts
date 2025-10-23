export interface IGetAllUsersUsecase {
  execute(
    limit: number,
    skip: number,
    role: string,
    search: string,
    filter: string,
  ): Promise<{ items: object[]; total: number }>;
}
