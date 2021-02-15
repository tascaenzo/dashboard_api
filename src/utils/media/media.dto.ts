import { Injectable } from '@nestjs/common';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

@Injectable()
export class MediaDto {
  @IsMongoId()
  @IsOptional()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly url: string;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  public constructor(dto?: Partial<MediaDto>) {
    Object.assign(this, dto);
  }
}
