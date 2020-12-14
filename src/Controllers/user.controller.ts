import { Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
//import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { UserDto } from '@/Dto/user.dto';
import { UserService } from '@/Services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '@/utils/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController extends AController<UserDto> {
  constructor(protected readonly service: UserService) {
    super(service);
  }

  /*
   * override of methods defined in AController
   * because swagger decorators do not support generics,
   * so to get the correct documentation you need to use
   * reals and not generics <dto>
   */

  @Post()
  create(@Body() dto: UserDto): Promise<UserDto> {
    return super.create(dto);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return super.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Promise<UserDto> {
    return super.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId): Promise<UserDto> {
    return super.remove(id);
  }
  @Put(':id')
  update(@Param('id') id: Types.ObjectId, @Body() dto: UserDto) {
    return super.update(id, dto);
  }
}
