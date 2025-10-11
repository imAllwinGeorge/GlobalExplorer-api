import { IBaseEntitiy } from "./base.entity";

export interface IAvailabilityEntity extends IBaseEntitiy {
  activityId: string;
  availableSeats: number;
  totalSeats: number;
  date: string;
}
