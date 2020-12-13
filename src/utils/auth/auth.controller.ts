import { UserDto } from '@/Dto/user.dto';
import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req): Promise<JwtAuthDto> {
    return this.authService.login(dto, req);
  }

  @Post('refresh')
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<JwtAuthDto> {
    return await this.authService.refresh(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Headers('authorization') jwt: string): Promise<UserDto> {
    return await this.authService.me(jwt);
  }
}
