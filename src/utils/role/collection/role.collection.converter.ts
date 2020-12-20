import { AConverter } from '@/utils/crud/AConverter';
import { Injectable } from '@nestjs/common';
import { RoleCollectionDto } from './role.collection.dto';
import { RoleCollectionDocument } from './role.collection.schema';

@Injectable()
export class RoleCollectionConverter extends AConverter<
  RoleCollectionDocument,
  RoleCollectionDto
> {
  toDto(schema: RoleCollectionDocument): RoleCollectionDto {
    if (schema === null) return null;
    return new RoleCollectionDto(schema);
  }

  toSchema(dto: RoleCollectionDto): RoleCollectionDocument {
    if (dto === null) return null;
    return new RoleCollectionDocument(dto);
  }
}
