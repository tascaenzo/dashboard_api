import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    //private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const token = context
        .switchToHttp()
        .getRequest()
        .headers.authorization.split(' ')[1];

      const user = this.jwtService.verify(token);
      //console.log(user);
      //if (user === null) return false;

      return true;
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}

/*
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectModel('User') private service: Model<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const token = context
        .switchToHttp()
        .getRequest()
        .headers.authorization.split(' ')[1];
      const user = await this.service.findById(
        this.jwtService.verify(token)._id,
      );

      if (user == null) throw new UnauthorizedException();

      if (!roles) return true;

      let state = false;
      roles.forEach((role) => {
        if (user.roles.includes(role)) state = true;
      });
      return state;
    } catch (ExceptionsHandler) {
      throw new UnauthorizedException();
    }
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
*/
