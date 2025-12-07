import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly repo: Repository<SellerEntity>,
  ) {}

  async create(dto: CreateSellerDto) {
    const seller = this.repo.create(dto);
    return this.repo.save(seller);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const seller = await this.repo.findOneBy({ id });
    if (!seller) throw new NotFoundException('Seller topilmadi');
    return seller;
  }

  async update(id: number, dto: UpdateSellerDto) {
    const seller = await this.findOne(id);
    await this.repo.update(id, dto);
    return { message: 'Seller yangilandi' };
  }

  async delete(id: number) {
    const seller = await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Seller o‘chirildi' };
  }
}
