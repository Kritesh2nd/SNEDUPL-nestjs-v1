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
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto, UpdateContactInfoDto } from './dto/contact-info.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Get()
  get() {
    return this.contactInfoService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  upsert(@Body() dto: CreateContactInfoDto) {
    return this.contactInfoService.upsert(dto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateContactInfoDto) {
    return this.contactInfoService.update(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove() {
    return this.contactInfoService.remove();
  }
}
