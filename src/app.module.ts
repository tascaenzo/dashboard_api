import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { UserModule } from '@/Modules/user.module';
import { AuthModule } from '@/utils/auth/auth.module';
import { SessionModule } from '@/utils/session/session.module';

@Module({
  imports: [
    AuthModule,
    SessionModule,
    UserModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/api_test', {
      useCreateIndex: true,
    }),
  ],
})
export class AppModule {}
