import { model, ObjectId } from "mongoose";
import { IUserEntity } from "../../../../entities/models/user.entity";
import { userSchema } from "../Schema/user.schema";

export interface IUserModel extends IUserEntity, Document {
  _id: ObjectId;
}

export const UserModel = model<IUserModel>("user", userSchema);
