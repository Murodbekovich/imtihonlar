import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly repo: Repository<AdminEntity>,
  ) {}

  async create(dto: CreateAdminDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const admin = await this.repo.findOneBy({ id });
    if (!admin) throw new NotFoundException('Admin topilmadi');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return { message: 'Admin yangilandi' };
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Admin o‘chirildi' };
  }
}
