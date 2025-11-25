import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly service: ShiftService) {}

  @Post()
  create(@Body() dto: CreateShiftDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const s = await this.service.findOne(+id);
    if (!s) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND);
    return s;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateShiftDto) {
    const s = await this.service.update(+id, dto);
    if (!s) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND);
    return s;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ok = await this.service.remove(+id);
    if (!ok) throw new HttpException('Topilmadi', HttpStatus.NOT_FOUND);
    return { deleted: true };
  }
}
