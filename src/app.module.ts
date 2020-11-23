import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '@/utils/auth/auth.controller';
import { AuthImports, AuthProviders } from '@/utils/auth/auth.module';

import { UserController } from '@/Controllers/user.controller';
import { UserConverter } from '@/Converters/user.converter';
import { UserSchema } from '@/Schemas/user.schema';
import { UserService } from '@/Services/user.service';

const Service = [UserService];
const Converter = [UserConverter];

@Module({
  imports: [
    ...AuthImports,
    MongooseModule.forRoot('mongodb://localhost:27017/api_test'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],

  providers: [...AuthProviders, ...Service, ...Converter],
})
export class AppModule {}
