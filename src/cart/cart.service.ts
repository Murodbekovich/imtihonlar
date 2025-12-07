import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
  ) {}

  addToCart(dto: CreateCartDto) {
    const item = this.cartRepo.create(dto);
    return this.cartRepo.save(item);
  }

  getUserCart(userId: number) {
    return this.cartRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  removeFromCart(id: number) {
    return this.cartRepo.delete(id);
  }

  clearUserCart(userId: number) {
    return this.cartRepo.delete({ userId });
  }
}
