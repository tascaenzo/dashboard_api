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

  async toDto(schema: RoleDocument): Promise<RoleDto> {
    if (schema === null) return null;

    const collections: RoleCollectionDto[] = await this.roleCollectionConverter.toDtoList(
      schema.collections,
    );

    return new RoleDto({
      id: schema._id === undefined ? null : schema._id,
      name: schema.name,
      isAdmin: schema.isAdmin,
      isDevelop: schema.isDevelop,
      collections,
      createdAt: schema.createdAt,
    });
  }

  async toSchema(dto: RoleDto): Promise<RoleDocument> {
    if (dto === null) return null;

    const collections: RoleCollectionDocument[] = await this.roleCollectionConverter.toSchemaList(
      dto.collections,
    );

    return <RoleDocument>{
      _id: dto.id === undefined ? null : dto.id,
      name: dto.name,
      isAdmin: dto.isAdmin,
      isDevelop: dto.isDevelop,
      collections,
      createdAt: dto.createdAt,
    };
  }
}
