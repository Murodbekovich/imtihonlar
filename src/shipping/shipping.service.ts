import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingEntity } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingEntity)
    private shipRepo: Repository<ShippingEntity>,
  ) {}

  findAll() {
    return this.shipRepo.find();
  }

  create(data: Partial<ShippingEntity>) {
    const shipping = this.shipRepo.create(data);
    return this.shipRepo.save(shipping);
  }
}
