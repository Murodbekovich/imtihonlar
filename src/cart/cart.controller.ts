import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Delete('clear/:userId')
  clear(@Param('userId') userId: string) {
    return this.service.clearUserCart(+userId);
  }
}
