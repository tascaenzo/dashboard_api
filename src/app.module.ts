import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { UserModule } from '@/Modules/user.module';
import { AuthModule } from '@/utils/auth/auth.module';
import { SessionModule } from '@/utils/session/session.module';
import { AppController } from './Controllers/app.controller';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './utils/role/role.module';

import { DB_URI, JWT_CONFIG } from '@/utils/env.json';

const jwtRegister = {
  secret: JWT_CONFIG.SECRET,
  signOptions: { expiresIn: JWT_CONFIG.EXPIRES_IN },
};

@Module({
  imports: [
    RoleModule,
    AuthModule,
    SessionModule,
    UserModule,
    ScheduleModule.forRoot(),
    JwtModule.register(jwtRegister),
    MongooseModule.forRoot(DB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
