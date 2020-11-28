import { UserService } from '@/Services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user = await this.userService.findByEmailPasswor({ email, password });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
