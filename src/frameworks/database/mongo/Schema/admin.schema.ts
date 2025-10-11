import { Schema } from "mongoose";
import { IAdminModel } from "../models/admin.model";

export const adminSchema = new Schema<IAdminModel>({
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
