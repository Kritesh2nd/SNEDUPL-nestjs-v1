import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadershipEntity } from './leadership.entity';
import { LeadershipRepository } from './leadership.repository';
import { LeadershipService } from './leadership.service';
import { LeadershipController } from './leadership.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeadershipEntity])],
  controllers: [LeadershipController],
  providers: [LeadershipService, LeadershipRepository],
  exports: [LeadershipService],
})
export class LeadershipModule {}
