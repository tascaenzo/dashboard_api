import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

@Injectable()
export class UserDto {
  @IsMongoId()
  @IsOptional()
  readonly id: Types.ObjectId;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsOptional()
  @IsString()
  password: string;

  public constructor(dto?: Partial<UserDto>) {
    Object.assign(this, dto);
  }
}

@Injectable()
export class UserCreateDto {
  @IsMongoId()
  @IsOptional()
  readonly id: Types.ObjectId;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString()
  password: string;

  public constructor(dto?: Partial<UserDto>) {
    Object.assign(this, dto);
  }
}
