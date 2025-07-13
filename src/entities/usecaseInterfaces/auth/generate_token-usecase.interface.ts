import { Schema } from "mongoose";

export interface IGenerateTokenInterface {
  execute(
    userId: Schema.Types.ObjectId,
    email: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
