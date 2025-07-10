export interface IGetAllUsersUsecaseInterface {
  execute(
    limit: number,
    skip: number,
    role: string,
  ): Promise<{ items: object[]; total: number }>;
}
