import { inject, injectable } from "tsyringe";
import { IUpdateDynamicPricingUsecase } from "../../entities/usecaseInterfaces/activity/update-dynamic-pricing.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { IActivityModel } from "../../frameworks/database/mongo/models/activity.model";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { IActivityMapper } from "../../entities/mapperInterfaces/activitiy-mapper.interface";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class UpdateDynamicPricingUsecase
  implements IUpdateDynamicPricingUsecase
{
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject("IActivityMapper")
    private _activityMapper: IActivityMapper,
  ) {}

  async execute(
    activityId: string,
    data: Partial<IActivityModel>,
  ): Promise<ActivityResponseDTO> {
    const activity = await this._activityRepository.findOneAndUpdate(
      {
        _id: activityId,
      },
      data,
    );

    if (!activity) {
      throw new AppError("Activity Not found", HttpStatusCode.BAD_REQUEST);
    }

    return this._activityMapper.toDTO(activity);
  }
}
