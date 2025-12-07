import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepo: Repository<AddressEntity>,
  ) {}

  create(data: Partial<AddressEntity>) {
    const address = this.addressRepo.create(data);
    return this.addressRepo.save(address);
  }

  findByUser(userId: number) {
    return this.addressRepo.find({ where: { userId } });
  }
}
