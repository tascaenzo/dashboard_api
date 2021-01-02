import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { RoleCollectionDto } from './role.collection.dto';
import { RoleCollectionDocument } from './role.collection.schema';

@Injectable()
export class RoleCollectionConverter extends AConverter<
  RoleCollectionDocument,
  RoleCollectionDto
> {
  async toDto(schema: RoleCollectionDocument): Promise<RoleCollectionDto> {
    if (schema === null) return null;
    return {
      name: schema.name,
      canCreate: schema.canCreate,
      canRead: schema.canRead,
      canUpdate: schema.canUpdate,
      canDelete: schema.canDelete,
    };
  }

  async toSchema(dto: RoleCollectionDto): Promise<RoleCollectionDocument> {
    if (dto === null) return null;
    return <RoleCollectionDocument>{
      name: dto.name,
      canCreate: dto.canCreate,
      canRead: dto.canRead,
      canUpdate: dto.canUpdate,
      canDelete: dto.canDelete,
    };
  }
}
