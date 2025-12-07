import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Shipping')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipping')
export class ShippingController {
  constructor(private readonly service: ShippingService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
