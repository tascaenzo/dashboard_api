import { SessionService } from '@/utils/session/session.service';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly sessionService: SessionService,
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

      const pyload = this.jwtService.verify(token);
      const session = await this.sessionService.findOne(
        new Types.ObjectId(pyload.sessionId),
      );

      if (session !== null) {
        return true;
      }

      this.logger.warn('Auth fail session not valid');
      return false;
    } catch (e) {
      this.logger.error(e);
      throw new ForbiddenException(e.message);
    }
  }
}
