import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import path, { join } from "path";
import { createReadStream, existsSync } from "fs";
import * as fs from "fs";

@Injectable()
export class FileService {
  getFileStream(fileName: string) {
    console.log("fileName", fileName);
    const filePath = join(process.cwd(), "uploads", fileName);

    if (!existsSync(filePath)) {
      throw new NotFoundException("File not found");
    }

    const stream = createReadStream(filePath);

    return {
      stream,
      contentType: this.getMimeType(fileName),
    };
  }

  // deleteFileByUrl(fileUrl: string): void {
  //   // const filePath = join(process.cwd(), "uploads", fileUrl);
  //   try {
  //     if (!fileUrl) return;

  //     // 1. Extract filename from URL
  //     const fileName = fileUrl.split("/").pop();

  //     if (!fileName) {
  //       throw new Error("Invalid file URL");
  //     }

  //     // 2. Build absolute file path
  //     // const filePath = path.join(this.uploadDir, fileName);
  //     const filePath = join(process.cwd(), "uploads", fileUrl);

  //     // 3. Check if file exists
  //     if (fs.existsSync(filePath)) {
  //       fs.unlinkSync(filePath);
  //     }
  //   } catch (err) {
  //     throw new InternalServerErrorException("Failed to delete file");
  //   }
  // }

  private getMimeType(fileName: string): string {
    const ext = fileName.split(".").pop();

    switch (ext) {
      case "png":
        return "image/png";
      case "webp":
        return "image/webp";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      default:
        return "application/octet-stream";
    }
  }
}
