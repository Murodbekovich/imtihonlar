import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
  ) {}

  create(dto: any) {
    return this.adminRepo.save(dto);
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }

  update(id: number, dto: any) {
    return this.adminRepo.update(id, dto);
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
}
