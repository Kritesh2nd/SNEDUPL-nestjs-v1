import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { ProductRepository } from './product.repository';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
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
    const imageUrl = file ? this.buildImageUrl(file.filename) : '';
    return this.productRepository.create({ ...dto, image: imageUrl });
  }

  async update(id: string, dto: UpdateProductDto, file?: Express.Multer.File) {
    const existing = await this.findById(id);
    const updateData: any = { ...dto };
    if (file) {
      this.deleteOldImage(existing.image);
      updateData.image = this.buildImageUrl(file.filename);
    }
    return this.productRepository.update(id, updateData);
  }

  async remove(id: string) {
    const existing = await this.findById(id);
    this.deleteOldImage(existing.image);
    await this.productRepository.remove(id);
    return { message: 'Product deleted' };
  }

  private buildImageUrl(filename: string): string {
    const base = this.configService.get<string>('appBaseUrl');
    return `${base}/uploads/${filename}`;
  }

  private deleteOldImage(imageUrl: string): void {
    if (!imageUrl) return;
    try {
      const filename = path.basename(imageUrl);
      const filePath = path.join(process.cwd(), 'uploads', filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}
  }
}
