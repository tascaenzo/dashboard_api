import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleCollectionDto } from './collection/role.collection.dto';

export class RoleDto {
  @IsMongoId()
  @IsOptional()
  readonly id: string;

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
