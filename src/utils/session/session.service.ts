import { Model, Types } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { AService } from '@/utils/crud/AService';
import { COLLECTION_NAME, SessionDocument } from './session.schema';
import { SessionDto } from './session.dto';
import { SessionConverter } from './session.converter';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { UserDto } from '@/Dto/user.dto';

@Injectable()
export class SessionService extends AService<SessionDocument, SessionDto> {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager,
    @InjectModel(COLLECTION_NAME)
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
    return this.converter.toDto(await this.repository.findOne({ token }));
  }

  async findByUser(id: string): Promise<SessionDto[]> {
    return this.converter.toDtoList(
      await this.repository.find({ 'user._id': id }),
    );
  }

  /* Override to save or return cache */
  async findOne(id: string): Promise<SessionDto> {
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

  /* Override to remove cache */
  async remove(
    id: string,
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    const session = await super.findOne(id);
    if (session !== null) {
      if (this.cacheManager.get(id !== null)) {
        this.cacheManager.del(id);
      }
    }
    return await super.remove(id);
  }

  /* it does not remove currentSessionId but if you want to delete everything set it to null  */
  async removeByUser(id: string, currentSessionId: string) {
    /* not useed this code because not remove cache */
    /* return await this.repository.remove({ 'user._id': new Types.ObjectId(id) }); */

    const lists = await this.repository.find({
      'user._id': new Types.ObjectId(id),
    });

    lists.forEach((el) => {
      if (currentSessionId === null || currentSessionId === undefined) {
        this.remove(el._id);
      } else if (currentSessionId.toString() !== el._id.toString()) {
        this.remove(el._id);
      }
    });
  }

  async removeMe(token: string) {
    const session = await this.findByToken(token);
    this.removeByUser(session.user.id, session.id);
  }

  /* Override to remove cache */
  async update(id: string, dto: SessionDto) {
    const session = await super.findOne(id);

    if (session !== null) {
      const cacheById = await this.cacheManager.get(session.id.toString());
      if (cacheById !== null) {
        this.cacheManager.del(session.id.toString());
      }
    }
    this.cacheManager.del(id.toString());
    return await super.update(id, dto);
  }

  async updateUserSessions(userDto: UserDto) {
    const sessionList: SessionDto[] = await this.findByUser(userDto.id);
    sessionList.forEach((el: SessionDto) => {
      this.update(el.id, new SessionDto({ ...el, user: userDto }));
    });
  }
}
