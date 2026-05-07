import { Injectable, NotFoundException } from '@nestjs/common';
import { HeroRepository } from './hero.repository';
import { CreateHeroDto, UpdateHeroDto } from './dto/hero.dto';

@Injectable()
export class HeroService {
  constructor(private readonly heroRepository: HeroRepository) {}

  async get() {
    const hero = await this.heroRepository.findOne();
    if (!hero) throw new NotFoundException('Hero content not found');
    return hero;
  }

  async getOrNull() {
    return this.heroRepository.findOne();
  }

  upsert(dto: CreateHeroDto) {
    return this.heroRepository.upsert(dto);
  }

  async update(dto: UpdateHeroDto) {
    const existing = await this.heroRepository.findOne();
    if (!existing) throw new NotFoundException('Hero content not found');
    return this.heroRepository.upsert(dto);
  }

  async remove() {
    const existing = await this.heroRepository.findOne();
    if (!existing) throw new NotFoundException('Hero content not found');
    await this.heroRepository.remove();
    return { message: 'Hero content deleted' };
  }
}
