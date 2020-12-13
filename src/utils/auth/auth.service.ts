import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthDto, LoginDto, RefreshTokenDto } from './auth.dto';
import { UserDto } from '@/Dto/user.dto';
import { jwtConstants } from './constants';
import { SessionService } from '../session/session.service';
import { SessionDto } from '../session/session.dto';

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

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
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
          { expiresIn: jwtConstants.expiresRefreshTokenIn },
        )
      : /* Not Generate Refresh Token */
        null;

    let seconds: number;
    let expiredSessionAtString =
      refreshToken !== null
        ? jwtConstants.expiresRefreshTokenIn
        : jwtConstants.expiresIn;

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
      expiredTokenAt: jwtConstants.expiresIn,
      expiredSessionAt,
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

  async refresh(dto: RefreshTokenDto): Promise<JwtAuthDto> {
    try {
      const pyloadRefreshToken = await this.jwtService.verify(dto.refreshToken);
      const pyloadToken = this.jwtService.decode(pyloadRefreshToken.token);
      const session = await this.sessionService.findOne(
        pyloadToken['sessionId'],
      );

      if (
        session !== null &&
        session.token === dto.token &&
        session.token === pyloadRefreshToken.token &&
        session.refreshToken === dto.refreshToken
      ) {
        //posso aggiornare il token
        this.logger.debug('devo aggiornare');
        return new JwtAuthDto();
      }

      //throw new UnauthorizedException('Invalid refresh token');
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
    return new JwtAuthDto();
  }

  async me(jwt: string): Promise<UserDto> {
    const pyload: any = this.jwtService.decode(jwt.replace('Bearer ', ''));
    const session = await this.sessionService.findOne(pyload.sessionId);
    return session.user;
  }
}
