import { Injectable, NotFoundException } from '@nestjs/common';
import { TimelineRepository } from './timeline.repository';
import { CreateTimelineDto, UpdateTimelineDto } from './dto/timeline.dto';

@Injectable()
export class TimelineService {
  constructor(private readonly timelineRepository: TimelineRepository) {}

  findAll() {
    return this.timelineRepository.findAll();
  }

  async findById(id: string) {
    const event = await this.timelineRepository.findById(id);
    if (!event) throw new NotFoundException(`Timeline event #${id} not found`);
    return event;
  }

  create(dto: CreateTimelineDto) {
    return this.timelineRepository.create(dto);
  }

  async update(id: string, dto: UpdateTimelineDto) {
    await this.findById(id);
    return this.timelineRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.timelineRepository.remove(id);
    return { message: 'Timeline event deleted' };
  }
}
