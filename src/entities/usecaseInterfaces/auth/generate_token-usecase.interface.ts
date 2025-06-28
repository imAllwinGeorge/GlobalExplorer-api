import { Schema } from "mongoose";

export interface IGenerateTokenInterface {
  execute(
    userId: Schema.Types.ObjectId,
    email: string,
  ): Promise<{ accessToken: string }>;
}
