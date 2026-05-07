import { Controller, Get } from '@nestjs/common';
import { SiteContentService } from './site-content.service';

@Controller('site-content')
export class SiteContentController {
  constructor(private readonly siteContentService: SiteContentService) {}

  @Get()
  getAll() {
    return this.siteContentService.getAll();
  }
}
