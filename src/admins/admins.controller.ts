import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.adminsService.create(dto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminsService.remove(id);
  }
}
