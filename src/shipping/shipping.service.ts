import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingEntity } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingEntity)
    private readonly repo: Repository<ShippingEntity>,
  ) {}

  create(dto: any) {
    const shipping = this.repo.create(dto);
    return this.repo.save(shipping);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
