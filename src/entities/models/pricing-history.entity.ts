import { IBaseEntitiy } from "./base.entity";

export interface IPricingHistoryEntity extends IBaseEntitiy {
  activityId: string;
  date: Date;
  oldPricing: number;
  newPrice: number;
  basePrice: number;
  factor: number;
  maxDynamicPercentage: number;
  reason: string[];
}
