import { IBaseEntitiy } from "./base.entity";

export interface INotificationEntitiy extends IBaseEntitiy {
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
}
