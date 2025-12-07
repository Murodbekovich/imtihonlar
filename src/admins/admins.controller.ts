import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
findOne(@Param('id') id: string) {
  return this.adminsService.findOne(+id);
}

update(@Param('id') id: string, @Body() dto: any) {
  return this.adminsService.update(+id, dto);
}

remove(@Param('id') id: string) {
  return this.adminsService.remove(+id);
}

}