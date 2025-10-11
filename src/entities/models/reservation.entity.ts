import { IBaseEntitiy } from "./base.entity";

export interface IReservationEntity extends IBaseEntitiy {
  userId: string;
  activityId: string;
  date: string;
  seats: number;
  status: string;
  expiresAt: Date;
}
