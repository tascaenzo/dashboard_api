import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { UserModule } from '@/Modules/user.module';
import { AuthModule } from '@/utils/auth/auth.module';
import { SessionModule } from '@/utils/session/session.module';
import { AppController } from './Controllers/app.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtRegister } from './utils/auth/constants';

@Module({
  imports: [
    AuthModule,
    SessionModule,
    UserModule,
    ScheduleModule.forRoot(),
    JwtModule.register(jwtRegister),
    MongooseModule.forRoot('mongodb://localhost:27017/api_test', {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
