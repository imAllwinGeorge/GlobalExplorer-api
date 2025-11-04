import { ICategoryMapper } from "../../entities/mapperInterfaces/category-mapper.interface";
import { ICategoryModel } from "../../frameworks/database/mongo/models/category.model";
import { CategoryResponseDTO } from "../dtos/response.dto";

export class CategoryMapper implements ICategoryMapper {
  toDTO(category: ICategoryModel): CategoryResponseDTO {
    return {
      _id: category._id,
      categoryName: category.categoryName,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  toDTOs(entities: ICategoryModel[]): CategoryResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
