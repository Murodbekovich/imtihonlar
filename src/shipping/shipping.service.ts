import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingEntity)
    private readonly repo: Repository<ShippingEntity>,
  ) {}

  create(dto: CreateShippingDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateShippingDto) {
    return this.repo.update(id, dto);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
