import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiryEntity } from './inquiry.entity';
import { InquiryRepository } from './inquiry.repository';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InquiryEntity])],
  controllers: [InquiryController],
  providers: [InquiryService, InquiryRepository],
})
export class InquiryModule {}
