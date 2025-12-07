import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingEntity, OrderEntity])],
  providers: [ShippingService],
  controllers: [ShippingController],
})
export class ShippingModule {}
