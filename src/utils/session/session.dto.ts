import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
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
  readonly id: Types.ObjectId;

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
  readonly createAt: Date;

  @IsDate()
  readonly refreshedAt: Date;

  @IsString()
  readonly expiredAt: string;

  public constructor(dto?: Partial<SessionDto>) {
    Object.assign(this, dto);
  }
}
