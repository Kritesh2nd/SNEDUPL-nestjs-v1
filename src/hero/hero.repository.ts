import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroEntity } from './hero.entity';

@Injectable()
export class HeroRepository {
  constructor(
    @InjectRepository(HeroEntity)
    private readonly repo: Repository<HeroEntity>,
  ) {}

  findOne(): Promise<HeroEntity | null> {
    return this.repo.findOne({ where: {} });
  }

  async upsert(data: Partial<HeroEntity>): Promise<HeroEntity> {
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
