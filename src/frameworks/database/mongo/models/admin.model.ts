import { Document, model, ObjectId, Schema } from "mongoose";
import { IAdminEntity } from "../../../../entities/models/admin.entiry";

export interface IAdminModel extends IAdminEntity, Document {
  _id: ObjectId;
}

const adminSchema = new Schema<IAdminModel>({
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

export const AdminModel = model<IAdminModel>("Admin", adminSchema);
