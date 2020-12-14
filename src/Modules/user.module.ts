import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from '@/Controllers/user.controller';
import { UserConverter } from '@/Converters/user.converter';
import { UserSchema } from '@/Schemas/user.schema';
import { UserService } from '@/Services/user.service';
import { jwtRegister } from '@/utils/auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register(jwtRegister),
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
