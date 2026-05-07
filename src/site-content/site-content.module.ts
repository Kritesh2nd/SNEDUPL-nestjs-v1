import { Module } from '@nestjs/common';
import { SiteContentController } from './site-content.controller';
import { SiteContentService } from './site-content.service';
import { HeroModule } from '../hero/hero.module';
import { AboutModule } from '../about/about.module';
import { TimelineModule } from '../timeline/timeline.module';
import { ProductModule } from '../product/product.module';
import { LeadershipModule } from '../leadership/leadership.module';
import { ContactInfoModule } from '../contact-info/contact-info.module';

@Module({
  imports: [
    HeroModule,
    AboutModule,
    TimelineModule,
    ProductModule,
    LeadershipModule,
    ContactInfoModule,
  ],
  controllers: [SiteContentController],
  providers: [SiteContentService],
})
export class SiteContentModule {}
