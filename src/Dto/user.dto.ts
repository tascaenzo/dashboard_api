import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

@Injectable()
export class UserDto {
  @IsMongoId()
  @IsOptional()
  readonly id: Types.ObjectId;

  @IsEmail()
  readonly mail: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  public constructor(dto?: Partial<UserDto>) {
    Object.assign(this, dto);
  }
}

module.exports = { SwaggerDto: UserDto, UserDto };
