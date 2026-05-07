import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimelineEntity } from './timeline.entity';

@Injectable()
export class TimelineRepository {
  constructor(
    @InjectRepository(TimelineEntity)
    private readonly repo: Repository<TimelineEntity>,
  ) {}

  findAll(): Promise<TimelineEntity[]> {
    return this.repo.find({ order: { year: 'ASC' } });
  }

  findById(id: string): Promise<TimelineEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<TimelineEntity>): Promise<TimelineEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<TimelineEntity>): Promise<TimelineEntity> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
