//import { CacheInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { ApiTags } from '@nestjs/swagger';
import { SessionDto } from './session.dto';
import { SessionService } from './session.service';
import { Types } from 'mongoose';
//import { JwtAuthGuard /*Roles*/ } from '@/utils//auth/guards/jwt-auth.guard';

@ApiTags('Session')
@Controller('sessions')
//@UseGuards(JwtAuthGuard)
//@Roles('develop')
//@UseInterceptors(CacheInterceptor)
export class SessionController extends AController<SessionDto> {
  constructor(protected readonly service: SessionService) {
    super(service);
  }

  /*
   * override of methods defined in AController
   * because swagger decorators do not support generics,
   * so to get the correct documentation you need to use
   * reals and not generics <dto>
   */

  @Delete('/expired')
  removeSessionExpired(): void {
    this.service.removeSessionExpired();
  }

  @Delete('/byUser/:id')
  removeSessionByUser(@Param('id') id: Types.ObjectId): void {
    this.service.removeByUser(id, null);
  }

  @Get('/byUser/:id')
  findByUser(@Param('id') id: Types.ObjectId): Promise<SessionDto[]> {
    return this.service.findByUser(id);
  }

  @Post()
  create(@Body() dto: SessionDto): Promise<SessionDto> {
    return super.create(dto);
  }

  @Get()
  findAll(): Promise<SessionDto[]> {
    return super.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Promise<SessionDto> {
    return super.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId): Promise<SessionDto> {
    return super.remove(id);
  }
  @Put(':id')
  update(@Param('id') id: Types.ObjectId, @Body() dto: SessionDto) {
    return super.update(id, dto);
  }
}
