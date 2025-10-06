export interface IHostDashboardUsecase {
  execute(id: string): Promise<Record<string, number | object>>;
}
