import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { LeadershipRepository } from "./leadership.repository";
import { CreateLeadershipDto, UpdateLeadershipDto } from "./dto/leadership.dto";
import { CloudinaryService } from "@/file/cloudinary.service";

@Injectable()
export class LeadershipService {
  constructor(
    private readonly leadershipRepository: LeadershipRepository,
    private cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return this.leadershipRepository.findAll();
  }

  async findById(id: string) {
    const profile = await this.leadershipRepository.findById(id);
    if (!profile)
      throw new NotFoundException(`Leadership profile #${id} not found`);
    return profile;
  }

  async create(dto: CreateLeadershipDto, file?: Express.Multer.File) {
    // const imageUrl = file ? this.buildImageUrl(file.filename) : "";
    const { imageUrl, imagePublicId } =
      await this.uploadImageInCloudinary(file);

    return this.leadershipRepository.create({
      ...dto,
      image: imageUrl,
      publicImageUrl: imagePublicId,
    });
  }

  async update(
    id: string,
    dto: UpdateLeadershipDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.findById(id);
    await this.deleteImageInCloudinary(existing.publicImageUrl);

    const updateData: any = { ...dto };
    const { imageUrl, imagePublicId } =
      await this.uploadImageInCloudinary(file);

    return this.leadershipRepository.update(id, {
      ...updateData,
      image: imageUrl,
      publicImageUrl: imagePublicId,
    });
  }

  async remove(id: string) {
    const existing = await this.findById(id);

    // this.deleteOldImage(existing.image);
    await this.deleteImageInCloudinary(existing.publicImageUrl);

    await this.leadershipRepository.remove(id);
    return { message: "Leadership profile deleted" };
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
    try {
      let imageUrl = "";
      let imagePublicId = "";
      if (file) {
        const uploaded = await this.cloudinary.uploadImage(
          "leadership",
          file.path,
        );
        imageUrl = uploaded.secure_url;
        imagePublicId = uploaded.public_id;

        this.deleteOldImage(file.filename);
      }
      return { imageUrl, imagePublicId };
    } catch (err) {
      console.log("Error In Image upload: ", err);
    } finally {
      console.log("file data, name:", file.originalname, ", size:", file.size);
    }
  }

  private async deleteImageInCloudinary(publicImageUrl: string) {
    try {
      await this.cloudinary.deleteImage(publicImageUrl);
    } catch (err) {
      console.log("Invalid Public Image ID, Failed to Delete: ", err);
    }
  }
}
