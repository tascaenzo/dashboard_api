import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/Modules/user.module';
import { AuthService } from './auth.service';
import { jwtRegister } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { SessionModule } from '../session/session.module';

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
