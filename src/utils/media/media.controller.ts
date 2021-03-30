import { Post, Req, Res, UseGuards } from '@nestjs/common';

import { Controller } from '@nestjs/common';
import fastify = require('fastify');

//import { AController } from '@/utils/crud/AController';
//import { SessionDto } from './media.dto';
import { MediaService } from './media.service';
//import { JwtAuthGuard /*Roles*/ } from '@/utils//auth/guards/jwt-auth.guard';
import { NAME_PLURAL } from './media.schema';
import { AController } from '../crud/AController';
import { MediaDto } from './media.dto';

@Controller(NAME_PLURAL)
//@UseGuards(JwtAuthGuard)
export class MediaController extends AController<MediaDto> {
  constructor(protected readonly service: MediaService) {
    super(service);
  }

  @Post('/uploadFile')
  async uploadFile(
    @Req() req: fastify.FastifyRequest,
    //@Res() res: fastify.FastifyReply<any>,
  ): Promise<any> {
    return await this.service.uploadFile(req);
  }
}
