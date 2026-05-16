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
