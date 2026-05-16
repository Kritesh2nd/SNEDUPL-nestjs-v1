// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";

export const configureCloudinary = (config: ConfigService) => {
  cloudinary.config({
    cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
    api_key: config.get("CLOUDINARY_API_KEY"),
    api_secret: config.get("CLOUDINARY_API_SECRET"),
  });

  return cloudinary;
};
