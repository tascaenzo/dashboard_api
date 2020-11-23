import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export const AuthImports = [
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: jwtConstants.signOptions,
  }),
];

export const AuthProviders = [AuthService, LocalStrategy, JwtStrategy];
