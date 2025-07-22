import { Schema } from "mongoose";

export interface IGenerateToken {
  execute(
    userId: Schema.Types.ObjectId,
    email: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
