import { inject, injectable } from "tsyringe";
import { IGetActivityUsecase } from "../../entities/usecaseInterfaces/activity/get-actvity.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { IActivityMapper } from "../../entities/mapperInterfaces/activitiy-mapper.interface";
import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class GetActivityUsecase implements IGetActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("IActivityMapper")
    private _activityMapper: IActivityMapper,
  ) {}

  async execute(activityId: string): Promise<ActivityResponseDTO> {
    const activity = await this._activityRepository.findById({
      _id: activityId,
    });

    if (!activity) {
      throw new AppError("Activity not found", HttpStatusCode.BAD_REQUEST);
    }

    return this._activityMapper.toDTO(activity as unknown as IActivityModel);
  }
}
