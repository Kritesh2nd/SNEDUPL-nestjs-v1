import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutEntity } from './about.entity';

@Injectable()
export class AboutRepository {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly repo: Repository<AboutEntity>,
  ) {}

  findOne(): Promise<AboutEntity | null> {
    return this.repo.findOne({ where: {} });
  }

  async upsert(data: Partial<AboutEntity>): Promise<AboutEntity> {
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
