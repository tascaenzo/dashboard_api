import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { RoleCollectionDto } from './collection/role.collection.dto';

export class RoleDto {
  @IsMongoId()
  @IsOptional()
  readonly id: Types.ObjectId;

  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isAdmin: boolean;

  @IsBoolean()
  readonly isDevelop: boolean;

  @IsArray()
  collections: RoleCollectionDto[];

  @IsDate()
  @IsOptional()
  createdAt: Date;

  public constructor(dto?: Partial<RoleDto>) {
    Object.assign(this, dto);
  }
}
