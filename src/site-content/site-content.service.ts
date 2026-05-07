import { Injectable } from '@nestjs/common';
import { HeroService } from '../hero/hero.service';
import { AboutService } from '../about/about.service';
import { TimelineService } from '../timeline/timeline.service';
import { ProductService } from '../product/product.service';
import { LeadershipService } from '../leadership/leadership.service';
import { ContactInfoService } from '../contact-info/contact-info.service';

@Injectable()
export class SiteContentService {
  constructor(
    private readonly heroService: HeroService,
    private readonly aboutService: AboutService,
    private readonly timelineService: TimelineService,
    private readonly productService: ProductService,
    private readonly leadershipService: LeadershipService,
    private readonly contactInfoService: ContactInfoService,
  ) {}

  async getAll() {
    const [heroContent, about, timeline, products, leadership, contactInfo] =
      await Promise.all([
        this.heroService.getOrNull(),
        this.aboutService.getOrNull(),
        this.timelineService.findAll(),
        this.productService.findAll(),
        this.leadershipService.findAll(),
        this.contactInfoService.getOrNull(),
      ]);

    return {
      heroContent,
      aboutSummary: about?.aboutSummary ?? null,
      brandStory: about?.brandStory ?? null,
      timeline,
      products,
      leadership,
      contactInfo,
    };
  }
}
