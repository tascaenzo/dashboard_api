import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { UserDto } from '@/Dto/user.dto';
import { UserService } from '@/Services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UserController extends AController<UserDto> {
  constructor(protected readonly service: UserService) {
    super(service);
  }

  counter = 0;

  /*
   * override of methods defined in AController
   * because swagger decorators do not support generics,
   * so to get the correct documentation you need to use
   * reals and not generics <dto>
   */
  @Get('/test')
  async test() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.counter++;
    return this.counter;
  }

  @Post()
  create(@Body() dto: UserDto): Promise<UserDto> {
    return super.create(dto);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return super.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return super.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return super.remove(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UserDto) {
    return super.update(id, dto);
  }
}
