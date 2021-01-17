import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { UserDto } from '@/Dto/user.dto';
import { SessionService } from '../session/session.service';
import { SessionDto } from '../session/session.dto';

import { JWT_CONFIG } from '@/utils/env.json';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async login(dto: LoginDto, req): Promise<JwtAuthDto> {
    const user: UserDto = await this.usersService.findByEmailPasswor({
      email: dto.email,
      password: dto.password,
    });

    if (!user || user.isBanned) {
      throw new UnauthorizedException(['Invalid email or password']);
    }
    const session = await this.sessionService.create(<SessionDto>{ user });

    const token = this.jwtService.sign({
      sessionId: session.id,
      userId: user.id,
    });

    const refreshToken = dto.remember
      ? /* Generate Refresh Token */
        this.jwtService.sign(
          { token },
          { expiresIn: JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN },
        )
      : /* Not Generate Refresh Token */
        null;

    let seconds: number;
    let expiredSessionAtString =
      refreshToken !== null
        ? JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN
        : JWT_CONFIG.EXPIRES_IN;

    if (expiredSessionAtString.includes('s')) {
      expiredSessionAtString = expiredSessionAtString.replace('s', '');
      seconds = parseInt(expiredSessionAtString);
    }
    if (expiredSessionAtString.includes('h')) {
      expiredSessionAtString = expiredSessionAtString.replace('h', '');
      seconds = parseInt(expiredSessionAtString) * 3600;
    }

    const expiredSessionAt: Date = new Date(
      new Date().getTime() + seconds * 1000,
    );

    await this.sessionService.update(session.id, {
      id: null,
      user,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      token,
      refreshToken,
      refreshNumber: 0,
      createdAt: null,
      refreshedAt: null,
      expiredTokenAt: JWT_CONFIG.EXPIRES_IN,
      expiredSessionAt,
    });

    return {
      token,
      refreshToken,
      expiredToken: JWT_CONFIG.EXPIRES_IN,
      expiredRefreshToken:
        refreshToken !== null ? JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN : null,
      user,
    };
  }

  async refresh(dto: RefreshTokenDto, req): Promise<JwtAuthDto> {
    try {
      const pyloadRefreshToken = await this.jwtService.verify(dto.refreshToken);
      const pyloadToken = this.jwtService.decode(pyloadRefreshToken.token);
      const session: SessionDto = await this.sessionService.findOne(
        pyloadToken['sessionId'],
      );

      if (Date.now() < pyloadToken['exp'] * 1000) {
        throw new UnauthorizedException('Current token is not expired');
      }

      if (new Date() > session.expiredSessionAt) {
        throw new UnauthorizedException('Current session is expired');
      }

      if (
        session !== null &&
        session.token === dto.token &&
        session.token === pyloadRefreshToken.token &&
        session.refreshToken === dto.refreshToken
      ) {
        /* Generate new token and new refreshToken */
        const token = this.jwtService.sign({
          sessionId: session.id,
          userId: session.user.id,
        });

        const refreshToken = this.jwtService.sign(
          { token },
          { expiresIn: JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN },
        );

        let seconds: number;
        let expiredSessionAtString = JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN;

        if (expiredSessionAtString.includes('s')) {
          expiredSessionAtString = expiredSessionAtString.replace('s', '');
          seconds = parseInt(expiredSessionAtString);
        }
        if (expiredSessionAtString.includes('h')) {
          expiredSessionAtString = expiredSessionAtString.replace('h', '');
          seconds = parseInt(expiredSessionAtString) * 3600;
        }

        const expiredSessionAt: Date = new Date(
          new Date().getTime() + seconds * 1000,
        );

        await this.sessionService.update(session.id, <SessionDto>{
          ip: req.ip,
          user: session.user,
          userAgent: req.headers['user-agent'],
          token,
          refreshToken,
          refreshNumber: session.refreshNumber + 1,
          refreshedAt: new Date(),
          expiredTokenAt: JWT_CONFIG.EXPIRES_IN,
          expiredSessionAt,
        });

        return {
          token,
          refreshToken,
          expiredToken: JWT_CONFIG.EXPIRES_IN,
          expiredRefreshToken: JWT_CONFIG.EXPIRES_REFRESH_TOKEN_IN,
          user: session.user,
        };
      }

      throw new UnauthorizedException('Invalid refresh token');
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException(e.message);
    }
  }

  async me(jwt: string): Promise<UserDto> {
    const pyload: any = this.jwtService.decode(jwt.replace('Bearer ', ''));
    const session = await this.sessionService.findOne(pyload.sessionId);
    return session.user;
  }
}
