import { Get, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { JwtAuthGuard } from '@/utils/auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  @Get()
  findAll(): any {
    return {
      msg: "Hi, I'm a web server",
    };
  }
}
