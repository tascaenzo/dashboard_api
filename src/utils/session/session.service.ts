import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { AService } from '@/utils/crud/AService';
import { SessionDocument } from './session.schema';
import { SessionDto } from './session.dto';
import { SessionConverter } from './session.converter';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SessionService extends AService<SessionDocument, SessionDto> {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager,
    @InjectModel('Session')
    protected readonly repository: Model<SessionDocument>,
    protected readonly converter: SessionConverter,
  ) {
    super(repository, converter);
  }

  /* All day at 12.00 PM remove session expired from db */
  @Cron('0 0 0 * * *')
  removeSessionExpired() {
    this.logger.log('Remove session expired');
    //this.repository.
  }

  /*   async findOne(id: string): Promise<SessionDto> {
    let sessionCache: SessionDto = await this.cacheManager.get(id);
    if (sessionCache !== null) {
      return sessionCache;
    }

    sessionCache = await super.findOne(id);

    if (sessionCache !== null) {
      await this.cacheManager.set(id, sessionCache);
    }

    return sessionCache;
  }

  async findByToken(token: string): Promise<SessionDto> {
    let sessionCache: SessionDto = await this.cacheManager.get(token);

    if (sessionCache !== null) {
      return sessionCache;
    }

    sessionCache = this.converter.toDto(
      await this.repository.findOne({ token }),
    );

    if (sessionCache !== null) {
      await this.cacheManager.set(token, sessionCache);
    }

    return sessionCache;
  }
   */
}
