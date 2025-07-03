import { Schema } from "mongoose";
import { IGenerateTokenInterface } from "../../entities/usecaseInterfaces/auth/generate_token-usecase.interface";
import { IJwtserviceInterface } from "../../entities/serviceInterfaces/jwt-services.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GenerateToken implements IGenerateTokenInterface {
  constructor(
    @inject("IJwtService")
    private _tokenService: IJwtserviceInterface,
  ) {}
  async execute(
    userId: Schema.Types.ObjectId,
    email: string,
    role: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      userId,
      email,
      role,
    };
    const accessToken = this._tokenService.generateAccessToken(payload);
    return { accessToken };
  }
}
