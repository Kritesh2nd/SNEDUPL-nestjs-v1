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
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/product.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { plainToInstance } from "class-transformer";

const imageFilter = (_req: any, file: any, cb: any) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
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

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(uploadInterceptor)
  create(
    @Body("product") product: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const parsedProduct = JSON.parse(product);
    const dto = plainToInstance(CreateProductDto, parsedProduct);
    return this.productService.create(dto, file);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(uploadInterceptor)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body("product") product: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const parsedProduct = JSON.parse(product);
    const dto = plainToInstance(CreateProductDto, parsedProduct);
    return this.productService.update(id, dto, file);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
