import { Controller, Get, Param, Res } from "@nestjs/common";
import { FileService } from "./file.service";
import { Response } from "express";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(":fileName")
  async getFile(@Param("fileName") fileName: string, @Res() res: Response) {
    const file = this.fileService.getFileStream(fileName);

    res.setHeader("Content-Type", file.contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    file.stream.pipe(res);
  }
}
