import { inject, injectable } from "tsyringe";
import { IEditActivityUsecase } from "../../entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { ActivityMapper } from "../../shared/mappers/activity.mapper";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";

@injectable()
export class EditActivityUsecase implements IEditActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _actvityRepository: IActivityRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject(ActivityMapper)
    private _activityMapper: ActivityMapper,
  ) {}

  async execute(id: string, data: object): Promise<ActivityResponseDTO> {
    const activity = await this._actvityRepository.findOneAndUpdate(
      { _id: id },
      data,
    );
    let mappedActivity;
    if (!activity) {
      throw new AppError(
        "cannot find the activity. Please try again",
        HttpStatusCode.UNAUTHORIZED,
      );
    } else {
      mappedActivity = this._activityMapper.toDTO(activity);
    }

    await this._cacheService.del(`activity:${id}`);

    await this._cacheService.delByPattern("activity:*");

    return mappedActivity;
  }
}
