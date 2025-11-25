import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Student } from './entities/student.entity'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student) private studentModel: typeof Student) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const student = await this.studentModel.create({ ...dto, password: hashedPassword })
    student.password = undefined as unknown as string
    return student
  }

  async findAll(): Promise<Student[]> {
    const list = await this.studentModel.findAll({ order: [['created_at', 'DESC']] })
    return list.map((s) => {
      s.password = undefined as unknown as string
      return s
    })
  }

  async findOne(id: number): Promise<Student | null> {
    const s = await this.studentModel.findByPk(id)
    if (!s) return null
    s.password = undefined as unknown as string
    return s
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.studentModel.findOne({ where: { email } })
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student | null> {
    const s = await this.studentModel.findByPk(id)
    if (!s) return null
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10)
    await s.update(dto)
    s.password = undefined as unknown as string
    return s
  }

  async remove(id: number): Promise<boolean> {
    const s = await this.studentModel.findByPk(id)
    if (!s) return false
    await s.destroy()
    return true
  }
}