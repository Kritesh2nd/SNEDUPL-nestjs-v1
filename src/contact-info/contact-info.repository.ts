import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';

@Injectable()
export class ContactInfoRepository {
  constructor(
    @InjectRepository(ContactInfoEntity)
    private readonly repo: Repository<ContactInfoEntity>,
  ) {}

  findOne(): Promise<ContactInfoEntity | null> {
    return this.repo.findOne({ where: {} });
  }

  async upsert(data: Partial<ContactInfoEntity>): Promise<ContactInfoEntity> {
    const existing = await this.findOne();
    if (existing) {
      Object.assign(existing, data);
      return this.repo.save(existing);
    }
    return this.repo.save(this.repo.create(data));
  }

  async remove(): Promise<void> {
    const existing = await this.findOne();
    if (existing) await this.repo.remove(existing);
  }
}
