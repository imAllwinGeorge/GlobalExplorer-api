export interface IGetAllUsersUsecase {
  execute(
    limit: number,
    skip: number,
    role: string,
    search: string,
  ): Promise<{ items: object[]; total: number }>;
}
