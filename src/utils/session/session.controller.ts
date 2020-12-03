//import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { ApiTags } from '@nestjs/swagger';
import { SessionDto } from './session.dto';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('Sessions')
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

  @Post()
  create(@Body() dto: SessionDto): Promise<SessionDto> {
    return super.create(dto);
  }

  @Get()
  findAll(): Promise<SessionDto[]> {
    return super.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SessionDto> {
    return super.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return super.remove(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: SessionDto) {
    return super.update(id, dto);
  }
}
