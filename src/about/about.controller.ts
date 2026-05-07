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
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto } from './dto/about.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  get() {
    return this.aboutService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  upsert(@Body() dto: CreateAboutDto) {
    return this.aboutService.upsert(dto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateAboutDto) {
    return this.aboutService.update(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove() {
    return this.aboutService.remove();
  }
}
