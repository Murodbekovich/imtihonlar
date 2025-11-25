import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @Post()
  async create(@Body() dto: CreateStudentDto) {
    const exists = await this.service.findByEmail(dto.email);
    if (exists) throw new HttpException('Email allaqachon mavjud', HttpStatus.CONFLICT);
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
  async update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
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
