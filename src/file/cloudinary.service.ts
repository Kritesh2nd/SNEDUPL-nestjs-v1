import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}
  async uploadImage(folderName: string, filePath: string) {
    return await this.configureCloudinary(this.configService).uploader.upload(
      filePath,
      {
        folder: folderName,
      },
    );
  }

  async deleteImage(publicId: string) {
    if (!publicId) return;
    await this.configureCloudinary(this.configService).uploader.destroy(
      publicId,
    );
  }

  configureCloudinary = (config: ConfigService) => {
    cloudinary.config({
      cloud_name: config.get<string>("cloudinary.name"),
      api_key: config.get<string>("cloudinary.key"),
      api_secret: config.get<string>("cloudinary.secret"),
    });

    return cloudinary;
  };
}
