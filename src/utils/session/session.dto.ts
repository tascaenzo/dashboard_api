import { Injectable } from '@nestjs/common';
import { UserDto } from '@/Dto/user.dto';
import {
  IsDate,
  IsInt,
  IsIP,
  IsJWT,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@Injectable()
export class SessionDto {
  @IsMongoId()
  @IsOptional()
  readonly id: string;

  @IsObject()
  readonly user: UserDto;

  @IsIP()
  readonly ip: string;

  @IsString()
  readonly userAgent: string;

  //@IsString()
  //readonly os: string;

  @IsJWT()
  readonly token: string;

  @IsJWT()
  readonly refreshToken: string;

  @Min(0)
  @IsInt()
  readonly refreshNumber: number;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly refreshedAt: Date;

  @IsString()
  @IsOptional()
  readonly expiredTokenAt: string;

  @IsDate()
  @IsOptional()
  readonly expiredSessionAt: Date;

  public constructor(dto?: Partial<SessionDto>) {
    Object.assign(this, dto);
  }
}
