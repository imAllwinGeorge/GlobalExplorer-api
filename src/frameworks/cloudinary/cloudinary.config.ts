import { v2 as cloudinary } from "cloudinary";
import { config } from "../../shared/config";

cloudinary.config({
  cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME,
  api_key: config.cloudinary.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.CLOUDINARY_SECRET,
});

export { cloudinary };
