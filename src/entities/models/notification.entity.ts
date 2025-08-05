export interface INotificationEntitiy {
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
