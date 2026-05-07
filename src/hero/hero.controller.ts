import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto, UpdateHeroDto } from './dto/hero.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  get() {
    return this.heroService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  upsert(@Body() dto: CreateHeroDto) {
    return this.heroService.upsert(dto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateHeroDto) {
    return this.heroService.update(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove() {
    return this.heroService.remove();
  }
}
