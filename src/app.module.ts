import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';

import { UserModule } from '@/Modules/user.module';
import { AuthModule } from '@/utils/auth/auth.module';
import { SessionModule } from './utils/session/session.module';

@Module({
  imports: [
    AuthModule,
    SessionModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/api_test', {
      useCreateIndex: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 3600 * 12, //12h
    }),
  ],
})
export class AppModule {}
