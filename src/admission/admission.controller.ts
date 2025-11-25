import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { AdmissionService } from './admission.service'
import { CreateAdmissionDto } from './dto/create-admission.dto'
import { UpdateAdmissionDto } from './dto/update-admission.dto'

@Controller('admissions')
export class AdmissionController {
  constructor(private readonly service: AdmissionService) {}

  @Post()
  create(@Body() dto: CreateAdmissionDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const r = await this.service.findOne(+id)
    if (!r) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return r
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdmissionDto) {
    const r = await this.service.update(+id, dto)
    if (!r) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return r
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ok = await this.service.remove(+id)
    if (!ok) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return { deleted: true }
  }
}
