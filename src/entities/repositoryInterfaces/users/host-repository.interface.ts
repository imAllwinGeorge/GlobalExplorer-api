import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { IBaseRepositoryInterface } from "../IBaseRepository.interface";

// export type IHostRepositoryInterface = IBaseRepositoryInterface<IHostModel>;

export interface IHostRepositoryInterface
  extends IBaseRepositoryInterface<IHostModel> {
  getRazorpayAccountId(id: string): Promise<string>;
}
