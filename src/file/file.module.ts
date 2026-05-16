import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { CloudinaryService } from "./cloudinary.service";

@Module({
  controllers: [FileController],
  providers: [FileService, CloudinaryService],
  // exports: [FileService],
  exports: [CloudinaryService],
})
export class FileModule {}
