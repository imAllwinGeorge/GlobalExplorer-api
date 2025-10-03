import { IHostModel } from "frameworks/database/mongo/models/host.model";
import { HostSignupDTO } from "shared/dtos/Auth.dto";
import { HostResponseDTO } from "shared/dtos/response.dto";
import { injectable } from "tsyringe";

@injectable()
export class HostMapper {
  toEntity(dto: HostSignupDTO): Partial<IHostModel> {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: dto.password,
      kyc_idProof: dto.kyc_idProof,
      kyc_addressProof: dto.kyc_panCard,
      kyc_panCard: dto.kyc_panCard,
      accountHolderName: dto.accountHolderName,
      accountNumber: dto.accountNumber,
      branch: dto.branch,
      ifsc: dto.ifsc,
      role: dto.role,
      registrationCertificate: dto.registrationCertificate,
      safetyCertificate: dto.safetyCertificate,
      insurance: dto.insurance,
      license: dto.license,
    };
  }

  toDTO(host: IHostModel): HostResponseDTO {
    return {
      _id: host._id,
      firstName: host.firstName,
      lastName: host.lastName,
      email: host.email,
      phoneNumber: host.phoneNumber,
      kyc_idProof: host.kyc_idProof,
      kyc_addressProof: host.kyc_addressProof,
      kyc_panCard: host.kyc_panCard,
      accountHolderName: host.accountHolderName,
      accountNumber: host.accountNumber,
      branch: host.branch,
      ifsc: host.ifsc,
      role: host.role,
      registrationCertificate: host.registrationCertificate,
      safetyCertificate: host.safetyCertificate,
      insurance: host.insurance,
      license: host.license,
      kyc_verified: host.kyc_verified,
      isBlocked: host.isBlocked,
      isVerified: host.isVerified,
      reasonForRejection: host.reasonForRejection,
      razorpayAccountId: host.razorpayAccountId,
      createdAt: host.createdAt.toString(),
      updatedAt: host.updatedAt.toString(),
    };
  }

  toDTOs(entities: IHostModel[]): HostResponseDTO[] {
    return entities.map((entity) => this.toDTO(entity));
  }
}
