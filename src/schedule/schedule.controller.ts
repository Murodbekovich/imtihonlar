import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { CreateScheduleDayDto } from './dto/create-schedule-day.dto'
import { UpdateScheduleDayDto } from './dto/update-schedule-day.dto'

@Controller('schedule-days')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDayDto) {
    return this.service.create(dto)
  }
  @Get()
  findAll() {
    return this.service.findAll()
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const d = await this.service.findOne(+id)
    if (!d) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return d
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateScheduleDayDto) {
    const d = await this.service.update(+id, dto)
    if (!d) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return d
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ok = await this.service.remove(+id)
    if (!ok) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND)
    return { deleted: true }
  }
}
