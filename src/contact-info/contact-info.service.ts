import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactInfoRepository } from './contact-info.repository';
import { CreateContactInfoDto, UpdateContactInfoDto } from './dto/contact-info.dto';

@Injectable()
export class ContactInfoService {
  constructor(private readonly contactInfoRepository: ContactInfoRepository) {}

  async get() {
    const info = await this.contactInfoRepository.findOne();
    if (!info) throw new NotFoundException('Contact info not found');
    return info;
  }

  getOrNull() {
    return this.contactInfoRepository.findOne();
  }

  upsert(dto: CreateContactInfoDto) {
    return this.contactInfoRepository.upsert(dto);
  }

  async update(dto: UpdateContactInfoDto) {
    const existing = await this.contactInfoRepository.findOne();
    if (!existing) throw new NotFoundException('Contact info not found');
    return this.contactInfoRepository.upsert(dto);
  }

  async remove() {
    const existing = await this.contactInfoRepository.findOne();
    if (!existing) throw new NotFoundException('Contact info not found');
    await this.contactInfoRepository.remove();
    return { message: 'Contact info deleted' };
  }
}
