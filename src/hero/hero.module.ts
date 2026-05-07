import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroEntity } from './hero.entity';
import { HeroRepository } from './hero.repository';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HeroEntity])],
  controllers: [HeroController],
  providers: [HeroService, HeroRepository],
  exports: [HeroService],
})
export class HeroModule {}
