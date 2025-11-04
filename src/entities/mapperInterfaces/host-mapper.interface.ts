import { IHostModel } from "../../frameworks/database/mongo/models/host.model";
import { HostSignupDTO } from "../../shared/dtos/Auth.dto";
import { HostResponseDTO } from "../../shared/dtos/response.dto";

export interface IHostMapper {
  toEntity(dto: HostSignupDTO): Partial<IHostModel>;
  toDTO(host: IHostModel): HostResponseDTO;
  toDTOs(entities: IHostModel[]): HostResponseDTO[];
}
