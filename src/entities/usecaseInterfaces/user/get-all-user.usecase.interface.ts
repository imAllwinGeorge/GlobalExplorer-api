export interface IGetAllUsersUsecase {
  execute(
    limit: number,
    skip: number,
    role: string,
  ): Promise<{ items: object[]; total: number }>;
}
