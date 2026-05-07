import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InquiryEntity } from './inquiry.entity';

@Injectable()
export class InquiryRepository {
  constructor(
    @InjectRepository(InquiryEntity)
    private readonly repo: Repository<InquiryEntity>,
  ) {}

  findAll(): Promise<InquiryEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findById(id: string): Promise<InquiryEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<InquiryEntity>): Promise<InquiryEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async markRead(id: string): Promise<InquiryEntity> {
    await this.repo.update(id, { read: true });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
