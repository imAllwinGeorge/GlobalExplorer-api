import { ICategoryModel } from "../../frameworks/database/mongo/models/category.model";
import { CategoryResponseDTO } from "../../shared/dtos/response.dto";
import { ICategoryEntity } from "../models/category.entity";

export interface ICategoryMapper {
  toDTO(category: ICategoryEntity): CategoryResponseDTO;
  toDTOs(entities: ICategoryModel[]): CategoryResponseDTO[];
}
