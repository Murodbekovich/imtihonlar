import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repo: Repository<AddressEntity>,
  ) {}

  async create(dto: CreateAddressDto) {
    const address = this.repo.create(dto);
    return this.repo.save(address);
  }

  async findAll() {
    return this.repo.find({
      relations: ['user'],
    });
  }

  async remove(id: number) {
    const address = await this.repo.findOne({ where: { id } });
    if (!address) throw new NotFoundException('Address not found');

    return this.repo.remove(address);
  }
}
