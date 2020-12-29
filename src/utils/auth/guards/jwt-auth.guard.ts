import { RoleService } from '@/utils/role/role.service';
import { SessionService } from '@/utils/session/session.service';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;

      if (authorization === undefined || authorization === null) {
        throw new ForbiddenException();
      }

      const token = authorization.split(' ')[1];
      const pyload = this.jwtService.verify(token);
      const session = await this.sessionService.findOne(
        new Types.ObjectId(pyload.sessionId),
      );

      if (session !== null) {
        const { user } = session;

        const userRole = user.role;

        if (roles === undefined) {
          return true;
        }

        if (roles.includes('develop')) {
          return userRole.isDevelop;
        }
        if (roles.includes('admin')) {
          return userRole.isAdmin;
        }
        if (userRole.isAdmin || userRole.isAdmin) {
          return true;
        }

        for (const i in userRole.collections) {
          console.log(userRole.collections[i]);
        }

        //if(roles.includes('develop'))
        //console.log('********', roles);

        console.log(session);
      }

      this.logger.warn('Auth fail session not valid');
      return false;
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
