import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './entities/shift.entity';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';

@Module({
  imports: [SequelizeModule.forFeature([Shift])],
  controllers: [ShiftController],
  providers: [ShiftService]
})
export class ShiftModule {}
