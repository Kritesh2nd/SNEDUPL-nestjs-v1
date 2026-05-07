import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HeroModule } from './hero/hero.module';
import { AboutModule } from './about/about.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProductModule } from './product/product.module';
import { LeadershipModule } from './leadership/leadership.module';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { SiteContentModule } from './site-content/site-content.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    HeroModule,
    AboutModule,
    TimelineModule,
    ProductModule,
    LeadershipModule,
    ContactInfoModule,
    InquiryModule,
    SiteContentModule,
  ],
})
export class AppModule {}
