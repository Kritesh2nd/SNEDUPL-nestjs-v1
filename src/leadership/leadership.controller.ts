import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { LeadershipService } from "./leadership.service";
import { CreateLeadershipDto } from "./dto/leadership.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { plainToInstance } from "class-transformer";

const imageFilter = (_req: any, image: any, cb: any) => {
  if (!image.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
    cb(new BadRequestException("Only image files are allowed"), false);
  } else {
    cb(null, true);
  }
};

const uploadInterceptor = FileInterceptor("image", {
  storage: memoryStorage(),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

@Controller("leadership")
export class LeadershipController {
  constructor(private readonly leadershipService: LeadershipService) {}

  @Get()
  findAll() {
    return this.leadershipService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.leadershipService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(uploadInterceptor)
  create(
    @Body("data") data: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const parsedData = JSON.parse(data);
    const dto = plainToInstance(CreateLeadershipDto, parsedData);
    return this.leadershipService.create(dto, image);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(uploadInterceptor)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body("data") data: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    console.log("image", image.originalname ?? "no image");
    const parsedData = JSON.parse(data);
    const dto = plainToInstance(CreateLeadershipDto, parsedData);
    return this.leadershipService.update(id, dto, image);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.leadershipService.remove(id);
  }
}
