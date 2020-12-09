import { isValidObjectId, Model, Types } from 'mongoose';
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
  async removeSessionExpired() {
    this.logger.log('Remove sessions expired');

    const sessionList = await this.findAll();

    sessionList.forEach((el) => {
      if (el.expiredSessionAt < new Date()) {
        this.logger.log('Remove Session - ' + el.id);
        this.remove(el.id);
      }
    });
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

  /* Override to save or return cache */
  async findOne(id: Types.ObjectId): Promise<SessionDto> {
    let sessionCache: SessionDto = await this.cacheManager.get(id.toString());
    if (sessionCache !== null) {
      return sessionCache;
    }

    sessionCache = await super.findOne(id);

    if (sessionCache !== null) {
      await this.cacheManager.set(id.toString(), sessionCache);
    }
    return sessionCache;
  }

  /* Override to remove cache */
  async remove(id: Types.ObjectId): Promise<SessionDto> {
    const session = await super.findOne(id);
    if (session !== null) {
      this.cacheManager.del(id.toString());
      this.cacheManager.del(session.token);
    }
    return await super.remove(id);
  }

  async removeByUser(id: Types.ObjectId) {
    /* not useed this code because not remove cache */
    /* return await this.repository.remove({ 'user.id': new Types.ObjectId(id) }); */

    const lists = await this.repository.find({
      'user.id': new Types.ObjectId(id),
    });

    lists.forEach((el) => {
      this.remove(el.id);
    });
  }

  /* Override to remove cache */
  async update(id: Types.ObjectId, dto: SessionDto) {
    const session = await super.findOne(id);
    if (session !== null) {
      this.cacheManager.del(id.toString());
      this.cacheManager.del(session.token);
    }
    this.cacheManager.del(id.toString());
    return await super.update(id, dto);
  }
}
