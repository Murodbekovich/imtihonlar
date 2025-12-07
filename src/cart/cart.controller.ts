import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ✅ Savatga qo‘shish
  @Post()
  add(@Body() dto: CreateCartDto) {
    return this.cartService.addToCart(dto);
  }

  // ✅ User savati
  @Get(':userId')
  getUserCart(@Param('userId') userId: number) {
    return this.cartService.getUserCart(Number(userId));
  }

  // ✅ Bitta item o‘chirish
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartService.removeFromCart(Number(id));
  }

  // ✅ User savatini tozalash
  @Delete('clear/:userId')
  clear(@Param('userId') userId: number) {
    return this.cartService.clearUserCart(Number(userId));
  }
}
