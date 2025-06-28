import { IHostRepositoryInterface } from "entities/repositoryInterfaces/users/host-repository.interface";
import {
  HostModel,
  IHostModel,
} from "frameworks/database/mongo/models/host.model";
import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository";

@injectable()
export class HostRepository
  extends BaseRepository<IHostModel>
  implements IHostRepositoryInterface
{
  constructor() {
    super(HostModel);
  }
}
