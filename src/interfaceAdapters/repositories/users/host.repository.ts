import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";
import {
  HostModel,
  IHostModel,
} from "../../../frameworks/database/mongo/models/host.model";
import { IHostRepository } from "../../../entities/repositoryInterfaces/users/host-repository.interface";

@injectable()
export class HostRepository
  extends BaseRepository<IHostModel>
  implements IHostRepository
{
  constructor() {
    super(HostModel);
  }

  async getRazorpayAccountId(id: string): Promise<string> {
    const host = await this.model.findById(id).select("razorpayAccountId");
    console.log(" host result   :", host?.razorpayAccountId ?? "");
    return host?.razorpayAccountId ?? "";
  }
}
