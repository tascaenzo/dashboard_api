import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/Modules/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { SessionModule } from '../session/session.module';

import { JWT_CONFIG } from '@/utils/env.json';

const jwtRegister = {
  secret: JWT_CONFIG.SECRET,
  signOptions: { expiresIn: JWT_CONFIG.EXPIRES_IN },
};

@Global()
@Module({
  imports: [
    JwtModule.register(jwtRegister),
    UserModule,
    SessionModule,
    PassportModule,
  ],
  exports: [AuthService, SessionModule, JwtModule.register(jwtRegister)],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
