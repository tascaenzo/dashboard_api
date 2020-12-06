import { UserDto } from '@/Dto/user.dto';
import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req): Promise<JwtAuth> {
    return this.authService.login(dto, req);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Headers('authorization') jwt: string): UserDto {
    return this.authService.me(jwt);
  }
}
