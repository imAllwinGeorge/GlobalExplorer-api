export interface IHostSalesDetailsUsecase {
  execute(id: string): Promise<object>;
}
