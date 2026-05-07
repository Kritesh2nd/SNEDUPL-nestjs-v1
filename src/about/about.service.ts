import { Injectable, NotFoundException } from '@nestjs/common';
import { AboutRepository } from './about.repository';
import { CreateAboutDto, UpdateAboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async get() {
    const about = await this.aboutRepository.findOne();
    if (!about) throw new NotFoundException('About content not found');
    return about;
  }

  getOrNull() {
    return this.aboutRepository.findOne();
  }

  upsert(dto: CreateAboutDto) {
    return this.aboutRepository.upsert(dto);
  }

  async update(dto: UpdateAboutDto) {
    const existing = await this.aboutRepository.findOne();
    if (!existing) throw new NotFoundException('About content not found');
    return this.aboutRepository.upsert(dto);
  }

  async remove() {
    const existing = await this.aboutRepository.findOne();
    if (!existing) throw new NotFoundException('About content not found');
    await this.aboutRepository.remove();
    return { message: 'About content deleted' };
  }
}
