import { Get, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { JwtAuthGuard, Roles } from '@/utils/auth/guards/jwt-auth.guard';
import { default as env } from '@/utils/env.json';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  findAll(): any {
    return {
      msg: "Hi, I'm a web server",
    };
  }

  @Roles('develop')
  @Get('/db')
  getDbStatus() {
    const status = this.connection.readyState === 1 ? 'up' : 'down';
    return { db: { status } };
  }

  @Roles('develop')
  @Get('/db/collections')
  findAllCollection() {
    return { collections: Object.keys(this.connection.collections) };
  }

  @Roles('develop')
  @Get('/environment')
  getEnv(): any {
    return env;
  }
}
