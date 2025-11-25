import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Query } from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  create(@Body() dto: CreateAttendanceDto) {
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
  async update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
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

  @Get('by-week')
  byWeek(@Query('studentId') studentId: string, @Query('weekStart') weekStart: string, @Query('weekEnd') weekEnd: string) {
    return this.service.findByStudentAndWeek(+studentId, weekStart, weekEnd)
  }
}
