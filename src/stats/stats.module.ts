import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Student } from '../student/entities/student.entity';
import { Application } from '../application/entities/application.entity';
import { Admission } from '../admission/entities/admission.entity';
import { Attendance } from '../attendance/entities/attendance.entity';

@Module({
  imports: [SequelizeModule.forFeature([Student, Application, Admission, Attendance])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
