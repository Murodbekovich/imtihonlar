import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.shippingService.create(body);
  }
}
