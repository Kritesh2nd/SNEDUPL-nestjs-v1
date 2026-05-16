import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { ProductRepository } from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { CloudinaryService } from "@/file/cloudinary.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return this.productRepository.findAll();
  }

  async findById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    // const imageUrl = file ? this.buildImageUrl(file.filename) : "";
    const { imageUrl, imagePublicId } =
      await this.uploadImageInCloudinary(file);
    return this.productRepository.create({
      ...dto,
      image: imageUrl,
      publicImageUrl: imagePublicId,
    });
  }

  async update(id: string, dto: UpdateProductDto, file?: Express.Multer.File) {
    const existing = await this.findById(id);
    const updateData: any = { ...dto };
    if (file) {
      // this.deleteOldImage(existing.image);
      await this.deleteImageInCloudinary(existing.publicImageUrl);
      // updateData.image = this.buildImageUrl(file.filename);
      const { imageUrl, imagePublicId } =
        await this.uploadImageInCloudinary(file);
    }
    return this.productRepository.update(id, updateData);
  }

  async remove(id: string) {
    const existing = await this.findById(id);
    // this.deleteOldImage(existing.image);
    await this.deleteImageInCloudinary(existing.publicImageUrl);

    await this.productRepository.remove(id);
    return { message: "Product deleted" };
  }

  // private buildImageUrl(filename: string): string {
  //   return "/file/" + filename;
  // }

  private deleteOldImage(imageUrl: string): void {
    if (!imageUrl) return;
    try {
      const filename = path.basename(imageUrl);
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}
  }

  private async uploadImageInCloudinary(file?: Express.Multer.File) {
    let imageUrl = "";
    let imagePublicId = "";
    if (file) {
      const uploaded = await this.cloudinary.uploadImage("products", file.path);
      imageUrl = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
      this.deleteOldImage(file.filename);
    }

    return { imageUrl, imagePublicId };
  }

  private async deleteImageInCloudinary(publicImageUrl: string) {
    try {
      await this.cloudinary.deleteImage(publicImageUrl);
    } catch (err) {
      console.log("Invalid Public Image ID, Failed to Delete");
    }
  }
}
