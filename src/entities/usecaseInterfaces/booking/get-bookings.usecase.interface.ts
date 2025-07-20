export interface IGetBookedActivityUsecase {
  execute(
    data: object,
    limit: number,
    skip: number,
  ): Promise<{ items: object[]; total: number }>;
}
