import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, Module } from '@nestjs/common';
import { SessionSchema } from './session.schema';
import { SessionController } from './session.controller';
import { SessionConverter } from './session.converter';
import { SessionService } from './session.service';
import { UserModule } from '@/Modules/user.module';
import * as redisStore from 'cache-manager-redis-store';

import { CACHE_CONFIG } from '@/utils/env.json';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    CacheModule.register({
      store: redisStore,
      host: CACHE_CONFIG.HOST,
      port: CACHE_CONFIG.PORT,
      ttl: CACHE_CONFIG.TTL, //12h
    }),
  ],
  controllers: [SessionController],
  providers: [SessionConverter, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
