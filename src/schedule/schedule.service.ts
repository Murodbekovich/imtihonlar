import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ScheduleDay } from './entities/schedule-day.entity'
import { CreateScheduleDayDto } from './dto/create-schedule-day.dto'
import { UpdateScheduleDayDto } from './dto/update-schedule-day.dto'
import { CreationAttributes } from 'sequelize'

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(ScheduleDay) private model: typeof ScheduleDay) {}

  create(dto: CreateScheduleDayDto) {
    return this.model.create(dto as CreationAttributes<ScheduleDay>)
  }

  findAll() {
    return this.model.findAll({ include: { all: true }, order: [['day', 'ASC']] })
  }

  findOne(id: number) {
    return this.model.findByPk(id, { include: { all: true } })
  }

  async update(id: number, dto: UpdateScheduleDayDto) {
    const d = await this.model.findByPk(id)
    if (!d) return null
    await d.update(dto as Partial<ScheduleDay>)
    return d
  }

  async remove(id: number) {
    const d = await this.model.findByPk(id)
    if (!d) return false
    await d.destroy()
    return true
  }
}
