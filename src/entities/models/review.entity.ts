import { IBaseEntitiy } from "./base.entity";

export interface IReviewEntity extends IBaseEntitiy {
  entityId: string;
  userId: string;
  ratiing: number;
  title: string;
  comment: string;
}
