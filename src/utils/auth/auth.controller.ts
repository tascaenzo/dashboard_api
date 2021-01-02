import { UserDto } from '@/Dto/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { JwtAuthDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req): Promise<JwtAuthDto> {
    return this.authService.login(dto, req);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = await this.sessionService.findByToken(token);
    const { n, ok, deletedCount } = await this.sessionService.remove(id);
    if (n === 1 && ok === 1 && deletedCount === 1) {
      return { msg: 'Session Removed' };
    }
  }

  @Put('refresh')
  async refreshToken(
    @Body() dto: RefreshTokenDto,
    @Req() req,
  ): Promise<JwtAuthDto> {
    return await this.authService.refresh(dto, req);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Headers('authorization') jwt: string): Promise<UserDto> {
    return await this.authService.me(jwt);
  }
}
