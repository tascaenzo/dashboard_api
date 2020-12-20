import { IsBoolean, IsString } from 'class-validator';

export class RoleCollectionDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isPublic: boolean;

  @IsBoolean()
  readonly canCreate: boolean;

  @IsBoolean()
  readonly canRead: boolean;

  @IsBoolean()
  readonly canUpdate: boolean;

  @IsBoolean()
  readonly canDelete: boolean;

  public constructor(dto?: Partial<RoleCollectionDto>) {
    Object.assign(this, dto);
  }
}
