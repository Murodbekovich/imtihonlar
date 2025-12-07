import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ShippingEntity } from './entities/shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingEntity])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
