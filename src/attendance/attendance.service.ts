import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Attendance } from './entities/attendance.entity'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'
import { CreationAttributes } from 'sequelize'

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance) private model: typeof Attendance) {}

  create(dto: CreateAttendanceDto) {
    return this.model.create(dto as CreationAttributes<Attendance>)
  }

  findAll() {
    return this.model.findAll({ include: { all: true }, order: [['date', 'DESC']] })
  }

  findOne(id: number) {
    return this.model.findByPk(id, { include: { all: true } })
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const a = await this.model.findByPk(id)
    if (!a) return null
    await a.update(dto as Partial<Attendance>)
    return a
  }

  async remove(id: number) {
    const a = await this.model.findByPk(id)
    if (!a) return false
    await a.destroy()
    return true
  }

  findByStudentAndWeek(studentId: number, weekStart: string, weekEnd: string) {
    return this.model.findAll({
      where: { studentId },
      include: { all: true },
      order: [['date', 'ASC']]
    })
  }
}
