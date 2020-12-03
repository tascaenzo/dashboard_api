import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {
  IsDate,
  IsInt,
  IsIP,
  IsJWT,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@Injectable()
export class SessionDto {
  @IsMongoId()
  @IsOptional()
  readonly id: Types.ObjectId;

  @IsMongoId()
  readonly userId: Types.ObjectId;

  @IsIP()
  ip: string;

  @IsString()
  browser: string;

  @IsString()
  os: string;

  @IsJWT()
  token: string;

  @IsJWT()
  refreshToken: string;

  @Min(0)
  @IsInt()
  refreshNumber: number;

  @IsDate()
  createAt: Date;

  @IsDate()
  refreshedAt: Date;

  @IsDate()
  expiredAt: Date;

  public constructor(dto?: Partial<SessionDto>) {
    Object.assign(this, dto);
  }
}
