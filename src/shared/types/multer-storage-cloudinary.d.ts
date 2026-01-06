declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";
  import { Cloudinary } from "cloudinary";

  interface CloudinaryStorageParams {
    folder?: string;
    allowed_formats?: string[];
    public_id?: (req: Express.Request, file: Express.Multer.File) => string;
    transformation?: Record<string, unknown> | Record<string, unknown>[];
    [key: string]: unknown;
  }

  interface CloudinaryStorageOptions {
    cloudinary: Cloudinary;
    params?:
      | CloudinaryStorageParams
      | ((
          req: Express.Request,
          file: Express.Multer.File,
        ) => CloudinaryStorageParams);
  }

  class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);

    _handleFile(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (
        error?: unknown,
        info?: Partial<Express.Multer.File> & {
          path?: string;
          filename?: string;
        },
      ) => void,
    ): void;

    _removeFile(
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null) => void,
    ): void;
  }

  export default CloudinaryStorage;
}
