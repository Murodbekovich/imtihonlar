import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: any) {
    return this.usersService.create(dto);
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
