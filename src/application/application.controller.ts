import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { ApplicationService } from './application.service'
import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const a = await this.service.findOne(+id)
    if (!a) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return a
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    const a = await this.service.update(+id, dto)
    if (!a) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return a
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ok = await this.service.remove(+id)
    if (!ok) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return { deleted: true }
  }
}
