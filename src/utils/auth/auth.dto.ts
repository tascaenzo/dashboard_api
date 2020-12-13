import { UserDto } from '@/Dto/user.dto';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsJWT,
  IsObject,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly remember: boolean;

  public constructor(dto?: Partial<LoginDto>) {
    Object.assign(this, dto);
  }
}

export class JwtAuthDto {
  @IsJWT()
  readonly token: string;

  @IsJWT()
  readonly refreshToken: string;

  @IsObject()
  readonly user: UserDto;

  @IsDate()
  readonly expiredToken: string;

  @IsDate()
  readonly expiredRefreshToken: string;

  public constructor(dto?: Partial<JwtAuthDto>) {
    Object.assign(this, dto);
  }
}

export class RefreshTokenDto {
  @IsJWT()
  readonly token: string;

  @IsJWT()
  readonly refreshToken: string;
}
