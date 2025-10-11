import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../cloudinary/cloudinary.config";

// // Function to ensure a directory exists
// const ensureDirectoryExists = (directory: string) => {
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory, { recursive: true });
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folderPath = "./uploads/images";
//     ensureDirectoryExists(folderPath);
//     cb(null, folderPath);
//   },
//   filename: (req, file, cb) => {
//     // Use the original file name and append a timestamp to it to avoid conflicts
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
    // define custom filename
    public_id: (req: unknown, file: { originalname: string }) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\.[^/.]+$/, ""); // remove extension
      return `${originalName}-${timestamp}`; // e.g., "myphoto-1691234567890"
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

// Initialize multer with storage and file filters
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
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
