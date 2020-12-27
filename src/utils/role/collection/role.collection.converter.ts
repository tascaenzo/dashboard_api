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
    return new RoleCollectionDto(schema);
  }

  async toSchema(dto: RoleCollectionDto): Promise<RoleCollectionDocument> {
    if (dto === null) return null;
    return new RoleCollectionDocument(dto);
  }
}
