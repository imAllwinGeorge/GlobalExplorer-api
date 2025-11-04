import { inject, injectable } from "tsyringe";
import { IEditActivityUsecase } from "../../entities/usecaseInterfaces/activity/edit-activity.usecase.interface";
import { IActivityRepository } from "../../entities/repositoryInterfaces/activity/activityRepository.interface";
import { ICacheService } from "../../entities/serviceInterfaces/cache-service.interface";
import { ActivityResponseDTO } from "../../shared/dtos/response.dto";
import { AppError } from "../../shared/errors/appError";
import { HttpStatusCode } from "../../shared/constants/constants";
import { EditActivityDTO } from "../../shared/dtos/edit.dto";
import { IActivityMapper } from "../../entities/mapperInterfaces/activitiy-mapper.interface";

@injectable()
export class EditActivityUsecase implements IEditActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _actvityRepository: IActivityRepository,

    @inject("ICacheService")
    private _cacheService: ICacheService,

    @inject("IActivityMapper")
    private _activityMapper: IActivityMapper,
  ) {}

  async execute(
    id: string,
    data: EditActivityDTO,
  ): Promise<ActivityResponseDTO> {
    const sameActivityName = await this._actvityRepository.findExcludingId(
      id,
      "activityName",
      data.activityName,
    );

    if (sameActivityName) {
      throw new AppError(
        "Activity with same Name already exists",
        HttpStatusCode.CONFLICT,
      );
    }

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
