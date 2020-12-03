import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDocument } from '@/Schemas/user.schema';
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
  readonly user: UserDocument;

  @IsIP()
  readonly ip: string;

  @IsString()
  readonly browser: string;

  @IsString()
  readonly os: string;

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

  @IsDate()
  readonly expiredAt: Date;

  public constructor(dto?: Partial<SessionDto>) {
    Object.assign(this, dto);
  }
}
