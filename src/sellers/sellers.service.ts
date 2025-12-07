import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './entities/seller.entity';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepo: Repository<SellerEntity>,
  ) {}

  create(dto: any) {
    return this.sellerRepo.save(dto);
  }

  findAll() {
    return this.sellerRepo.find();
  }

  findOne(id: number) {
    return this.sellerRepo.findOne({ where: { id } });
  }

  update(id: number, dto: any) {
    return this.sellerRepo.update(id, dto);
  }

  remove(id: number) {
    return this.sellerRepo.delete(id);
  }
}
