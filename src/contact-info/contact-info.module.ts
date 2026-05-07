import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoEntity } from './contact-info.entity';
import { ContactInfoRepository } from './contact-info.repository';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoController } from './contact-info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfoEntity])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService, ContactInfoRepository],
  exports: [ContactInfoService],
})
export class ContactInfoModule {}
