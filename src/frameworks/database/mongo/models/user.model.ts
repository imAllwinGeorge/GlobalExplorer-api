import { model, ObjectId, Schema } from "mongoose";
import { IUserEntity } from "../../../../entities/models/user.entity";

export interface IUserModel extends IUserEntity, Document {
  _id: ObjectId;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUserModel>("User", userSchema);
