import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Application } from './entities/application.entity'
import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'

@Injectable()
export class ApplicationService {
  constructor(@InjectModel(Application) private model: typeof Application) {}

  create(dto: CreateApplicationDto) {
    return this.model.create({ ...dto, status: 'pending' })
  }

  findAll() {
    return this.model.findAll({ include: { all: true }, order: [['created_at', 'DESC']] })
  }

  findOne(id: number) {
    return this.model.findByPk(id, { include: { all: true } })
  }

  async update(id: number, dto: UpdateApplicationDto) {
    const app = await this.model.findByPk(id)
    if (!app) return null
    await app.update(dto)
    return app
  }

  async remove(id: number) {
    const app = await this.model.findByPk(id)
    if (!app) return false
    await app.destroy()
    return true
  }
}
