export interface IAdminDashboardUsecase {
  execute(): Promise<Record<string, number | object>>;
}
