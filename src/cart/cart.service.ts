import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly repo: Repository<CartEntity>,
  ) {}

  create(dto: CreateCartDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findByUser(userId: number) {
    return this.repo.find({ where: { userId } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateCartDto) {
    return this.repo.update(id, dto);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  clearUserCart(userId: number) {
    return this.repo.delete({ userId });
  }
}
