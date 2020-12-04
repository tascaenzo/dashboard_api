import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtAuth, LoginDto } from './auth.dto';
import { UserDto } from '@/Dto/user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<jwtAuth> {
    const user: UserDto = await this.usersService.findByEmailPasswor({
      email: dto.email,
      password: dto.password,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ ...user });

    /* Generate Refresh Token */
    if (dto.remember) {
      const refreshToken = this.jwtService.sign(
        { ...user },
        {
          expiresIn: jwtConstants.expiresRefreshTokenIn,
        },
      );

      return {
        token,
        refreshToken,
        expiredToken: jwtConstants.expiresIn,
        expiredRefreshToken: jwtConstants.expiresRefreshTokenIn,
        user,
      };
    }

    /* Not Generate Refresh Token */
    return {
      token,
      refreshToken: null,
      expiredToken: jwtConstants.expiresIn,
      expiredRefreshToken: null,
      user,
    };
  }

  me(jwt: string): UserDto {
    const pyload: any = this.jwtService.decode(jwt.replace('Bearer ', ''));
    delete pyload.exp;
    delete pyload.iat;
    return <UserDto>pyload;
  }
}
