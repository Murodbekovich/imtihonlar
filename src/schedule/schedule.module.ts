import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleDay } from './entities/schedule-day.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [SequelizeModule.forFeature([ScheduleDay])],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
