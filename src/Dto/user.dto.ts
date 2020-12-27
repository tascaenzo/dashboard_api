import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { RoleDto } from '@/utils/role/role.dto';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsBoolean()
  isBanned: boolean;

  @IsObject()
  readonly role: RoleDto;

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

  public constructor(dto?: Partial<UserCreateDto>) {
    Object.assign(this, dto);
  }
}
