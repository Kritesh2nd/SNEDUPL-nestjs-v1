import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadershipEntity } from './leadership.entity';

@Injectable()
export class LeadershipRepository {
  constructor(
    @InjectRepository(LeadershipEntity)
    private readonly repo: Repository<LeadershipEntity>,
  ) {}

  findAll(): Promise<LeadershipEntity[]> {
    return this.repo.find({ order: { displayOrder: 'ASC', createdAt: 'ASC' } });
  }

  findById(id: string): Promise<LeadershipEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<LeadershipEntity>): Promise<LeadershipEntity> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<LeadershipEntity>): Promise<LeadershipEntity> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
