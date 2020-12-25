import { Body, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { UserCreateDto, UserDto } from '@/Dto/user.dto';
import { UserService } from '@/Services/user.service';
import { JwtAuthGuard } from '@/utils/auth/guards/jwt-auth.guard';
import { Types } from 'mongoose';
import { SessionService } from '@/utils/session/session.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController extends AController<UserDto> {
  constructor(
    protected readonly service: UserService,
    protected readonly sessionService: SessionService,
  ) {
    super(service);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Body() dto: UserDto): Promise<UserDto> {
    throw new Error();
  }

  @Post()
  createUser(@Body() dto: UserCreateDto): Promise<UserDto> {
    return this.service.createUser(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<UserDto> {
    await this.sessionService.removeByUser(id, null);
    return super.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() dto: UserDto,
  ): Promise<UserDto> {
    const user: UserDto = await super.update(id, dto);
    await this.sessionService.updateUserSessions(user);
    return user;
  }
}
