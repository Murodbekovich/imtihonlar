import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() body: any) {
    return this.addressService.create(body);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: number) {
    return this.addressService.findByUser(userId);
  }
}
