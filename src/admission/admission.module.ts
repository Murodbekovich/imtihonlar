import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admission } from './entities/admission.entity';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';

@Module({
  imports: [SequelizeModule.forFeature([Admission])],
  controllers: [AdmissionController],
  providers: [AdmissionService]
})
export class AdmissionModule {}
