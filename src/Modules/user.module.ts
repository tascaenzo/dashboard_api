import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from '@/Controllers/user.controller';
import { UserConverter } from '@/Converters/user.converter';
import { UserSchema, COLLECTION_NAME } from '@/Schemas/user.schema';
import { UserService } from '@/Services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COLLECTION_NAME, schema: UserSchema }]),
    /* CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 120,
    }), */
  ],
  controllers: [UserController],
  providers: [UserConverter, UserService],
  exports: [UserService, UserConverter],
})
export class UserModule {}
