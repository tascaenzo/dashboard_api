import { Req, UseGuards } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AController } from '@/utils/crud/AController';
import { SessionDto } from './session.dto';
import { SessionService } from './session.service';
import { JwtAuthGuard /*Roles*/ } from '@/utils//auth/guards/jwt-auth.guard';
import { NAME_PLURAL } from './session.schema';

@Controller(NAME_PLURAL)
@UseGuards(JwtAuthGuard)
export class SessionController extends AController<SessionDto> {
  constructor(protected readonly service: SessionService) {
    super(service);
  }

  @Delete('/expired')
  removeSessionExpired(): void {
    this.service.removeSessionExpired();
  }

  @Delete('/byUser/:id')
  removeSessionByUser(@Param('id') id: string): void {
    this.service.removeByUser(id, null);
  }

  @Delete('/me')
  removeSessionMe(@Req() req): void {
    const token = req.headers.authorization.split(' ')[1];
    this.service.removeMe(token);
  }

  @Get('/byUser/:id')
  findByUser(@Param('id') id: string): Promise<SessionDto[]> {
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
}
