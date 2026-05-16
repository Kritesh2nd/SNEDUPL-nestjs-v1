import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { FileModule } from "@/file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), FileModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
