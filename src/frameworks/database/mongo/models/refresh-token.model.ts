import { IRefreshTokenEntity } from "entities/models/refreshtoken.entity";
import { model, ObjectId, Schema } from "mongoose";

export interface IRefreshTokenModel extends IRefreshTokenEntity, Document {
  _id: ObjectId;
}

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "admin", "host"],
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Creating TTL index
RefreshTokenSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
export const RefreshTokenModel = model<IRefreshTokenModel>(
  "RefreshToken",
  RefreshTokenSchema,
);
