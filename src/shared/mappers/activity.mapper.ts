import { IActivityModel } from "frameworks/database/mongo/models/activity.model";
import { ActivityDTO } from "shared/dtos/Auth.dto";
import { ActivityResponseDTO } from "shared/dtos/response.dto";
import { injectable } from "tsyringe";

@injectable()
export class ActivityMapper {
  toEntity(dto: ActivityDTO): Partial<IActivityModel> {
    return {
      activityName: dto.activityName,
      itenary: dto.itenary,
      maxCapacity: dto.maxCapacity,
      categoryId: dto.categoryId,
      pricePerHead: dto.pricePerHead,
      userId: dto.userId,
      street: dto.street,
      city: dto.city,
      district: dto.district,
      state: dto.state,
      postalCode: dto.postalCode,
      country: dto.country,
      recurrenceDays: dto.recurrenceDays,
      location: {
        type: dto.location.type,
        coordinates: dto.location.coordinates,
      },
      images: dto.images,
      reportingPlace: dto.reportingPlace,
      reportingTime: dto.reportingTime,
    };
  }

  toDTO(activity: IActivityModel): ActivityResponseDTO {
    return {
      _id: activity._id.toString(),
      activityName: activity.activityName,
      itenary: activity.itenary,
      maxCapacity: activity.maxCapacity,
      categoryId: activity.categoryId,
      pricePerHead: activity.pricePerHead,
      userId: activity.userId,
      street: activity.street,
      city: activity.city,
      district: activity.district,
      state: activity.state,
      postalCode: activity.postalCode,
      country: activity.country,
      recurrenceDays: activity.recurrenceDays,
      isActive: activity.isActive,
      location: {
        type: activity.location.type,
        coordinates: activity.location.coordinates,
      },
      images: activity.images,
      reportingPlace: activity.reportingPlace,
      reportingTime: activity.reportingTime,
      createdAt: activity.createdAt.toString(),
      updatedAt: activity.updatedAt.toString(),
    };
  }

  toDTOs(entities: IActivityModel[]): ActivityResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
