import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { RoleDto } from './role.dto';
import { RoleDocument } from './role.schema';
import { RoleCollectionConverter } from './collection/role.collection.converter';
import { RoleCollectionDto } from './collection/role.collection.dto';
import { RoleCollectionDocument } from './collection/role.collection.schema';

@Injectable()
export class RoleConverter extends AConverter<RoleDocument, RoleDto> {
  constructor(
    protected readonly roleCollectionConverter: RoleCollectionConverter,
  ) {
    super();
  }

  toDto(schema: RoleDocument): RoleDto {
    if (schema === null) return null;

    const collections: RoleCollectionDto[] = this.roleCollectionConverter.toDtoList(
      schema.collections,
    );

    return new RoleDto({
      id: schema._id,
      name: schema.name,
      isRoot: schema.isRoot,
      collections,
      createdAt: schema.createdAt,
    });
  }

  toSchema(dto: RoleDto): RoleDocument {
    if (dto === null) return null;

    const collections: RoleCollectionDocument[] = this.roleCollectionConverter.toSchemaList(
      dto.collections,
    );

    return <RoleDocument>{
      name: dto.name,
      isRoot: dto.isRoot,
      collections,
      createdAt: dto.createdAt,
    };
  }
}
