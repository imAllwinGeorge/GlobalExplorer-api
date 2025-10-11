import { injectable } from "tsyringe";
import { IReservationRepository } from "../../../entities/repositoryInterfaces/reservation/reservation-repository.interface";
import {
  IReservationModel,
  ReservationModel,
} from "../../../frameworks/database/mongo/models/reservation.model";
import { BaseRepository } from "../base.repository";

@injectable()
export class ReservationRepository
  extends BaseRepository<IReservationModel>
  implements IReservationRepository
{
  constructor() {
    super(ReservationModel);
  }
}
