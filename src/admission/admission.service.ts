import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admission } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class AdmissionService {
  constructor(@InjectModel(Admission) private model: typeof Admission) {}

  create(dto: CreateAdmissionDto) {
    return this.model.create(dto as CreationAttributes<Admission>);
  }

  findAll() {
    return this.model.findAll({ include: { all: true }, order: [['created_at', 'DESC']] });
  }

  findOne(id: number) {
    return this.model.findByPk(id, { include: { all: true } });
  }

  async update(id: number, dto: UpdateAdmissionDto) {
    const r = await this.model.findByPk(id);
    if (!r) return null;
    await r.update(dto as Partial<Admission>);
    return r;
  }

  async remove(id: number) {
    const r = await this.model.findByPk(id);
    if (!r) return false;
    await r.destroy();
    return true;
  }
}
