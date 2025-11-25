import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { StudentModule } from './student/student.module';
import { ApplicationModule } from './application/application.module';
import { AdmissionModule } from './admission/admission.module';
import { ShiftModule } from './shift/shift.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AttendanceModule } from './attendance/attendance.module';
import { StatsModule } from './stats/stats.module';

import { Student } from './student/entities/student.entity';
import { Application } from './application/entities/application.entity';
import { Admission } from './admission/entities/admission.entity';
import { Shift } from './shift/entities/shift.entity';
import { ScheduleDay } from './schedule/entities/schedule-day.entity';
import { Attendance } from './attendance/entities/attendance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [Student, Application, Admission, Shift, ScheduleDay, Attendance],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    StudentModule,
    ApplicationModule,
    AdmissionModule,
    ShiftModule,
    ScheduleModule,
    AttendanceModule,
    StatsModule,
  ],
})
export class AppModule {}
