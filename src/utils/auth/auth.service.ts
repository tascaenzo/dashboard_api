import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuth, LoginDto } from './auth.dto';
import { UserDto } from '@/Dto/user.dto';
import { jwtConstants } from './constants';
import { SessionService } from '../session/session.service';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async login(dto: LoginDto, req): Promise<JwtAuth> {
    const user: UserDto = await this.usersService.findByEmailPasswor({
      email: dto.email,
      password: dto.password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const sessionId = new Types.ObjectId();
    const token = this.jwtService.sign({ sessionId, userId: user.id });

    const refreshToken = dto.remember
      ? /* Generate Refresh Token */
        this.jwtService.sign(
          { token },
          { expiresIn: jwtConstants.expiresRefreshTokenIn },
        )
      : /* Not Generate Refresh Token */
        null;

    await this.sessionService.create({
      id: sessionId,
      user,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      token,
      refreshToken,
      refreshNumber: 0,
      createAt: new Date(),
      refreshedAt: null,
      expiredTokenAt: jwtConstants.expiresIn,
      expiredSessionAt:
        refreshToken !== null
          ? jwtConstants.expiresRefreshTokenIn
          : jwtConstants.expiresIn,
    });

    return {
      token,
      refreshToken,
      expiredToken: jwtConstants.expiresIn,
      expiredRefreshToken:
        refreshToken !== null ? jwtConstants.expiresRefreshTokenIn : null,
      user,
    };
  }

  async me(jwt: string): Promise<UserDto> {
    const pyload: any = this.jwtService.decode(jwt.replace('Bearer ', ''));
    const session = await this.sessionService.findOne(pyload.sessionId);
    //delete pyload.exp;
    //delete pyload.iat;
    return session.user;
  }
}
