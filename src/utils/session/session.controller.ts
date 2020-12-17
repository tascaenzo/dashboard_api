import { Req, UseGuards } from '@nestjs/common';
import { Delete, Get, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { SessionDto } from './session.dto';
import { SessionService } from './session.service';
import { Types } from 'mongoose';
import { JwtAuthGuard /*Roles*/ } from '@/utils//auth/guards/jwt-auth.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
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

  @Delete('/me')
  removeSessionMe(@Req() req): void {
    const token = req.headers.authorization.split(' ')[1];
    this.service.removeMe(token);
  }

  @Get('/byUser/:id')
  findByUser(@Param('id') id: Types.ObjectId): Promise<SessionDto[]> {
    return this.service.findByUser(id);
  }

  @Get('/me')
  async findMe(@Req() req): Promise<SessionDto[]> {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = (await this.service.findByToken(token)).user;
    return this.service.findByUser(id);
  }

  @Get('/current')
  async findCurrent(@Req() req): Promise<SessionDto> {
    const token = req.headers.authorization.split(' ')[1];
    return await this.service.findByToken(token);
  }

  @Put(':id')
  update(@Param('id') id: Types.ObjectId, @Body() dto: SessionDto) {
    return super.update(id, dto);
  }
}
