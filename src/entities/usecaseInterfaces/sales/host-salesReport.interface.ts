export interface IHostSalesReportUsecase {
  execute(id: string): Promise<object>;
}
