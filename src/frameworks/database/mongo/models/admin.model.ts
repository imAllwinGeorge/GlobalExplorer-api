import { Document, model, ObjectId } from "mongoose";
import { IAdminEntity } from "../../../../entities/models/admin.entiry";
import { adminSchema } from "../Schema/admin.schema";

export interface IAdminModel extends IAdminEntity, Document {
  _id: ObjectId;
}

export const AdminModel = model<IAdminModel>("Admin", adminSchema);
