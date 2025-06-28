import { IHostEntity } from "entities/models/host.entity";
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IHostModel extends IHostEntity, Document {
  _id: ObjectId;
}

const hostSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["host"],
      require: true,
    },
    kyc_idProof: {
      type: String,
      require: true,
    },
    kyc_addressProof: {
      type: String,
      require: true,
    },
    kyc_panCard: {
      type: String,
      require: true,
    },
    kyc_verified: {
      type: String,
      default: false,
    },
    accountHolderName: {
      type: String,
      require: true,
    },
    accountNumber: {
      type: String,
      require: true,
    },
    ifsc: {
      type: String,
      require: true,
    },
    branch: {
      type: String,
      require: true,
    },
    registrationCertificate: {
      type: String,
      require: true,
    },
    safetyCertificate: {
      type: String,
    },
    license: {
      type: String,
      require: true,
    },
    insurance: {
      type: String,
      require: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    reasonForRejection: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const HostModel = model<IHostModel>("host", hostSchema);
