import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, Module } from '@nestjs/common';
import { SessionSchema } from './session.schema';
import { SessionController } from './session.controller';
import { SessionConverter } from './session.converter';
import { SessionService } from './session.service';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from '@/Modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtRegister } from '../auth/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register(jwtRegister),
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 3600 * 12, //12h
    }),
  ],
  controllers: [SessionController],
  providers: [SessionConverter, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
