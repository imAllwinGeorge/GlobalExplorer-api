import { IReservationModel } from "../../../frameworks/database/mongo/models/reservation.model";
import { IBaseRepository } from "../IBaseRepository.interface";

export type IReservationRepository = IBaseRepository<IReservationModel>;
