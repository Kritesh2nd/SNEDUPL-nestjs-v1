import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { LeadershipRepository } from "./leadership.repository";
import { CreateLeadershipDto, UpdateLeadershipDto } from "./dto/leadership.dto";

@Injectable()
export class LeadershipService {
  constructor(
    private readonly leadershipRepository: LeadershipRepository,
    private readonly configService: ConfigService,
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
    const imageUrl = file ? this.buildImageUrl(file.filename) : "";
    return this.leadershipRepository.create({ ...dto, image: imageUrl });
  }

  async update(
    id: string,
    dto: UpdateLeadershipDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.findById(id);
    const updateData: any = { ...dto };
    if (file) {
      this.deleteOldImage(existing.image);
      updateData.image = this.buildImageUrl(file.filename);
    }
    return this.leadershipRepository.update(id, updateData);
  }

  async remove(id: string) {
    const existing = await this.findById(id);
    this.deleteOldImage(existing.image);
    await this.leadershipRepository.remove(id);
    return { message: "Leadership profile deleted" };
  }

  private buildImageUrl(filename: string): string {
    return "/file/" + filename;
  }

  private deleteOldImage(imageUrl: string): void {
    if (!imageUrl) return;
    try {
      const filename = path.basename(imageUrl);
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}
  }
}
