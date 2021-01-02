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
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles =
        this.reflector.get<string[]>('roles', context.getHandler()) ||
        this.reflector.get<string[]>('roles', context.getClass());

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

        if (roles === undefined) {
          return true;
        }

        if (user.role === undefined || user.role === null) {
          return false;
        }

        const userRole = await this.roleService.findOne(user.role.id);

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
          if (roles.includes(userRole.collections[i].name)) {
            switch (request.method) {
              case 'GET':
                return userRole.collections[i].canRead;
              case 'POST':
                return userRole.collections[i].canCreate;
              case 'PUT':
                return userRole.collections[i].canUpdate;
              case 'DELETE':
                return userRole.collections[i].canDelete;
              default:
                return false;
            }
          }
        }
        return false;
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
