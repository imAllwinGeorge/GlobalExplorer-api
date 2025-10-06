import { IHostModel } from "../../../frameworks/database/mongo/models/host.model";
import { IBaseRepository } from "../IBaseRepository.interface";

// export type IHostRepositoryInterface = IBaseRepositoryInterface<IHostModel>;

export interface IHostRepository extends IBaseRepository<IHostModel> {
  getRazorpayAccountId(id: string): Promise<string>;
}
