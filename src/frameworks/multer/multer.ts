/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import { cloudinary } from "../cloudinary/cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req: unknown, file: { originalname: string }) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\.[^/.]+$/, "");
      return `${originalName}-${timestamp}`;
    },
  } as any,
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type! Only JPEG, PNG, and JPG are allowed."));
    }
  },
});

export default upload;
