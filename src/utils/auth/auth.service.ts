import { Injectable } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
//import { sha512 } from 'js-sha512';
import { jwtConstants } from './constants';
//import { UserDto } from '@/Dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: any) {
    return {
      token: this.jwtService.sign(user),
      expiresIn: jwtConstants.signOptions.expiresIn,
      user,
    };
  }
}
