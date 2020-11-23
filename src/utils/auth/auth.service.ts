import { Injectable } from '@nestjs/common';
import { UserService } from '@/Services/user.service';
import { JwtService } from '@nestjs/jwt';
//import { sha512 } from 'js-sha512';
import { jwtConstants } from './constants';
//import { User } from 'src/user/user.entity';

function findUser() {
  return {
    username: 'enzo',
    password: 'password',
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = findUser();

    //const user = await this.userService.findUsername(username);
    //pass = await sha512(pass);
    if (user && user.password === pass) {
      //const { password, ...result } = user;
      return user;
    }
    return null;
  }

  login(user: any) {
    return {
      token: this.jwtService.sign(user),
      expiresIn: jwtConstants.signOptions.expiresIn,
      user,
    };
  }
}
