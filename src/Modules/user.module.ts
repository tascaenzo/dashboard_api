import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserController } from '@/Controllers/user.controller';
import { UserConverter } from '@/Converters/user.converter';
import { UserSchema } from '@/Schemas/user.schema';
import { UserService } from '@/Services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserConverter, UserService],
  exports: [UserService],
})
export class UserModule {}
