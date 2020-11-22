import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IService } from './IService';
import { IController } from './IController';

export abstract class AController<Dto> implements IController<Dto> {
  constructor(protected readonly service: IService<Dto>) {}

  /*
   * wagger does not support generics to make the documentation
   * work correctly override the methods defined in this controller,
   * the problem occurs in the passage of the generic dto (<dto>)
   */

  @Post()
  create(@Body() dto: Dto): Promise<Dto> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Dto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dto> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Dto) {
    return this.service.update(id, dto);
  }
}
