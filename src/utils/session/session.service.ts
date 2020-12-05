import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AService } from '@/utils/crud/AService';
import { SessionDocument } from './session.schema';
import { SessionDto } from './session.dto';
import { SessionConverter } from './session.converter';
import { Model } from 'mongoose';

@Injectable()
export class SessionService extends AService<SessionDocument, SessionDto> {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager,
    @InjectModel('Session')
    protected readonly repository: Model<SessionDocument>,
    protected readonly converter: SessionConverter,
  ) {
    super(repository, converter);
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
}
