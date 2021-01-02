import { Body, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { UserCreateDto, UserDto } from '@/Dto/user.dto';
import { UserService } from '@/Services/user.service';
import { JwtAuthGuard, Roles } from '@/utils/auth/guards/jwt-auth.guard';
import { SessionService } from '@/utils/session/session.service';
import { NAME_PLURAL } from '@/Schemas/user.schema';

@Roles(NAME_PLURAL)
@UseGuards(JwtAuthGuard)
@Controller(NAME_PLURAL)
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
  async remove(
    @Param('id') id: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    await this.sessionService.removeByUser(id, null);
    return super.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UserDto,
  ): Promise<UserDto> {
    const user: UserDto = await super.update(id, dto);
    await this.sessionService.updateUserSessions(user);
    return user;
  }
}
