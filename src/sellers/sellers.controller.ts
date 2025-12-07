import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}
findOne(@Param('id') id: string) {
  return this.sellersService.findOne(+id);
}

update(@Param('id') id: string, @Body() dto: any) {
  return this.sellersService.update(+id, dto);
}

remove(@Param('id') id: string) {
  return this.sellersService.remove(+id);
}

}
