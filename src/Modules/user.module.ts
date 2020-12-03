import { MongooseModule } from '@nestjs/mongoose';
import { /*CacheModule,*/ Module } from '@nestjs/common';
/* import * as redisStore from 'cache-manager-redis-store';
 */
import { UserController } from '@/Controllers/user.controller';
import { UserConverter } from '@/Converters/user.converter';
import { UserSchema } from '@/Schemas/user.schema';
import { UserService } from '@/Services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    /* CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 120,
    }), */
  ],
  controllers: [UserController],
  providers: [UserConverter, UserService],
  exports: [UserService],
})
export class UserModule {}
