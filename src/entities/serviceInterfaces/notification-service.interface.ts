export interface INotificationService {
  emitNotification(
    userId: string,
    payload: object,
    event: string,
  ): Promise<void>;
}
