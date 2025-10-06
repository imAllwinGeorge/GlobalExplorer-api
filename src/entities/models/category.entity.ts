import { IBaseEntitiy } from "./base.entity";

export interface ICategoryEntity extends IBaseEntitiy {
  categoryName: string;
  description: string;
  isActive: boolean;
}
