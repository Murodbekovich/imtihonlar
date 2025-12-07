import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  create(dto: CreateOrderDto, userId: number) {
    const order = this.repo.create({
      ...dto,
      user: { id: userId },
      status: OrderStatus.PENDING,
    });

    return this.repo.save(order);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  findByUser(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateOrderDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
