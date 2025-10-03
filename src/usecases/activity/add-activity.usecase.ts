import { IActivityRepository } from "entities/repositoryInterfaces/activity/activityRepository.interface";
import { IAddActivityUsecase } from "entities/usecaseInterfaces/activity/add-activity.usecase.interface";
import { ActivityDTO } from "shared/dtos/Auth.dto";
import { ActivityResponseDTO } from "shared/dtos/response.dto";
import { ActivityMapper } from "shared/mappers/activity.mapper";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddActivityUsecase implements IAddActivityUsecase {
  constructor(
    @inject("IActivityRepository")
    private _activityRepository: IActivityRepository,

    @inject(ActivityMapper)
    private _activityMapper: ActivityMapper,
  ) {}

  async execute(data: ActivityDTO): Promise<ActivityResponseDTO> {
    const mappedData = this._activityMapper.toEntity(data);
    const activity = await this._activityRepository.save(mappedData);
    return this._activityMapper.toDTO(activity);
  }
}
