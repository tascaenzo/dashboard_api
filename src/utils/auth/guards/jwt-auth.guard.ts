import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

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
