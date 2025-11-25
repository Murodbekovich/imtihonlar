import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Shift } from './entities/shift.entity'
import { CreateShiftDto } from './dto/create-shift.dto'
import { UpdateShiftDto } from './dto/update-shift.dto'
import { CreationAttributes } from 'sequelize'

@Injectable()
export class ShiftService {
  constructor(@InjectModel(Shift) private model: typeof Shift) {}

  create(dto: CreateShiftDto) {
    return this.model.create(dto as CreationAttributes<Shift>)
  }

  findAll() {
    return this.model.findAll({ order: [['created_at', 'DESC']] })
  }

  findOne(id: number) {
    return this.model.findByPk(id)
  }

  async update(id: number, dto: UpdateShiftDto) {
    const s = await this.model.findByPk(id)
    if (!s) return null
    await s.update(dto as Partial<Shift>)
    return s
  }

  async remove(id: number) {
    const s = await this.model.findByPk(id)
    if (!s) return false
    await s.destroy()
    return true
  }
}
