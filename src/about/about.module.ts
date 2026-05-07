import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutEntity } from './about.entity';
import { AboutRepository } from './about.repository';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService, AboutRepository],
  exports: [AboutService],
})
export class AboutModule {}
