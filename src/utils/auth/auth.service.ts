import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtAuth, LoginDto } from './auth.dto';
import { UserDto } from '@/Dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<jwtAuth> {
    const user: UserDto = await this.usersService.findByEmailPasswor(dto);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log(typeof user);

    return {
      token: this.jwtService.sign({ ...user }),
      expired: null,
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
